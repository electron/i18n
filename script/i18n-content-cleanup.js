#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const walk = require('walk-sync')

const basePath = path.join(__dirname, '..', 'content')
const contentPath = (lang) => path.join(basePath, lang, 'docs')

const langs = fs.readdirSync(basePath)
langs.forEach((lang) => {
  if (lang === 'en-US') {
    return
  }
  walk(contentPath(lang)).filter((filePath) => {
    const enFile = path.join(contentPath('en-US'), filePath)
    return !fs.existsSync(enFile)
  }).forEach((filePath) => {
    const toDelete = path.join(contentPath(lang), filePath)
    fs.unlink(toDelete, (err) => {
      if (err) {
        console.error(`Error deleting ${toDelete}`)
      } else {
        console.log(`Deleted ${toDelete}`)
      }
    })
  })
})
