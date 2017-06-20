const path = require('path')
const fs = require('fs')
const contentDir = path.join(__dirname, '../content')

module.exports = fs.readdirSync(contentDir)
  .filter(filename => fs.statSync(path.join(contentDir, filename)).isDirectory())
