#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import * as walk from 'walk-sync'
import { sync as rimraf } from 'rimraf'
import * as allStats from '../stats.json'

const basePath = path.join(__dirname, '..', 'content')
const contentPath = (lang: string) => path.join(basePath, lang, 'docs')

const locales = fs.readdirSync(basePath)
locales.forEach((locale) => {
  if (locale === 'en-US') return

  // remove entire language directory if it doesn't have stats
  // (absence of stats means the language has been disabled in crowdin)
  const lang = locale.split('-')[0]
  const stats = allStats.find(stat => lang === stat.code || locale === stat.code)
  if (!stats) {
    console.log(`language '${locale}' is no longer enabled in Crowdin; deleting`)
    rimraf(path.join(basePath, locale))
    return
  }

  // remove individual files that no longer exist in English source directory
  walk(contentPath(locale)).filter((filePath) => {
    const enFile = path.join(contentPath('en-US'), filePath)
    return !fs.existsSync(enFile)
  }).forEach((filePath) => {
    const toDelete = path.join(contentPath(locale), filePath)
    fs.unlink(toDelete, (err) => {
      if (err) {
        console.error(`Error deleting ${toDelete}`)
      } else {
        console.log(`Deleted ${toDelete}`)
      }
    })
  })
})
