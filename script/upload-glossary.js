#!/usr/bin/env node

require('dotenv-safe').load()

const fs = require('fs')
const path = require('path')
const {post} = require('got')
const FormData = require('form-data')
const glossary = require('../content/en-US/glossary.json')

const project = 'electron'
const url = `https://api.crowdin.com/api/project/${project}/upload-glossary?key=${process.env.CROWDIN_KEY}`
const form = new FormData()

// make strings safe for writing to a CSV file
function csvify (string) {
  return '"' + string.replace(/\"/g, '\"') + '"'
}

// Crowdin expects CSV files
const csv = glossary
  .map(({term, description}) => `${term}, ${csvify(description)}`)
  .join('\n')

const glossaryFile = path.join(__dirname, 'glossary.csv')
fs.writeFileSync(glossaryFile, csv)

form.append('scheme', 'term_en,description_en')
form.append('file', fs.createReadStream(glossaryFile))
form.append('json', 'true')

post(url, {body: form})
  .then((res) => {
    console.log('Uploaded glossary! See https://crowdin.com/project/electron/settings#glossary')
  })
  .catch(err => {
    console.error('Problem uploading glossary')
    console.error(err)
  })