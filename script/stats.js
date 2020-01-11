#!/usr/bin/env ts-node
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const got_1 = require('got')
const fs = require('fs')
const path = require('path')
const url = 'https://electronjs.org/crowdin/status'
got_1
  .default(url)
  .json()
  .then(body => {
    fs.writeFileSync(
      path.join(__dirname, '../stats.json'),
      JSON.stringify(body, null, 2)
    )
  })
