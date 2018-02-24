// This file parses electron/electron/docs/glossary.md

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const hubdown = require('hubdown')

const sourceFile = path.join(__dirname, '../content/en-US/docs/glossary.md')

async function parseGlossaryDoc () {
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
}

module.exports = parseGlossaryDoc