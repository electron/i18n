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

**Remarque :** Les APIs expérimentales sont marquées comme telles et sont susceptibles d'être supprimés à l'avenir.

### `clipboard.readText([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

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
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit le `text` dans le presse-papiers au format texte brut.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

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
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit le `markup` dans le presse-papiers.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Retourne [`NativeImage`](native-image.md) - Le contenu de l'image du presse-papiers.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit l'`image` dans le presse-papiers.

### `clipboard.readRTF([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Retourne `String` - Le contenu presse-papiers en RTF.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit le `text` dans le presse-papiers en RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` *macOS* *Windows*

Retourne `Object`:

* `title` String
* `url` String

Retourne un objet contenant les clés `title` et `url` représentant le marque-page du presse-papiers. La valeur des clés `title` et `url` sera une chaîne de caractères vide si le marque-page n'est pas disponible.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit le `title` et `url` dans le presse-papiers comme marque-page.

**Remarque :** La plupart des applications sur Windows ne supportent pas le format marque-page, du coup vous pouvez utiliser `clipboard.write` pour écrire un marque-page et un texte de secours dans le presse-papiers.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.

This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` *macOS*

* `text` String

Writes the `text` into the find pasteboard (the pasteboard that holds information about the current state of the active application’s find panel) as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Efface le contenu du presse-papiers.

### `clipboard.availableFormats([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Retourne `String[]` - Un tableau de format pris en charge pour le `type` du presse-papiers.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Retourne `Boolean` - Si le presse-papiers prend en charge le `format` spécifié.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` *Experimental*

* `format` String

Retourne `String` - Lit le type de `format` depuis le presse-papiers.

### `clipboard.readBuffer(format)` *Experimental*

* `format` String

Retourne un `Buffer` - Lit le type de `format` depuis le presse-papiers.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit le `buffer` dans le presse-papiers comme `format`.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` Objet 
  * `text` String (facultatif)
  * `html` String (facultatif)
  * `image` [NativeImage](native-image.md) (facultatif)
  * `rtf` String (facultatif)
  * `bookmark` String (optional) - The title of the URL at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Écrit `data` dans le presse-papiers.

```js
const { clipboard } = require('electron')

clipboard.write({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  bookmark: 'a title'
})

console.log(clipboard.readText())
// 'test'

console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
```