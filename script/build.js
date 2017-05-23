#!/usr/bin/env node

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const mkdir = require('make-dir').sync
const path = require('path')
const ora = require('ora')
const got = require('got')

const LOCALE = 'en'
const docsBasepath = path.join(__dirname, '..', 'docs', LOCALE)
const spinner = ora('Loading unicorns').start()
const GitHub = require('github')
const github = new GitHub({
  debug: true,
  Promise: Promise
})

let release
let version

del(docsBasepath)
  .then(fetchLatestRelease)
  .then(fetchDocs)
  .then(writeDocs)
  .then(fetchApiDescriptions)
  .then(writeApiDescriptions)

function fetchLatestRelease () {
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
  spinner.text = 'Fetching docs from electron/electron'

  return electronDocs(version)
    .then(docs => {
      const nonApiDocs = docs.filter(doc => !doc.filename.split(path.sep).includes('api'))
      return Promise.resolve(nonApiDocs)
  }).catch(err => {
    console.error(`Unable to fetch docs for Electron version ${version}`)
    throw err
  })
}

function writeDocs (docs: Doc[]) {
  // console.log(docs.map(doc => doc.filename))

  docs.forEach(doc => {
    const filename = path.join(docsBasepath, doc.filename)
    mkdir(path.dirname(filename))
    fs.writeFileSync(filename, doc.markdown_content)
    spinner.text = `Writing ${filename}`
  })

  return Promise.resolve()
}

function fetchApiDescriptions () {

  const apiJson = release.assets.find(asset => asset.filename === 'electron.d.ts')

  return github.repos.getAsset({
    owner: 'electron',
    repo: 'electron',
    id: apiJson.id,
  })
}

function writeApiDescriptions (apiJson) {
  const objectifyArray = require('objectify-array')
  const shakeTree = require('shake-tree')
  const YAML = require('js-yaml')
  const apis = new Buffer(apiJson.data.content, 'base64').toString('utf8')
  const tree = objectifyArray(apis)
  const output = shakeTree(tree, 'description')

  fs.writeFileSync(
    path.join(docsBasepath, 'api-descriptions.yml'),
    YAML.safeDump(...............)
  )
  JSON.stringify(output, null, 2)
}
  return shake
// const YAML = require('js-yaml')
// const output = 
// process.stdout.write(JSON.stringify(output, null, 2))
}

function fetchWebsiteContent () {
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

}



interface Doc {
  slug: string,
  filename: string,
  markdown_content: string
}
