import * as cheerio from 'cheerio'

export function parseNav(i18nDocs: Record<string, any>, locale: string) {
  const docs = i18nDocs[locale]
  console.log('PARSE NAV', i18nDocs)
  console.log('INPUT DOC', docs)
  const readme = docs['/docs/README']
  console.log(readme)
  const html = readme.sections
    .map((section: { html: string }) => section.html)
    .join('\n')
  const $ = cheerio.load(html)
  const startHeading = $('h2')[1]
  const listItems = $(startHeading).next('ul').html()
  const nav = `<ul>${listItems}</ul>`
  return nav
}
