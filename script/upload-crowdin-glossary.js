#!/usr/bin/env node

require('dotenv-safe').load()

const assert = require('assert')
const globals = require('globals')

const electronApis = require('../content/en-US/electron-api.json')
const parseElectronGlossary = require('../lib/parse-electron-glossary')

main()

async function main () {
  const glossary = require('crowdin-glossary')({project: 'electron'})

  // JavaScript builtins like Array, Map, String, etc
  Object.keys(globals.builtin).forEach(term => {
    if (Object.keys(glossary.entries).includes(term)) return
    glossary.add(term, 'This is a JavaScript builtin and should usually not be translated.')
  })

  // Electron API names
  electronApis.forEach(api => {
    glossary.add(api.name, `This is an Electron ${api.type} and should usually not be translated`)
  })

  // Electron instance methods and properties
  electronApis
    .filter(api => api.type === 'Class')
    .forEach(api => {
      const methods = api.instanceMethods || []
      methods.forEach(method => {
        const term = `${api.instanceName}.${method.name}`
        if (Object.keys(glossary.entries).includes(term)) return
        glossary.add(term, 'This is an Electron instance method and should usually not be translated')
      })

      const props = api.instanceProperties || []
      props.forEach(prop => {
        const term = `${api.instanceName}.${prop.name}`
        if (Object.keys(glossary.entries).includes(term)) return
        glossary.add(term, 'This is an Electron instance property and should usually not be translated')
      })
    })

  // Electron Jargon like `IPC`, `Main Process`, etc
  Object.values(await parseElectronGlossary('en-US')).forEach(entry => {
    if (Object.keys(glossary.entries).includes(entry.term)) return
    glossary.add(entry.term, entry.description)
  })

  // Validate
  const minEntries = 400
  const entryCount = Object.keys(glossary.entries).length
  assert(
    entryCount >= minEntries,
    `glossary should have more than ${minEntries} entries but only has ${entryCount}`
  )

  glossary.upload()
}
