#!/usr/bin/env ts-node

require('make-promises-safe')
require('require-yaml')

import * as walk from 'walk-sync'
import * as path from 'path'
import { sync as mkdir } from 'make-dir'
import * as fs from 'fs'
import { writeHelper } from '../lib/write-helper'
import { parseBlogFile, parseFile } from '../lib/parsers'
import { IParseFile } from '../lib/interfaces'
import locales, { IResult as ILocalesResult } from '../lib/locales'
import { writeIndexFiles } from '../lib/generate-js'
import * as packageJSON from '../package.json'
import {
  parseElectronGlossary,
  IParseElectronGlossaryReturn,
} from '../lib/parse-electron-glossary'
const getIds = require('get-crowdin-file-ids')

const contentDir = path.join(__dirname, '../content')

let ids: Record<string, string> = {}

async function parseDocs(): Promise<Partial<IParseFile>[]> {
  ids = await getIds('electron')

  console.time('parsed docs in')
  const markdownFiles = walk
    .entries(contentDir)
    .filter(file => file.relativePath.includes('/docs'))
    .filter(file => file.relativePath.endsWith('.md'))
  console.log(
    `processing ${markdownFiles.length} docs files in ${
      Object.keys(locales).length
    } locales`
  )
  let docs = await Promise.all(markdownFiles.map(file => parseFile(file, ids)))

  // ignore some docs
  docs = docs.filter(doc => !doc.ignore)

  console.timeEnd('parsed docs in')
  return docs
}

async function parseBlogs() {
  console.time('parsed blogs in')
  const markdownFiles = walk
    .entries(contentDir)
    .filter(file => file.relativePath.includes('website/blog'))
    .filter(file => file.fullPath.endsWith('.md'))
  console.log(
    `processing ${markdownFiles.length} blog files in ${
      Object.keys(locales).length
    } locales`
  )

  let blogs = await Promise.all(markdownFiles.map(parseBlogFile))

  console.timeEnd('parsed blogs in')
  return blogs
}

async function main() {
  const [docs, blogs] = await Promise.all([parseDocs(), parseBlogs()])

  const docsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = docs
      .filter(doc => doc.locale === locale)
      .sort((a, b) => a.slug!.localeCompare(b.slug!))
      .reduce((allDocs, doc) => {
        // @ts-ignore
        allDocs[doc.href] = doc
        return allDocs
      }, {})

    return acc
  }, {} as Record<string, Partial<ILocalesResult>>)

  const websiteBlogsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = blogs
      .filter(doc => doc.locale === locale)
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .reduce((allBlogs, blog) => {
        allBlogs[blog.href] = blog
        return allBlogs
      }, {})

    return acc
  }, {} as Record<string, IParseFile>)

  const websiteStringsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = require(`../content/${locale}/website/locale.yml`)
    return acc
  }, {} as Record<string, string>)

  const glossary: Record<string, IParseElectronGlossaryReturn[]> = {}
  for (let locale in locales) {
    glossary[locale] = await parseElectronGlossary(locale)
  }

  mkdir(path.resolve(__dirname, '../dist'))

  // Writes locales.json
  writeHelper('locales', locales)

  // Writes meta.json
  // TODO: use writeHelper()
  fs.writeFileSync(
    path.join(__dirname, '../dist/meta.json'),
    JSON.stringify(
      {
        electronLatestStableVersion: packageJSON.electronLatestStableTag.replace(
          /^v/,
          ''
        ),
        electronLatestStableTag: packageJSON.electronLatestStableTag,
        electronMasterBranchCommit: packageJSON.electronMasterBranchCommit,
        date: new Date(),
      },
      null,
      2
    )
  )

  // Writes docs.json
  writeHelper('docs', docsByLocale)

  // Writes website.json
  writeHelper('website', websiteStringsByLocale)

  // Writes blogs.json
  writeHelper('blogs', websiteBlogsByLocale)

  // Writes glossary.json
  writeHelper('glossary', glossary)

  // Writes index.js and index.d.ts
  writeIndexFiles()
}

main()
