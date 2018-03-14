# clipboard 

> システムのクリップボードでコピーやペーストの操作を行います。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下の例では、クリップボードに文字列を書き込む方法を示します。

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

X Windowシステムには、セレクションクリップボードもあります。これを操作するには、各メソッドに `selection` を渡す必要があります。

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## メソッド

`clipboard` オブジェクトには以下のメソッドがあります。

**注:** 実験的なAPIにはそのように注記があり、将来的に削除される可能性があります。

### `clipboard.readText([type])`

* `type` String (任意)

戻り値 `String` - プレーンテキストでのクリップボード内のコンテンツ。

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (任意)

プレーンテキストとしてクリップボードに `text` を書き込みます。

### `clipboard.readHTML([type])`

* `type` String (任意)

戻り値 `String` - マークアップでのクリップボード内のコンテンツ。

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (任意)

クリップボードに `markup` を書き込みます。

### `clipboard.readImage([type])`

* `type` String (任意)

戻り値 [`NativeImage`](native-image.md) - クリップボード内の画像コンテンツ。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (任意)

クリップボードに `image` を書き込みます。

### `clipboard.readRTF([type])`

* `type` String (任意)

戻り値 `String` - RTFでのクリップボード内のコンテンツ。

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (任意)

RTFでクリップボードに `text` を書き込みます。

### `clipboard.readBookmark()` *macOS* *Windows*

戻り値 `Object`:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (任意)

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

### `clipboard.clear([type])`

* `type` String (任意)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` String (任意)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` (*実験的*)

* `format` String
* `type` String (任意)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` (*実験的*)

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` (*実験的*)

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` (*実験的*)

* `format` String
* `buffer` Buffer
* `type` String (任意)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (任意)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.