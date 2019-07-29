const visit = require('unist-util-visit')

// TODO: remove this transformer after support for versions
// which docs use invalid plaintext tags has been dropped

const regex = /^(text|txt)/

// temporary remark transformer for 'code' blocks to
// replace ```text and ```txt tags with ```plaintext
const plaintextFix = () => tree => {
  visit(tree, 'code', node => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'plaintext')
    }
  })
  return tree
}

module.exports = plaintextFix
