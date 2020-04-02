#!/usr/bin/env ts-node

if (!process.env.GH_TOKEN || !process.env.CROWDIN_KEY) {
  require('dotenv-safe').config()
}

import * as del from 'del'
import * as fs from 'fs'
import got from 'got'
import { sync as mkdir } from 'make-dir'
import * as path from 'path'
import { execSync } from 'child_process'
import { Octokit } from '@octokit/rest'
import { roggy, IResponse as IRoggyResponse } from 'roggy'
import { generateCrowdinConfig } from '../lib/generate-crowdin-config'
import * as packageJson from '../package.json'
const currentEnglishBasepath = path.join(
  __dirname,
  '..',
  'content',
  'current',
  'en-US'
)
const englishBasepath = (version: string) =>
  path.join(__dirname, '..', 'content', version, 'en-US')

const NUM_SUPPORTED_VERSIONS = 4

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
  await fetchRelease()
  await getSupportedBranches(release.tag_name)
  await delUnsupportedBranches(packageJson.supportedVersions)
  await delContent(packageJson.supportedVersions)
  await fetchAPIDocsFromLatestStableRelease()
  await fetchAPIDocsFromSupportedVersions()
  await fetchApiData()
  await getMasterBranchCommit()
  await fetchTutorialsFromMasterBranch()
  await fetchTutorialsFromSupportedBranch()
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

async function getSupportedBranches(current: string) {
  console.log(`Fetching latest ${NUM_SUPPORTED_VERSIONS} supported versions`)
  const currentVersion = current.slice(1).replace(/\.[0-9].[0-9]/, '-x-y')

  const resp = await github.repos.listBranches({
    owner: 'electron',
    repo: 'electron',
  })

  const branches = resp.data
    .filter((branch) => {
      return (
        branch.protected &&
        branch.name.match(/(\d)+-(?:(?:[0-9]+-x$)|(?:x+-y$))/)
      )
    })
    .map((b) => b.name)

  const filtered: Record<string, string> = {}
  branches.sort().forEach((branch) => (filtered[branch.charAt(0)] = branch))
  const filteredBranches = Object.values(filtered)
    .sort()
    .slice(-NUM_SUPPORTED_VERSIONS)
    .filter((arr) => arr !== currentVersion && arr !== 'current')

  writeToPackageJSON('supportedVersions', filteredBranches)
  console.log('Successfully written `supportedVersions` into package.json')
}

async function delUnsupportedBranches(versions: Array<string>) {
  const folders = await fs.promises.readdir('content')
  folders.pop()
  if (folders.length !== versions.length) {
    versions.push('current')
    const difference = folders.filter((x) => !versions.includes(x)).toString()
    del(path.join(__dirname, '..', 'content', difference))
    versions.pop()
    await generateCrowdinConfig(versions)
  }
}

async function delContent(branches: Array<string>) {
  console.log('Deleting content:')

  console.log('  - Deleting current content')
  await del(currentEnglishBasepath)
  for (const branch of branches) {
    console.log(`  - Deleting content for ${branch}`)
    await del(englishBasepath(branch))
  }
}

async function fetchAPIDocsFromLatestStableRelease() {
  console.log(`Fetching API docs from electron/electron#${release.tag_name}`)

  writeToPackageJSON('electronLatestStableTag', release.tag_name)
  const docs = await roggy(release.tag_name, {
    owner: 'electron',
    repository: 'electron',
  })

  docs
    .filter((doc) => doc.filename.startsWith('api/'))
    .forEach((doc) => writeDoc(doc))

  return Promise.resolve()
}

async function fetchAPIDocsFromSupportedVersions() {
  console.log('Fetching API docs from supported branches')

  for (const version of packageJson.supportedVersions) {
    console.log(`  - from electron/electron#${version}`)
    const docs = await roggy(version, {
      owner: 'electron',
      repository: 'electron',
    })

    docs
      .filter((doc) => doc.filename.startsWith('api/'))
      .forEach((doc) => {
        writeDoc(doc, version)
      })
  }

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
  const filename = path.join(currentEnglishBasepath, 'electron-api.json')
  mkdir(path.dirname(filename))
  console.log(
    `Writing ${path.relative(
      currentEnglishBasepath,
      filename
    )} (without changes)`
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

  writeToPackageJSON('electronMasterBranchCommit', master.data.commit.sha)
}

async function fetchTutorialsFromMasterBranch() {
  console.log(`Fetching tutorial docs from electron/electron#master`)

  const docs = await roggy('master', {
    owner: 'electron',
    repository: 'electron',
  })

  docs
    .filter((doc) => !doc.filename.startsWith('api/'))
    .filter((doc) => !doc.filename.includes('images/'))
    .filter((doc) => !doc.filename.includes('fiddles/'))
    .forEach((doc) => writeDoc(doc))

  return Promise.resolve()
}

async function fetchTutorialsFromSupportedBranch() {
  console.log(`Feching tutorial docs from supported branches`)

  for (const version of packageJson.supportedVersions) {
    console.log(`  - from electron/electro#${version}`)
    const docs = await roggy(version, {
      owner: 'electron',
      repository: 'electron',
    })

    docs
      .filter((doc) => !doc.filename.startsWith('api/'))
      .filter((doc) => !doc.filename.includes('images/'))
      .filter((doc) => !doc.filename.includes('fiddles/'))
      .forEach((doc) => {
        writeDoc(doc, version)
      })
  }

  return Promise.resolve()
}

async function fetchWebsiteContent() {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)

  const url =
    'https://cdn.jsdelivr.net/gh/electron/electronjs.org@master/data/locale.yml'
  const response = await got(url)
  const content = response.body
  const websiteFile = path.join(currentEnglishBasepath, 'website', `locale.yml`)
  mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(currentEnglishBasepath, websiteFile)}`)
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

// Utility functions

function writeDoc(doc: IRoggyResponse, version?: string) {
  let basepath = currentEnglishBasepath
  if (version) basepath = englishBasepath(version)
  const filename = path.join(basepath, 'docs', doc.filename)
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  // console.log('   ' + path.relative(englishBasepath, filename))
}

function writeBlog(doc: IRoggyResponse) {
  const filename = path.join(
    currentEnglishBasepath,
    'website/blog',
    doc.filename
  )
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
}

function writeToPackageJSON(key: string, value: string | string[]) {
  const pkg = require('../package.json')
  pkg[key] = value
  fs.writeFileSync(
    require.resolve('../package.json'),
    JSON.stringify(pkg, null, 2)
  )
}
