const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const i18n = require('..')
const locales = Object.keys(i18n.locales)

function getNav (locale) {
  const docs = i18n.docs[locale]
  const readme = docs['/docs/README']
  const html = readme.sections.map(section => section.html).join('\n')
  const $ = cheerio.load(html)
  const startHeading = $('h2')[1]
  const listItems = $(startHeading).next('ul').html()
  const nav = `<ul>${listItems}</ul>`
  return nav
}

const navsByLocale = locales
  .reduce((acc, locale) => {
    acc[locale] = getNav(locale)
    return acc
  }, {})

i18n.navs = navsByLocale

fs.writeFileSync(
  path.join(__dirname, '../index.json'),
  JSON.stringify(i18n, null, 2)
)
