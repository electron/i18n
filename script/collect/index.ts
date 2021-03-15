#!/usr/bin/env ts-node

if (!process.env.GH_TOKEN || !process.env.CROWDIN_KEY) {
  require('dotenv-safe').config()
}

import * as fs from 'fs'
import got from 'got'
import { sync as mkdir } from 'make-dir'
import * as path from 'path'
import { execSync } from 'child_process'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { roggy, IResponse as IRoggyResponse } from 'roggy'
import { install as subreposInstall } from 'subrepos'
import * as simpleGit from 'simple-git/promise'

import { generateCrowdinConfig } from '../../lib/generators/crowdin-yml'
import { generateSubreposYML } from '../../lib/generators/subrepos-yml'
import { generateTYPES } from '../../lib/generators/types'
import {
  generateUploader,
  generateDownloader,
} from '../../lib/generators/gh-actions'
import { SupportedVersions, versions } from '../../lib/types'

const basePath = (version: versions) =>
  path.join(__dirname, '../..', 'temp', `i18n-${version}`)
const englishBasePath = (version: versions) =>
  path.join(basePath(version), 'content', 'en-US')

const NUM_SUPPORTED_VERSIONS = 4

const github = new Octokit({
  auth: process.env.GH_TOKEN ?? '',
})

let release: RestEndpointMethodTypes['repos']['getRelease']['response']['data']
// This used to share `supportedVersions` between this file,
// and not use the cached version from package.json.
let supportedVersions: SupportedVersions = []

main().catch((err: Error) => {
  console.log('Something goes wrong. Error: ', err)
  process.exit(1)
})

async function main() {
  await fetchRelease()
  await getSupportedBranches(release.tag_name)
  await createSupportedBranches()
  await deleteUnsupportedBranches()
  await fetchSubrepos()
  await createMetaConfigs()
  await fetchAPIDocs()
  await fetchAPIData()
  await fetchTutorials()
  await fetchWebsiteContent()
  await fetchWebsiteBlogPosts()
  await doGitMagic()
}

async function fetchRelease() {
  console.log(`Determining 'latest' version dist-tag on npm`)
  const version = execSync('npm show electron version').toString().trim()

  console.log(`Fetching release data from GitHub`)

  const repo = {
    owner: 'electron',
    repo: 'electron',
    tag: `v${version}`,
  }

  const res = await github.repos.getReleaseByTag(repo)
  release = res.data
}

async function getSupportedBranches(current: string) {
  console.log(`Fetching latest ${NUM_SUPPORTED_VERSIONS} supported versions`)
  const currentVersion = current.slice(1).replace(/\.[0-9].[0-9]/, '-x-y')

  const resp = await github.repos.listBranches({
    owner: 'electron',
    repo: 'electron',
    protected: true,
  })

  const releaseBranches = resp.data.filter((branch) => {
    return branch.name.match(/^(\d)+-(?:(?:[0-9]+-x$)|(?:x+-y$))$/)
  })

  const filtered: Record<string, string> = {}
  releaseBranches
    .sort((a, b) => {
      const aParts = a.name.split('-')
      const bParts = b.name.split('-')
      for (let i = 0; i < aParts.length; i += 1) {
        if (aParts[i] === bParts[i]) continue
        return parseInt(aParts[i], 10) - parseInt(bParts[i], 10)
      }
      return 0
    })
    .forEach((branch) => {
      return (filtered[branch.name.split('-')[0]] = branch.name)
    })

  const filteredBranches = Object.values(filtered)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .slice(-NUM_SUPPORTED_VERSIONS)
    .filter((arr) => arr !== currentVersion && arr !== 'current')

  supportedVersions = filteredBranches as any
  supportedVersions.push('current')

  writeToPackageJSON('supportedVersions', supportedVersions)
  await generateSubreposYML(supportedVersions)
  await generateTYPES(supportedVersions)
  console.log('Successfully written `supportedVersions` into package.json')
}

async function createSupportedBranches() {
  for (const version of supportedVersions) {
    try {
      await github.git.getRef({
        owner: 'vhashimotoo',
        repo: 'i18n-content',
        ref: `heads/content/${version}`,
      })
    } catch {
      await github.git.createRef({
        owner: 'vhashimotoo',
        repo: 'i18n-content',
        ref: `refs/heads/content/${version}`,
        sha: '379e9bf26c8627c17e42dbe43e2c72d7f1844d61',
      })
    }
  }
}

async function deleteUnsupportedBranches() {
  const { data: branches } = await github.git.listMatchingRefs({
    owner: 'vhashimotoo',
    repo: 'i18n-content',
    ref: 'heads/content/',
  })

  if (branches.length !== supportedVersions.length) {
    const difference = branches.filter(
      (x) =>
        !supportedVersions.includes(
          x.ref.replace('refs/heads/content/', '') as versions
        )
    )

    for (const dif of difference) {
      await github.git.deleteRef({
        owner: 'vhashimotoo',
        repo: 'i18n-content',
        ref: dif.ref.replace('refs/', ''),
      })
    }
  }
}

