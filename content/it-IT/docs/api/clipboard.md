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

* `tipo` Stringa (opzionale)

Restituisce la `stringa` - il contenuto degli Appunti come testo normale.

### `clipboard.writeText(text[, tipo])`

* `testo` Stringa
* `tipo` Stringa (opzionale)

Scrive il `testo` negli Appunti come testo normale.

### `clipboard.readHTML([tipo])`

* `tipo` Stringa (opzionale)

Restituisce la `stringa` - il contenuto negli Appunti come markup.

### `clipboard.writeHTML(markup[, tipo])`

* `markup` Stringa
* `tipo` Stringa (opzionale)

Scrive il `markup` negli appunti.

### `clipboard.readText([type])`

* `tipo` Stringa (opzionale)

Restituisce [`NativeImage`](native-image.md) - l'immagine contenuta negli appunti.

### `clipboard.writeImage(image[, tipo])`

* `image` [NativeImage](native-image.md)
* `tipo` String (optional)

Scrive la `image` negli appunti.

### `clipboard.readRTF([tipo])`

* `tipo` Stringa (opzionale)

Restituisce la `stringa` - il contenuto negli Appunti come RTF.

### `clipboard.writeRTF(text[, tipo])`

* `testo` Stringa
* `tipo` Stringa (opzionale)

Scrive il `testo` negli Appunti come RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Ritorna `Object`:

* `Titolo` Stringa
* `url` Stringa

Restituisce un oggetto contenente `titolo` e `url` chiavi rappresentative del segnaposto negli appunti. I valori di `titolo` e `url` saranno vuoti quando i bookmark non sono disponibili.

### `clipboard.writeBookmark(title, url[, tipo])` *macOS* *Windows*

* `Titolo` Stringa
* `url` Stringa
* `tipo` Stringa (opzionale)

Scrivere il `titolo` e `url` negli appunti come un segnaposto.

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

* `format` String
* `tipo` Stringa (opzionale)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Sperimentale*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Sperimentale*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
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
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.