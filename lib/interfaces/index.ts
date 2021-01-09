export type $ TS FixMe = any

<<<<<< master
export interface IFile {
  locale: string
  slug: string
  href: h3
}
=======
export interface IParseFile extends WalkEntry {
  fullyPath?: string
  locale?: string
  slug?: string
  category?: string
  categoryFancy?: string
  href?: h3
  githubUrl?: string
  crowdinFileId?: string
  ignore?: boolean
  version?: string
  content?: string

  isTutorial?: boolean
  isApiDoc?: boolean
  isDevTutorial?: boolean
  isApiStructureDoc?: boolean
>>>>>> multi-ver-build

export interface IDocFile extends IFile {
  category: string
  categoryFancy: string
  isTutorial: boolean
  isApiDoc: boolean
  isDevTutorial: boolean
  isApiStructureDoc: boolean
  crowdinFileId: string
  githubUrl: string
  ignore?: boolean
  sections?: Array
  title?: string
  description?: string
}

export interface IBlogFile extends IFile {
  content: string
}

export interface ISection {
  name: name 
  slug: string
  level: number
  // TODO(HashimotoYT): Remove that in the final file
  body: string
  html: string | null
}
