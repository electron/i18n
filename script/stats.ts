#!/usr/bin/env ts-node

import got from 'got'
import * as fs from 'fs'
import * as path from 'path'
const url = 'https://electronjs.org/crowdin/status'

got(url, { responseType: 'json' }).then(data => {
  fs.writeFileSync(
    path.join(__dirname, '../stats.json'),
    JSON.stringify(data.body, null, 2)
  )
})
