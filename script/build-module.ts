#!/usr/bin/env ts-node

require('make-promises-safe')
require('require-yaml')

import * as walk from 'walk-sync'
import * as path from 'path'
import { sync as mkdir } from 'make-dir'
import { writeHelper } from '../lib/write-helper'
import { parseBlogFile, parseFile, parseNav } from '../lib/parsers'
import { IParseFile } from '../lib/interfaces'
import locales, { IResult as ILocalesResult } from '../lib/locales'
import { writeIndexFiles } from '../lib/generate-js'
import { supportedVersions } from '../package.json'
import {
  parseElectronGlossary,
  IParseElectronGlossaryReturn,
} from '../lib/parse-electron-glossary'
const getIds = require('get-crowdin-file-ids')

const contentDir = (version: string) =>
  path.join(__dirname, `../content/${version}`)

let ids: Record<string, string> = {}

async function parseDocs(version: string): Promise<Partial<IParseFile>[]> {
  ids = await getIds('electron')

  console.time('parsed docs in')
  const markdownFiles = walk
    .entries(contentDir(version))
    .filter((file) => file.relativePath.includes('/docs'))
    .filter((file) => file.relativePath.endsWith('.md'))
  console.log(
    `processing ${markdownFiles.length} docs files in ${
      Object.keys(locales).length
    } locales for ${version}`
  )
  let docs = await Promise.all(
    markdownFiles.map((file) => parseFile(file, ids))
  )

  // ignore some docs
  docs = docs.filter((doc) => !doc.ignore)

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

  return versioned
}

async function parseBlogs() {
  console.time('parsed blogs in')
  const markdownFiles = walk
    .entries(contentDir('current'))
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
      .filter((doc) => doc.locale === locale)
      .sort((a, b) => a.slug!.localeCompare(b.slug!))
      .reduce((allDocs, doc) => {
        // @ts-ignore
        allDocs[doc.href] = doc
        return allDocs
      }, {})

    return acc
  }, {} as Record<string, Partial<ILocalesResult>>)
}

async function main() {
  const [docs, docsByVersion, blogs] = await Promise.all([
    parseDocs('current'),
    parseDocsByVersions(),
    parseBlogs(),
  ])

  const docsByLocale = createDocsByLocale(docs)

  const websiteBlogsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = blogs
      .filter((doc) => doc.locale === locale)
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .reduce((allBlogs, blog) => {
        allBlogs[blog.href] = blog
        return allBlogs
      }, {})

    return acc
  }, {} as Record<string, IParseFile>)

  const websiteStringsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = require(`../content/current/${locale}/website/locale.yml`)
    return acc
  }, {} as Record<string, string>)

  const glossary: Record<string, IParseElectronGlossaryReturn[]> = {}
  for (let locale in locales) {
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
