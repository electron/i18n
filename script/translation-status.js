#!/usr/bin/env node

require('dotenv-safe').load()
const got = require('got')
const fs = require('fs')
const path = require('path')

const url = `https://api.crowdin.com/api/project/electron/status?key=${process.env.CROWDIN_KEY}&json=true`

got(url)
  .then(data => {
    fs.writeFileSync(
      path.join(__dirname, '../locales.json'),
      data.body
    )
  })
