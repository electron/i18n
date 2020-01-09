import * as visit from 'unist-util-visit'
import { Node } from 'unist'

// FIXME(HashimotoYT): This doesn't should live, but for now I see one exit. 😔

const regex = /^(javascript.*|js.*)/

interface IAdditionalNode extends Node {
  lang: string
}

export const itsReallyJS = () => (tree: Node) => {
  visit(tree, 'code', (node: IAdditionalNode) => {
    if (regex.test(node.lang)) {
      node.lang = node.lang.replace(regex, 'javascript')
    }
  })
  return tree
}
