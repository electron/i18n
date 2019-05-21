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



workflow "Test" {
  on = "push"
  resolves = ["npm test"]
}

action "npm ci" {
  uses = "actions/npm@master"
  args = "ci"
}

action "npm test" {
  uses = "actions/npm@master"
  needs = ["npm ci"]
  args = "test"
}



workflow "Release" {
  on = "push"
  resolves = ["semantic release"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "semantic release" {
  uses = "actions/npm@master"
  needs = ["master branch only", "npm ci", "npm test"]
  args = "run semantic-release"
  secrets = [
    "NPM_AUTH_TOKEN",
  ]
}
