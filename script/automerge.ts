import { Octokit } from '@octokit/rest'

const OWNER = 'electron'
const REPO = 'i18n'
const BOTNAMES = ['github-actions[bot]', 'MarshallOfSound']
const ORIGINAL_TITLE = 'New Crowdin updates'
const SEMANTIC_TITLE = 'feat: New Crowdin translations (auto-merged 🤖)'
const MERGEABILITY_RETRY_WAIT_TIME = 5_000

enum Mergeability {
  MERGEABLE,
  UNMERGEABLE,
  UNKNOWN,
}

const timer = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const github = new Octokit({
  auth: process.env.GH_TOKEN,
})

const getPRData = async (prNumber: number) => {
  return github.pulls.get({
    owner: OWNER,
    repo: REPO,
    pull_number: prNumber,
  })
}

/**
 * Gets the number of opened pull request by the bot or user.
 */
const findPRNumber = async (): Promise<{ found: boolean; number: number }> => {
  const prs = await github.pulls.list({
    owner: OWNER,
    repo: REPO,
    per_page: 100,
  })
  const glotbot = prs.data.filter((pr) =>
    BOTNAMES.includes(pr.user?.login || '')
  )
  const title = prs.data.filter((pr) => pr.title === ORIGINAL_TITLE)
  if (glotbot.length > 0 && title.length > 0) {
    const prNumber = glotbot[0].number
    return { found: true, number: prNumber }
  } else {
    return { found: false, number: 0 }
  }
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
    title: SEMANTIC_TITLE,
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
 * Merges pull request.
 *
 * @param pr The number of pull request. Takes automatically
 *           in autoMerger() function.
 */
const mergePR = async (pr: number) => {
  await github.pulls.merge({
    owner: OWNER,
    repo: REPO,
    pull_number: pr,
    commit_message: '', // make commit message smaller.
    merge_method: 'squash',
  })
}

async function autoMerger() {
  console.log(`Searching for a Crowdin PR...`)
  const pr = await findPRNumber()
  if (!pr.found) {
    console.log(`Cound not find a Crowdin PR to merge`)
    process.exit(0)
  }
  const prNumber = pr.number

  console.log(`Updating PR ${prNumber} to have a semantic title...`)
  await updateTitle(prNumber)

  console.log(`Determining mergeability of PR ${prNumber}`)
  const isMergeable = await ableToMerge(prNumber)

  if (isMergeable) {
    console.log(`Merging PR ${prNumber}`)
    await mergePR(prNumber)
  } else {
    throw new Error(`PR ${prNumber} is not mergeable`)
  }
}

autoMerger().catch((err: Error) => {
  console.log(`Error: ${err}`)
  process.exit(1)
})
