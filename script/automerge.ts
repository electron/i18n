require('dotenv-safe').load()

import * as Octokit from '@octokit/rest';

const OWNER = 'electron'
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

/**
 * Gets the number of opened pull request by the bot or user.
 */
const getPRNumber = async () => {
  const prs = await github.pulls.list({
    owner: OWNER,
    repo: REPO
  })
  const glotbot = await prs.data.filter(pr => pr.user.login === BOTNAME)
  const prNumber = glotbot[0].number
  return prNumber
}

/**
 * Updates the default Crowding title with sematic title for
 * pass all checks before merge.
 *
 * @param pr The number of pull request. Takes automatically
 *           in autoMerger() function.
 */
const updateTitle = async (pr: number) => {
  const semanticTitle = await github.pulls.update({
    owner: OWNER,
    repo: REPO,
    pull_number: pr,
    title: SEMANTIC_TITLE
  })
  return semanticTitle
}

/**
 * Checks if the pull request able to merge.
 *
 * @param pr The number of pull request. Takes automatically
 *           in autoMerger() function.
 */
const ableToMerge = async (pr: number) => {
  const pullRequest = await getPRData(pr)
  const mergeable = pullRequest.data.mergeable
  if (mergeable === true) {
    return mergeable
  } else if (mergeable === false) {
    throw new Error('Unable to merge PR, re-check PR manually.')
  } else {
    // Need here handle the `null`.
    return true
  }
}

/**
 * Merges pull request and deletes branch after merge completed.
 *
 * @param pr The number of pull request. Takes automatically
 *           in autoMerger() function.
 */
const mergeAndDeleteBranch = async (pr: number) => {
  await github.pulls.merge({
    owner: OWNER,
    repo: REPO,
    pull_number: pr,
    merge_method: 'squash'
  })
  await github.git.deleteRef({
    owner: OWNER,
    repo: REPO,
    ref: "heads/new-translations"
  })
  return
}

async function autoMerger() {
  const prNumber = await getPRNumber()
  await updateTitle(prNumber)
  await ableToMerge(prNumber)
  await mergeAndDeleteBranch(prNumber)
}

autoMerger()
