#!/usr/bin/env ts-node

import * as got from 'got'
import * as fs from 'fs'
import * as path from 'path'
const url = 'https://electronjs.org/crowdin/status'

got(url, { json: true }).then(data => {
  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    JSON.stringify(data.body, null, 2)
  )
})
