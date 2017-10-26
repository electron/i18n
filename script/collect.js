#!/usr/bin/env node

require('dotenv-safe').load()

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const got = require('got')
const mkdir = require('make-dir').sync
const path = require('path')

const englishBasepath = path.join(__dirname, '..', 'content', 'en-US')
const GitHub = require('github')
const github = new GitHub({
  debug: false,
  Promise: Promise,
  token: process.env.GITHUB_TOKEN
})

let release

del(englishBasepath)
  .then(fetchLatestRelease)
  .then(fetchDocs)
  .then(fetchApiData)
  .then(fetchWebsiteContent)

async function fetchLatestRelease () {
  console.log(`Fetching latest (stable) release from GitHub`)

  let repo = {owner: 'electron', repo: 'electron'}
  const res = await github.repos.getLatestRelease(repo)
  release = res.data
}

async function fetchDocs () {
  console.log(`Fetching ${release.tag_name} docs from electron/electron repo`)

  const docs = await electronDocs(release.tag_name)
  console.log(`Writing ${docs.length} markdown docs`)

  docs.forEach(doc => {
    const filename = path.join(englishBasepath, 'docs', doc.filename)
    mkdir(path.dirname(filename))
    fs.writeFileSync(filename, doc.markdown_content)
    console.log('   ' + path.relative(englishBasepath, filename))
  })

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
  console.log(`Fetching locale.yml from electron/electron.atom.io#neo`)

  const url = 'https://cdn.rawgit.com/electron/electron.atom.io/neo/data/locale.yml'
  const response = await got(url)
  const content = response.body
  const websiteFile = path.join(englishBasepath, 'website', `locale.yml`)
  mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(englishBasepath, websiteFile)}`)
  fs.writeFileSync(websiteFile, content)
  return Promise.resolve()
}
