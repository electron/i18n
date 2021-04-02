# 剪贴板

> 在系统剪贴板上执行复制和粘贴操作。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

在 Linux 上，还有一个 `selection`粘贴板 。 要操作它 您需要将 `selection` 传递到每个方法：

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 方法

` clipboard ` 对象具有以下方法:

**注：** 实验API被标记为这样，将来可能会被移除。

### `clipboard.readText([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 ` String `- 剪贴板中的纯文本内容。

```js
康斯特 { clipboard } =需要（'电子'）

剪贴板。

康斯特文本 = 剪贴板. 阅读文本 （）
控制台.log （文本）
/ / 你好， 我有点文本！
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将 ` text ` 作为纯文本写入剪贴板。

```js
康斯特 { clipboard } =需要（'电子'）

条短信='你好，我有点文字
！
```

### `clipboard.readHTML([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 ` String `- 剪贴板中的HTML内容。

```js
康斯特 { clipboard } =需要（'电子'）

剪贴板。写HTML（'<b>嗨</b>'）
康斯特html=剪贴板。读HTML（）

控制台.log（html）
// <meta charset='utf-8'><b>嗨</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将 ` markup ` 写入剪贴板。

```js
康斯特 { clipboard } =需要（'电子'）

剪贴板。写HTML（'<b>嗨</b'）
```

### `clipboard.readImage([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 [` NativeImage `](native-image.md)- 剪贴板中的图像内容。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将 ` image ` 写入剪贴板。

### `clipboard.readRTF([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 ` String `- 剪贴板中的RTF内容。

```js
康斯特 { clipboard } =需要（'电子'）

剪贴板\r。\\f0\pard\n这是一些\\b粗体}文本\r
.log


\n。\\f0\pard\n这是一些[粗体]文本\n。
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

向剪贴板中写入 RTF 格式的 `text`.

```js
康斯特 { clipboard } =要求（'电子'）

康斯特rtf=\\\rtf1\ansi\字体\f0=fswis天鹅绒：\\f0\pard\n这是一些[\b粗体]文本
\n。
```

### `clipboard.readBookmark()` _马科斯_ _窗口_

返回 ` Object `:

* `title` String
* `url` String

返回一个对象, 其中包含表示剪贴板中书签 `title` 和 `url` 。 当书签不可用时, ` title ` 和 ` url ` 值将为空字符串。

### `clipboard.writeBookmark(title, url[, type])` _马科斯_ _窗口_

* `title` String
* `url` String
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将书签的 ` title ` 和 ` url ` 写入剪贴板。

**注意：** Windows 上的大多数应用不支持将书签粘贴到它们中，因此 您可以使用 `clipboard.write` 将书签和回退文本同时写入 剪贴板。

```js
康斯特 { clipboard } =需要（"电子"）

剪贴板。写书签（+
  文本："https://electronjs.org"，
  书签："电子主页"
}）
```

### `clipboard.readFindText()` _马科斯_

返回 `String` - 查找粘贴板上的文本，这是保存有关活动应用程序查找面板当前状态的信息的粘贴板。

当从渲染器过程中调用时，此方法使用同步 IPC。 每当应用程序被激活时，缓存值都会从查找粘贴板中重读。

### `clipboard.writeFindText(text)` _马科斯_

* `text` String

将 `text` 写入查找粘贴板（保存有关活动应用程序查找面板当前状态的信息的粘贴板）中，作为纯文本。 当从渲染器过程中调用时，此方法使用同步 IPC。

### `clipboard.clear([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

清除剪贴板内容。

### `clipboard.availableFormats([type])`

* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 ` String [] `- 剪贴板 ` type ` 所支持的格式的数组。

```js
康斯特 { clipboard } =需要（"电子"）

的const格式=剪贴板。可用格式（）
控制台.log（格式）
// [文本/纯"，"文本/html" |
```

### `clipboard.has(format[, type])` _实验_

* `format` String
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

返回 ` Boolean `, 剪贴板是否支持指定的 ` format `。

```js
康斯特 { clipboard } =要求（'电子'）

const有形式=剪贴板。has（'<p>选择</p>'）
控制台.log（有形式）
//'真实'或'假'
```

### `clipboard.read(format)` _实验_

* `format` String

返回 ` String `- 从剪贴板中读取 ` format ` 类型的内容。

### `clipboard.readBuffer(format)` _实验_

* `format` String

返回 ` Buffer `- 从剪贴板中读取 ` format ` 类型的内容。

```js
康斯特 { clipboard } =需要（"电子"）

缓冲区=缓冲区。 "utf8"）
剪贴板. 写布弗 （"公共. utf8 纯文本"， 缓冲区）

续 ret = 剪贴板. 阅读缓冲器 （"公共. utf8 - 纯文本"）

控制台.log （缓冲区. 等于 （出）
// 真实
```

### `clipboard.writeBuffer(format, buffer[, type])` _实验_

* `format` String
* `buffer` Buffer
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将 `buffer ` 作为 ` format ` 类型写入剪贴板。

```js
康斯特 { clipboard } =要求（"电子"）

const缓冲区=缓冲区。从（'写缓冲区'，'utf8'）
剪贴板。写缓冲区（'公共.utf8-纯文本'，缓冲区）
```

### `clipboard.write(data[, type])`

* `data` 对象
  * ` text ` String（可选）
  * ` html ` String（可选）
  * `image` [NativeImage](native-image.md) (可选)
  * `rtf` String (可选)
  * `bookmark` 字符串（可选） - `text`的网址标题。
* `type` 字符串（可选） - 可以 `selection` 或 `clipboard`：默认值为"剪贴板"。 `selection` 仅在Linux上提供。

将 ` data ` 写入剪贴板。

```js
康斯特 { clipboard } =要求（"电子"）

剪贴板。写（{
  文本："测试"，
  html："<b>嗨，</b>"，
  rtf： '\\rtf1\utf8 文本]，
  书签： '标题'
[）

控制台.log （剪贴板. readText ）
/ / '测试'

控制台.log（剪贴板.readHTML）
// <meta charset='utf-8'><b>嗨</b>

控制台.log（剪贴板.readRTF）
/\\\rtf1\utf8文本}"

控制台.log（剪贴板。阅读书签）
// { title: 'a title', url: 'test' }
```
