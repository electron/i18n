require('make-promises-safe')

const chai = require('chai')
chai.should()
chai.use(require('chai-date-string'))
const { expect } = chai
const { describe, it } = require('mocha')
const i18n = require('../dist')
const cheerio = require('cheerio')

describe('i18n.docs', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.docs)
    locales.should.include('en-US')
    locales.should.include('fr-FR')
    locales.length.should.equal(8)
  })

  it('is an object with docs objects as values', () => {
    const docs = i18n.docs['en-US']
    docs.should.be.an('object')
    docs['/docs/api/accelerator'].should.be.an('object')
  })

  it('sets githubUrl on every doc', () => {
    const base = 'https://github.com/electron/electron/tree/main'
    const docs = i18n.docs['en-US']
    docs['/docs/api/accelerator'].githubUrl.should.equal(
      `${base}/docs/api/accelerator.md`
    )
    docs['/docs/tutorial/electron-versioning'].githubUrl.should.equal(
      `${base}/docs/tutorial/electron-versioning.md`
    )
  })

  it('does not contain <html>, <head>, or <body> tag in compiled html', () => {
    const html = i18n.docs['en-US']['/docs/api/accelerator'].html
    html.should.be.a('string')
    html.should.contain('<p>')
    html.should.not.contain('<html>')
    html.should.not.contain('</html>')
    html.should.not.contain('<head>')
    html.should.not.contain('</head>')
    html.should.not.contain('<body>')
    html.should.not.contain('</body>')
  })
})

describe('i18n.blogs', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.blogs)
    expect(locales).includes('en-US')
    expect(locales).includes('ru-RU')
    expect(locales.length).to.be.above(7)
  })

  it('is an object with blogs objects as values', () => {
    const blogs = i18n.blogs['en-US']
    blogs.should.be.an('object')
    blogs['/blog/12-week-cadence'].should.be.an('object')
  })
})

describe('i18n.glossary', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.glossary)
    locales.should.include('en-US')
    locales.should.include('fr-FR')
    locales.length.should.be.above(7)
  })

  it('contains localized glossary objects', () => {
    const glossary = i18n.glossary['en-US']
    glossary.should.be.an('object')
    const entry = glossary['DMG']
    entry.should.be.an('object')
  })

  it('sets expected properties on every entry', () => {
    const glossary = Object.values(i18n.glossary['en-US'])
    glossary.length.should.be.at.least(10)
    glossary
      .every((entry) => {
        return entry.term.length && entry.description.length
      })
      .should.eq(true)
  })
})

describe('i18n.website', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.website)
    locales.should.include('en-US')
    locales.should.include('fr-FR')
    locales.length.should.be.above(7)
  })

  it('contains localized strings', () => {
    i18n.website['en-US'].tagline.should.contain('desktop apps')
    i18n.website['ru-RU'].tagline.should.contain(
      'кросс-платформенные приложения'
    )
  })
})

describe('API Docs', () => {
  it('has a title for every doc', () => {
    const locales = Object.keys(i18n.locales)
    locales.length.should.be.above(1)
    locales.forEach((locale) => {
      const docs = Object.keys(i18n.docs[locale]).map(
        (key) => i18n.docs[locale][key]
      )
      const titles = docs.map((doc) => doc.title)
      const hasTitle = (title) => title !== ''
      titles.length.should.be.above(1)
      titles.every(hasTitle).should.equal(true)
    })
  })

  it('derives title from the first H1 or H2', () => {
    const api = i18n.docs['en-US']['/docs/api/browser-view']
    api.title.should.eq('BrowserView')
  })

  it('includes all expected properties', () => {
    const app = i18n.docs['en-US']['/docs/api/app']
    app.isApiDoc.should.equal(true)
    app.title.should.equal('app')
    app.description.should.include('Control your application')
    app.href.should.equal('/docs/api/app')
    app.locale.should.equal('en-US')
    app.slug.should.equal('app')
    app.category.should.equal('api')
    app.html.should.be.a('string')
  })

  it('trims API descriptions', () => {
    const api = i18n.docs['en-US']['/docs/api/browser-window']
    api.description.should.eq('Create and control browser windows.')
  })

  it('sorts docs by slug per locale', () => {
    const locales = Object.keys(i18n.locales)
    locales.length.should.be.above(7)
    locales.forEach((locale) => {
      const docs = Object.keys(i18n.docs[locale]).map(
        (key) => i18n.docs[locale][key]
      )
      docs.length.should.be.above(10)

      const slugs = docs.map((doc) => doc.slug)
      slugs.length.should.be.above(10)

      const sortedSlugs = slugs.slice(0).sort((a, b) => a.localeCompare(b))
      const a = slugs.indexOf('app')
      const b = slugs.indexOf('browser-window')
      a.should.be.above(-1)
      b.should.be.above(-1)
      b.should.be.above(a)

      sortedSlugs.should.deep.equal(slugs)
    })
  })

  it('fixes relative links in docs', () => {
    const api = i18n.docs['en-US']['/docs/api/app']
    const $ = cheerio.load(api.html)
    const link = $('a[href*="glossary"]').first()
    link.attr('href').should.equal('/docs/glossary#main-process')
  })

  // since we use remark-relative-links in markdown, the parsing logic
  // for definition nodes is separate from link nodes in the AST
  it('fixes relative definitions in docs', () => {
    const api = i18n.docs['en-US']['/docs/tutorial/installation']
    const $ = cheerio.load(api.html)
    const link = $('a[href*="electron-versioning"]').first()
    link.attr('href').should.equal('/docs/tutorial/electron-versioning')
  })

  it('fixes relative images in docs', () => {
    const doc = i18n.docs['en-US']['/docs/tutorial/electron-versioning']
    const $ = cheerio.load(doc.html)
    const sources = $('img')
      .map((i, el) => $(el).attr('src'))
      .get()

    sources.length.should.be.above(3)
    sources
      .every((src) =>
        src.startsWith('https://cdn.rawgit.com/electron/electron/')
      )
      .should.eq(true)
  })

  it('contains no empty links', () => {
    Object.keys(i18n.docs['en-US']).forEach((href) => {
      const doc = i18n.docs['en-US'][href]
      const $ = cheerio.load(doc.html)
      $('a[href=""]').length.should.equal(0, `${doc.href} has an empty link`)
    })
  })
})

