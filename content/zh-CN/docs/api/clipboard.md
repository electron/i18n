# 剪贴板

> 在系统剪贴板上执行复制和粘贴操作。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

下面的示例演示如何将字符串写入剪贴板:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

在 X Window 系统上还有一个可选的剪贴板 。对其复制时需要传递` selection ` 参数到每个函数：

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 方法

` clipboard ` 对象具有以下方法:

** 注意: **被标记为实验性的 api 将来可能被删除。

### `clipboard.readText([type])`

* ` type ` String（可选）

返回 ` String `- 剪贴板中的纯文本内容。

### `clipboard.writeText(text[, type])`

* `text` String
* ` type ` String（可选）

将 ` text ` 作为纯文本写入剪贴板。

### `clipboard.readHTML([type])`

* ` type ` String（可选）

返回 ` String `- 剪贴板中的HTML内容。

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* ` type ` String（可选）

将 ` markup ` 写入剪贴板。

### `clipboard.readImage([type])`

* ` type ` String（可选）

返回 [` NativeImage `](native-image.md)- 剪贴板中的图像内容。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* ` type ` String（可选）

将 ` image ` 写入剪贴板。

### `clipboard.readRTF([type])`

* ` type ` String（可选）

返回 ` String `- 剪贴板中的RTF内容。

### `clipboard.writeRTF(text[, type])`

* `text` String
* ` type ` String（可选）

向剪贴板中写入 RTF 格式的 `text`.

### `clipboard.readBookmark()` *macOS* *Windows*

返回 `Object`:

* `title` String
* `url` String

返回一个对象, 其中包含表示剪贴板中书签 `title` 和 `url` 。 当书签不可用时, ` title ` 和 ` url ` 值将为空字符串。

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* ` type ` String（可选）

将书签的 ` title ` 和 ` url ` 写入剪贴板。

**注意**：Windows上的大多数应用程序不支持粘贴书签，因此您可以使用 `clipboard.write` 将书签和后备文本写入剪贴板。

```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

返回 ` String `- 查找粘贴板上的文本。 此方法在从渲染进程调用时使用同步 IPC。 每当激活应用程序时, 都会从查找粘贴板中重新读取缓存值。

### `clipboard.writeFindText(text)` *macOS*

* `text` String

将 ` text ` 作为纯文本写入查找粘贴板。此方法在从渲染进程调用时使用同步 IPC。

### `clipboard.clear([type])`

* ` type ` String（可选）

清除剪贴板内容。

### `clipboard.availableFormats([type])`

* ` type ` String（可选）

返回 ` String [] `- 剪贴板 ` type ` 所支持的格式的数组。

### `clipboard.has(format[, type])` *实验功能*

* `format` String
* ` type ` String（可选）

返回 ` Boolean `, 剪贴板是否支持指定的 ` format `。

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *实验功能*

* `format` String

返回 ` String `- 从剪贴板中读取 ` format ` 类型的内容。

### `clipboard.readBuffer(format)` *实验功能*

* `format` String

返回 ` Buffer `- 从剪贴板中读取 ` format ` 类型的内容。

### `clipboard.writeBuffer(format, buffer[, type])` *实验功能*

* `format` String
* `buffer` Buffer
* ` type ` String（可选）

将 `buffer ` 作为 ` format ` 类型写入剪贴板。

### `clipboard.write(data[, type])`

* `data` Object 
  * ` text ` String（可选）
  * ` html ` String（可选）
  * `image` [NativeImage](native-image.md) (可选)
  * `rtf` String (可选)
  * ` bookmark ` String (可选)- url 的标题 `text`。
* ` type ` String（可选）

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

将 ` data ` 写入剪贴板。