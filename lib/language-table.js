const {locales} = require('..')

const list = Object.values(locales)
.filter(locale => locale.languageCode !== 'en')
.map(locale => {
  const {languageNativeName, languageName, languageCode} = locale
  let label = languageNativeName
  if (languageNativeName !== languageName) label += ` (${languageName})`
  return `- [${label}](https://crowdin.com/project/electron/${languageCode})`
})

console.log(list.join('\n'))
