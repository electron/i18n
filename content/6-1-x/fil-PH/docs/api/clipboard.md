# iipit sa tabla

> Magsagawa ng mga kopya at idikit ang mga operasyon sa clipboard ng system.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Halimbawa String', 'selection')
console.log(clipboard.readText('selection'))
```

## Mga Paraan

Ang `clipboard` modyul ay ang ma sumusunod na pamamaraan:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang textstong walang format.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[ ,i-type])

`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat ng `text` as klipboard bilang tekstong walang format.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([i-type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang texkstong walang format.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[ ,i-type])

`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat ng `markup` sa klipboard.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Nagbabalik ang [`NativeImage`](native-image.md)  ang nilalaman ng larawan sa klipbord.

### `clipboard.writeImage(image[ ,i-type])

`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat `image` sa klipboard.

### `clipboard.readRTF([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang RTF.

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

Pagsulat ng `text` sa klipboard bilang RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Returns `Object`:

* `title` String
* `url` Tali

Nagbabalik ng isang bagay na naglalaman `title` at `url` keys na kumakatawan sa bookmark sa klipbord. Ang `title` and `url` values ay walang laman na string kapag ang bookmark ay hindi magagamit.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` Tali
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat ng `title` and `url` sa klipbord bilang bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.

This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Writes the `text` into the find pasteboard (the pasteboard that holds information about the current state of the active application’s find panel) as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Nililimas ang mga nilalaman ng klipboard.

### `clipboard.availableFormats([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String[]` - isang array ng mga supportadong pormat para sa klipboard `uri`.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimental_

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `Boolean` - maski ang clipboard ay sumusuporta sa tinukoy na`format`.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _Experimental_

* `format` String

Returns `String` - Reads `format` uri mula sa klipboard.

### `clipboard.readBuffer(format)` _Experimental_

* `format` String

Returns `Buffer` - Reads `format` uri mula sa klipboard.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* `format` String
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat ng `buffer`  sa klipboard bilang `format`.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[ ,i-type])

`

* `data` Object
  * `text` String (opsiyonal)
  * `html` String (opsiyonal)
  * `image` [NativeImage](native-image.md) (opsiyonal)
  * `rtf` String (opsiyonal)
  * `bookmark` String (optional) - The title of the URL at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Pagsulat ng `data` sa klipboard.

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
