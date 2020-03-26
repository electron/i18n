import * as fs from 'fs-extra'
import * as path from 'path'
import * as packageJSON from '../package.json'

const now = new Date()

const JSTemplate = `module.exports = {
  blogs: require('./blogs.json'),
  docs: require('./docs.json'),
  glossary: require('./glossary.json'),
  locales: require('./locales.json'),
  navs: require('./navs.json'),
  website: require('./website.json'),

  electronLatestStableVersion: \'${packageJSON.electronLatestStableTag.replace(
    /^v/,
    ''
  )}\',
  electronLatestStableTag: \'${packageJSON.electronLatestStableTag}\',
  electronMasterBranchCommit: \'${packageJSON.electronMasterBranchCommit}\',

  date: \'${now}\'
}
`

const TSTemplate = `export declare const blogs: typeof import('./blogs.json')
export declare const docs: typeof import('./docs.json')
export declare const glossary: typeof import('./glossary.json')
export declare const locales: typeof import('./locales.json')
export declare const navs: typeof import('./navs.json')
export declare const website: typeof import('./website.json')

export declare const electronLatestStableVersion: string
export declare const electronLatestStableTag: string
export declare const electronMasterBranchCommit: string

export declare const date: string
`

export async function writeIndexFiles() {
  await Promise.all(
    ['js', 'd.ts'].map((extension) =>
      fs.promises.writeFile(
        path.resolve(__dirname, `../dist/index.${extension}`),
        extension === 'js' ? JSTemplate : TSTemplate
      )
    )
  )
}
