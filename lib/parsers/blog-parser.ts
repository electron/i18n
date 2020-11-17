import * as path from 'path'
import * as fs from 'fs'
import { BlogFile } from '../interfaces'
import { Entry } from 'walk-sync'

export async function parseBlogFile(file: Entry) {
  const locale = file.relativePath.split('/')[0]
  const slug = path.basename(file.relativePath, '.md')
  const href = `/blog/${slug}`.replace('//', '/')
  const content = await fs.promises.readFile(file.fullPath, 'utf8')

  const blogFile: BlogFile = { locale, slug, href, content }

  return blogFile
}
