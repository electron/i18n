# 剪贴板

> 在系统剪贴板上执行复制和粘贴操作。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

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

## 方法

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* ` type ` String（可选）

Returns `String` - The content in the clipboard as plain text.

### `clipboard.writeText(text[, type])`

* `text` String
* ` type ` String（可选）

Writes the `text` into the clipboard as plain text.

### `clipboard.readHTML([type])`

* ` type ` String（可选）

Returns `String` - The content in the clipboard as markup.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* ` type ` String（可选）

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

* ` type ` String（可选）

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* ` type ` String（可选）

Writes `image` to the clipboard.

### `clipboard.readRTF([type])`

* ` type ` String（可选）

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* ` type ` String（可选）

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

返回 ` Object `:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* ` type ` String（可选）

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

* ` type ` String（可选）

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* ` type ` String（可选）

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *实验功能*

* `format` String
* ` type ` String（可选）

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const { clipboard } = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *实验功能*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *实验功能*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *实验功能*

* `format` String
* `buffer` Buffer
* ` type ` String（可选）

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * ` text ` String（可选）
  * ` html ` String（可选）
  * `image` [NativeImage](native-image.md) (可选)
  * `rtf` String (可选)
  * ` bookmark ` String (可选)- url 的标题 `text`。
* ` type ` String（可选）

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Writes `data` to the clipboard.