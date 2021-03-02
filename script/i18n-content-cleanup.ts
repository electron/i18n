#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import * as walk from 'walk-sync'
import { sync as rimraf } from 'rimraf'
import * as allStats from '../stats.json'
import { supportedVersions } from '../package.json'

const basePath = (version: string) =>
  path.join(__dirname, '..', 'content', version)
const contentPath = (version: string, lang: string) =>
  path.join(basePath(version), lang, 'docs')

const locales = fs.readdirSync(basePath('current'))
locales.forEach((locale) => {
  supportedVersions.push('current')
  if (locale === 'en-US') {
    return
  }

  // remove entire language directory if it doesn't have stats
  // (absence of stats means the language has been disabled in crowdin)
  const lang = locale.split('-')[0]
  const stats = allStats.find(
    (stat) => lang === stat.code || locale === stat.code
  )
  if (!stats) {
    console.log(
      `language '${locale}' is no longer enabled in Crowdin; deleting`
    )
    for (const version of supportedVersions) {
      rimraf(path.join(basePath(version), locale))
    }
    return
  }

  for (const version of supportedVersions) {
    let filePaths
    
    try {
      filePaths = walk(contentPath(version, locale))
    } catch {
      // ignore content paths which don't exist
      continue;
    }
    
    // remove individual files that no longer exist in English source directory
    filePaths.filter((filePath) => {
        const enFile = path.join(contentPath(version, 'en-US'), filePath)
        return !fs.existsSync(enFile)
      })
      .forEach((filePath) => {
        const toDelete = path.join(contentPath(version, locale), filePath)
        fs.unlink(toDelete, (err) => {
          if (err) {
            console.error(`Error deleting ${toDelete}`)
          } else {
            console.log(`Deleted ${toDelete}`)
          }
        })
      })
  }
})
