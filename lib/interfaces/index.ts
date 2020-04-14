import { Entry as WalkEntry } from 'walk-sync'

export type $TSFixMe = any

export interface IParseFile extends WalkEntry {
  fullyPath?: string
  locale?: string
  slug?: string
  category?: string
  categoryFancy?: string
  href?: string
  githubUrl?: string
  crowdinFileId?: string
  ignore?: boolean
  version?: string

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
