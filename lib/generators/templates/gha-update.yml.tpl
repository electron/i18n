on:
  schedule:
    - cron: 0 */6 * * *
  workflow_dispatch: {}

name: Update source content

jobs:
  fetchSourceContent:
    name: Fetch latest source content
    runs-on: ubuntu-20.04

    steps:
      - uses: actions/checkout@master
      - uses: actions/setup-node@v1
        with:
          node-version: '14.x'
      - name: Fetch latest source content
        run: |
          git config --global user.email electron@github.com
          git config --global user.name electron-bot

          npm ci
          npm run collect
          npm run content-cleanup

          if [ "$(git status --porcelain)" = "" ]; then
            echo "no new content found; goodbye!"
            exit
          else
            echo "found some new content! committing changes to git"
          fi

          # `pretest` script will run the build first
          npm test

          git add .
          git commit -am "feat: update source content"
          git pull --rebase && git push origin master --follow-tags
        env:
          CROWDIN_KEY: $\{{ secrets.CROWDIN_KEY }}
          GH_TOKEN: $\{{ secrets.GH_TOKEN }}
          NODE_OPTIONS: --max_old_space_size=4096

  {{#each versions}}
  upload-{{this}}:
    name: Upload source content ({{this}})
    runs-on: ubuntu-20.04
    needs:
      - fetchSourceContent

    steps:
      - uses: actions/checkout@master
      - uses: actions/setup-node@v1
        with:
          node-version: '14.x'
      - run: |
          git pull --rebase
          npm ci
          yarn run subrepos
      - name: Upload Content To Crowdin ({{this}})
        uses: crowdin/github-action@1.0.9
        with:
          upload_sources: true
          crowdin_branch_name: {{this}}
          config: temp/i18n-{{this}}/crowdin.yml
        env:
          GH_TOKEN: $\{{ secrets.GH_TOKEN }}
          CROWDIN_PROJECT_ID: $\{{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: $\{{ secrets.CROWDIN_PERSONAL_TOKEN }}
  {{/each}}
