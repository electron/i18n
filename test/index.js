const {before, describe, it} = require('mocha')
const {expect} = require('chai')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync')
const requireYAML = require('require-yml')
const contentDir = path.join(__dirname, '../content')
const tree = walk(contentDir)
const i18n = require('..')

describe('electron-i18n', () => {
    describe('module', () => {
    const i18n = require('..')
    
    it('exports structured API data as arrays', () => {
      expect(i18n.api.array).to.be.an('array')
      const apiNames = i18n.api.array.map(api => api.name)
      expect(apiNames).to.include('app')
      expect(apiNames).to.include('BrowserWindow')
    })

    it('exports structured API data as a tree', () => {
      expect(i18n.api.tree).to.be.an('object')
      expect(i18n.api.tree.BrowserWindow.instanceMethods).to.be.an('object')
    })

    it('exports a list of locales', () => {
      expect(i18n.locales).to.be.an('array')
      expect(i18n.locales.length).to.be.above(15)
      expect(i18n.locales).to.include('en')
      expect(i18n.locales).to.include('fr-FR')
    })

    it('exports a method for getting translated structured API docs by locale', () => {
      let app = i18n.api.get('app')
      expect(app.description).to.include('Control your application')

      app = i18n.api.get('app', 'fr-FR')
      expect(app.description).to.include('Contrôle le cycle de vie')
      expect(app.methods.quit.description).to.include('Essaye de fermer toutes les fenêtres')

      app = i18n.api.get('app', 'vi-VN')
      expect(app.description).to.include('Kiểm soát các vòng')
      expect(app.methods.relaunch.description).to.include('ứng dụng khi thoát khỏi')
    })
  })

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
        const yml = requireYAML(filename)
        return Object.keys(yml)
      }

      const sourceKeys = getKeys('en')
      expect(sourceKeys).to.include('app.description')
      expect(sourceKeys).to.include('app.events.continue-activity.returns.type.description')

      expect(i18n.locales.length).to.be.above(10)
      i18n.locales.forEach(locale => {
        expect(sourceKeys).to.deep.equal(getKeys(locale), `${locale} API descriptions tree does not match source content`)
      })
    })
  })
})
