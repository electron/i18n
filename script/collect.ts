#!/usr/bin/env ts-node

/**
 * This script synchronizes the documentation changes from the different
 * upstreams projects for the latest stable release (if applicable) and
 * cleans up any file that is no longer being used in all the supported
 * locales;
 */

import * as del from 'del'
import { promises as fs } from 'fs'
import got from 'got'
import { sync as mkdir } from 'make-dir'
import * as path from 'path'
import { execSync } from 'child_process'
import { Octokit } from '@octokit/rest'
import { roggy, IResponse as IRoggyResponse } from 'roggy'
import walkSync = require('walk-sync')

/** The root path where all the localized content lives. */
const allContentBasePath = path.join(__dirname, '..', 'content')

/** The root path for the `en-US` content. This is where the content from upstream get synced */
const englishBasePath = path.join(allContentBasePath, 'en-US')

const github = new Octokit({
  auth: process.env.GH_TOKEN ?? '',
})

type Release = {
  url: string
  html_url: string
  assets_url: string
  upload_url: string
  tarball_url: string | null
  zipball_url: string | null
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  assets: {
    name: string
    browser_download_url: string
  }[]
  body_text?: string | undefined
}

type Content = {
  filename: string
  markdown_content?: string
  content?: string
}

main().catch((err: Error) => {
  console.log('Something goes wrong. Error: ', err)
  process.exit(1)
})

async function main() {
  const release = await fetchLatestStableRelease()

  await writeToPackageJSON('electronLatestStableTag', release.tag_name)

  const electronContents = await roggy(release.tag_name, {
    owner: 'electron',
    repository: 'electron',
  })

  const apiDocs = await filterAPIDocs(electronContents)
  const apiDefinitions = await fetchApiDefinitions(release)
  const tutorials = await filterTutorials(electronContents)
  const websiteContent = await fetchWebsiteContent()
  const blogposts = await fetchWebsiteBlogPosts()

  const content = [
    ...apiDocs,
    apiDefinitions,
    ...tutorials,
    websiteContent,
    ...blogposts,
  ]

  /**
   * Some files might be moved or deleted from upstream and we need to make sure
   * we keep the same structure.
   */
  const obsoleteFiles = await getObsoleteFiles(content, allContentBasePath)
  await deleteContent(obsoleteFiles)

  await writeContent(content)
}

async function fetchLatestStableRelease(): Promise<Release> {
  console.log(`Determining 'latest' version dist-tag on npm`)
  const version = execSync('npm show electron version').toString().trim()

  console.log(`Fetching release data from GitHub`)

  const repo = {
    owner: 'electron',
    repo: 'electron',
    tag: `v${version}`,
  }

  const res = await github.repos.getReleaseByTag(repo)
  return res.data
}

async function deleteContent(files: string[]) {
  console.log('Deleting content:')

  const deletions = files.map((file) => {
    console.log(file)
    return del(file)
  })

  return Promise.all(deletions)
}

async function filterAPIDocs(docs: IRoggyResponse[]) {
  const apis = []
  for (const doc of docs) {
    if (doc.filename.startsWith('api/')) {
      apis.push({
        ...doc,
        filename: path.join('docs', doc.filename),
      })
    }
  }

  return apis
}

async function fetchApiDefinitions(release: Release) {
  console.log(
    `Fetching API definitions from electron/electron#${release.tag_name}`
  )

  const filename = 'electron-api.json'

  const asset = release.assets.find((asset) => asset.name === filename)

  if (!asset) {
    throw new Error(`No electron-api.json asset found for ${release.tag_name}`)
  }

  const content = (await got(asset.browser_download_url)).body.trim()

  return {
    filename,
    content,
  }
}

async function filterTutorials(docs: IRoggyResponse[]) {
  console.log(`Filtering tutorials`)

  const tutorials = []

  for (const doc of docs) {
    if (
      !doc.filename.startsWith('api/') &&
      !doc.filename.includes('images/') &&
      !doc.filename.includes('fiddles/')
    ) {
      tutorials.push({
        ...doc,
        filename: path.join('docs', doc.filename),
      })
    }
  }

  return tutorials
}

async function fetchWebsiteContent() {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)

  const url =
    'https://cdn.jsdelivr.net/gh/electron/electronjs.org@master/data/locale.yml'
  const response = await got(url)
  const content = response.body

  return {
    filename: path.join('website', 'locale.yml'),
    content,
  }
}

async function fetchWebsiteBlogPosts() {
  console.log('Fetching blog posts from electron/electronjs.org#master')

  const blogs = await roggy('master', {
    owner: 'electron',
    repository: 'electronjs.org',
    downloadMatch: 'data/blog',
  })

  return blogs.map((blog) => {
    return {
      ...blog,
      filename: path.join('website', 'blog', blog.filename),
    }
  })
}

async function getObsoleteFiles(contents: Content[], destinationPath: string) {
  const currentFiles = walkSync(destinationPath, {
    directories: false,
    includeBasePath: true,
  })
  const obsoleteFiles = []

  for (const file of currentFiles) {
    let stillExists = false
    for (const content of contents) {
      if (file.endsWith(content.filename)) {
        stillExists = true
        break
      }
    }

    if (!stillExists) {
      obsoleteFiles.push(file)
    }
  }

  return obsoleteFiles
}

// Utility functions
function writeContent(docs: any[]) {
  const promises = docs.map((doc) => {
    const filename = path.join(englishBasePath, doc.filename)
    mkdir(path.dirname(filename))

    const content = doc.markdown_content ? doc.markdown_content : doc.content

    return fs.writeFile(filename, content, 'utf-8')
  })

  return Promise.all(promises)
}

async function writeToPackageJSON(key: string, value: string | string[]) {
  const pkg = require('../package.json')
  pkg[key] = value
  await fs.writeFile(
    require.resolve('../package.json'),
    `${JSON.stringify(pkg, null, 2)}
`
  )
}
