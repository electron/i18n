#!/usr/bin/env ts-node

if (!process.env.GH_TOKEN || !process.env.CROWDIN_KEY) {
  require('dotenv-safe').config()
}

import * as del from 'del'
import * as fs from 'fs-extra'
import got from 'got'
import * as path from 'path'
import { execSync } from 'child_process'
import { Octokit } from '@octokit/rest'
import { roggy } from 'roggy'
import { englishBasepath } from '../lib/constants'
import { writeBlog, writeDoc, writeToPackageJSON } from '../lib/write-helper'
import { IElectronDocsResponse } from '../lib/interfaces'
// TODO: Replace by `roggy`
const electronDocs = require('electron-docs')

const github = new Octokit({
  auth: process.env.GH_TOKEN ?? '',
})

interface IResponse {
  tag_name: string
  assets: Octokit.ReposGetReleaseByTagResponseAssetsItem[]
}

let release: IResponse

main().catch((err: Error) => {
  console.log('Something goes wrong. Error: ', err)
  process.exit(1)
})

async function main() {
  await del(englishBasepath)
  await fetchRelease()
  await fetchAPIDocsFromLatestStableRelease()
  await fetchApiData()
  await getMasterBranchCommit()
  await fetchTutorialsFromMasterBranch()
  await fetchWebsiteContent()
  await fetchWebsiteBlogPosts()
}

async function fetchRelease() {
  console.log(`Determining 'latest' version dist-tag on npm`)
  const version = execSync('npm show electron version').toString().trim()

  console.log(`Fetching release data from GitHub`)

  const repo = {
    owner: 'electron',
    repo: 'electron',
    tag: `v${version}`,
  }

  const res = await github.repos.getReleaseByTag(repo)
  release = res.data
}

async function fetchAPIDocsFromLatestStableRelease() {
  console.log(`Fetching API docs from electron/electron#${release.tag_name}`)

  await writeToPackageJSON('electronLatestStableTag', release.tag_name)
  const docs = await electronDocs(release.tag_name)

  docs
    .filter((doc: IElectronDocsResponse) => doc.filename.startsWith('api/'))
    .forEach(writeDoc)

  return Promise.resolve()
}

async function fetchApiData() {
  console.log(
    `Fetching API definitions from electron/electron#${release.tag_name}`
  )

  const asset = release.assets.find(
    (asset) => asset.name === 'electron-api.json'
  )

  if (!asset) {
    return Promise.reject(
      Error(`No electron-api.json asset found for ${release.tag_name}`)
    )
  }

  const apis = await got(asset.browser_download_url).json()
  const filename = path.join(englishBasepath, 'electron-api.json')
  await fs.promises.mkdir(path.dirname(filename))
  console.log(
    `Writing ${path.relative(englishBasepath, filename)} (without changes)`
  )
  await fs.promises.writeFile(filename, JSON.stringify(apis, null, 2))
  return Promise.resolve(apis)
}

async function getMasterBranchCommit() {
  console.log(`Fetching Electron master branch commit SHA`)
  const master = await github.repos.getBranch({
    owner: 'electron',
    repo: 'electron',
    branch: 'master',
  })

  await writeToPackageJSON('electronMasterBranchCommit', master.data.commit.sha)
}

async function fetchTutorialsFromMasterBranch() {
  console.log(`Fetching tutorial docs from electron/electron#master`)

  const docs = await electronDocs('master')

  docs
    .filter((doc: IElectronDocsResponse) => !doc.filename.startsWith('api/'))
    .filter((doc: IElectronDocsResponse) => !doc.filename.includes('images/'))
    .filter((doc: IElectronDocsResponse) => !doc.filename.includes('fiddles/'))
    .forEach(writeDoc)

  return Promise.resolve()
}

async function fetchWebsiteContent() {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)

  const url =
    'https://rawgit.com/electron/electronjs.org/master/data/locale.yml'
  const response = await got(url)
  const content = response.body
  const websiteFile = path.join(englishBasepath, 'website', `locale.yml`)
  await fs.promises.mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(englishBasepath, websiteFile)}`)
  await fs.promises.writeFile(websiteFile, content)
  return Promise.resolve()
}

async function fetchWebsiteBlogPosts() {
  console.log('Fetching blog posts from electron/electronjs.org#master')

  const blogs = await roggy('master', {
    owner: 'electron',
    repository: 'electronjs.org',
    downloadMatch: 'data/blog',
  })

  blogs.forEach(writeBlog)
}
