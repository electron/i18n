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
        env:
          CROWDIN_KEY: $\{{ secrets.CROWDIN_KEY }}
          GH_TOKEN: $\{{ secrets.GITHUB_TOKEN }}
          NODE_OPTIONS: --max_old_space_size=4096
        run: npm run update-source-content
      {{#each versions}}
      - name: Upload Content To Crowdin ({{this}})
        uses: crowdin/github-action@1.0.9
        with:
          upload_sources: true
          crowdin_branch_name: {{this}}
          config: temp/i18n-{{this}}/config.yml
        env:
          GITHUB_TOKEN: $\{{ secrets.GITHUB_TOKEN }}
          CROWDIN_PROJECT_ID: $\{{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: $\{{ secrets.CROWDIN_PERSONAL_TOKEN }}
      {{/each}}
