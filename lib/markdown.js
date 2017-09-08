const remark = require('remark')
const slug = require('remark-slug')
const hljs = require('remark-highlight.js')
const html = require('remark-html')
const github = require('remark-github')
const autolinkHeadings = require('remark-autolink-headings')
const inlineLinks = require('remark-inline-links')
const pify = require('pify')

const renderer = remark()
  .use(slug)
  .use(autolinkHeadings)
  .use(github)
  .use(inlineLinks)
  .use([hljs, html], {
    sanitize: false
  })

module.exports = pify(renderer.process)
