const path = require('path')
const fs = require('fs')
const assert = require('assert')
const objectifyArray = require('objectify-array')
const flat = require('flat')
const {set} = require('lodash')
const requireYAML = require('require-yml')

const contentDir = path.join(__dirname, './content')
const apis = require(path.join(contentDir, 'en/api/electron-api.json'))
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
const tree = objectifyArray(apis)
const locales = fs.readdirSync(contentDir)
  .filter(filename => fs.statSync(path.join(contentDir, filename)).isDirectory())

module.exports = {
  api: {
    array: apis,
    tree: tree,
    get: getApi
  },
  locales: locales
}

function getApi (api, locale = 'en') {
  assert(Object.keys(tree).includes(api), `Unsupported API: ${api}`)
  assert(locales.includes(locale), `Unsupported locale: ${locale}`)
  const descriptionsPath = path.join(contentDir, `${locale}/api/api-descriptions.yml`)
  const descriptions = requireYAML(descriptionsPath)
  let result = Object.assign({}, tree)
  Object.keys(descriptions).forEach(key => {
    set(result, key, descriptions[key])
  })
  return result[api]
}
