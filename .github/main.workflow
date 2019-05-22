workflow "Update source content" {
  on = "schedule(0 */6 * * *)"
  resolves = ["Fetch latest source content"]
}

action "Fetch latest source content" {
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

workflow "Test and publish" {
  on = "push"
  resolves = ["Publish via semantic-release"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Run tests" {
  uses = "actions/npm@master"
  needs = ["Install dependencies"]
  args = "test"
  env = {
    NODE_OPTIONS = "--max_old_space_size=4096"
  }
}

action "Release master branch only" {
  uses = "actions/bin/filter@master"
  needs = ["Run tests"]
  args = "branch master"
}

action "Publish via semantic-release" {
  uses = "actions/npm@master"
  needs = ["Release master branch only"]
  args = "run semantic-release"
  secrets = [
    "GH_TOKEN",
    "NPM_TOKEN",
  ]
}

workflow "Auto-merge Crowdin PR" {
  resolves = ["Automerge PR"]
  on = "schedule(00 09 * * *)"
}

action "Automerge PR" {
  uses = "actions/npm@master"
  needs = ["Install dependencies"]
  args = "run automerge"
  secrets = [
    "GH_TOKEN",
  ]
}
