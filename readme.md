# electron-i18n

> A home for Electron's translated documentation.

🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹

## Contributing

Do you speak multiple languages? We need your help!

To get started translating, visit
[crowdin.com/projects/electron](https://crowdin.com/project/electron)
and log in with your GitHub account.

The following languages are currently being translated, but we can
[easily add more]((https://github.com/electron/electron-i18n/issues/new?title=new%20language%20request)):

- [中文 (Chinese Simplified)](https://crowdin.com/project/electron/zh-CN)
- [中文 (Chinese Traditional)](https://crowdin.com/project/electron/zh-TW)
- [čeština (Czech)](https://crowdin.com/project/electron/cs)
- [Nederlands (Dutch)](https://crowdin.com/project/electron/nl)
- [English Canada](https://crowdin.com/project/electron/en-CA)
- [Français (French)](https://crowdin.com/project/electron/fr)
- [Deutsch (German)](https://crowdin.com/project/electron/de)
- [Indonesian](https://crowdin.com/project/electron/id)
- [Italiano (Italian)](https://crowdin.com/project/electron/it)
- [日本語 (Japanese)](https://crowdin.com/project/electron/ja)
- [한국어 (Korean)](https://crowdin.com/project/electron/ko)
- [فارسی (Persian)](https://crowdin.com/project/electron/fa)
- [język polski (Polish)](https://crowdin.com/project/electron/pl)
- [Português Brasileiro (Portuguese Brazilian)](https://crowdin.com/project/electron/pt-BR)
- [Русский (Russian)](https://crowdin.com/project/electron/ru)
- [Español (Spanish)](https://crowdin.com/project/electron/es-ES)
- [ไทย (Thai)](https://crowdin.com/project/electron/th)
- [Türkçe (Turkish)](https://crowdin.com/project/electron/tr)
- [українська мова (Ukrainian)](https://crowdin.com/project/electron/uk)
- [Việt Nam (Vietnamese)](https://crowdin.com/project/electron/vi)



## Installation

If you're just here to translate content, see above. ☝️

If you're here to _actually use_ this translated content for some purpose,
read on! This project is published to npm as a module containing all the
translated docs.

```sh
npm install electron-i18n
```

## Usage

The `electron-i18n` module has no dependencies and exports no functions. It is
simply a large JSON object containing all of Electron's API docs and tutorial
content, in every language.

Require the module in your code:

```js
const i18n = require('electron-i18n')
```

`i18n` is an object with the following keys:

- `electronLatestStableVersion` is a string like `1.7.8`
- `electronLatestStableTag` is a string like `v1.7.8`
- `docs` - see [#docs](#docs)
- `locales` - see [#locales](#locales)
- `website` - see [#website](#website)

### Docs

`i18n.docs` is an object with locale strings as keys:

```js
Object.keys(i18n.docs)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

Each locale object contains an object with doc HREFs as keys:

```js
> Object.keys(i18n.docs['en-US'])

[
  '/docs/tutorial/about',
  '/docs/api/accelerator',
  '/docs/tutorial/accessibility',
  '/docs/api/app',
  '...'
]
```

Each doc object contains metadata and an HTML version of itself, ready to be
rendered:

```js
i18n.docs['en-US']['/docs/api/app']

{
  locale: 'en-US',
  slug: 'app',
  category: 'api',
  categoryFancy: 'API',
  href: '/docs/api/app',
  title: 'app',
  description: '\nControl your application\'s event lifecycle.\n'
  githubUrl: 'https://github.com/electron/electron/tree/master/docs/api/app.md',
  isTutorial: false,
  isApiDoc: true,
  isDevTutorial: false,
  isApiStructureDoc: false,
  markdown: '...',
  html: '...'
}
```


### Locales

`i18n.locales` is an object with locale strings as keys:

```js
Object.keys(i18n.locales)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

Each locale object contains language names, country info, and translation
progress:

```js
i18n.locales['en-US']

{ locale: 'en-US',
  languageCode: 'en',
  languageName: 'English',
  languageNativeName: 'English',
  countryCode: 'US',
  countryName: 'United States',
  stats: {
    translated_progress: 100,
    approved_progress: 100
  }
}
```

### Website

`i18n.website` contains localized versions of [electron/electronjs.org/blob/master/data/locale.yml](https://github.com/electron/electronjs.org/blob/master/data/locale.yml).

It is an object with locale strings as keys:

```js
Object.keys(i18n.locales)
[ 'en-US', 'fr-FR', 'vi-VN', 'ja-JP', 'zh-CN', '...']
```

```js
i18n.website['fr-FR']

{
  tagline: 'Développez des applications desktop multi-plateformes avec JavaScript, HTML et CSS',
  nav: '...'
}
```


## License

[MIT](license)

[Crowdin]: https://crowdin.com/project/electron
