#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const {locales} = require('..')
const readmePath = path.join(__dirname, '../readme.md')
const readmeOriginal = fs.readFileSync(readmePath, 'utf8')

const languageList = Object.values(locales)
  .filter(locale => locale.languageCode !== 'en')
  .map(locale => {
    const {languageNativeName, languageName, languageCode} = locale
    let label = languageNativeName
      .replace('українська мова', 'українська') // https://github.com/electron/i18n/pull/183
    if (languageNativeName !== languageName) label += ` (${languageName})`
    return `- [${label}](https://crowdin.com/project/electron/${languageCode})`
  })

const start = '<!-- start language-table -->'
const end = '<!-- end language-table -->'
const target = new RegExp(`${start}[\\s\\S]*${end}`, 'gm')
const replacement = `${start}\n${languageList.join('\n')}\n${end}`
const readmeNew = readmeOriginal.replace(target, replacement)

fs.writeFileSync(readmePath, readmeNew)

console.log('Updated language list in readme.md')
