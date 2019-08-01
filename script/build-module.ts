#!/usr/bin/env ts-node

require('make-promises-safe')
require('require-yaml')

import * as walk from 'walk-sync'
import * as path from 'path'
import * as fs from 'fs'
const cleanDeep = require('clean-deep')
import hubdown = require('hubdown')
import locales from '../lib/locales'
const hrefType = require('href-type')
import * as URL from 'url'
import * as packageJSON from '../package.json'
const GithubSlugger = require('github-slugger')
const getIds = require('get-crowdin-file-ids')
const remark = require('remark')
const links = require('remark-inline-links')
import { parseElectronGlossary, IParseElectronGlossaryReturn } from '../lib/parse-electron-glossary'
const plaintextFix = require('../lib/remark-plaintext-fix')
const bashFix = require('../lib/remark-bash-fix')
const fiddleUrls = require('../lib/remark-fiddle-urls')
const itsReallyJS = require('../lib/remark-its-really-js')
import { plaintextFix } from '../lib/remark-plaintext-fix'

const contentDir = path.join(__dirname, '../content')
import * as cheerio from 'cheerio'

const categoryNames: Record<string, string> = {
  api: 'API',
  'api/structures': 'API Structures',
  development: 'Development',
  tutorial: 'Guides',
}
const IGNORE_PATTERN = '<!-- i18n-ignore -->'

function convertToUrlSlash(filePath: string) {
  return filePath.replace(/C:\\/g, '/').replace(/\\/g, '/')
}

type $TSFixMe = any

let ids: Record<string, string> = {}

async function parseDocs(): Promise<$TSFixMe> {
  ids = await getIds('electron')

  console.time('parsed docs in')
  const markdownFiles = walk
    .entries(contentDir)
    .filter(file => file.relativePath.endsWith('.md'))
  console.log(
    `processing ${markdownFiles.length} files in ${
      Object.keys(locales).length
    } locales`
  )
  let docs = await Promise.all(markdownFiles.map(parseFile))

  // ignore some docs
  docs = docs.filter(doc => !doc.ignore)

  console.timeEnd('parsed docs in')
  return docs
}

async function parseFile(file: $TSFixMe) {
  file.fullPath = path.join(file.basePath, file.relativePath)
  file.locale = file.relativePath.split('/')[0]
  file.slug = path.basename(file.relativePath, '.md')

  // derive category from file path
  // {locale}/docs/api/{filename} -> api
  file.category = file.relativePath
    .split('/') // path.sep => /, separator in file.relativePath is just / in any OS
    .slice(2, -1)
    .join('/')

  // nice categories for use in nav
  file.categoryFancy = categoryNames[file.category]

  file.href = `/docs/${file.category}/${file.slug}`.replace('//', '/')

  // build a reference to the source
  file.githubUrl = `https://github.com/electron/electron/tree/master${file.href}.md`

  file.crowdinFileId = ids[`master/content/en-US${file.href}.md`]

  // convenience booleans for use in templates
  file.isTutorial = file.category === 'tutorial'
  file.isApiDoc = file.category === 'api'
  file.isDevTutorial = file.category === 'development'
  file.isApiStructureDoc = file.category === 'api/structures'

  // parse markdown to HTML
  const markdown = fs.readFileSync(file.fullPath, 'utf8')

  // ignore some docs & skip the rest of the parsing logic
  if (markdown.includes(IGNORE_PATTERN)) {
    file.ignore = true
    return file
  }

  file.sections = await Promise.all(
    splitMd(await fixMdLinks(markdown)).map(async (section: $TSFixMe) => {
      const parsed = await hubdown(section.body, {
        runBefore: [plaintextFix, bashFix, fiddleUrls, itsReallyJS],
      })
      const $ = cheerio.load(parsed.content || '')
      file.title =
        file.title ||
        $('h1')
          .first()
          .text()
          .trim() ||
        $('h2')
          .first()
          .text()
          .replace('Class: ', '')
      file.description =
        file.description ||
        $('blockquote')
          .first()
          .text()
          .trim()

      // fix HREF for relative links
      $('a').each((i, el) => {
        const href = $(el).attr('href')
        const type = hrefType(href)
        if (type !== 'relative' && type !== 'rooted') return
        const dirname = path.dirname(file.href)
        const newHref = convertToUrlSlash(
          path.resolve(dirname, href.replace(/\.md/, ''))
        )
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
        src = convertToUrlSlash(path.resolve(dirname, src))

        const newSrc = file.isApiDoc
          ? [baseUrl, packageJSON.electronLatestStableTag, src].join('/')
          : [baseUrl, packageJSON.electronMasterBranchCommit, src].join('/')

        const parsed = URL.parse(newSrc)
        if (!parsed.path) return
        parsed.path = path.normalize(parsed.path)

        $(el).attr('src', URL.format(parsed))
      })

      section.html = $('body').html()

      return section
    })
  )

  // remove leftover file props from walk-sync
  delete file.mode
  delete file.size
  delete file.mtime
  delete file.relativePath
  delete file.basePath

  // remove empty values
  return cleanDeep(file)
}

function fixMdLinks(md: string): Promise<string> {
  return new Promise((resolve, reject) => {
    remark()
      .use(links)
      .process(md, (err: Error, file: { contents: string }) => {
        if (err) {
          reject(err)
        } else {
          resolve(file.contents)
        }
      })
  })
}

function splitMd(md: string): Array<{ name: null, body: string[] }> {
  const slugger = new GithubSlugger()
  const sections: Array<{ name: null, body: Array<string> }> = []
  let section = { name: null, body: [] as Array<string> }
  let inCodeBlock = false
  const isHeading = (line: string) => !inCodeBlock && line.trim().startsWith('#')

  md.split('\n').forEach((curr, i, lines) => {
    if (curr.startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }
    if (isHeading(curr)) {
      section.name = slugger.slug(curr)
    }
    section.body.push(curr)

    let next = lines[i + 1]
    if (next === undefined || isHeading(next)) {
      section.body = section.body.join('\n') as $TSFixMe
      sections.push(section)
      section = { name: null, body: [] }
    }
  })

  return sections
}

async function main() {
  const docs = await parseDocs()
  const docsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = docs
      .filter((doc: $TSFixMe) => doc.locale === locale)
      .sort((a: $TSFixMe, b: $TSFixMe) => a.slug.localeCompare(b.slug))
      .reduce((allDocs: $TSFixMe, doc: $TSFixMe) => {
        allDocs[doc.href] = doc
        return allDocs
      }, {} as Record<string, string>)

    return acc
  }, {} as Record<string, string>)

  const websiteStringsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = require(`../content/${locale}/website/locale.yml`)
    return acc
  }, {} as Record<string, string>)

  const glossary: Record<string, IParseElectronGlossaryReturn[]> = {}
  for (let locale in locales) {
    glossary[locale] = await parseElectronGlossary(locale)
  }

  fs.writeFileSync(
    path.join(__dirname, '../index.json'),
    JSON.stringify(
      {
        electronLatestStableVersion: packageJSON.electronLatestStableTag.replace(
          /^v/,
          ''
        ),
        electronLatestStableTag: packageJSON.electronLatestStableTag,
        electronMasterBranchCommit: packageJSON.electronMasterBranchCommit,
        locales: locales,
        docs: docsByLocale,
        website: websiteStringsByLocale,
        glossary: glossary,
        date: new Date(),
      },
      null,
      2
    )
  )
}

main()
