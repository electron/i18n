#!/usr/bin/env node

const walk = require('walk-sync')
const path = require('path')
const fs = require('fs')
const markdown = require('../lib/markdown')
const contentDir = path.join(__dirname, '../content')
const cheerio = require('cheerio')

async function parseDocs () {
  return Promise.all(
    walk(contentDir)
      .filter(file => /\.md$/.test(file))
      .map(async (file) => {
        const doc = await parseDoc(contentDir, file)
        return doc
      })
  )
}

async function parseDoc(contentDir, relativeFilename) {
  const fullpath = path.join(contentDir, relativeFilename)
  const locale = relativeFilename.split('/')[0]
  const slug = path.basename(relativeFilename, '.md')
  const md = fs.readFileSync(fullpath, 'utf8')
  const parsed = await markdown(md)
  const html = parsed.contents
  const $ = cheerio.load(html)
  const title = $('h1').text()
  const description = $('blockquote').text()

  const doc = {
    slug: slug,
    locale: locale,
    title: title,
    description: description,
    fullpath: fullpath,
    md: md,
    html: html
  }

  return doc
}

parseDocs().then(docs => {
  fs.writeFileSync(
    path.join(__dirname, '../docs.json'),
    JSON.stringify(docs, null, 2)
  )
})