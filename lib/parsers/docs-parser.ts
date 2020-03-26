import * as path from 'path'
import { promises as fs } from 'fs-extra'
import * as URL from 'url'
import * as packageJSON from '../../package.json'
import { bashFix, fiddleUrls, plaintextFix } from '../transfomers'
import { IParseFile, $TSFixMe } from '../interfaces'
import hubdown = require('hubdown')
import * as cheerio from 'cheerio'
import { categoryNames, IGNORE_PATTERN } from '../constants'
const GithubSlugger = require('github-slugger')
const remark = require('remark')
const links = require('remark-inline-links')
const cleanDeep = require('clean-deep')
const hrefType = require('href-type')

export async function parseFile(file: IParseFile, ids: Record<string, string>) {
  file.fullyPath = path.join(file.basePath, file.relativePath)
  file.locale = file.relativePath.split('/')[0]
  file.slug = path.basename(file.relativePath, '.md')

  // derive category from file path
  // {locale}/docs/api/{filename} -> api
  file.category = file.relativePath
    .split('/') // path.sep => /, separator in file.relativePath is just / in any OS
    .slice(2, -1)
    .join('/')

  // nice categories for use in nav
  file.categoryFancy = categoryNames[file.category]

  file.href = `/docs/${file.category}/${file.slug}`.replace('//', '/')

  // build a reference to the source
  file.githubUrl = `https://github.com/electron/electron/tree/master${file.href}.md`

  file.crowdinFileId = ids[`master/content/en-US${file.href}.md`]

  // convenience booleans for use in templates
  file.isTutorial = file.category === 'tutorial'
  file.isApiDoc = file.category === 'api'
  file.isDevTutorial = file.category === 'development'
  file.isApiStructureDoc = file.category === 'api/structures'

  // parse markdown to HTML
  const markdown = await fs.readFile(file.fullyPath, 'utf8')

  // ignore some docs & skip the rest of the parsing logic
  if (markdown.includes(IGNORE_PATTERN)) {
    file.ignore = true
    return file
  }

  file.sections = await Promise.all(
    splitMd(await fixMdLinks(markdown)).map(async (section: $TSFixMe) => {
      const parsed = await hubdown(section.body, {
        runBefore: [plaintextFix, bashFix, fiddleUrls],
      })
      const $ = cheerio.load(parsed.content || '')
      file.title =
        file.title ||
        $('h1').first().text().trim() ||
        $('h2').first().text().replace('Class: ', '')
      file.description =
        file.description || $('blockquote').first().text().trim()

      // fix HREF for relative links
      $('a').each((i, el) => {
        const href = $(el).attr('href')
        if (!href || !file.href) {
          return ''
        }
        const type = hrefType(href)
        if (type !== 'relative' && type !== 'rooted') return
        const dirname = path.dirname(file.href)
        const newHref = convertToUrlSlash(
          path.resolve(dirname, href.replace(/\.md/, ''))
        )
        $(el).attr('href', newHref)
      })

      // fix SRC for relative images
      $('img').each((i, el) => {
        const baseUrl = 'https://cdn.rawgit.com/electron/electron'
        if (!file.href) {
          return ''
        }
        const dirname = path.dirname(file.href)
        let src = $(el).attr('src')
        if (!src) {
          return
        }
        const type = hrefType(src)
        if (type !== 'relative' && type !== 'rooted') return

        // turn `../images/foo/bar.png` into `/docs/images/foo/bar.png`
        src = convertToUrlSlash(path.resolve(dirname, src))

        const newSrc = file.isApiDoc
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

  // remove leftover file props from walk-sync
  // @ts-ignore We need them delete!
  delete file.fullPath
  delete file.fullyPath
  delete file.mode
  delete file.size
  delete file.mtime
  delete file.relativePath
  delete file.basePath

  // remove empty values
  return cleanDeep(file)
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

function splitMd(md: string): Array<{ name: null; body: string[] }> {
  const slugger = new GithubSlugger()
  const sections: Array<{ name: null; body: Array<string> }> = []
  let section = { name: null, body: [] as Array<string> }
  let inCodeBlock = false
  const isHeading = (line: string) =>
    !inCodeBlock && line.trim().startsWith('#')

  md.split('\n').forEach((curr, i, lines) => {
    if (curr.startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }
    if (isHeading(curr)) {
      section.name = slugger.slug(curr)
    }
    section.body.push(curr)

    let next = lines[i + 1]
    if (next === undefined || isHeading(next)) {
      section.body = section.body.join('\n') as $TSFixMe
      sections.push(section)
      section = { name: null, body: [] }
    }
  })

  return sections
}

function convertToUrlSlash(filePath: string) {
  return filePath.replace(/C:\\/g, '/').replace(/\\/g, '/')
}
