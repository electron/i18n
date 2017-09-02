# electron-i18n

> A home for Electron's translated documentation.

🇨🇳 🇹🇼 🇧🇷 🇪🇸 🇰🇷 🇯🇵 🇷🇺 🇫🇷 🇹🇭 🇳🇱 🇹🇷 🇮🇩 🇺🇦 🇨🇿 🇮🇹

## Contributing

Do you speak multiple languages? We need your help! 

See [contributing.md](contributing.md) for info on how to participate.

## Installation and Usage

If you're just here to translate content, see [contributing.md](contributing.md)

If you're here to _use_ this translated content for some purpose, read on!

This repo is also a node module for working with Electron's translated content.

It is not currently published to npm, so install it directly from GitHub:

```
npm install electron/electron-i18n
```

Then require it:

```js
const i18n = require('electron-i18n')
```

## API

### `i18n.api.array`

Exports all of Electron's structured API docs, in array format. This data
is identical to the 
[electron-api.json](https://github.com/electron/electron/releases/tag/v1.6.11)
release asset.

### `i18n.api.tree`

Exports the same data as `array`, but in a deep tree format. This can be 
useful if you want to traverse the docs like 
`apis.BrowserWindow.instanceMethods.blur.etc.etc`

### `i18n.locales`

Exports an array of locale names that are currently being translated.

### `i18n.api.get(api[, locale])`

Returns an structured object for the given API, with translations applied from 
the given locale.

- `api` String - an Electron API like `app` or `BrowserWindow`. Can be the full name like `BrowserWindow`, or the URL-friendly slug like `browser-window`. (required)
- `locale` String - a language locale (optional; defaults to `en`)

## License

[MIT](license)

[Crowdin]: https://crowdin.com/project/electron