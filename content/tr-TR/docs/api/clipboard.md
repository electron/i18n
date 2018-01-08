# clipboard

> Kopyalama ve yapıştırma işlemlerini sistem panosunda gerçekleştirin.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Aşağıdaki örnek bir dizeyi panoya nasıl yazacağınızı gösterir:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

On X Window systems, there is also a selection clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Metodlar

Pano modülü aşağıdaki yöntemleri içerir:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `type` String (optional)

Returns `String` - The content in the clipboard as plain text.

### `clipboard.writeText(text[, type])`

* `text` Dizi
* `type` String (optional)

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([type])`

* `type` Dize (isteğe bağlı)

Returns `String` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional)

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

* `type` String (optional)

[`NativeImage`](native-image.md) - Pano içindeki resim içeriği.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional)

`image`'i panoya yazar.

### `clipboard.readRTF([type])`

* `type` String (optional)

`Dize` - RTF olarak pano içeriği.

### `clipboard.writeRTF(text[, type])`

* `text` Dizi
* `type` String (optional)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

`Object` 'i geri getirir:

* `title` String
* `url` Dize

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Dize
* `type` String (optional)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. Önbelleğe alınmış olan değer, uygulama her etkinleştirildiğinde kartuşun bulunduğu sayfadan yeniden okunur.

### `clipboard.writeFindText(text)` *macOS*

* `text` Dizi

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (optional)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` String (optional)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (optional)

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

### `clipboard.writeBuffer (biçim, arabellek [, tür])` *Deneysel*

* `format` String
* `buffer` Buffer
* `type` String (optional)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Nesne 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (optional)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

`Verileri` panoya yazar.