const path = require('path')
const fs = require('fs')
const requireYAML = require('require-yml')
const objectifyArray = require('objectify-array')
const {set} = require('lodash')
const contentDir = path.join(__dirname, '../content')
const locales = require('../lib/locales')
const apis = require('../lib/apis')
const tree = objectifyArray(apis)

// Do this work up front, so it only needs to happen once at load time.
module.exports = function preTranslateApiDocs () {
  const trees = {}  
  locales.forEach(locale => {
    let descriptionsPath = path.join(contentDir, `${locale}/api/api-descriptions.yml`)
    let descriptions = requireYAML(descriptionsPath)
    let result = Object.assign({}, tree)
    Object.keys(descriptions).forEach(key => {
      set(result, key, descriptions[key])
    })
    
    // serialize before storing. not sure why it doesn't work otherwise
    trees[locale] = JSON.stringify(result)
  })  
  return trees
}
