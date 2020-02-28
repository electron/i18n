import * as visit from 'unist-util-visit'
import { electronLatestStableTag } from '../../package.json'
import { Node } from 'unist'

const regex = /(javascript.*|js.*) fiddle='([^']*)'(.*)/

// TODO(deermichel): add test!

interface IAdditionalNode extends Node {
  lang: string

  data: {
    hProperties: Record<string, string>
  }
}

// remark transformer for 'code' blocks to
// embed fiddle urls as html attributes
export const fiddleUrls = () => (tree: Node) => {
  visit(tree, 'code', (node: IAdditionalNode) => {
    if (!node.lang) return

    const matches = node.lang.match(regex)
    if (matches) {
      // retrieve and remove url from language definition
      const url = `electron/${electronLatestStableTag}/${matches[2]}`
      node.lang = matches[1] + matches[3]

      // save url in data-fiddle-url html attribute
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.dataFiddleUrl = url
    }
  })
  return tree
}
