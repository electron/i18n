import * as path from 'path'
import * as fs from 'fs'
import { fixRelativeLinks, fiddleUrls, plaintextFix } from '../transfomers'
import { IDocFile } from '../interfaces'
import hubdown = require('hubdown')
import * as cheerio from 'cheerio'
import { categoryNames, IGNORE_PATTERN } from '../constants'
import { Entry } from 'walk-sync'

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
  const githubUrl = `https://github.com/electron/electron/tree/main${href}.md`

  // CrowdIn has this branch set to `master`
  const crowdinFileId = ids[`[electron.i18n] master/content/en-US${href}.md`]

  // convenience booleans for use in templates
  const isTutorial = category === 'tutorial'
  const isApiDoc = category === 'api'
  const isDevTutorial = category === 'development'
  const isApiStructureDoc = category === 'api/structures'

  // parse markdown to HTML
  const markdown = await fs.promises.readFile(file.fullPath, 'utf8')

  const docFile: IDocFile = {
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

  const parsed = await hubdown(markdown, {
    runBefore: [fixRelativeLinks(docFile), plaintextFix, fiddleUrls],
    highlight: {
      ignoreMissing: true,
    },
  })

  docFile.html = parsed.content
  const $ = cheerio.load(parsed.content || '')
  docFile.title =
    docFile.title ||
    $('h1').first().text().trim() ||
    $('h2').first().text().replace('Class: ', '')
  docFile.description =
    docFile.description || $('blockquote').first().text().trim()

  return docFile
}
