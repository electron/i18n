# iipit sa tabla

> Magsagawa ng mga kopya at idikit ang mga operasyon sa clipboard ng system.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

## Mga Paraan

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `type` String (opsiyonal)

Returns `String` - The content in the clipboard as plain text.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (opsiyonal)

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([i-type])

`

* `type` String (opsiyonal)

Returns `String` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, type])
 

`

* `markup` String
* `type` String (opsiyonal)

Writes `markup` to the clipboard.

### `clipboard.readImage([i-type]`

* `type` String (opsiyonal)

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])
 

`

* `image` [NativeImage](native-image.md)
* `type` String (opsiyonal)

Writes `image` to the clipboard.

### `clipboard.readRTF([i-type])`

* `type` String (opsiyonal)

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (opsiyonal)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Returns `Object`:

* `title` String
* `url` Tali

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Tali
* `type` String (opsiyonal)

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

* `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([i-type])
 

`

* `type` String (opsiyonal)

Clears the clipboard content.

### `clipboard.availableFormats([i-type])`

* `type` String (opsiyonal)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (opsiyonal)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const { clipboard } = require('electron')
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

* `datos` Bagay 
  * `text` String (opsiyonal)
  * `html` String (opsiyonal)
  * `image` [NativeImage](native-image.md) (opsiyonal)
  * `rtf` String (opsiyonal)
  * `rtf` String (opsiyonal) - Ang pamagat ng url sa `text`. 
* `type` String (opsiyonal)

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Writes `data` to the clipboard.