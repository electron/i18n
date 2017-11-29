#!/usr/bin/env node

require('dotenv-safe').load()

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const got = require('got')
const mkdir = require('make-dir').sync
const path = require('path')
const {execSync} = require('child_process')

const englishBasepath = path.join(__dirname, '..', 'content', 'en-US')
const GitHub = require('github')
const github = new GitHub({
  debug: false,
  Promise: Promise,
  token: process.env.GH_TOKEN
})

let release

del(englishBasepath)
  .then(fetchRelease)
  .then(fetchAPIDocsFromLatestStableRelease)
  .then(fetchTutorialsFromMasterBranch)
  .then(fetchApiData)
  .then(fetchWebsiteContent)

async function fetchRelease () {
  console.log(`Fetching 'latest' version string from npm`)
  const version = execSync('npm show electron version').toString().trim()

  console.log(`Fetching release data from GitHub`)

  const repo = {
    owner: 'electron',
    repo: 'electron',
    tag: `v${version}`
  }

  const res = await github.repos.getReleaseByTag(repo)
  release = res.data
}

function writeDoc (doc) {
  const filename = path.join(englishBasepath, 'docs', doc.filename)
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  console.log('   ' + path.relative(englishBasepath, filename))
}

async function fetchAPIDocsFromLatestStableRelease () {
  console.log(`Fetching API docs from electron/electron#${release.tag_name}`)

  const docs = await electronDocs(release.tag_name)

  docs
    .filter(doc => doc.filename.startsWith('api/'))
    .forEach(writeDoc)

  return Promise.resolve()
}

async function fetchTutorialsFromMasterBranch () {
  console.log(`Fetching tutorial docs from electron/electron#master`)

  const docs = await electronDocs('master')

  docs
    .filter(doc => !doc.filename.startsWith('api/'))
    .forEach(writeDoc)

  return Promise.resolve()
}

async function fetchApiData () {
  console.log(`Fetching API definitions`)

  const asset = release.assets.find(asset => asset.name === 'electron-api.json')

  if (!asset) {
    return Promise.reject(Error(`No electron-api.json asset found for ${release.tag_name}`))
  }

  const response = await got(asset.browser_download_url, {json: true})
  const apis = response.body
  const filename = path.join(englishBasepath, 'electron-api.json')
  mkdir(path.dirname(filename))
  console.log(`Writing ${path.relative(englishBasepath, filename)} (without changes)`)
  fs.writeFileSync(filename, JSON.stringify(apis, null, 2))
  return Promise.resolve(apis)
}

async function fetchWebsiteContent () {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)

  const url = 'https://rawgit.com/electron/electronjs.org/master/data/locale.yml'
  const response = await got(url)
  const content = response.body
  const websiteFile = path.join(englishBasepath, 'website', `locale.yml`)
  mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(englishBasepath, websiteFile)}`)
  fs.writeFileSync(websiteFile, content)
  return Promise.resolve()
}
