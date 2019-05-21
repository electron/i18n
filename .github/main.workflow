workflow "Update source content" {
  on = "schedule(0 */1 * * *)"
  resolves = ["npm run update-source-content"]
}

action "npm run update-source-content" {
  uses = "actions/npm@master"
  args = "run update-source-content"
  env = {
    NODE_OPTIONS = "--max_old_space_size=4096"
  }
  secrets = ["GITHUB_TOKEN", "CROWDIN_KEY", "NPM_TOKEN"]
}
