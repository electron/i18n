#!/usr/bin/env node

const got = require('got')
const fs = require('fs')
const path = require('path')
const url = 'https://electronjs.org/language-stats.json'

got(url).then(data => {
  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    data.body
  )
})
