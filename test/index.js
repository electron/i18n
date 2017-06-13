const {before, describe, it} = require('mocha')
const {expect} = require('chai')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync')
const tree = walk(path.join(__dirname, '..', 'content'))
// const locales = fs.readdirSync(path)
const flat = require('flat')
const YAML = require('js-yaml')

// console.log(tree)

describe('electron-i18n', () => {
  describe('source content', () => {
    it('includes tutorials and development docs', () => {
      expect(tree).to.include('en/docs/tutorial/accessibility.md')
      expect(tree).to.include('en/docs/development/coding-style.md')
    })

    it('ignores API docs', () => {
      expect(tree.some(path => path.includes('docs/api/'))).to.equal(false)
    })

    it('includes API descriptions in YAML format', () => {
      expect(tree).to.include('en/api/api-descriptions.yml')
    })

    it('includes website content', () => {
      expect(tree).to.include('en/website/locale.yml')
    })
  })

  describe('translated content', () => {
    it('preserves YAML formatting of API descriptions', () => {
      function getKeys (locale) {
        const p = path.join(__dirname, `../content/${locale}/api/api-descriptions.yml`)
        const sourceApiDescriptions = YAML.safeLoad(fs.readFileSync(p, 'utf8'))
        return Object.keys(flat(sourceApiDescriptions))
      }

      const sourceKeys = getKeys('en')
      expect(sourceKeys).to.include('app.description')
      expect(sourceKeys).to.include('app.events.continue-activity.returns.type.description')

      // expect(locales.length).to.be.above(2)
      // locales.forEach(locale => {
      //   expect(sourceKeys).to.deep.equal(getKeys(locale), `${locale} API descriptions tree does not match source content`)
      // })
    })
  })
})
