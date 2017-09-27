const remark = require('remark')
const slug = require('remark-slug')
const hljs = require('remark-highlight.js')
const html = require('remark-html')
const github = require('remark-github')
const autolinkHeadings = require('remark-autolink-headings')
const inlineLinks = require('remark-inline-links')
const grayMatter = require('gray-matter')
const pify = require('pify')

const renderer = remark()
  .use(slug)
  .use(autolinkHeadings, {behaviour: 'wrap'})
  .use(github)
  .use(inlineLinks)
  .use([hljs, html], {sanitize: false})

module.exports = async function parseMarkdown (input) {
  const {data, content} = grayMatter(input)
  const md = await pify(renderer.process)(content)
  return Object.assign(data, {content: md.contents})
}
