# appunti

> Eseguire copia e incolla con gli appunti di sistema.

Vedi anche: [Principale](../glossary.md#main-process), [Rendering](../glossary.md#renderer-process)

Nell'esempio seguente viene illustrato come scrivere una stringa negli Appunti:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Stringa di esempio')
```

Nei sistemi X Window, ci sono anche gli appunti di selezione. Per utilizzarli è necessario passare la `selezione` ad ogni metodo:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Stringa di esempio', 'selection')
console.log(clipboard.readText('selection'))
```

## Metodi

Il modulo di `Appunti` ha i seguenti metodi:

**Nota:** Le API sperimentali sono contrassegnate come tali e potrebbero essere rimosse in futuro.

### `clipboard.readText([type])`

* `tipo` String (optional)

Restituisce la `stringa` - il contenuto degli Appunti come testo normale.

### `clipboard.writeText(text[, tipo])`

* `testo` Stringa
* `tipo` String (optional)

Scrive il `testo` negli Appunti come testo normale.

### `clipboard.readHTML([tipo])`

* `tipo` Stringa (opzionale)

Restituisce la `stringa` - il contenuto negli Appunti come markup.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `tipo` String (optional)

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

* `tipo` String (optional)

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `tipo` String (optional)

Writes `image` to the clipboard.

### `clipboard.readRTF([type])`

* `tipo` String (optional)

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

* `testo` Stringa
* `tipo` String (optional)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Restituisci `Oggetto`:

* `title` String
* `url` Stringa

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Stringa
* `tipo` String (optional)

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

* `tipo` String (optional)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `tipo` String (optional)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `tipo` String (optional)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Experimental*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Experimental*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `tipo` String (optional)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Oggetto 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `tipo` String (optional)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.