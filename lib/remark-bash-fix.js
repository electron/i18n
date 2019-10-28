const visit = require('unist-util-visit')

// TODO: remove this transformer after support for versions
// which docs use invalid bash tags has been dropped

const regex = /^(bash session)/

// temporary remark transformer for 'code' blocks to
// replace ```bash session tags with ```bash
const bashFix = () => tree => {
  visit(tree, 'code', node => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'bash')
    }
  })
  return tree
}

module.exports = bashFix
