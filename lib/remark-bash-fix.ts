import * as visit from 'unist-util-visit'
import { Node } from "unist"

// TODO: remove this transformer after support for versions
// which docs use invalid bash tags has been dropped

const regex = /^(bash session)/

interface IAdditionalNode extends Node {
  lang: string
}

// temporary remark transformer for 'code' blocks to
// replace ```bash session tags with ```bash
export const bashFix = () => (tree: Node) => {
  visit(tree, 'code', (node: IAdditionalNode) => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'bash')
    }
  })
  return tree
}
