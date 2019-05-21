require('dotenv-safe').load()

import * as Octokit from '@octokit/rest';

const OWNER = 'HashimotoYT'
const REPO = 'i18n';
const BOTNAME = 'glotbot'
const SEMANTIC_TITLE = 'feat: New Crowdin translations (auto-merging 🤖)';

const github = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const getPRData = async (prNumber: number) => {
  return github.pulls.get({
    owner: OWNER,
    repo: REPO,
    pull_number: prNumber
  })
}

// TODO: 📝
const getPRNumber = async () => {
  const prs = await github.pulls.list({
    owner: OWNER,
    repo: REPO
  })
  const glotbot = await prs.data.filter(pr => pr.user.login === 'HashimotoYT')
  const prNumber = glotbot[0].number
  console.log(prNumber)
  return prNumber
}

// TODO: 📝
const updateTitle = async (pr: number) => {
  const semanticTitle = await github.pulls.update({
    owner: OWNER,
    repo: REPO,
    pull_number: pr,
    title: SEMANTIC_TITLE
  })
  return semanticTitle
}

// TODO: 📝
// TODO: handle `false` and `null`
const ableToMerge = async (pr: number) => {
  const pullRequest = await getPRData(pr)
  const mergeable = pullRequest.data.mergeable
  console.log('MERGABLE: ', mergeable)
  return mergeable
}

const mergeAndDeleteBranch = async (pr: number) => {
  const merge = await github.pulls.merge({
    owner: OWNER,
    repo: REPO,
    pull_number: pr,
    merge_method: 'squash'
  }).catch((err) => {
    console.log(err)
  })
  console.log(merge)
  const deleteBranch = await github.git.deleteRef({
    owner: OWNER,
    repo: REPO,
    ref: "heads/new-translations"
  })
  console.log(deleteBranch)
  return
}

async function autoMerger() {
  const prNumber = await getPRNumber()
  await updateTitle(prNumber)
  await ableToMerge(prNumber)
  await mergeAndDeleteBranch(prNumber)
}

autoMerger()
