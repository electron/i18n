require('make-promises-safe')

const chai = require('chai')
chai.should()
chai.use(require('chai-date-string'))
const { expect } = chai
const { describe, it, xit } = require('mocha')
const i18n = require('../dist')
const cheerio = require('cheerio')

describe('i18n.docs', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.docs)
    locales.should.include('en-US')
    locales.should.include('fr-FR')
    locales.length.should.be.above(10)
  })

  it('is an object with docs objects as values', () => {
    const docs = i18n.docs['en-US']
    docs.should.be.an('object')
    docs['/docs/api/accelerator'].should.be.an('object')
  })

  it('sets githubUrl on every doc', () => {
    const base = 'https://github.com/electron/electron/tree/master'
    const docs = i18n.docs['en-US']
    docs['/docs/api/accelerator'].githubUrl.should.equal(
      `${base}/docs/api/accelerator.md`
    )
    docs['/docs/tutorial/electron-versioning'].githubUrl.should.equal(
      `${base}/docs/tutorial/electron-versioning.md`
    )
  })

  it('does not contain <html>, <head>, or <body> tag in compiled html', () => {
    const html = i18n.docs['en-US']['/docs/api/accelerator'].sections
      .map((section) => section.html)
      .join('')
    html.should.be.a('string')
    html.should.contain('<p>')
    html.should.not.contain('<html>')
    html.should.not.contain('</html>')
    html.should.not.contain('<head>')
    html.should.not.contain('</head>')
    html.should.not.contain('<body>')
    html.should.not.contain('</body>')
  })

  // disabled until we come up with a nice strategy for
  // dealing with renamed files in electron/electron and how to redirect
  //
  // it('ignores files that have a special <!-- i18n-ignore --> HTML comment', () => {
  //   fs.existsSync(path.join(__dirname, '../content/en-US/docs/tutorial/electron-versioning.md')).should.eq(true)

  //   const filenames = Object.keys(i18n.docs['en-US'])
  //   filenames.should.include('/docs/tutorial/versioning')
  //   filenames.should.not.include('/docs/tutorial/electron-versioning')
  // })

  describe('sections', () => {
    it('breaks up HTML into sections, for language-toggling on the website', () => {
      const { sections } = i18n.docs['en-US']['/docs/api/accelerator']
      sections.should.be.an('array')
      sections.length.should.be.above(0)
      sections.every((section) => section.name && section.html).should.eq(true)
    })

    xit('does not contain empty sections', function () {
      this.timeout(15 * 1000)
      const locales = Object.keys(i18n.docs)
      locales.length.should.be.above(0)
      locales.forEach((locale) => {
        const docHrefs = Object.keys(i18n.docs[locale])
        docHrefs.length.should.be.above(0)
        docHrefs.forEach((href) => {
          const doc = i18n.docs[locale][href]
          doc.sections.length.should.be.above(0)
          doc.sections.forEach((section) => {
            expect(
              section.name,
              `${locale} ${href} has a section without a name`
            ).to.be.a('string')
            section.name.length.should.be.above(0)

            expect(
              section.slug,
              `${locale} ${href} has a section without a slug`
            ).to.be.a('string')
            section.slug.length.should.be.above(0)

            expect(
              section.level,
              `${locale} ${href} has a section without a level`
            ).to.be.a('number')
            section.level.should.be.within(1, 6)

            expect(
              section.html,
              `${locale} ${href} has a section without html`
            ).to.be.a('string')
            section.html.length.should.be.above(0)
          })
        })
      })
    }).timeout(5000)
  })
})

describe('i18n.versionedDocs', () => {
  it('is an object with three versions inside', () => {
    const versions = Object.keys(i18n.versionedDocs)
    expect(versions.length).to.equal(3)
  })

  i18n.electronSupportedVersions.forEach((version) => {
    it(`is an object with docs object as value for (version ${version})`, () => {
      const docs = i18n.versionedDocs[version]['en-US']
      expect(docs).should.be.an('object')
      expect(docs[`/docs/${version}/api/accelerator`]).should.be.an('object')
    })

    it(`sets githubUrl on every doc (version ${version})`, () => {
      const base = 'https://github.com/electron/electron/tree/master'
      const docs = i18n.versionedDocs[version]['en-US']
      docs[`/docs/${version}/api/accelerator`].githubUrl.should.equal(
        `${base}/docs/${version}/api/accelerator.md`
      )
      docs[
        `/docs/${version}/tutorial/electron-versioning`
      ].githubUrl.should.equal(
        `${base}/docs/${version}/tutorial/electron-versioning.md`
      )
    })

    it(`does not contain <html>, <head>, or <body> tag in compiled html (version ${version})`, () => {
      const html = i18n.versionedDocs[version]['en-US'][
        `/docs/${version}/api/accelerator`
      ].sections
        .map((section) => section.html)
        .join('')
      html.should.be.a('string')
      html.should.contain('<p>')
      html.should.not.contain('<html>')
      html.should.not.contain('</html>')
      html.should.not.contain('<head>')
      html.should.not.contain('</head>')
      html.should.not.contain('<body>')
      html.should.not.contain('</body>')
    })

    it(`breaks up HTML into sections, for language-toggling on the website (version ${version})`, () => {
      const { sections } = i18n.versionedDocs[version]['en-US'][
        `/docs/${version}/api/accelerator`
      ]
      sections.should.be.an('array')
      sections.length.should.be.above(0)
      sections.every((section) => section.name && section.html).should.eq(true)
    })
  })
})

