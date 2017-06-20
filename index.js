const path = require('path')
const fs = require('fs')
const assert = require('assert')
const objectifyArray = require('objectify-array')
const flat = require('flat')
const contentDir = path.join(__dirname, './content')
const apis = require('./lib/apis')
const tree = objectifyArray(apis)
const locales = require('./lib/locales')
const slugs = require('./lib/get-slugs')(apis)
const translatedTrees = require('./lib/pretranslate')()

module.exports = {
  api: {
    array: apis,
    tree: tree,
    get: getApi
  },
  locales: locales
}

function getApi (apiName, locale = 'en') {
  assert(locales.includes(locale), `Unsupported locale: ${locale}`)
  const tree = JSON.parse(translatedTrees[locale])
  const api = tree[apiName] || tree[slugs[apiName]]
  assert(api, `Unsupported API: ${api}`)
  return api
}

