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

describe('i18n.website', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.website)
    locales.should.include('en')
    locales.should.include('fr-FR')
    locales.length.should.be.above(10)
  })

  it('contains localized strings', () => {
    i18n.website.en.tagline.should.contain('desktop apps')
    i18n.website['fr-FR'].tagline.should.contain('applications desktop')
  })
})

describe('API Docs', () => {
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

describe('API Structures', () => {
  it('includes all expected properties', () => {
    const doc = i18n.docs['en']['/docs/api/structures/gpu-feature-status']
    doc.title.should.equal('GPUFeatureStatus Object')
    doc.category.should.equal('api/structures')
    doc.categoryFancy.should.equal('API Structures')
    doc.isApiStructureDoc.should.equal(true)
  })
})

describe('i18n.locales', () => {
  it('is an array of locale objects', () => {
    i18n.locales.should.be.an('array')
    i18n.locales.length.should.be.above(15)

    const vi = i18n.locales.find(locale => locale.code === 'vi')
    vi.name.should.equal('Vietnamese')
    vi.translated_progress.should.be.a('number')
  })
})

describe('i18n.electronLatestStableVersion', () => {
  it('exists', () => {
    i18n.electronLatestStableVersion.should.be.a('string')
  })

  it('is a version number', () => {
    i18n.electronLatestStableVersion.should.match(/^\d+\.\d+\.\d+$/)
  })
})

describe('i18n.electronLatestStableTag', () => {
  it('exists', () => {
    i18n.electronLatestStableTag.should.be.a('string')
  })

  it('is a tag name', () => {
    i18n.electronLatestStableTag.should.match(/^v\d+\.\d+\.\d+$/)
    i18n.electronLatestStableTag.should.eq('v' + i18n.electronLatestStableVersion)
  })
})

