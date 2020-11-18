import * as cheerio from 'cheerio'

export function parseNav(i18nDocs: Record<string, any>, locale: string) {
  const docs = i18nDocs[locale]
  const readme = docs['/docs/README']
  const html = readme.sections
    .map((section: { html: string }) => section.html)
    .join('\n')
  const $ = cheerio.load(html)
  const startHeading = $('h2')[1]
  // TODO(erickzhao): Ensure the `h3` under `listItems` get replaced with `li` elemenets
  const listItems = $(startHeading).nextUntil('h2')
  const nav = `<ul>${listItems}</ul>`
  return nav
}
