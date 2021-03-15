import { promises as fs } from 'fs'
import * as path from 'path'
import * as hbs from 'handlebars'
import { SupportedVersions } from '../types'

const getTemplate = async (name: string) => fs.readFile(path.join(__dirname, `./templates/${name}.yml.tpl`), { encoding: 'utf-8'})

export async function generateUploader(versions: SupportedVersions) {
  const template = await getTemplate('gha-update')
  const generated = hbs.compile(template)({ versions })

  return await fs.writeFile(
    path.join(__dirname, '../../.github/workflows/update-content.yml'),
    generated
  )
}

export async function generateDownloader(versions: SupportedVersions) {
  const template = await getTemplate('gha-download')
  const generated = hbs.compile(template)({ versions })

  return await fs.writeFile(
    path.join(__dirname, '../../.github/workflows/download-content.yml'),
    generated
  )
}

export async function generateAutoMerge() {
  const template = await getTemplate('auto-merge')
  const generated = hbs.compile(template)({})

  return await fs.writeFile(
    path.join(__dirname, '../../.github/workflows/auto-merge.yml'),
    generated,
  )
}
