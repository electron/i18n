#!/usr/bin/env node

require('dotenv-safe').load()

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const mkdir = require('make-dir').sync
const path = require('path')
const got = require('got')

const LOCALE = 'en'
const docsBasepath = path.join(__dirname, '..', 'docs', LOCALE)
const GitHub = require('github')
const github = new GitHub({
  // debug: true,
  Promise: Promise,
  token: process.env.GITHUB_TOKEN
})

let release

del(docsBasepath)
  .then(fetchLatestRelease)
  .then(fetchDocs)
  .then(writeDocs)
  .then(fetchApiData)
  .then(writeApiDescriptions)
  .then(fetchWebsiteContent)
  .then(writeWebsiteContent)

function fetchLatestRelease () {
  console.log('Fetching the latest release of Electron')

  // return github.repos.getReleaseByTag({
  //   owner: 'electron',
  //   repo: 'electron',
  //   tag: 'v1.6.10'

  return github.repos.getLatestRelease({
    owner: 'electron',
    repo: 'electron'
  }).catch(err => {
    console.error(`Unable to fetch latest Electron release`)
    throw err
  }).then(r => {
    release = r.data
    return Promise.resolve()
  })
}

function fetchDocs () {
  console.log(`Fetching ${release.tag_name} docs from electron/electron repo`)

  return electronDocs(release.tag_name)
    .then(docs => {
      const nonApiDocs = docs.filter(doc => !doc.filename.split(path.sep).includes('api'))
      return Promise.resolve(nonApiDocs)
  }).catch(err => {
    console.error(`Unable to fetch docs for Electron ${release.tag_name}`)
    throw err
  })
}

function writeDocs (docs) {
  console.log(`Writing ${docs.length} markdown docs`)

  docs.forEach(doc => {
    const filename = path.join(docsBasepath, doc.filename)
    mkdir(path.dirname(filename))
    fs.writeFileSync(filename, doc.markdown_content)
    console.log(' - ' + path.relative(process.cwd(), filename))
  })

  return Promise.resolve()
}

function fetchApiData () {
  console.log(`Fetching API definitions`)
  const asset = release.assets.find(asset => asset.name === 'electron-api.json')

  if (!asset) {
    return Promise.reject(Error(`No electron-api.json asset found for ${release.tag_name}`))
  }

  return got(asset.browser_download_url, {json: true})
    .catch(err => {
      console.error(`Unable to fetch ${asset.browser_download_url}`)
      throw err
    })
    .then(response => {
      return Promise.resolve(response.body)
    })
}

function writeApiDescriptions (apis) {
  const objectifyArray = require('objectify-array')
  const shakeTree = require('shake-tree')
  const YAML = require('js-yaml')
  const tree = objectifyArray(apis)
  const descriptions = shakeTree(tree, 'description')

  
  const apiYmlPath = path.join(docsBasepath, 'api.yml')
  console.log(`Writing ${path.resolve(process.cwd(), apiYmlPath)}`)
  fs.writeFileSync(apiYmlPath, YAML.safeDump(apis))

  const descriptionsYmlPath = path.join(docsBasepath, 'api-descriptions.yml')
  console.log(`Writing ${path.resolve(process.cwd(), descriptionsYmlPath)}`)
  fs.writeFileSync(descriptionsYmlPath, YAML.safeDump(descriptions))

  return Promise.resolve()
}

function fetchWebsiteContent () {
  console.log(`Fetching locale.yml from electron/electron.atom.io gh-pages branch`)

  const url = 'https://cdn.rawgit.com/electron/electron.atom.io/gh-pages/_data/locale.yml'
  return got(url)
    .catch(err => {
      console.error(`Unable to fetch ${url}`)
      throw err
    })
    .then(response => {
      return Promise.resolve(response.body)
    })
}

function writeWebsiteContent () {
  const websiteFile = path.join(docsBasepath, 'website', `${LOCALE}.yml`)
  console.log(`Writing ${path.resolve(process.cwd(), websiteFile)}`)
  fs.writeFileSync(websiteFile, YAML.safeDump(descriptions))
  return Promise.resolve()
}
