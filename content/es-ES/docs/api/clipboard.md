# portapapeles

> Realice operaciones de copiar y pegar en el portapapeles del sistema.

Proceso: [Principal](../glossary.md#main-process), [Renderizado](../glossary.md#renderer-process)

El siguiente ejemplo muestra cómo escribir una cadena en el portapapeles:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Ejemplo de cadena')
```

En los sistemas X Window, también hay un portapapeles de selección. Para manipularlo, debe pasar `selección` a cada método:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Ejemplo de cadena', 'selección')
console.log(clipboard.readText ('selección'))
```

## Métodos

El módulo `portapapeles` tiene los siguientes métodos:

**Nota:** Las API experimentales están marcadas como tales y podrían eliminarse en el futuro.

### `clipboard.readText([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como texto sin formato.

### `clipboard.writeText(texto[, type])`

* `texto` Cadena
* `type` Cadena (opcional)

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([type])`

* `type` Cadena (opcional)

Returns `String` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` Cadena (opcional)

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

* `type` Cadena (opcional)

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` Cadena (opcional)

Writes `image` to the clipboard.

### `clipboard.readRTF([type])`

* `type` Cadena (opcional)

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

* `texto` String
* `type` Cadena (opcional)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Returns `Object`:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` Cadena (opcional)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` *macOS*

* `texto` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` Cadena (opcional)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` Cadena (opcional)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` Cadena (opcional)

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
* `type` Cadena (opcional)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` Cadena (opcional)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.