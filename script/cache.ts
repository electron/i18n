import { Octokit } from '@octokit/rest'
import * as fs from 'fs'
import * as path from 'path'
import { tmpdir } from 'os'
import got from 'got'
import { ProxyStream } from 'got/dist/source/as-stream'

const github = new Octokit({
  auth: process.env.GQL_GH_TOKEN,
})

async function main() {
  const { data: articlesForRepo } = await github.actions.listArtifactsForRepo({
    owner: 'electron',
    repo: 'i18n',
  })
  const lastArtifact = articlesForRepo.artifacts[0]

  const writeStream = fs.createWriteStream('dist.zip')

  await new Promise((resolve, reject) => {
    const downloadStream: ProxyStream<any> = got.stream(
      lastArtifact.archive_download_url,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GQL_GH_TOKEN}`,
        },
      }
    )

    downloadStream.on('error', (error) => {
      if (writeStream.destroy) {
        writeStream.destroy(error)
      }

      reject(error)
    })
    writeStream.on('error', (error) => reject(error))
    writeStream.on('close', () => resolve())

    downloadStream.pipe(writeStream)
  })
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
