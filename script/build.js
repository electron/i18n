#!/usr/bin/env node

require('dotenv-safe').load()

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const got = require('got')
const mkdir = require('make-dir').sync
const objectifyArray = require('objectify-array')
const path = require('path')
const shakeTree = require('shake-tree')
const YAML = require('js-yaml')

const LOCALE = 'en'
const docsBasepath = path.join(__dirname, '..', 'docs', LOCALE)
const GitHub = require('github')
const github = new GitHub({
  debug: false,
  Promise: Promise,
  token: process.env.GITHUB_TOKEN
})

let release

del(docsBasepath)
  .then(fetchRelease)
  .then(fetchDocs)
  .then(writeDocs)
  .then(fetchApiData)
  .then(writeApiDescriptions)
  .then(fetchWebsiteContent)
  .then(writeWebsiteContent)

function fetchRelease (tag) {
  let fetcher
  let repo = {owner: 'electron', repo: 'electron'}

  if (tag && tag.length) {
    console.log(`Fetching Electron ${tag}`)
    fetcher = github.repos.getReleaseByTag(Object.assign(repo, {tag: tag}))
  } else {
    console.log('Fetching the latest release of Electron')
    fetcher = github.repos.getLatestRelease(repo)
  }

  return fetcher
  .catch(err => {
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
    console.log('   ' + path.relative(process.cwd(), filename))
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
  const apiJsonPath = path.join(docsBasepath, 'api', 'electron-api.json')
  console.log(`Writing ${path.relative(process.cwd(), apiJsonPath)} (without changes)`)
  fs.writeFileSync(apiJsonPath, JSON.stringify(apis, null, 2))

  const tree = objectifyArray(apis)
  const descriptions = shakeTree(tree, 'description')
  const descriptionsYmlPath = path.join(docsBasepath, 'api', 'api-descriptions.yml')
  console.log(`Writing ${path.relative(process.cwd(), descriptionsYmlPath)}`)
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

function writeWebsiteContent (content) {
  const websiteFile = path.join(docsBasepath, 'website', `locale.yml`)
  mkdir(path.dirname(websiteFile))
  console.log(`Writing ${path.relative(process.cwd(), websiteFile)}`)
  fs.writeFileSync(websiteFile, YAML.safeDump(content))
  return Promise.resolve()
}
