#!/usr/bin/env node

const got = require('got')
const fs = require('fs')
const path = require('path')
const url = 'https://electronjs.org/crowdin/status'

got(url, {json: true}).then(data => {
  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    JSON.stringify(data.body, null, 2)
  )
})
