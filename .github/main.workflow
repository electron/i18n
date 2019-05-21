workflow "Update source content" {
  on = "schedule(10 * * * *)"
  resolves = ["npm run update-source-content"]
}

action "npm run update-source-content" {
  uses = "actions/npm@master"
  args = "run update-source-content"
  env = {
    NODE_OPTIONS = "--max_old_space_size=4096"
  }
  secrets = [
    "CROWDIN_KEY",
    "GH_TOKEN",
  ]
}
