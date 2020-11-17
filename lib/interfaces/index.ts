import { Entry as WalkEntry } from 'walk-sync'

export type $TSFixMe = any

export interface File {
  locale: string
  slug: string
  href: string
}

export interface DocsFile extends File {
  category: string
  categoryFancy: string
  isTutorial: boolean
  isApiDoc: boolean
  isDevTutorial: boolean
  isApiStructureDoc: boolean
  crowdinFileId: string
  githubUrl: string
  ignore?: boolean
  sections?: Array<ISection>
  title?: string
  description?: string
}

export interface BlogFile extends File {
  content: string
}

export interface IParseFile extends WalkEntry {
  locale?: string
  slug?: string
  category?: string
  categoryFancy?: string
  href?: string
  githubUrl?: string
  crowdinFileId?: string
  ignore?: boolean

  content?: string

  isTutorial?: boolean
  isApiDoc?: boolean
  isDevTutorial?: boolean
  isApiStructureDoc?: boolean

  sections?: Array<ISection>

  title?: string
  description?: string
}
export interface ISection {
  name: string
  slug: string
  level: number
  // TODO(HashimotoYT): Remove that in the final file
  body: string
  html: string | null
}
