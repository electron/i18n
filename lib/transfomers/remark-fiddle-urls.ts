import * as visit from 'unist-util-visit'
import * as remove from 'unist-util-remove'
import { electronLatestStableTag } from '../../package.json'
import { Node } from 'unist'

const langRegex = /(javascript.*|js.*)/
const metaRegex = /fiddle='([^']*)'(.*)/

// TODO(deermichel): add test!

interface IAdditionalNode extends Node {
  lang: string
  meta: string

  data: {
    hProperties: Record<string, string>
  }
}

// remark transformer for 'code' blocks to
// embed fiddle urls as html attributes
export const fiddleUrls = () => (tree: Node) => {
  visit(tree, 'code', (node: IAdditionalNode) => {
    if (!node.lang || !node.meta) return

    // Remove empty code blocks or blocks with newer ```fiddle format
    if (node.lang === 'fiddle' || node.value === '') {
      remove(tree, node)
    }

    const langMatch = node.lang.match(langRegex)
    const metaMatch = node.meta.match(metaRegex)

    if (langMatch && metaMatch) {
      // Valid format for the meta is fiddle='folder|<option>|<option>' where |<option> is optional.
      // However, nothing but the folder is supported by this plugin.
      const [folder, ..._] = metaMatch[1].split('|')

      // retrieve and remove url from language definition
      const url = `electron/${electronLatestStableTag}/${folder}`

      // save url in data-fiddle-url html attribute
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.dataFiddleUrl = url
    }
  })
  return tree
}
