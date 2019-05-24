# appunti

> Eseguire copia e incolla con gli appunti di sistema.

Vedi anche: [Principale](../glossary.md#main-process), [Rendering](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

Nell'esempio seguente viene illustrato come scrivere una stringa negli Appunti:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Stringa di esempio')
```

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Stringa di esempio', 'selection')
console.log(clipboard.readText('selection'))
```

## Metodi

Il modulo di `Appunti` ha i seguenti metodi:

**Nota:** Le API sperimentali sono contrassegnate come tali e potrebbero essere rimosse in futuro.

### `clipboard.readText([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce la `stringa` - il contenuto degli Appunti come testo normale.

### `clipboard.writeText(text[, tipo])`

* `testo` Stringa
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Scrive il `testo` negli Appunti come testo normale.

### `clipboard.readHTML([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce la `stringa` - il contenuto negli Appunti come markup.

### `clipboard.writeHTML(markup[, tipo])`

* `markup` Stringa
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Scrive il `markup` negli appunti.

### `clipboard.readImage([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce [`NativeImage`](native-image.md) - l'immagine contenuta negli appunti.

### `clipboard.writeImage(image[, tipo])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Scrive la `image` negli appunti.

### `clipboard.readRTF([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce la `stringa` - il contenuto negli Appunti come RTF.

### `clipboard.writeRTF(text[, tipo])`

* `testo` Stringa
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Scrive il `testo` negli Appunti come RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Ritorna `Object`:

* `Titolo` Stringa
* `url` Stringa

Restituisce un oggetto contenente `titolo` e `url` chiavi rappresentative del segnaposto negli appunti. I valori di `titolo` e `url` saranno vuoti quando i bookmark non sono disponibili.

### `clipboard.writeBookmark(title, url[, tipo])` *macOS* *Windows*

* `Titolo` Stringa
* `url` Stringa
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

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

### `clipboard.clear([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Clears the clipboard content.

### `clipboard.availableFormats([tipo])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce `String[]` - Un array di formati supportati per la clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` Stringa
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Restituisce `Boolean` - Vero se la clipboard supporta il formato specificato `format`, falso altrimenti.

```javascript
const { clipboard } = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Sperimentale*

* `format` Stringa

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Sperimentale*

* `format` Stringa

Restituisce `Buffer` - Legge il tipo di `format` dalla clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` Stringa
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Scrive il `buffer` nella clipboard come `format`.

### `clipboard.write(data[, tipo])`

* `data` Oggetto 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Scrive `data` sulla clipboard.