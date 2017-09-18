require('chai').should()

const fs = require('fs')
const path = require('path')
const {before, describe, it} = require('mocha')
const markdown = require('../lib/markdown')
const cheerio = require('cheerio')
const fixture = fs.readFileSync(path.join(__dirname, 'fixtures/example.md'), 'utf8')

describe('markdown parser', () => {
  let file, $

  before(async () => {
    file = await markdown(fixture)
    $ = cheerio.load(file.content)
  })

  it('parses YML frontmatter', () => {
    file.title.should.equal('Project of the Week: WebTorrent')
    file.author.should.equal('zeke')
    file.date.should.equal('2017-03-14')
  })

  it('adds DOM ids to headings', () => {
    $('h2#what-is-webtorrent').length.should.equal(1)
  })

  it('turns headings into links', () => {
    $('h2#what-is-webtorrent a[href="#what-is-webtorrent"]').text().should.equal('What is WebTorrent?')
  })

  it('handles markdown links', () => {
    fixture.should.include('[WebTorrent](https://webtorrent.io)')
    file.content.should.include('<a href="https://webtorrent.io">WebTorrent</a>')
  })
})
