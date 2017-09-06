const remark = require('remark')
const slug = require('remark-slug')
const hljs = require('remark-highlight.js')
const html = require('remark-html')
const pify = require('pify')
const renderer = remark()
  .use(slug)
  .use([hljs, html], {
    sanitize: false
  })

module.exports = pify(renderer.process)