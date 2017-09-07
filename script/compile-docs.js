#!/usr/bin/env node

const walk = require('walk-sync')
const path = require('path')
const fs = require('fs')
const cleanDeep = require('clean-deep')
const markdown = require('../lib/markdown')
const contentDir = path.join(__dirname, '../content')
const cheerio = require('cheerio')

async function parseDocs () {
  return Promise.all(
    walk.entries(contentDir)
      .filter(file => /\.md$/.test(file.relativePath))
      .map(async (file) => await parseFile(file))
  )
}

async function parseFile(file) {
  file.fullPath = path.join(file.basePath, file.relativePath)
  file.locale = file.relativePath.split('/')[0]
  file.slug = path.basename(file.relativePath, '.md')
  file.markdown = fs.readFileSync(file.fullPath, 'utf8')
  
  const parsed = await markdown(file.markdown)
  file.html = parsed.contents
  
  const $ = cheerio.load(file.html)

  file.title = $('h1').text()
  file.description = $('blockquote').text()
  file.category = file.relativePath
    .split(path.sep)
    .slice(2, -1) // {locale}/docs/api/{filename} -> api
    .join(path.sep)

  return cleanDeep(file)
}

parseDocs().then(docs => {
  fs.writeFileSync(
    path.join(__dirname, '../docs.json'),
    JSON.stringify(docs, null, 2)
  )
})