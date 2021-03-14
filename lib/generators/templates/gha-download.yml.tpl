on:
  schedule:
    - cron: 0 */1 * * *
  workflow_dispatch: {}

name: Fetch translated content

jobs:
  {{#each versions}}
  content-{{this}}:
    name: Fetch latest translated content ({{this}})
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@master
        with:
          repo: vhashimotoo/i18n-content
          ref: content/{{this}}
      - name: Download content from Crowdin
        uses: crowdin/github-actions@1.0.9
        with:
          upload_sources: false
          download_translations: true
          localization_branch_name: translated/{{this}}
          crowdin_branch_name: {{this}}
          commit_message: 'feat: new Crowdin translation ({{this}})'
          config: crowdin.yml
        env:
          GITHUB_TOKEN: $\{{ secrets.GH_TOKEN }}
          CROWDIN_PROJECT_ID: $\{{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: $\{{ secrets.CROWDIN_PERSONAL_TOKEN }}
  {{/each}}
