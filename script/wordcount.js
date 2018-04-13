#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {chain} = require('lodash')
const walk = require('walk-sync')
const matchWords = require('match-words')
const docsDir = path.join(__dirname, '../content/en-US')
const files = walk(docsDir, {directories: false}).map(f => path.join(docsDir, f))
const words = chain(files).map(f => matchWords(fs.readFileSync(f, 'utf8'))).flatten().value()
const counts = files.map(f => matchWords(fs.readFileSync(f, 'utf8')).length)
const {average, mean, sum} = require('simple-statistics')

const results = {
  'total files': files.length,
  'total words': sum(counts),
  'unique words': chain(words).flatten().uniq().value().length,
  'average words per file': Math.floor(average(counts)),
}

console.log('# Word Count')
console.log('> Analysis ofElectron\'s English documentation, including tutorials and API docs.\n')
console.log('Stat | Value')
console.log('---- | -----')
Object.keys(results).forEach(stat => {
  console.log([stat, results[stat]].join(' | '))
})