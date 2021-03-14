#!/usr/bin/env ts-node

// TODO:
//  - Add the current branch
//  - Do the git magic
//  - Do another magic stuff

if (!process.env.GH_TOKEN || !process.env.CROWDIN_KEY) {
  require('dotenv-safe').config()
}

import * as del from 'del'
import * as fs from 'fs'
import got from 'got'
import { sync as mkdir } from 'make-dir'
import * as path from 'path'
import { execSync } from 'child_process'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { roggy, IResponse as IRoggyResponse } from 'roggy'
import { generateCrowdinConfig } from '../../lib/generate-crowdin-config'
import { generateSubreposYML } from '../../lib/generate-subrepos'

const currentEnglishBasePath = path.join(
  __dirname,
  '..',
  'content',
  'current',
  'en-US'
)
const englishBasePath = (version: string) =>
  path.join(__dirname, '..', 'content', version, 'en-US')
const newEnglishBasePath = (version: string) =>
  path.join(__dirname, '../..', 'temp', `i18n-${version}`, 'content', 'en-US')


const NUM_SUPPORTED_VERSIONS = 4

const github = new Octokit({
  auth: process.env.GH_TOKEN ?? '',
})

let release: RestEndpointMethodTypes['repos']['getRelease']['response']['data']
// This used to share `supportedVersions` between this file,
// and not use the cached version from package.json.
let supportedVersions: string[] = []

main().catch((err: Error) => {
  console.log('Something goes wrong. Error: ', err)
  process.exit(1)
})

async function main() {
  await fetchRelease()
  await getSupportedBranches(release.tag_name)
  await createSupportedBranches()
  await fetchSubrepos()
  // await deleteUnsupportedBranches(supportedVersions)
  // await deleteContent(supportedVersions)
  // await fetchAPIDocsFromLatestStableRelease()
  await fetchAPIDocsFromSupportedVersions()
  // await fetchApiData()
  // await getMasterBranchCommit()
  // await fetchTutorialsFromMasterBranch()
  // await fetchTutorialsFromSupportedBranch()
  // await fetchWebsiteContent()
  // await fetchWebsiteBlogPosts()

  // TODO
  // await doGitMagic()
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
    protected: true,
  })

  const releaseBranches = resp.data.filter((branch) => {
    return branch.name.match(/^(\d)+-(?:(?:[0-9]+-x$)|(?:x+-y$))$/)
  })

  const filtered: Record<string, string> = {}
  releaseBranches
    .sort((a, b) => {
      const aParts = a.name.split('-')
      const bParts = b.name.split('-')
      for (let i = 0; i < aParts.length; i += 1) {
        if (aParts[i] === bParts[i]) continue
        return parseInt(aParts[i], 10) - parseInt(bParts[i], 10)
      }
      return 0
    })
    .forEach((branch) => {
      return (filtered[branch.name.split('-')[0]] = branch.name)
    })

  const filteredBranches = Object.values(filtered)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .slice(-NUM_SUPPORTED_VERSIONS)
    .filter((arr) => arr !== currentVersion && arr !== 'current')

  writeToPackageJSON('supportedVersions', filteredBranches)
  supportedVersions = filteredBranches
  generateSubreposYML(supportedVersions)
  console.log('Successfully written `supportedVersions` into package.json')
}

async function createSupportedBranches() {
  for (const version of supportedVersions) {
    try {
      await github.git.getRef({
        owner: 'vhashimotoo',
        repo: 'i18n-content',
        ref: `refs/heads/content/${version}`,
      })
    } catch {
      // await github.git.createRef({
      //   owner: 'vhashimotoo',
      //   repo: 'i18n-content',
      //   ref: `refs/heads/content/${version}`,
      //   // TODO: SHA is required to create a reference
      //   sha: '7c1792ea27f262e51a19608d405961fe4362d37d',
      // })
    }
  }
}

async function fetchSubrepos() {
  execSync('yarn subrepos', { cwd: path.resolve(__dirname, '../..') })
}

async function deleteUnsupportedBranches(versions: Array<string>) {
  const folders = await fs.promises.readdir('content')
  folders.pop()
  if (folders.length !== versions.length) {
    versions.push('current')
    const difference = folders.filter((x) => !versions.includes(x)).toString()
    del(path.join(__dirname, '..', 'content', difference))
    await generateCrowdinConfig(versions)
    versions.pop()
  }
}

async function deleteContent(branches: Array<string>) {
  console.log('Deleting content:')

  console.log('  - Deleting current content')
  await del(currentEnglishBasePath)
  for (const branch of branches) {
    console.log(`  - Deleting content for ${branch}`)
    await del(englishBasePath(branch))
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

  for (const version of supportedVersions) {
    console.log(`  - from electron/electron#${version}`)
    const docs = await roggy(version, {
      owner: 'electron',
      repository: 'electron',
    })

    docs
      .filter((doc) => doc.filename.startsWith('api/'))
      .forEach((doc) => {
        writeNewDoc(doc, version)
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
  const filename = path.join(currentEnglishBasePath, 'electron-api.json')
  mkdir(path.dirname(filename))
  console.log(
    `Writing ${path.relative(
      currentEnglishBasePath,
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

  if (typeof master.data.commit.sha !== 'string') {
    throw new Error(
      `Could not fetch Electron master branch commit SHA (found "${master.data.commit.sha})"`
    )
  }

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

  for (const version of supportedVersions) {
    console.log(`  - from electron/electron#${version}`)
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
  const websiteFile = path.join(currentEnglishBasePath, 'website', `locale.yml`)
  mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(currentEnglishBasePath, websiteFile)}`)
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
  let basepath = currentEnglishBasePath
  if (version) {
    basepath = englishBasePath(version)
  }
  const filename = path.join(basepath, 'docs', doc.filename)
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  // console.log('   ' + path.relative(englishBasepath, filename))
}

function writeNewDoc(doc: IRoggyResponse, version: string) {
  const basepath = newEnglishBasePath(version)
  const filename = path.join(basepath, 'docs', doc.filename)
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  console.log('   ' + path.relative(basepath, filename))
}

function writeBlog(doc: IRoggyResponse) {
  const filename = path.join(
    currentEnglishBasePath,
    'website/blog',
    doc.filename
  )
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
}

function writeToPackageJSON(key: string, value: string | string[]) {
  const pkg = require('../../package.json')
  pkg[key] = value
  fs.writeFileSync(
    require.resolve('../../package.json'),
    JSON.stringify(pkg, null, 2)
  )
}
