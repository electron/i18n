# 剪贴板

> 在系统剪贴板上执行复制和粘贴操作。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

在 Linux 上，还有一个 `selection` 粘贴板 。 想要操作该剪切板，你需要为每个函数传递 `selection` 参数。

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 方法

` clipboard ` 对象具有以下方法:

** 注意: **被标记为实验性的 api 将来可能被删除。

### `clipboard.readText([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

将 ` text ` 作为纯文本写入剪贴板。

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

将 ` markup ` 写入剪贴板。

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

返回 [` NativeImage `](native-image.md)- 剪贴板中的图像内容。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

将 ` image ` 写入剪贴板。

### `clipboard.readRTF([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

将书签的 ` title ` 和 ` url ` 写入剪贴板。

**注意**：Windows上的大多数应用程序不支持粘贴书签，因此你可以使用 `clipboard.write` 将书签和后备文本写入剪贴板。

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

返回 `String` - "查找粘贴板"上的文本，这是保存有关活动应用程序查找面板当前状态信息的粘贴板。

此方法从渲染进程调用时使用同步 IPC。 每当激活应用程序时, 都会从查找粘贴板中重新读取缓存值。

### `clipboard.writeFindText(text)` _macOS_

* `text` String

将 `text` 作为纯文本写入查找粘贴板(粘贴板上有关于当前应用程序查找面板状态的信息)。 此方法从渲染进程调用时使用同步 IPC。

### `clipboard.clear([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

清除剪贴板内容。

### `clipboard.availableFormats([type])`

* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

返回 ` String [] `- 剪贴板 ` type ` 所支持的格式的数组。

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _实验功能_

* `format` String
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

返回 ` Boolean `, 剪贴板是否支持指定的 ` format `。

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _实验功能_

* `format` String

返回 ` String `- 从剪贴板中读取 ` format ` 类型的内容。

### `clipboard.readBuffer(format)` _实验功能_

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

### `clipboard.writeBuffer(format, buffer[, type])` _实验功能_

* `format` String
* `buffer` Buffer
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
  * ` bookmark ` String (可选)- URL 的标题 `text`。
* `type` String (optional) -可以是 `selection` 或 `clipboard`; 默认为 'clipboard'. `selection` 仅在 Linux 中可用。

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
