#!/usr/bin/env node

require('require-yaml')

const walk = require('walk-sync')
const path = require('path')
const fs = require('fs')
const cleanDeep = require('clean-deep')
const hubdown = require('hubdown')
const locales = require('../lib/locales')
const defaultLocale = 'en-US'

const contentDir = path.join(__dirname, '../content')
const cheerio = require('cheerio')
const categoryNames = {
  api: 'API',
  'api/structures': 'API Structures',
  development: 'Development',
  tutorial: 'Guides'
}

async function parseDocs () {
  console.time('parsed docs in')
  const markdownFiles = walk.entries(contentDir)
    .filter(file => file.relativePath.endsWith('.md'))
  console.log(`processing ${markdownFiles.length} files in ${Object.keys(locales).length} locales`)
  const docs = await Promise.all(markdownFiles.map(parseFile))
  console.timeEnd('parsed docs in')
  return docs
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

  // build a reference to the source
  file.githubUrl = `https://github.com/electron/electron/tree/master${file.href}.md`

  // convenience booleans for use in templates
  file.isTutorial = file.category === 'tutorial'
  file.isApiDoc = file.category === 'api'
  file.isDevTutorial = file.category === 'development'
  file.isApiStructureDoc = file.category === 'api/structures'

  // parse markdown
  file.markdown = fs.readFileSync(file.fullPath, 'utf8')
  const parsed = await hubdown(file.markdown)
  file.html = parsed.content

  // derive props from the HTML
  const $ = cheerio.load(file.html || '')
  file.title = $('h1').text() || $('h2').text()
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
  const docsByLocale = Object.keys(locales)
    .reduce((acc, locale) => {
      acc[locale] = docs
        .filter(doc => doc.locale === locale)
        .sort((a, b) => a.slug.localeCompare(b.slug))
        .reduce((allDocs, doc) => {
          allDocs[doc.href] = doc
          return allDocs
        }, {})

      return acc
    }, {})

  const websiteStringsByLocale = Object.keys(locales)
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
      docs: docsByLocale,
      website: websiteStringsByLocale
    }, null, 2)
  )
})
