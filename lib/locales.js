const path = require('path')
const fs = require('fs')
const contentDir = path.join(__dirname, '../content')
const stats = require('../stats.json')

const {
  getLanguageCode,
  getLanguageName,
  getLanguageNativeName,
  getCountryCode,
  getCountryName
} = require('locale-code')

module.exports = fs.readdirSync(contentDir)
  .filter(filename => fs.statSync(path.join(contentDir, filename)).isDirectory())
  .map(locale => {
    const lang = locale.split('-')[0]
    let result = {
      locale: locale,
      languageCode: getLanguageCode(locale),
      languageName: getLanguageName(locale),
      languageNativeName: getLanguageNativeName(locale),
      countryCode: getCountryCode(locale),
      countryName: getCountryName(locale),
      stats: stats.find(stat => [locale, lang].includes(stat.code))
    }

    // Override some locale-code names
    if (locale === 'zh-TW') result.languageName = 'Chinese Traditional'
    if (locale === 'zh-CN') result.languageName = 'Chinese Simplified'

    // Crowdin doesn't provide stats for the source language
    if (locale === 'en-US') {
      result.stats = {
        translated_progress: 100,
        approved_progress: 100
      }
    }

    return result
  })
  .sort((a, b) => b.stats.translated_progress - a.stats.translated_progress)
  .reduce((acc, locale) => {
    acc[locale.locale] = locale
    return acc
  }, {})
