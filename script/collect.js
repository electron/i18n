#!/usr/bin/env ts-node
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
if (!process.env.GH_TOKEN || !process.env.CROWDIN_KEY) {
  require('dotenv-safe').config()
}
const del = require('del')
const fs = require('fs')
const got_1 = require('got')
const make_dir_1 = require('make-dir')
const path = require('path')
const child_process_1 = require('child_process')
const Octokit = require('@octokit/rest')
const electronDocs = require('electron-docs')
const englishBasepath = path.join(__dirname, '..', 'content', 'en-US')
const github = new Octokit({
  auth: process.env.GH_TOKEN ? process.env.GH_TOKEN : '',
})
let release
main().catch(err => {
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
}
async function fetchRelease() {
  console.log(`Determining 'latest' version dist-tag on npm`)
  const version = child_process_1
    .execSync('npm show electron version')
    .toString()
    .trim()
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
  writeToPackageJSON('electronLatestStableTag', release.tag_name)
  const docs = await electronDocs(release.tag_name)
  docs.filter(doc => doc.filename.startsWith('api/')).forEach(writeDoc)
  return Promise.resolve()
}
async function fetchApiData() {
  console.log(
    `Fetching API definitions from electron/electron#${release.tag_name}`
  )
  const asset = release.assets.find(asset => asset.name === 'electron-api.json')
  if (!asset) {
    return Promise.reject(
      Error(`No electron-api.json asset found for ${release.tag_name}`)
    )
  }
  const apis = await got_1.default(asset.browser_download_url).json()
  const filename = path.join(englishBasepath, 'electron-api.json')
  make_dir_1.sync(path.dirname(filename))
  console.log(
    `Writing ${path.relative(englishBasepath, filename)} (without changes)`
  )
  fs.writeFileSync(filename, JSON.stringify(apis, null, 2))
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
  const docs = await electronDocs('master')
  docs
    .filter(doc => !doc.filename.startsWith('api/'))
    .filter(doc => !doc.filename.includes('images/'))
    .filter(doc => !doc.filename.includes('fiddles/'))
    .forEach(writeDoc)
  return Promise.resolve()
}
async function fetchWebsiteContent() {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)
  const url =
    'https://rawgit.com/electron/electronjs.org/master/data/locale.yml'
  const response = await got_1.default(url)
  const content = response.body
  const websiteFile = path.join(englishBasepath, 'website', `locale.yml`)
  make_dir_1.sync(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(englishBasepath, websiteFile)}`)
  fs.writeFileSync(websiteFile, content)
  return Promise.resolve()
}
// Utility functions
function writeDoc(doc) {
  const filename = path.join(englishBasepath, 'docs', doc.filename)
  make_dir_1.sync(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  // console.log('   ' + path.relative(englishBasepath, filename))
}
function writeToPackageJSON(key, value) {
  const pkg = require('../package.json')
  pkg[key] = value
  fs.writeFileSync(
    require.resolve('../package.json'),
    JSON.stringify(pkg, null, 2)
  )
}
