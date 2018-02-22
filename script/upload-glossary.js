#!/usr/bin/env node

require('dotenv-safe').load()

const fs = require('fs')
const path = require('path')
const globals = require('globals')
const {format} = require('util')
const {post} = require('got')
const FormData = require('form-data')
const apis = require('../content/en-US/electron-api.json')

const project = 'electron'
const url = `https://api.crowdin.com/api/project/${project}/upload-glossary?key=${process.env.CROWDIN_KEY}`
const form = new FormData()

let glossary = []

// Add JavaScript builtings like Array, Map, String, etc
Object.keys(globals.builtin).map(key => {
  const term = format(
    '%s, %s is a JavaScript builtin and should NOT be translated.', 
    key, 
    key
  )
  glossary.push(term)
})

// Add Electron API names
apis.forEach(api => {
  glossary.push(`${api.name}, This is an Electron API and should NOT be translated',`)
})

// Add Electron instance methods and properties
apis
  .filter(api => api.type === 'Class')
  .forEach(api => {
    const methods = api.instanceMethods || []
    methods.forEach(method => {
      glossary.push(`${api.instanceName}.${method.name}, This is an Electron instance method and should NOT be translated',`)
    })

    const props = api.instanceProperties || []
    props.forEach(prop => {
      glossary.push(`${api.instanceName}.${prop.name}, This is an Electron instance property and should NOT be translated',`)
    })
  })

const glossaryFile = path.join(__dirname, 'glossary.csv')
fs.writeFileSync(glossaryFile, glossary.join('\n'))

form.append('scheme', 'term_en,description_en')
form.append('file', fs.createReadStream(glossaryFile))
form.append('json', 'true')

post(url, {body: form})
  .then((res) => {
    console.log('Uploaded glossary!')
  })
  .catch(err => {
    console.error('Problem uploading glossary')
    console.error(err)
  })