describe('API Structures', () => {
  it('includes all expected properties', () => {
    const doc = i18n.docs['en-US']['/docs/api/structures/gpu-feature-status']
    doc.title.should.equal('GPUFeatureStatus Object')
    doc.category.should.equal('api/structures')
    doc.categoryFancy.should.equal('API Structures')
    doc.isApiStructureDoc.should.equal(true)
  })

  it('sets expected crowdinFileId', () => {
    const doc = i18n.docs['fr-FR']['/docs/api/structures/gpu-feature-status']
    doc.crowdinFileId.should.equal('250646')
  })
})

describe('i18n.locales', () => {
  it('is an object with locales as keys', () => {
    i18n.locales.should.be.an('object')
    const keys = Object.keys(i18n.locales)
    keys.should.include('en-US')
    keys.should.include('fr-FR')
    keys.should.include('ru-RU')
    keys.should.include('pt-BR')
  })

  it('includes countryCode for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      i18n.locales[locale].countryCode.should.be.a('string')
    })
    i18n.locales['en-US'].countryCode.should.equal('US')
    i18n.locales['pt-BR'].countryCode.should.equal('BR')
  })

  it('includes countryName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      expect(
        i18n.locales[locale].countryName,
        `${locale} does not nave a country name`
      ).to.be.a('string')
    })
    i18n.locales['en-US'].countryName.should.equal('United States')
    i18n.locales['pt-BR'].countryName.should.equal('Brazil')
  })

  it('includes languageCode for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      i18n.locales[locale].languageCode.should.be.a('string')
    })
    i18n.locales['en-US'].languageCode.should.equal('en')
    i18n.locales['pt-BR'].languageCode.should.equal('pt-BR')
    i18n.locales['zh-CN'].languageCode.should.equal('zh-CN')
    i18n.locales['ru-RU'].languageCode.should.equal('ru')
  })

  it('includes languageName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      i18n.locales[locale].languageName.should.be.a('string')
    })
    i18n.locales['en-US'].languageName.should.equal('English')
    i18n.locales['pt-BR'].languageName.should.equal('Portuguese')
  })

  it('sets some custom language names', () => {
    i18n.locales['ru-RU'].languageName.should.equal('Russian')
    i18n.locales['zh-CN'].languageName.should.equal('Chinese Simplified')
  })

  it('includes languageNativeName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      i18n.locales[locale].languageNativeName.should.be.a('string')
    })
    i18n.locales['en-US'].languageNativeName.should.equal('English')
    i18n.locales['pt-BR'].languageNativeName.should.equal('Português')
  })

  it('includes stats for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(7)
    keys.forEach((locale) => {
      i18n.locales[locale].stats.should.be.an('object')
      i18n.locales[locale].stats.translated_progress.should.be.a('number')
      i18n.locales[locale].stats.approved_progress.should.be.a('number')
    })
    i18n.locales['en-US'].stats.translated_progress.should.equal(101)
    i18n.locales['en-US'].stats.approved_progress.should.equal(101)
  })

  it('sorts locales by translation progress', () => {
    const progress = Object.keys(i18n.locales).map(
      (locale) => i18n.locales[locale].stats.translated_progress
    )
    progress[0].should.be.above(progress[4])
    progress[3].should.be.above(progress[7])
  })
})

describe('i18n.electronLatestStableTag', () => {
  it('exists', () => {
    i18n.electronLatestStableTag.should.be.a('string')
  })

  it('is a tag name', () => {
    i18n.electronLatestStableTag.should.match(/^v\d+\.\d+\.\d+$/)
  })
})

describe('i18n.date', () => {
  it('exists', () => {
    i18n.date.should.be.a('string')
  })

  it('is a date', () => {
    i18n.date.should.be.a.dateString()
  })
})
