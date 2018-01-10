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

Escribe el `texto` en el portapapeles como texto sin formato.

### `clipboard.readHTML([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como marca.

### `clipboard.writeHTML(markup[, type])`

* `markup` Cadena
* `type` Cadena (opcional)

Escribe `markup` en el portapapeles.

### `clipboard.readImage([type])`

* `type` Cadena (opcional)

Devuelve [`NativeImage`](native-image.md) - El contenido de la imagen en el portapapeles.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` Cadena (opcional)

Escribe `image` en el portapapeles.

### `clipboard.readRTF([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como RTF.

### `clipboard.writeRTF(text[, type])`

* `text` Cadena
* `type` Cadena (opcional)

Escribe el `text` en el portapapeles en RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Devuelve `Objeto`:

* `title` Cadena
* `url` Cadena

Devuelve un Objeto que contiene las claves `title` y `url` que representan el marcador en el portapapeles. Los valores `title` y `url` serán cadenas vacías cuando el marcador no está disponible.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` Cadena
* `url` Cadena
* `type` Cadena (opcional)

Escribe el `título` y la `url` en el portapapeles como un marcador.

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