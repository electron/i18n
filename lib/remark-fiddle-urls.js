const visit = require('unist-util-visit')

// remark transformer for 'code' blocks to
// embed fiddle urls as html attributes
const fiddleUrls = () => tree => {
  const regex = /fiddle='(.*)'/
  visit(tree, 'code', node => {
    if (node.lang && node.lang.includes('fiddle')) {
      // retrieve and remove url from language definition
      const url = node.lang.match(regex)[1]
      node.lang = node.lang.replace(regex, '').trim()

      // save url in data-fiddle-url html attribute
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.dataFiddleUrl = url
    }
  })
  return tree
}

module.exports = fiddleUrls