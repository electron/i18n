# clipboard

> Magsagawa ng mga kopya at idikit ang mga operasyon sa clipboard ng system.

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) 

Ang mga sumusunod na halimbawa ay nagpapakita kung paano sumulat ng isang string sa clipboard ng: 

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Halimbawa String')
 
Context | Request Context

```

Sa X Window system, mayroon ding seleksyon clipboard. Upang manipulahin ang mga ito kailangan mo na mapasa`selection` sa bawat pamamaraan:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Halimbawa String', 'selection')
console.log(clipboard.readText('selection'))
```

## Pamamaraan

Ang `clipboard` modyul ay ang ma sumusunod na pamamaraan:

**Note:** Eksperimental na APIs ay minarkahan bilang tulad at pwedeng maalis sa hinaharap. 

### `clipboard.readText([type])`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang textstong walang format. 

### `clipboard.writeText(teksto[, i-type])`

* `text` String
* `type` String (opsiyonal)

Pagsulat ng `text` as klipboard bilang tekstong walang format.

### `clipboard.readHTML([i-type])

`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang texkstong walang format. 

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (opsiyonal)

Pagsulat ng `markup` sa klipboard. 

### `clipboard.readImage([i-type]`

* `type` String (opsiyonal)

Nagbabalik ang [`NativeImage`](native-image.md) ang nilalaman ng larawan sa klipbord. 

### `klipboard.writeImage(image[,i-type])`

* `image` [NativeImage](native-image.md)
* `type` String (opsiyonal)

Pagsulat `image` sa klipboard.

### `clipboard.readRTF([i-type])`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang RTF.

### `clipboard.writeRTF(text[ ,i-type])

`

* `text` String 
* `type` String (opsiyonal)

Pagsulat ng `text` sa klipboard bilang RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Nagbabalik ng mga `bagay`:

* `title` String
* `url` String

Nagbabalik ng isang bagay na naglalaman `title` at `url` keys na kumakatawan sa bookmark sa klipbord. Ang `title` and `url` values ay walang laman na string kapag ang bookmark ay hindi magagamit. 

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (opsiyonal)

Pagsulat ng `title` and `url` sa klipbord bilang bookmark.

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

* `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (opsiyonal)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` String (opsiyonal)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (opsiyonal)

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
* `type` String (opsiyonal)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Bagay 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (opsiyonal)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.