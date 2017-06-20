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



function preTranslateApiDocs () {
  const trees = {}  
  locales.forEach(locale => {
    let descriptionsPath = path.join(contentDir, `${locale}/api/api-descriptions.yml`)
    let descriptions = requireYAML(descriptionsPath)
    // console.log(locale, descriptions['app.description'])
    let result = Object.assign({}, tree)
    Object.keys(descriptions).forEach(key => {
      set(result, key, descriptions[key])
    })
    
    // serialize before storing. not sure why it doesn't work otherwise
    trees[locale] = JSON.stringify(result)
  })  
  return trees
}

const translatedTrees = preTranslateApiDocs()

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
  return JSON.parse(translatedTrees[locale])[api]
}

