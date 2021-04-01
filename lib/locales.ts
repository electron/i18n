import * as path from 'path'
import * as fs from 'fs'
import * as allStats from '../stats.json'
const contentDir = path.join(__dirname, '../content')

const {
  getLanguageName,
  getLanguageNativeName,
  getCountryCode,
  getCountryName,
} = require('locale-code')

interface IStats {
  translated_progress: number
  approved_progress: number
}

export interface IResult {
  locale: string
  languageCode: string
  languageName: string
  languageNativeName: string
  countryCode: string
  countryName: string
  stats: IStats
}

export default fs
  .readdirSync(contentDir)
  .filter((filename) =>
    fs.statSync(path.join(contentDir, filename)).isDirectory()
  )
  .map((locale) => {
    const lang = locale.split('-')[0]
    const stats = allStats.find(
      (stat) => lang === stat.code || locale === stat.code
    )

    if (locale !== 'en-US' && !stats) {
      throw new Error(
        `language stats not found! locale: ${locale}, lang: ${lang}`
      )
    }

    let result: IResult = {
      locale: locale,
      languageCode: locale === 'en-US' ? 'en' : stats!.code,
      languageName: getLanguageName(locale),
      languageNativeName: getLanguageNativeName(locale),
      countryCode: getCountryCode(locale),
      countryName: getCountryName(locale),
      // @ts-ignore | TODO(HashimotoYT): Possible undefined because english not found.
      stats: stats,
    }

    // `locale-code` doesn't include Filipino
    if (locale === 'fil-PH') {
      result.languageName = 'Filipino'
      result.languageNativeName = 'Filipino'
      result.countryCode = 'PH'
      result.countryName = 'Philippines'
    }

    // Override some `locale-code` names
    if (locale === 'zh-TW') result.languageName = 'Chinese Traditional'
    if (locale === 'zh-CN') result.languageName = 'Chinese Simplified'
    if (locale === 'en-CA') result.languageName = 'English (Canada)'

    // Crowdin doesn't provide stats for the source language
    if (locale === 'en-US') {
      result.stats = {
        translated_progress: 101,
        approved_progress: 101,
      }
    }

    return result
  })
  .sort((a, b) => b.stats.translated_progress - a.stats.translated_progress)
  .reduce((acc, locale) => {
    acc[locale.locale] = locale
    return acc
  }, {} as Record<string, IResult>)
