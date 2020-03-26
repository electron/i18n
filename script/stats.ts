#!/usr/bin/env ts-node

import got from 'got'
import { promises as fs } from 'fs-extra'
import * as path from 'path'
const url = 'https://electronjs.org/crowdin/status'

got(url)
  .json()
  .then(async (body) => {
    fs.writeFile(
      path.join(__dirname, '../stats.json'),
      JSON.stringify(body, null, 2)
    )
  })
