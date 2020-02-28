import * as cheerio from 'cheerio'
import * as path from 'path'
import * as fs from 'fs'
const i18n = require('../')
import { locales as localeses } from '../dist/locales.json'
const locales = Object.keys(localeses)

function getNav(locale: string) {
  const docs = i18n.docs[locale]
  const readme = docs['/docs/README']
  const html = readme.sections
    .map((section: { html: string }) => section.html)
    .join('\n')
  const $ = cheerio.load(html)
  const startHeading = $('h2')[1]
  const listItems = $(startHeading)
    .next('ul')
    .html()
  const nav = `<ul>${listItems}</ul>`
  return nav
}

const navsByLocale = locales.reduce((acc, locale) => {
  acc[locale] = getNav(locale)
  return acc
}, {} as Record<string, string>)

i18n.navs = navsByLocale

fs.writeFileSync(
  path.join(__dirname, '../index.json'),
  JSON.stringify(i18n, null, 2)
)
