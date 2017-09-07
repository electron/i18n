require('chai').should()
const {before, describe, it} = require('mocha')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync')
const requireYAML = require('require-yml')
const contentDir = path.join(__dirname, '../content')
const tree = walk(contentDir)
const i18n = require('..')
    
describe('i18n.api.array', () => {
  it('exports structured API data as arrays', () => {
    i18n.api.array.should.be.an('array')
    const apiNames = i18n.api.array.map(api => api.name)
    apiNames.should.include('app')
    apiNames.should.include('BrowserWindow')
  })
})

describe('i18n.api.tree', () => {
  it('exports structured API data as a tree', () => {
    i18n.api.tree.should.be.an('object')
    i18n.api.tree.BrowserWindow.instanceMethods.should.be.an('object')
  })
})

describe('i18n.api.get', () => {
  it('is a method for getting API by slug and locale', () => {
    const app = i18n.api.get('app')
    app.title.should.equal('app')
    app.description.should.include('Control your application')
  })

  it('includes all expected properties on each doc', () => {
    const app = i18n.api.get('app')
    app.title.should.equal('app')
    app.description.should.include('Control your application')
    app.locale.should.equal('en')
    app.slug.should.equal('app')
    app.category.should.equal('api')
    app.markdown.should.be.a('string')
    app.html.should.be.a('string')
  })

  it('accepts an optional locale argument')
  // app = i18n.api.get('app', 'fr-FR')
  // app.description.should.include('Contrôle le cycle de vie')
  // app.methods.quit.description.should.include('Essaye de fermer toutes les fenêtres')

  it('allows lookup by API name or url-friendly slug')
})

describe('i18n.guides.list', () => {
  it('is a method for getting a list of guide metadata', () => {
    const guides = i18n.guides.list()
    guides.should.be.an('array')
  })
})

describe('i18n.guides.get', () => {
  it('is a method for getting a guide by slug and locale', () => {
    const guide = i18n.guides.get('quick-start')
    guide.title.should.equal('Quick Start')
    guide.locale.should.equal('en')
  })
})

describe('i18n.locales', () => {
  it('exports a list of locales', () => {
    i18n.locales.should.be.an('array')
    i18n.locales.length.should.be.above(15)
    i18n.locales.should.include('en')
    i18n.locales.should.include('fr-FR')
  })
})
  
describe('source content', () => {
  it('includes tutorials and development docs', () => {
    tree.should.include('en/docs/tutorial/accessibility.md')
    tree.should.include('en/docs/development/coding-style.md')
  })
})
