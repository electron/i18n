import { promises as fs } from 'fs'
import * as path from 'path'
import * as hbs from 'handlebars'
import { SupportedVersions } from '../types'

export async function generateUploader(versions: SupportedVersions) {
  const template = await fs.readFile(
    path.join(__dirname, './templates/gha-update.yml.tpl'),
    { encoding: 'utf-8' }
  )
  const generated = hbs.compile(template)({ versions })

  return await fs.writeFile(
    path.join(__dirname, '../../.github/workflows/update-content.yml'),
    generated
  )
}

export async function generateDownloader(versions: SupportedVersions) {
  const template = await fs.readFile(
    path.join(__dirname, './templates/gha-download.yml.tpl'),
    { encoding: 'utf-8' }
  )
  const generated = hbs.compile(template)({ versions })

  return await fs.writeFile(
    path.join(__dirname, '../../.github/workflows/download-content.yml'),
    generated
  )
}
