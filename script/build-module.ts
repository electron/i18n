#!/usr/bin/env ts-node

require('make-promises-safe')
require('require-yaml')

import * as walk from 'walk-sync'
import * as path from 'path'
import { sync as mkdir } from 'make-dir'
import { writeHelper } from '../lib/write-helper'
import { parseBlogFile, parseFile } from '../lib/parsers'
import { IBlogFile, IDocFile } from '../lib/interfaces'
import locales from '../lib/locales'
import { writeIndexFiles } from '../lib/generate-js'
import {
  parseElectronGlossary,
  IParseElectronGlossaryReturn,
} from '../lib/parse-electron-glossary'
const getIds = require('get-crowdin-file-ids')

const contentDir = path.join(__dirname, '../content')

let ids: Record<string, string> = {}

async function parseDocs(): Promise<IDocFile[]> {
  ids = await getIds('electron')

  console.time('parsed docs in')
  const markdownFiles = walk.entries(contentDir).filter((file) => {
    return (
      file.relativePath.includes('/docs') && file.relativePath.endsWith('.md')
    )
  })

  console.log(
    `processing ${markdownFiles.length} docs files in ${
      Object.keys(locales).length
    } locales`
  )
  let docs = await Promise.all(
    markdownFiles.map((file) => parseFile(file, ids))
  )

  // ignore some docs
  docs = docs.filter((doc) => !doc.ignore)

  console.timeEnd('parsed docs in')
  return docs
}

async function parseBlogs() {
  console.time('parsed blogs in')
  const markdownFiles = walk.entries(contentDir).filter((file) => {
    return (
      file.relativePath.includes('website/blog') &&
      file.fullPath.endsWith('.md')
    )
  })
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
      .filter((doc) => doc.locale === locale)
      .sort((a, b) => a.slug!.localeCompare(b.slug!))
      .reduce((allDocs, doc) => {
        allDocs[doc.href] = doc
        return allDocs
      }, {} as Record<string, IDocFile>)

    return acc
  }, {} as Record<string, Record<string, IDocFile>>)

  const websiteBlogsByLocale = Object.keys(locales).reduce((acc, locale) => {
    acc[locale] = blogs
      .filter((doc) => doc.locale === locale)
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .reduce((allBlogs, blog) => {
        allBlogs[blog.href] = blog
        return allBlogs
      }, {} as Record<string, IBlogFile>)

    return acc
  }, {} as Record<string, Record<string, IBlogFile>>)

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
