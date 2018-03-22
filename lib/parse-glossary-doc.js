const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const hubdown = require('hubdown')

async function parseGlossaryDoc (locale) {
  const sourceFile = path.join(__dirname, `../content/${locale}/docs/glossary.md`)
  const md = fs.readFileSync(sourceFile, 'utf8')
  const {content: html} = await hubdown(md)
  const $ = cheerio.load(html)

  return $('h3')
    .map((i, el) => {
      return {
        term: $(el).text(),
        type: 'electronJargon',
        description: $(el).next('p')
          .text()
          .replace(/\n/g, ' ')
          .replace(/\s+/, ' ')
      }
    })
    .get()
    .reduce((acc, entry) => {
      acc[entry.term] = entry
      return acc
    }, {})
}

module.exports = parseGlossaryDoc
