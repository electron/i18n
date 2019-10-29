const visit = require('unist-util-visit')

// FIXME(HashimotoYT): This doesn't should live, but for now I see one exit. 😔

const regex = /^(javascript.*|js.*)/

const itsReallyJS = () => tree => {
  visit(tree, 'code', node => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'javascript')
    }
  })
  return tree
}

module.exports = itsReallyJS
