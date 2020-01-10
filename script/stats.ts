#!/usr/bin/env ts-node

import got from 'got'
import * as fs from 'fs'
import * as path from 'path'
const url = 'https://electronjs.org/crowdin/status'

got(url).json().then(body => {
  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    JSON.stringify(body, null, 2)
  )
})
