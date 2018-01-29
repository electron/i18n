#!/usr/bin/env node

require('require-yaml')

const walk = require('walk-sync')
const path = require('path')
const fs = require('fs')
const cleanDeep = require('clean-deep')
const hubdown = require('hubdown')
const locales = require('../lib/locales')
const hrefType = require('href-type')
const URL = require('url')
const packageJSON = require('../package.json')

const contentDir = path.join(__dirname, '../content')
const cheerio = require('cheerio')
const categoryNames = {
  api: 'API',
  'api/structures': 'API Structures',
  development: 'Development',
  tutorial: 'Guides'
}

async function parseDocs () {
  const IGNORE_PATTERN = '<!-- i18n-ignore -->'

  console.time('parsed docs in')
  const markdownFiles = walk.entries(contentDir)
    .filter(file => file.relativePath.endsWith('.md'))
  console.log(`processing ${markdownFiles.length} files in ${Object.keys(locales).length} locales`)
  let docs = await Promise.all(markdownFiles.map(parseFile))

  // ignore some docs
  docs = docs.filter(doc => !doc.markdown.includes(IGNORE_PATTERN))

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

  // parse markdown to HTML
  file.markdown = fs.readFileSync(file.fullPath, 'utf8')

  file.html = await Promise.all(
    splitMd(file.markdown).map(async (section) => {
      const parsed = await hubdown(section.body)
      const $ = cheerio.load(parsed.content || '')
      file.title = file.title ||
                  $('h1').first().text().trim() ||
                  $('h2').first().text().replace('Class: ', '')
      file.description = file.description ||
                        $('blockquote').first().text().trim()

      // fix HREF for relative links
      $('a').each((i, el) => {
        const href = $(el).attr('href')
        const type = hrefType(href)
        if (type !== 'relative' && type !== 'rooted') return
        const dirname = path.dirname(file.href)
        const newHref = path.resolve(dirname, href.replace(/\.md/, ''))
        $(el).attr('href', newHref)
      })

      // fix SRC for relative images
      $('img').each((i, el) => {
        const baseUrl = 'https://cdn.rawgit.com/electron/electron'
        const dirname = path.dirname(file.href)
        let src = $(el).attr('src')
        const type = hrefType(src)
        if (type !== 'relative' && type !== 'rooted') return

        // turn `../images/foo/bar.png` into `/docs/images/foo/bar.png`
        src = path.resolve(dirname, src)

        const newSrc = file.isApiDoc
          ? [baseUrl, packageJSON.electronLatestStableTag, src].join('/')
          : [baseUrl, packageJSON.electronMasterBranchCommit, src].join('/')

        const parsed = URL.parse(newSrc)
        parsed.path = path.normalize(parsed.path)

        $(el).attr('src', URL.format(parsed))
      })

      // return $('body').html()
      section.html = $('body').html()

      return section
    }))

  // remove leftover file props from walk-sync
  delete file.mode
  delete file.size
  delete file.mtime
  delete file.relativePath
  delete file.basePath

  // remove empty values
  return cleanDeep(file)
}

function splitMd (md) {
  const sections = []
  let section = { name: null, body: [] }
  let inCodeBlock = false
  const isHeading = (line) => (!inCodeBlock && line.trim().startsWith('#'))

  md.split('\n').forEach((curr, i, lines) => {
    if (curr.startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }
    if (isHeading(curr)) {
      section.name = curr
        .replace(/[`~!@#$%^&*()|_+=?;:'",.<>{}[\]\\/\s]/g, '-')
        .replace(/--+/g, '-')
    }
    section.body.push(curr)

    let next = lines[i + 1]
    if (next === undefined || isHeading(next)) {
      section.body = section.body.join('\n')
      sections.push(section)
      section = { name: null, body: [] }
    }
  })

  return sections
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

  fs.writeFileSync(
    path.join(__dirname, '../index.json'),
    JSON.stringify({
      electronLatestStableVersion: packageJSON.electronLatestStableTag.replace(/^v/, ''),
      electronLatestStableTag: packageJSON.electronLatestStableTag,
      electronMasterBranchCommit: packageJSON.electronMasterBranchCommit,
      locales: locales,
      docs: docsByLocale,
      website: websiteStringsByLocale,
      date: new Date()
    }, null, 2)
  )
})
