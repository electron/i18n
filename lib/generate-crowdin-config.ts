import { promises as fs } from 'fs'
import * as path from 'path'
import * as hbs from 'handlebars'

export async function generateCrowdinConfig(versions: Array<string>) {
  const template = await fs.readFile(path.join(__dirname, './templates/crowdin.yml.tpl'), { encoding: 'utf8'})
  const generated = hbs.compile(template)({ versions })

  await fs.writeFile(path.join(__dirname, '../crowdin.yml'), generated)
}
