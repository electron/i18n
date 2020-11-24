export type $TSFixMe = any

export interface IFile {
  locale: string
  slug: string
  href: string
}

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
  sections?: Array<ISection>
  title?: string
  description?: string
}

export interface IBlogFile extends IFile {
  content: string
}

export interface ISection {
  name: string
  slug: string
  level: number
  // TODO(HashimotoYT): Remove that in the final file
  body: string
  html: string | null
}
