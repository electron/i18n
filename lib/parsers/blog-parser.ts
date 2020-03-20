import * as path from 'path'
import * as fs from 'fs'
import { IParseFile } from '../interfaces'
const cleanDeep = require('clean-deep')

export async function parseBlogFile(file: IParseFile) {
  file.fullyPath = path.join(file.basePath, file.relativePath)
  file.locale = file.relativePath.split('/')[0]
  file.slug = path.basename(file.relativePath, '.md')

  file.href = `/blog/${file.slug}`.replace('//', '/')

  // file content
  file.content = await fs.promises.readFile(file.fullPath, 'utf8')

  // remove leftover file props from walk-sync
  delete file.mode
  delete file.size
  delete file.mtime
  delete file.relativePath
  delete file.basePath

  // remove empty values
  return cleanDeep(file)
}
