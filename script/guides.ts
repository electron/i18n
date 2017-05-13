#!/usr/bin/env ts-node

const del = require('del')
const electronDocs = require('electron-docs')
const fs = require('fs')
const mkdir = require('make-dir').sync
const path = require('path')
const docsPath = path.join(__dirname, '..', 'docs')
const ora = require('ora')
const spinner = ora('Loading unicorns').start()

del(docsPath)
  .then(fetchGuides)
  .then(writeGuides)

function fetchGuides () {
  spinner.text = 'Fetching docs from electron/electron'

  return electronDocs('master')
    .then(docs => {
      const guides = docs.filter(doc => !doc.filename.split(path.sep).includes('api'))
      return Promise.resolve(guides)
  })
}

function writeGuides (guides: Doc[]) {
  console.log(guides.map(guide => guide.filename))

  guides.forEach(guide => {
    const filename = path.join(docsPath, guide.filename)
    mkdir(path.dirname(filename))
    spinner.text = `Writing doc: ${filename}`
    fs.writeFileSync(filename, guide.markdown_content)
  })

  process.exit()
}

interface Doc {
  slug: string,
  filename: string,
  markdown_content: string
}