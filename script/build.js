#!/usr/bin/env node

require('require-yaml')

const walk = require('walk-sync')
const path = require('path')
const fs = require('fs')
const cleanDeep = require('clean-deep')
const markdown = require('../lib/markdown')
const locales = require('../lib/locales') // [en, FR-fr...]
const defaultLocale = 'en-US'
// TODO normalize locales.js vs locales.json

const contentDir = path.join(__dirname, '../content')
const cheerio = require('cheerio')
const categoryNames = {
  api: 'API',
  'api/structures': 'API Structures',
  development: 'Development',
  tutorial: 'Guides'
}

async function parseDocs () {
  return Promise.all(
    walk.entries(contentDir)
      .filter(file => /\.md$/.test(file.relativePath))
      .map(async (file) => parseFile(file))
  )
}

async function parseFile (file) {
  file.fullPath = path.join(file.basePath, file.relativePath)
  file.locale = file.relativePath.split('/')[0]
  file.slug = path.basename(file.relativePath, '.md')

  // derive category from file path
  // {locale}/docs/api/{filename} -> api
  file.category = file.relativePath
    .split(path.sep)
    .slice(2, -1)
    .join(path.sep)

  // nice categories for use in nav
  file.categoryFancy = categoryNames[file.category]

  file.href = path.join('/docs', file.category, file.slug)

  // convenience booleans for use in templates
  file.isTutorial = file.category === 'tutorial'
  file.isApiDoc = file.category === 'api'
  file.isDevTutorial = file.category === 'development'
  file.isApiStructureDoc = file.category === 'api/structures'

  // parse markdown
  file.markdown = fs.readFileSync(file.fullPath, 'utf8')
  const parsed = await markdown(file.markdown)
  file.html = parsed.contents

  // derive props from the HTML
  const $ = cheerio.load(file.html)
  file.title = $('h1').text()
  file.description = $('blockquote').text()

  // remove leftover file props from walk-sync
  delete file.mode
  delete file.size
  delete file.mtime
  delete file.relativePath
  delete file.basePath

  // remove empty values
  return cleanDeep(file)
}

parseDocs().then(docs => {
  const docsByLocale = locales
    .reduce((acc, locale) => {
      acc[locale] = docs
        .filter(doc => doc.locale === locale)
        .reduce((allDocs, doc) => {
          allDocs[doc.href] = doc
          return allDocs
        }, {})

      return acc
    }, {})

  const websiteStringsByLocale = locales
    .reduce((acc, locale) => {
      acc[locale] = require(`../content/${locale}/website/locale.yml`)
      return acc
    }, {})

  const latestStableVersion = require(`../content/${defaultLocale}/electron-api.json`)[0].version

  fs.writeFileSync(
    path.join(__dirname, '../index.json'),
    JSON.stringify({
      electronLatestStableVersion: latestStableVersion,
      electronLatestStableTag: `v` + latestStableVersion,
      locales: locales,
      stats: require('../stats.json'),
      docs: docsByLocale,
      website: websiteStringsByLocale
    }, null, 2)
  )
})
