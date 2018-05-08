const assert = require('assert')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const hubdown = require('hubdown')

async function parseElectronGlossary (locale) {
  assert(locale, '`locale` is a required argument to parseGlosssaryDoc()')

  const sourceFile = path.join(__dirname, `../content/${locale}/docs/glossary.md`)
  const md = fs.readFileSync(sourceFile, 'utf8')
  const {content: html} = await hubdown(md)
  const $ = cheerio.load(html)

  return $('h3')
    .map((i, el) => {
      return {
        term: $(el).text(),
        description: $(el).next('p')
          .text()
          .replace(/\n/g, ' ')
          .replace(/\s+/, ' ')
      }
    })
    .get()
    .reduce((acc, entry) => {
      if (entry && entry.term && entry.description && entry.description.length) {
        acc[entry.term] = entry
      } else {
        console.error('glossary entry is missing required properties', entry)
        console.error('locale', locale)
      }
      return acc
    }, {})
}

module.exports = parseElectronGlossary
