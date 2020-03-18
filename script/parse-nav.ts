import * as cheerio from 'cheerio'
import { docs as i18nDocs, locales as i18nLocales } from '../dist'
import { writeHelper } from '../lib/write-helper'
const locales = Object.keys(i18nLocales)

function getNav(locale: string) {
  // @ts-ignore | For undefined reasons TYPES for blogs and docs just a empty Object 😢
  const docs = i18nDocs[locale]
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

writeHelper('navs', navsByLocale)
