import { promises as fs } from 'fs'
import * as path from 'path'
import * as hbs from 'handlebars'

export async function generateTYPES(versions: Array<string>) {
  const template = await fs.readFile(
    path.join(__dirname, './templates/types.ts.tpl'),
    { encoding: 'utf-8' }
  )
  const generated = hbs.compile(template)({ versions })

  return await fs.writeFile(
    path.join(__dirname, '../types/generated.ts'),
    generated
  )
}
