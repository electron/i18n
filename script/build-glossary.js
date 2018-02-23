#!/usr/bin/env node

require('dotenv-safe').load()

const fs = require('fs')
const path = require('path')
const globals = require('globals')
const apis = require('../content/en-US/electron-api.json')
const glossary = []

// JavaScript builtings like Array, Map, String, etc
Object.keys(globals.builtin).map(term => {
  glossary.push({
    term: term,
    type: 'globals.builtin',
    description: `${term} is a JavaScript builtin and should usually not be translated.`
  })
})

// Electron API names
apis.forEach(api => {
  glossary.push({
    term: api.name,
    type: 'electronAPI',
    description: `This is an Electron ${api.type} and should usually not be translated`
  })
})

// Electron instance methods and properties
apis
  .filter(api => api.type === 'Class')
  .forEach(api => {
    const methods = api.instanceMethods || []
    methods.forEach(method => {
      const term = `${api.instanceName}.${method.name}`
      glossary.push({
        term: term,
        type: 'electronInstanceMethod',
        description: 'This is an Electron instance method and should usually not be translated'
      })
    })

    const props = api.instanceProperties || []
    props.forEach(prop => {
      const term = `${api.instanceName}.${prop.name}`
      glossary.push({
        term: term,
        type: 'electronInstanceProperty',
        description: 'This is an Electron instance property and should usually not be translated'
      })
    })
  })

const glossaryFile = path.join(__dirname, '../content/en-US/glossary.json')
fs.writeFileSync(glossaryFile, JSON.stringify(glossary, null, 2))
console.log(`Wrote ${glossaryFile} with ${glossary.length} entries.`)
