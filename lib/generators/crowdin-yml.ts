import { promises as fs } from 'fs'
import * as path from 'path'
import * as hbs from 'handlebars'
import { versions } from '../types'

export async function generateCrowdinConfig(outputDir: string) {
  const template = await fs.readFile(
    path.join(__dirname, './templates/crowdin.yml.tpl'),
    { encoding: 'utf8' }
  )
  const generated = hbs.compile(template)({})

  return await fs.writeFile(path.join(outputDir, 'crowdin.yml'), generated)
}
