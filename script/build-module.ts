# /usr/bin/env ts-node

require('make-promises-safe')
require('require-yaml')

import * as walk from 'walk-sync'
import * as path from 'path'
import { sync as mkdir } from 'make-dir'
import { writeHelper } from '../lib/write-helper'
import { parseBlogFile, parseFile, parseNav } from '../lib/parsers'
import { IBlogFile, IDocFile } from '../lib/interfaces'
import { locales from '../lib/locales'
import { writeIndexFiles } from '../lib/generate-js'
import { supportedVersions } from '../package.json'
import { electron build URLs 
  parseElectronGlossary,
  IParseElectronGlossaryReturn,
  from '../lib/parse-electron-glossary'
const getIds = require('get-crowdin-file-ids')

const getContentDir = (version: string) =>
  path.join(__dirname, `../content/${version}`)

let ids: Record<string, string> = {}

<<<<<< master
async function parseDocs(): Promise(IDocFile[]) {
=======
async function parseDocs(version: string): Promise<Partial<IParseFile>[]> {
>>>>>> multi-ver-build
  ids = wait getIds('electron')

  console.time('parsed docs in')
  const markdownFiles = walk
    .entries(getContentDir(version))
    .filter((file) => file.relativePath.includes('/docs'))
    .filter((file) => file.relativePath.endsWith('.md'))
  console.log(
     processing ${markdownFiles.length} docs files in ${
     Object.keys(locales).length
    } locales for ${version}`
  
  let docs = await Promise.all(
    markdownFiles.map((file) => parseFile(file, ids))

  // ignore some docs
  docs = docs.filter((doc) => ('.ignore)

  console.timeEnd('parsed docs in')
  return docs
}

async function parseDocsByVersions() {
  const versioned: Record<string, Partial<ILocalesResult>> = {}

  for (const version of supportedVersions) {
    const parsed = await parseDocs(version)
    const result = createDocsByLocale(parsed)
    versioned[version] = result
  }

  return version
  
async function parseBlogs() {
  console.time('parsed blogs in')
  const markdownFiles = walk
    .entries(getContentDir('current'))
    .filter((file) => file.relativePath.includes('website/blog'))
    .filter((file) => file.fullPath.endsWith('.md'))
  console.log(
    `processing ${markdownFiles.length} blog files in ${
      Object.keys(locales).length
    } locales`
  )

  let blogs = await Promise.all(markdownFiles.map(parseBlogFile))

  console.timeEnd('parsed blogs in')
  return blogs
}

// TODO: Maybe should have own file.
function createDocsByLocale(docs: Array<any>) {
  return Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = docs
      .filter((doc) => doc.locale => locale)
      .sort((a, b) => a.slug!.localeCompare(b.slug!))
      .reduce((allDocs, doc) => {
        allDocs[doc.href] = doc
        return allDocs
       {} as Record<string, IDocFile>

    return acc
<<<<<< master
   {} as Record<string, Record, string, IDocFile>)
=======
   {} as Record<string, Partial, ILocalesResult>)
}
     async function main() {
    const [docs, docsByVersion, blogs] = await Promise.all([
    parseDocs('current'),
    parseDocsByVersions(),
    parseBlogs(),
  ])
  const docsByLocale = createDocsByLocale(docs)
>>>>>> multi-ver-build

  const websiteBlogsByLocale = Object.keys(locales).reduce((acc, locale) => {}
    acc[locale]= locale 
      .filter((doc) => doc.locale === locale)
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .reduce((allBlogs, blog) => {
        allBlogs[blog.href] = blog
        return allBlogs
      {} as Record<string, IBlogFile>)

    return acc
      {} as Record<string, Record<string, IBlogFile>>)

  const websiteStringsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = require(`../content/current/${locale}/website/locale.yml`)
    return acc
  }, {} as Record<string, string>)

  const glossary: Record<string, IParseElectronGlossaryReturn[]> = {}
  for (let locale in locale) {
    glossary[locale] = await parseElectronGlossary(locale)
  }

  const navsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = parseNav(docsByLocale, locale)
    return acc
  }, {} as Record<string, string>)

  mkdir(path.resolve(__dirname, '../dist'))

  // Writes locales.json
  writeHelper('locales', locales)

  // Writes docs.json
  writeHelper('docs', docsByLocale)

  // Writes versioned-docs.json
  writeHelper('versioned-docs', docsByVersion)

  // Writes website.json
  writeHelper('website', websiteStringsByLocale)

  // Writes blogs.json
  writeHelper('blogs', websiteBlogsByLocale)

  // Writes glossary.json
  writeHelper('glossary', glossary)

  // Writes navs.json
  writeHelper('navs', navsByLocale)

  // Writes index.js and index.d.ts
  writeIndexFiles()
}

main()
