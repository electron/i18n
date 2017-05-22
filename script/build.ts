#!/usr/bin/env ts-node

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const mkdir = require('make-dir').sync
const path = require('path')
const ora = require('ora')
const got = require('got')

const DEFAULT_LOCALE = 'en'
const docsPath = path.join(__dirname, '..', 'docs', DEFAULT_LOCALE)
const spinner = ora('Loading unicorns').start()

const GitHub = require('github')
const github = new GitHub({
  debug: true,
  Promise: Promise
})

del(docsPath)
  .then(fetchElectronDocs)
  .then(writeElectronDocs)
  .then(fetchApiDescriptions)
  .then(writeApiDescriptions)

function fetchElectronDocs () {
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

function writeElectronDocs (docs: Doc[]) {
  // console.log(docs.map(doc => doc.filename))

  docs.forEach(doc => {
    const filename = path.join(docsPath, doc.filename)
    mkdir(path.dirname(filename))
    fs.writeFileSync(filename, doc.markdown_content)
    spinner.text = `Writing ${filename}`
  })

  return Promise.resolve()
}

function fetchApiDescriptions () {
  return github.files.

  const objectifyArray = require('objectify-array')
  const shakeTree = require('shake-tree')
  const tree = objectifyArray()
  return shake
// const YAML = require('js-yaml')
// const output = shakeTree(tree, 'description')
// process.stdout.write(JSON.stringify(output, null, 2))
}



interface Doc {
  slug: string,
  filename: string,
  markdown_content: string
}
