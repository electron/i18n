import { Node } from 'unist'
import * as path from 'path'
import * as visit from 'unist-util-visit'
import { electronLatestStableTag } from '../../package.json'
import { IDocFile } from '../interfaces'

const hrefType = require('href-type')

interface Href extends Node {
  url: string
}

const hasRelativeUrl = (node: unknown): node is Href =>
  !!(node as Href).url && isRelative((node as Href).url)

/**
 *
 * @param docHref string The
 * @returns
 */
export function fixRelativeLinks(doc: IDocFile) {
  return () => (tree: Node) => {
    visit<Href>(tree, hasRelativeUrl, (node) => {
      const dir = path.dirname(doc.href)
      switch (node.type) {
        case 'definition':
        case 'link':
          node.url = convertToUrlSlash(
            path.resolve(dir, node.url.replace(/\.md/, ''))
          )
          break
        case 'image':
          const filePath = convertToUrlSlash(path.resolve(dir, node.url))
          const baseUrl = 'https://cdn.rawgit.com/electron/electron'

          // we don't use path.join because we don't want platform-specific separators
          const fullUrl = [baseUrl, electronLatestStableTag, filePath].join('/')
          node.url = fullUrl
          break
      }
    })
    return tree
  }
}

function isRelative(link: string) {
  const linkType = hrefType(link)
  return linkType === 'relative' || linkType === 'rooted'
}

function convertToUrlSlash(filePath: string) {
  return filePath.replace(/C:\\/g, '/').replace(/\\/g, '/')
}
