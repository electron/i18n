require('chai').should()
const {describe, it} = require('mocha')
const i18n = require('..')

describe('i18n.docs', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.docs)
    locales.should.include('en')
    locales.should.include('fr-FR')
    locales.length.should.be.above(10)
  })

  it('is an object with docs objects as values', () => {
    const docs = i18n.docs.en
    docs.should.be.an('object')
    docs['/docs/api/accelerator'].should.be.an('object')
  })
})

describe('API Doc', () => {
  it('includes all expected properties', () => {
    const app = i18n.docs['en']['/docs/api/app']
    app.isApiDoc.should.equal(true)
    app.title.should.equal('app')
    app.description.should.include('Control your application')
    app.href.should.equal('/docs/api/app')
    app.locale.should.equal('en')
    app.slug.should.equal('app')
    app.category.should.equal('api')
    app.markdown.should.be.a('string')
    app.html.should.be.a('string')
  })
})

describe('API Structure', () => {
  it('has expected properties', () => {
    const doc = i18n.docs['en']['/docs/api/structures/gpu-feature-status']
    doc.title.should.equal('GPUFeatureStatus Object')
    doc.category.should.equal('api/structures')
    doc.categoryFancy.should.equal('API Structures')
    doc.isApiStructureDoc.should.equal(true)
  })
})

describe('i18n.locales', () => {
  it('is an array of locale strings', () => {
    i18n.locales.should.be.an('array')
    i18n.locales.length.should.be.above(15)
    i18n.locales.should.include('en')
    i18n.locales.should.include('fr-FR')
  })
})
