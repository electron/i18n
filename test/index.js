const {before, describe, it} = require('mocha')
const {expect} = require('chai')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync')
const flat = require('flat')
const YAML = require('js-yaml')

const contentDir = path.join(__dirname, '../content')
const tree = walk(contentDir)
const locales = fs.readdirSync(contentDir)
  .filter(filename => fs.statSync(path.join(contentDir, filename)).isDirectory())

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
        const filename = path.join(contentDir, `${locale}/api/api-descriptions.yml`)
        console.log(filename)
        const yml = YAML.safeLoad(fs.readFileSync(filename, 'utf8'))
        return Object.keys(flat(yml))
      }

      const sourceKeys = getKeys('en')
      expect(sourceKeys).to.include('app.description')
      expect(sourceKeys).to.include('app.events.continue-activity.returns.type.description')

      expect(locales.length).to.be.above(10)
      locales.forEach(locale => {

        expect(sourceKeys).to.deep.equal(getKeys(locale), `${locale} API descriptions tree does not match source content`)
      })
    })
  })
})
