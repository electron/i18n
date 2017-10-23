# electron-i18n

> A home for Electron's translated documentation.

🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹

## Contributing

Do you speak multiple languages? We need your help! 

See [contributing.md](contributing.md) for info on how to participate.

## Installation

If you're just here to translate content, see [contributing.md](contributing.md)
If you're here to _use_ this translated content for some purpose, read on!
This project is published to npm as a module containing all the translated 
docs.

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



## License

[MIT](license)

[Crowdin]: https://crowdin.com/project/electron