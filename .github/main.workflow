workflow "Update source content" {
  on = "schedule(10 * * * *)"
  resolves = ["Update source content"]
}

action "Update source content" {
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
  resolves = ["semantic release"]
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
  needs = ["Release master branch"]
  args = "run semantic-release"
  secrets = [
    "NPM_TOKEN",
  ]
}
