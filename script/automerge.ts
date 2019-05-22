require('dotenv-safe').load()

import * as Octokit from '@octokit/rest';

const OWNER = 'electron'
const REPO = 'i18n';
const BOTNAME = 'glotbot'
const SEMANTIC_TITLE = 'feat: New Crowdin translations (auto-merging 🤖)';
const MERGEABILITY_RETRY_WAIT_TIME = 5_000

enum Mergeability {
  MERGEABLE,
  UNMERGEABLE,
  UNKNOWN
}

const timer = (time: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, time))
}

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
    repo: REPO,
    per_page: 100
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
const getMergeability = async (pr: number): Promise<Mergeability> => {
  const pullRequest = await getPRData(pr)
  const mergeable = pullRequest.data.mergeable
  if (mergeable === true) {
    return Mergeability.MERGEABLE
  } else if (mergeable === false) {
    return Mergeability.UNMERGEABLE
  } else {
    return Mergeability.UNKNOWN
  }
}

const ableToMerge = async (pr: number): Promise<boolean> => {
  let isMergeable = Mergeability.UNKNOWN
  let retriesLeft = 3

  while (isMergeable !== Mergeability.MERGEABLE && retriesLeft > 0) {
    isMergeable = await getMergeability(pr)

    if (isMergeable !== Mergeability.MERGEABLE) {
      // wait some time before we check again
      await timer(MERGEABILITY_RETRY_WAIT_TIME)
      retriesLeft--
    }
  }

  return isMergeable === Mergeability.MERGEABLE
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
  const isMergeable = await ableToMerge(prNumber)
  if (isMergeable) {
    console.log(`Merging PR ${prNumber}`)
    await mergeAndDeleteBranch(prNumber)
  } else {
    console.log(`PR ${prNumber} is not mergeable`)
    process.exit(1)
  }
}

autoMerger()
