import {expect} from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import * as walk from 'walk-sync'

const docsBasedir = path.join(__dirname, '..', 'docs')
const tree = walk(docsBasedir)

console.log(tree)

describe('electron-i18n', () => {
  it('fetches tutorials and development docs', () => {
    expect(tree).to.include('tutorial/accessibility.md')
    expect(tree).to.include('development/coding-style.md')
  })

  it('ignores API docs', () => {
    expect(tree.some(path => path.includes('api/'))).to.equal(false)
  })

  it('collects website content')

})