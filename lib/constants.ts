import * as path from 'path'

export const categoryNames: Record<string, string> = {
  api: 'API',
  'api/structures': 'API Structures',
  development: 'Development',
  tutorial: 'Guides',
}

export const IGNORE_PATTERN = '<!-- i18n-ignore -->'

export const englishBasepath = path.join(__dirname, '..', 'content', 'en-US')
