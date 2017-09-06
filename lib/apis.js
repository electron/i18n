const path = require('path')
const contentDir = path.join(__dirname, '../content')

module.exports = require(path.join(contentDir, 'en/electron-api.json'))
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
