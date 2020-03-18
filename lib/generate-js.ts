import * as fs from 'fs'
import * as path from 'path'

const now = new Date()

const JSTemplate = `module.exports = {
  blogs: require('./blogs.json'),
  docs: require('./docs.json'),
  glossary: require('./glossary.json'),
  locales: require('./locales.json'),
  meta: require('./meta.json'),
  navs: require('./navs.json'),
  website: require('./website.json'),
  date: \'${now}\'
}
`

const TSTempalte = `export declare const blogs: typeof import('./blogs.json')
export declare const docs: typeof import('./docs.json')
export declare const glossary: typeof import('./glossary.json')
export declare const locales: typeof import('./locales.json')
export declare const meta: typeof import('./meta.json')
export declare const navs: typeof import('./navs.json')
export declare const website: typeof import('./website.json')
export declare const date: string
`

export async function writeIndexFiles() {
  for (const file of ['index.js', 'index.d.ts']) {
    fs.writeFileSync(
      path.join(__dirname, `../dist/${file}`),
      file === 'index.js' ? JSTemplate : TSTempalte
    )
  }
}
