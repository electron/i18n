const path = require('path')
const fs = require('fs')
const assert = require('assert')
const objectifyArray = require('objectify-array')
const {chain, pick} = require('lodash')
const contentDir = path.join(__dirname, './content')
const apis = require('./lib/apis')
const tree = objectifyArray(apis)
const locales = require('./lib/locales')
const slugs = require('./lib/get-slugs')(apis)
const docs = require('./docs.json')

module.exports = {
  api: {
    array: apis,
    tree: tree,
    get: getApi
  },
  guides: {
    list: listGuides,
    get: getGuide
  },
  locales: locales
}

function listGuides(locale = 'en') {
  return chain(docs)
    .filter(doc => doc.locale === locale && ['tutorial', 'development'].includes(doc.category))
    .map(doc => pick(doc, ['slug', 'title', 'description', 'category', 'locale']))
    .orderBy('title', 'asc')
    .value()
}

function getGuide(slug, locale = 'en') {
  return listGuides(locale).find(guide => guide.slug === slug)
}

function getApi (apiName, locale = 'en') {
  assert(locales.includes(locale), `Unsupported locale: ${locale}`)
  
  const api = docs.find(doc => doc.locale === locale && [doc.slug, doc.name].includes(apiName))
  assert(api, `Unsupported API: ${api}`)
  return api
}

