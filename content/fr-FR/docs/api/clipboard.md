# clipboard

> Permet d'effectuer les opérations copier et coller dans le presse-papiers.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Mon exemple', 'selection') console.log(clipboard.readText('selection'))
```

## Méthodes

Le module `clipboard` dispose des méthodes suivantes :

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne `String` - Le contenu du presse-papiers en tant que texte brut.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit le `text` dans le presse-papiers au format texte brut.

```js
const { clipboard } = require('electron')

const text = 'bonjour je suis un peu de texte!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne `String` - Le contenu du presse-papiers en tant que balisage.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit le `markup` dans le presse-papiers.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Bonjour</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne [`NativeImage`](native-image.md) - Le contenu de l'image du presse-papiers.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit l'`image` dans le presse-papiers.

### `clipboard.readRTF([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne `String` - Le contenu presse-papiers en RTF.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nCeci est du texte {\\b bold}. \par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nIl s'agit de quelques {\\b bold} text.\\par\n
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit le `text` dans le presse-papiers en RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\f0\\fswiss Helvetica;}\\f0\\pard\nCeci est un peu {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Retourne `Object`:

* `title` String
* `url` String

Retourne un objet contenant les clés `title` et `url` représentant le marque-page du presse-papiers. La valeur des clés `title` et `url` sera une chaîne de caractères vide si le marque-page n'est pas disponible.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit le `title` et `url` dans le presse-papiers comme marque-page.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  signet: 'Page d'accueil Electron'
})
```

### `clipboard.readFindText()` _macOS_

Retourne `Chaîne de caractères` - Le texte sur le tableau de bord, qui est le presse-papier qui contient des informations sur l'état actuel du panneau de recherche de l'application active.

Cette méthode utilise un IPC synchronisé lorsqu'il est appelé depuis le processus de rendu. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Écrit le `texte` dans le presse-papier find (le presse-papier qui contient des informations sur l'état actuel du panneau de recherche de l'application active) en texte brut. Cette méthode utilise un IPC synchronisé lorsqu'il est appelé depuis le processus de rendu.

### `clipboard.clear([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Efface le contenu du presse-papiers.

### `clipboard.availableFormats([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne `String[]` - Un tableau de format pris en charge pour le `type` du presse-papiers.

```js
const { clipboard } = require('electron')

formats const = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimental_

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Retourne `Boolean` - Si le presse-papiers prend en charge le `format` spécifié.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' ou 'false
```

### `clipboard.read(format)` _Expérimental_

* `format` String

Retourne `String` - Lit le type de `format` depuis le presse-papiers.

### `clipboard.readBuffer(format)` _Expérimental_

* `format` String

Retourne un `Buffer` - Lit le type de `format` depuis le presse-papiers.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('c'est binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* `format` String
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit le `buffer` dans le presse-papiers comme `format`.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* Objet `data`
  * `text` String (facultatif)
  * `html` String (facultatif)
  * `image` [NativeImage](native-image.md) (facultatif)
  * `rtf` String (facultatif)
  * `marque-page` String (facultatif) - Le titre de l'URL à `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` n'est disponible que sur Linux.

Écrit `data` dans le presse-papiers.

```js
const { clipboard } = require('electron')

presse-papiers. rite({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  marque-page : 'un titre'
})

console. og(presse-papiers. eadText())
// 'test'

console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
```
