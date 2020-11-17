import * as path from 'path'
import * as fs from 'fs'
import * as URL from 'url'
import * as packageJSON from '../../package.json'
import { bashFix, fiddleUrls, plaintextFix } from '../transfomers'
import { DocsFile, ISection } from '../interfaces'
import hubdown = require('hubdown')
import * as cheerio from 'cheerio'
import { categoryNames, IGNORE_PATTERN } from '../constants'
import { Entry } from 'walk-sync'
const GithubSlugger = require('github-slugger')
const remark = require('remark')
const links = require('remark-inline-links')
const hrefType = require('href-type')

export async function parseFile(file: Entry, ids: Record<string, string>) {
  const locale = file.relativePath.split('/')[0]
  const slug = path.basename(file.relativePath, '.md')

  // derive category from file path
  // {locale}/docs/api/{filename} -> api
  const category = file.relativePath
    .split('/') // path.sep => /, separator in file.relativePath is just / in any OS
    .slice(2, -1)
    .join('/')

  // nice categories for use in nav
  const categoryFancy = categoryNames[category]

  const href = `/docs/${category}/${slug}`.replace('//', '/')

  // build a reference to the source
  const githubUrl = `https://github.com/electron/electron/tree/master${href}.md`

  const crowdinFileId = ids[`master/content/en-US${href}.md`]

  // convenience booleans for use in templates
  const isTutorial = category === 'tutorial'
  const isApiDoc = category === 'api'
  const isDevTutorial = category === 'development'
  const isApiStructureDoc = category === 'api/structures'

  // parse markdown to HTML
  const markdown = await fs.promises.readFile(file.fullPath, 'utf8')

  const docFile: DocsFile = {
    locale,
    slug,
    href,
    crowdinFileId,
    githubUrl,
    category,
    categoryFancy,
    isTutorial,
    isApiDoc,
    isApiStructureDoc,
    isDevTutorial,
  }

  // ignore some docs & skip the rest of the parsing logic
  if (markdown.includes(IGNORE_PATTERN)) {
    docFile.ignore = true
    return docFile
  }

  docFile.sections = await Promise.all(
    splitMd(await fixMdLinks(markdown)).map(async (section) => {
      const parsed = await hubdown(section.body, {
        runBefore: [plaintextFix, bashFix, fiddleUrls],
        highlight: {
          ignoreMissing: true,
        },
      })
      const $ = cheerio.load(parsed.content || '')
      docFile.title =
        docFile.title ||
        $('h1').first().text().trim() ||
        $('h2').first().text().replace('Class: ', '')
      docFile.description =
        docFile.description || $('blockquote').first().text().trim()

      // fix HREF for relative links
      $('a').each((_, el) => {
        const elementHref = $(el).attr('href')
        if (!elementHref || !href) {
          return ''
        }
        const type = hrefType(elementHref)
        if (type !== 'relative' && type !== 'rooted') return
        const dirname = path.dirname(href)
        const newHref = convertToUrlSlash(
          path.resolve(dirname, elementHref.replace(/\.md/, ''))
        )
        $(el).attr('href', newHref)
      })

      // fix SRC for relative images
      $('img').each((_, el) => {
        const baseUrl = 'https://cdn.rawgit.com/electron/electron'
        if (!href) {
          return ''
        }
        const dirname = path.dirname(href)
        let src = $(el).attr('src')
        if (!src) {
          return
        }
        const type = hrefType(src)
        if (type !== 'relative' && type !== 'rooted') return

        // turn `../images/foo/bar.png` into `/docs/images/foo/bar.png`
        src = convertToUrlSlash(path.resolve(dirname, src))

        const newSrc = isApiDoc
          ? [baseUrl, packageJSON.electronLatestStableTag, src].join('/')
          : [baseUrl, packageJSON.electronMasterBranchCommit, src].join('/')

        const parsed = URL.parse(newSrc)
        if (!parsed.path) return
        parsed.path = path.normalize(parsed.path)

        $(el).attr('src', URL.format(parsed))
      })

      section.html = $('body').html()

      return section
    })
  )

  return docFile
}

function fixMdLinks(md: string): Promise<string> {
  return new Promise((resolve, reject) => {
    remark()
      .use(links)
      .process(md, (err: Error, file: { contents: string }) => {
        if (err) {
          reject(err)
        } else {
          resolve(file.contents)
        }
      })
  })
}

function splitMd(md: string): Array<ISection> {
  const slugger = new GithubSlugger()
  const sections: Array<ISection> = []
  let section: ISection = { name: '', slug: '', body: '', level: 0, html: null }
  let bodyArray: Array<string> = []
  let isInCodeBlock = false

  const isHeading = (line: string) =>
    !isInCodeBlock && line.trim().startsWith('#')

  // TODO(erickzhao): Remove opening .trim() call because heading should never be tabbed in
  const cleanHeading = (heading: string) => ({
    text: heading.replace(/^\#{1,6}\ /, ''),
    level: (heading.trim().match(/^\#{1,6}\ /) as Array<string>)[0].trim()
      .length,
  })

  md.split('\n').forEach((curr, i, lines) => {
    if (curr.startsWith('```')) {
      isInCodeBlock = !isInCodeBlock
    }
    if (isHeading(curr)) {
      const heading = cleanHeading(curr)
      section.name = heading.text
      section.slug = slugger.slug(heading.text)
      section.level = heading.level
    }
    bodyArray.push(curr)

    let next = lines[i + 1]
    if (next === undefined || isHeading(next)) {
      section.body = bodyArray.join('\n')
      sections.push(section)
      section = { name: '', slug: '', body: '', level: 0, html: null }
      bodyArray.length = 0
    }
  })

  return sections
}

function convertToUrlSlash(filePath: string) {
  return filePath.replace(/C:\\/g, '/').replace(/\\/g, '/')
}
