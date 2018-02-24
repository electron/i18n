require('chai').should()
const {describe, it} = require('mocha')
const glossary = require('../content/en-US/glossary.json')
const {chain} = require('lodash')

describe('glossary', () => {
  it('is an array', () => {
    glossary.should.be.an('array')
  })

  it('has lots of entries', () => {
    glossary.length.should.be.above(476)
  })

  it('sets expected properties on every entry', () => {
    glossary.every(entry => {
      return entry.term.length && entry.type.length && entry.description.length
    }).should.eq(true)
  })

  it('has a known set of possible types', () => {
    const types = chain(glossary).map('type').uniq().sort().value()
    types.should.deep.equal([
      'electronAPI',
      'electronInstanceMethod',
      'electronInstanceProperty',
      'electronJargon',
      'globals.builtin'
    ])
  })
})
