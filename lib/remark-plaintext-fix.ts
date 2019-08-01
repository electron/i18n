import * as visit from 'unist-util-visit'
import { Node } from 'unist';

// TODO: remove this transformer after support for versions
// which docs use invalid plaintext tags has been dropped

const regex = /^(text|txt)/

interface IAdditionalNode extends Node {
  lang: string
}

// temporary remark transformer for 'code' blocks to
// replace ```text and ```txt tags with ```plaintext
export const plaintextFix = () => (tree: Node) => {
  visit(tree, 'code', (node: IAdditionalNode) => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'plaintext')
    }
  })
  return tree
}

module.exports = plaintextFix
