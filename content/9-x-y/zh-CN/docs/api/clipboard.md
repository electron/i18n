# 剪贴板

> 在系统剪贴板上执行复制和粘贴操作。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 方法

` clipboard ` 对象具有以下方法:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 ` String `- 剪贴板中的纯文本内容。

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将 ` text ` 作为纯文本写入剪贴板。

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 ` String `- 剪贴板中的HTML内容。

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将 ` markup ` 写入剪贴板。

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 [` NativeImage `](native-image.md)- 剪贴板中的图像内容。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将 ` image ` 写入剪贴板。

### `clipboard.readRTF([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 ` String `- 剪贴板中的RTF内容。

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

向剪贴板中写入 RTF 格式的 `text`.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

返回 ` Object `:

* `title` String
* `url` String

返回一个对象, 其中包含表示剪贴板中书签 `title` 和 `url` 。 当书签不可用时, ` title ` 和 ` url ` 值将为空字符串。

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将书签的 ` title ` 和 ` url ` 写入剪贴板。

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.

This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Writes the `text` into the find pasteboard (the pasteboard that holds information about the current state of the active application’s find panel) as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

清除剪贴板内容。

### `clipboard.availableFormats([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 ` String [] `- 剪贴板 ` type ` 所支持的格式的数组。

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimental_

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

返回 ` Boolean `, 剪贴板是否支持指定的 ` format `。

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _Experimental_

* `format` String

返回 ` String `- 从剪贴板中读取 ` format ` 类型的内容。

### `clipboard.readBuffer(format)` _Experimental_

* `format` String

返回 ` Buffer `- 从剪贴板中读取 ` format ` 类型的内容。

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* `format` String
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将 `buffer ` 作为 ` format ` 类型写入剪贴板。

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` Object
  * ` text ` String（可选）
  * ` html ` String（可选）
  * `image` [NativeImage](native-image.md) (可选)
  * `rtf` String (可选)
  * `bookmark` String (optional) - The title of the URL at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

将 ` data ` 写入剪贴板。

```js
const { clipboard } = require('electron')

clipboard.write({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  bookmark: 'a title'
})

console.log(clipboard.readText())
// 'test'

console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
```