async function fetchSubrepos() {
  await subreposInstall()
}

async function createMetaConfigs() {
  console.log(
    `Fetching Electron master branch commit SHA and latest stable tag`
  )
  const master = await github.repos.getBranch({
    owner: 'electron',
    repo: 'electron',
    branch: 'master',
  })

  if (typeof master.data.commit.sha !== 'string') {
    throw new Error(
      `Could not fetch Electron master branch commit SHA (found "${master.data.commit.sha})"`
    )
  }

  writeToPackageJSON('electronMasterBranchCommit', master.data.commit.sha)
  writeToPackageJSON('electronLatestStableTag', release.tag_name)

  await generateUploader(supportedVersions)
  await generateDownloader(supportedVersions)
  for (const version of supportedVersions) {
    await generateCrowdinConfig(basePath(version))
  }
}

async function fetchAPIDocs() {
  for (const version of supportedVersions) {
    console.log(`  - from electron/electron#${version}`)
    const docs = await roggy(
      version === 'current' ? release.tag_name : version,
      {
        owner: 'electron',
        repository: 'electron',
      }
    )

    docs
      .filter((doc) => doc.filename.startsWith('api/'))
      .forEach((doc) => writeDoc(doc, version))
  }

  return Promise.resolve()
}

async function fetchAPIData() {
  console.log(
    `Fetching API definitions from electron/electron#${release.tag_name}`
  )

  const asset = release.assets.find(
    (asset) => asset.name === 'electron-api.json'
  )

  if (!asset) {
    return Promise.reject(
      Error(`No electron-api.json asset found for ${release.tag_name}`)
    )
  }

  const apis = await got(asset.browser_download_url).json()
  const filename = path.join(englishBasePath('current'), 'electron-api.json')
  mkdir(path.dirname(filename))
  console.log(
    `Writing ${path.relative(
      englishBasePath('current'),
      filename
    )} (without changes)`
  )
  await fs.promises.writeFile(filename, JSON.stringify(apis, null, 2))
  return Promise.resolve(apis)
}

async function fetchTutorials() {
  console.log(`Feching tutorial docs`)

  for (const version of supportedVersions) {
    console.log(`  - from electron/electron#${version}`)
    const docs = await roggy(version === 'current' ? 'master' : version, {
      owner: 'electron',
      repository: 'electron',
    })

    docs
      .filter((doc) => !doc.filename.startsWith('api/'))
      .filter((doc) => !doc.filename.includes('images/'))
      .filter((doc) => !doc.filename.includes('fiddles/'))
      .forEach((doc) => writeDoc(doc, version))
  }

  return Promise.resolve()
}

async function fetchWebsiteContent() {
  console.log(`Fetching locale.yml from electron/electronjs.org#master`)

  const url =
    'https://cdn.jsdelivr.net/gh/electron/electronjs.org@master/data/locale.yml'
  const response = await got(url)
  const content = response.body
  const websiteFile = path.join(
    englishBasePath('current'),
    'website',
    `locale.yml`
  )
  mkdir(path.dirname(websiteFile))
  console.log(
    `Writing ${path.relative(englishBasePath('current'), websiteFile)}`
  )
  await fs.promises.writeFile(websiteFile, content)
  return Promise.resolve()
}

async function fetchWebsiteBlogPosts() {
  console.log('Fetching blog posts from electron/electronjs.org#master')

  const blogs = await roggy('master', {
    owner: 'electron',
    repository: 'electronjs.org',
    downloadMatch: 'data/blog',
  })

  blogs.forEach(writeBlog)
}

async function doGitMagic() {
  for (const version of supportedVersions) {
    const git = simpleGit(basePath(version))
    await git.add('.')
    await git.commit(
      `Update source files (${version}, ${new Date().toUTCString()})`
    )
    await git.push('origin', `content/${version}`, ['--force'])
  }
}

// Utility functions

function writeDoc(doc: IRoggyResponse, version: versions) {
  const basepath = englishBasePath(version)
  const filename = path.join(basepath, 'docs', doc.filename)
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
  // console.log('   ' + path.relative(basepath, filename))
}

function writeBlog(doc: IRoggyResponse) {
  const filename = path.join(
    englishBasePath('current'),
    'website/blog',
    doc.filename
  )
  mkdir(path.dirname(filename))
  fs.writeFileSync(filename, doc.markdown_content)
}

function writeToPackageJSON(key: string, value: string | string[]) {
  const pkg = require('../../package.json')
  pkg[key] = value
  fs.writeFileSync(
    require.resolve('../../package.json'),
    JSON.stringify(pkg, null, 2)
  )
}
