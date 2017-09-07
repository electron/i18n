require('chai').should()
const {before, describe, it} = require('mocha')
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
      i18n.api.array.should.be.an('array')
      const apiNames = i18n.api.array.map(api => api.name)
      apiNames.should.include('app')
      apiNames.should.include('BrowserWindow')
    })

    it('exports structured API data as a tree', () => {
      i18n.api.tree.should.be.an('object')
      i18n.api.tree.BrowserWindow.instanceMethods.should.be.an('object')
    })

    it('exports a list of locales', () => {
      i18n.locales.should.be.an('array')
      i18n.locales.length.should.be.above(15)
      i18n.locales.should.include('en')
      i18n.locales.should.include('fr-FR')
    })

    describe('api.get', () => {
      it('is a method for getting API by slug and locale', () => {
        let app = i18n.api.get('app')
        app.title.should.equal('app')
        app.description.should.include('Control your application')
      })

      it('accepts an optional locale argument')
      // app = i18n.api.get('app', 'fr-FR')
      // app.description.should.include('Contrôle le cycle de vie')
      // app.methods.quit.description.should.include('Essaye de fermer toutes les fenêtres')

      it('allows lookup by API name or url-friendly slug')
    })
  })

  describe('source content', () => {
    it('includes tutorials and development docs', () => {
      tree.should.include('en/docs/tutorial/accessibility.md')
      tree.should.include('en/docs/development/coding-style.md')
    })
  })
})
