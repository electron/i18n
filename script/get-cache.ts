import * as extractZip from 'extract-zip'
import * as fs from 'fs'
import got from 'got'
import { Octokit } from '@octokit/rest'
import * as path from 'path'
import { promisify } from 'util'
import * as stream from 'stream'
import { tmpdir } from 'os'

const pipeline = promisify(stream.pipeline)

const { GITHUB_TOKEN, GH_TOKEN, GQL_GH_TOKEN } = process.env
const token = GQL_GH_TOKEN || GH_TOKEN || GITHUB_TOKEN

const github = new Octokit({
  auth: token ?? '',
})

const downloadArchive = async (url: string, writeStream: fs.WriteStream) => {
  const downloadStream = got.stream(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  downloadStream.on('response', () => {
    // Artifacts doesn't have in the response `content-length` so we unable
    // to give back the progress bar to give more perfect response.
    // It's just simple way to say we just started downloading.
    console.log(`Downloading started.`)
  })
  await pipeline(downloadStream, writeStream)
}

async function main() {
  if (!token) {
    console.log('Using cache without GitHub Token is not available.')
    console.log(
      'Provider one of these variable with Access Token for using cache: GITHUB_TOKEN, GH_TOKEN, GQL_GH_TOKEN'
    )
    return
  }

  const { data: artifactsForRepo } = await github.actions.listArtifactsForRepo({
    owner: 'electron',
    repo: 'i18n',
  })
  const lastArtifact = artifactsForRepo.artifacts[0]

  const downloadFile = path.join(
    tmpdir(),
    `electron-i18n-${lastArtifact.id}-dist.zip`
  )
  const writeStream = fs.createWriteStream(downloadFile)

  await downloadArchive(lastArtifact.archive_download_url, writeStream)

  console.log('Extracting cache')
  await extractZip(downloadFile, { dir: path.join(__dirname, '../dist') })

  console.log('Cache extracted, thanks for using Electron Airlines')
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
