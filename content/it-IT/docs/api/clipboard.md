# appunti

> Eseguire copia e incolla con gli appunti di sistema.

Vedi anche: [Principale](../glossary.md#main-process), [Rendering](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

The following example shows how to write a string to the clipboard:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String')
```

On X Window systems, there is also a selection clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Metodi

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `tipo` Stringa (opzionale)

Returns `String` - The content in the clipboard as plain text.

### `clipboard.writeText(text[, tipo])`

* `testo` Stringa
* `tipo` Stringa (opzionale)

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([tipo])`

* `tipo` Stringa (opzionale)

Returns `String` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, tipo])`

* `markup` Stringa
* `tipo` Stringa (opzionale)

Writes `markup` to the clipboard.

### `clipboard.readText([type])`

* `tipo` Stringa (opzionale)

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, tipo])`

* `image` [NativeImage](native-image.md)
* `tipo` String (optional)

Writes `image` to the clipboard.

### `clipboard.readRTF([tipo])`

* `tipo` Stringa (opzionale)

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, tipo])`

* `testo` Stringa
* `tipo` Stringa (opzionale)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Restituisci `Oggetto`:

* `Titolo` Stringa
* `url` Stringa

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, tipo])` *macOS* *Windows*

* `Titolo` Stringa
* `url` Stringa
* `tipo` Stringa (opzionale)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` *macOS*

* `testo` Stringa

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `tipo` Stringa (opzionale)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `tipo` Stringa (opzionale)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` Stringa
* `tipo` Stringa (opzionale)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const { clipboard } = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Sperimentale*

* `format` Stringa

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Sperimentale*

* `format` Stringa

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` Stringa
* `buffer` Buffer
* `tipo` Stringa (opzionale)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, tipo])`

* `data` Oggetto 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `tipo` Stringa (opzionale)

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Writes `data` to the clipboard.