describe('i18n.blogs', () => {
  it('is an object with locales as keys', () => {
    const locales = Object.keys(i18n.blogs)
    expect(locales).includes('en-US')
    expect(locales).includes('ru-RU')
    expect(locales.length).to.be.above(10)
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
    locales.length.should.be.above(10)
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
    locales.length.should.be.above(10)
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
    app.sections.should.be.an('array')
    app.sections.length.should.be.above(0)
  })

  it('trims API descriptions', () => {
    const api = i18n.docs['en-US']['/docs/api/browser-window']
    api.description.should.eq('Create and control browser windows.')
  })

  it('sorts docs by slug per locale', () => {
    const locales = Object.keys(i18n.locales)
    locales.length.should.be.above(10)
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
    const $ = cheerio.load(api.sections.map((section) => section.html).join(''))
    const link = $('a[href*="glossary"]').first()
    link.attr('href').should.equal('/docs/glossary#main-process')
  })

  it('fixes relative images in docs', () => {
    const doc = i18n.docs['en-US']['/docs/tutorial/electron-versioning']
    const $ = cheerio.load(doc.sections.map((section) => section.html).join(''))
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

  /** *********************************** FIXME **************************************
   ** enable this test when the next stable release (> 1.8.3) of electron comes out **
   ** see: https://github.com/electron/i18n/pull/274#issuecomment-373003188         **
   ***********************************************************************************/
  it.skip('contains no empty links', () => {
    Object.keys(i18n.docs['en-US']).forEach((href) => {
      const doc = i18n.docs['en-US'][href]
      doc.sections.forEach((section) => {
        const $ = cheerio.load(section.html)
        $('a[href=""]').length.should.equal(0, `${doc.href} has an empty link`)
      })
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
    doc.crowdinFileId.should.equal('128')
  })
})

describe('i18n.locales', () => {
  it('is an object with locales as keys', () => {
    i18n.locales.should.be.an('object')
    const keys = Object.keys(i18n.locales)
    keys.should.include('en-US')
    keys.should.include('fr-FR')
    keys.should.include('zh-TW')
    keys.should.include('pt-BR')
  })

  it('includes countryCode for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(10)
    keys.forEach((locale) => {
      i18n.locales[locale].countryCode.should.be.a('string')
    })
    i18n.locales['en-US'].countryCode.should.equal('US')
    i18n.locales['pt-BR'].countryCode.should.equal('BR')
  })

  it('includes countryName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(10)
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
    keys.length.should.be.above(10)
    keys.forEach((locale) => {
      i18n.locales[locale].languageCode.should.be.a('string')
    })
    i18n.locales['en-US'].languageCode.should.equal('en')
    i18n.locales['pt-BR'].languageCode.should.equal('pt-BR')
    i18n.locales['zh-CN'].languageCode.should.equal('zh-CN')
    i18n.locales['zh-TW'].languageCode.should.equal('zh-TW')
  })

  it('includes languageName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(10)
    keys.forEach((locale) => {
      i18n.locales[locale].languageName.should.be.a('string')
    })
    i18n.locales['en-US'].languageName.should.equal('English')
    i18n.locales['pt-BR'].languageName.should.equal('Portuguese')
  })

  it('sets some custom language names', () => {
    i18n.locales['zh-TW'].languageName.should.equal('Chinese Traditional')
    i18n.locales['zh-CN'].languageName.should.equal('Chinese Simplified')
  })

  it('includes languageNativeName for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(10)
    keys.forEach((locale) => {
      i18n.locales[locale].languageNativeName.should.be.a('string')
    })
    i18n.locales['en-US'].languageNativeName.should.equal('English')
    i18n.locales['pt-BR'].languageNativeName.should.equal('Português')
  })

  it('includes stats for every locale', () => {
    const keys = Object.keys(i18n.locales)
    keys.length.should.be.above(10)
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
    progress[4].should.be.above(progress[8])
  })
})

describe('i18n.navs', () => {
  it('is an object with locales as keys', () => {
    i18n.navs.should.be.an('object')
    const keys = Object.keys(i18n.navs)
    keys.should.include('en-US')
    keys.should.include('fr-FR')
    keys.length.should.be.above(10)
  })

  // TODO: This test starts failed for an undefined reason.
  // Please try to re-enable after some time.
  it.skip('has a value and has valid html content as values', () => {
    const values = Object.values(i18n.navs)
    values.every((value) => value.should.be.a('string'))
    values.every((value) => value.should.contain('<ul>'))
    values.every((value) => value.should.contain('<li>'))
    values.should.not.contain('<html>')
    values.should.not.contain('</html>')
    values.should.not.contain('<head>')
    values.should.not.contain('</head>')
    values.should.not.contain('<body>')
    values.should.not.contain('</body>')
  })

  it('has the required sidebar nav content for tutorials', () => {
    const value = i18n.navs['en-US']
    value.should.contain('<a href="/docs/tutorial/development-environment"')
    value.should.contain('Setting up the Development Environment')
  })
})

describe('i18n.electronMasterBranchCommit', () => {
  it('exists', () => {
    i18n.electronMasterBranchCommit.should.be.a('string')
  })

  it('is a SHA', () => {
    i18n.electronMasterBranchCommit.length.should.eq(40)
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
    i18n.electronLatestStableTag.should.eq(
      'v' + i18n.electronLatestStableVersion
    )
  })
})

describe('i18n.electronSupportedVersions', () => {
  it('its an array', () => {
    expect(i18n.electronSupportedVersions).to.be.an('array')
  })

  it('contains three last versions', () => {
    expect(i18n.electronSupportedVersions.length).to.equal(3)
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
