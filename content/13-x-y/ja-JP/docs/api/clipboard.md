# clipboard

> システムのクリップボードでコピーやペーストの操作を行います。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Linux には、 `selection` クリップボードも存在します。 これを操作するには、各メソッドに `selection` を渡す必要があります。

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## メソッド

`clipboard` モジュールには以下のメソッドがあります。

**注:** 実験的なAPIにはそのように注記があり、将来的に削除される可能性があります。

### `clipboard.readText([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 `String` - プレーンテキストでのクリップボード内のコンテンツ。

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

プレーンテキストとしてクリップボードに `text` を書き込みます。

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 `String` - マークアップでのクリップボード内のコンテンツ。

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

クリップボードに `markup` を書き込みます。

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 [`NativeImage`](native-image.md) - クリップボード内の画像コンテンツ。

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

クリップボードに `image` を書き込みます。

### `clipboard.readRTF([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 `String` - RTFでのクリップボード内のコンテンツ。

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

RTFでクリップボードに `text` を書き込みます。

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

戻り値 `Object`:

* `title` String
* `url` String

クリップボード内のブックマークを表す `title` と `url` のキーを含む Object を返します。 ブックマークが無効なとき、`title` と `url` の値は空文字です。

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

ブックマークとしてクリップボードに `title` と `url` を書き込みます。

**注:** Windowsの大抵のアプリは、ブックマークのペーストをサポートしていないため、ブックマークと縮退したテキストの両方をクリップボードに書き込むため、`clipboard.write` を使うようにしてください。

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

戻り値 `String` - 検索ペーストボード上のテキストです。これは、アクティブなアプリケーションの検索パネルの現在の状態に関する情報を保持するペーストボードです。

このメソッドは、レンダラープロセスから呼び出されたとき同期 IPC を使います。 アプリケーションがアクティブにされるたびに、キャッシュされた値は、検索ペーストボードから再読込されます。

### `clipboard.writeFindText(text)` _macOS_

* `text` String

`text` をプレーンテキストとして検索ペーストボード (アクティブなアプリケーションの検索パネルの現在の状態に関する情報を保持するペーストボード) に書き込みます。 このメソッドは、レンダラープロセスから呼び出されたとき同期 IPC を使います。

### `clipboard.clear([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

クリップボードの内容を消去します。

### `clipboard.availableFormats([type])`

* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 `String[]` - クリップボードがサポートしている形式の `type` の配列。

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _実験的_

* `format` String
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

戻り値 `Boolean` - クリップボードが指定した `format` をサポートしているかどうか。

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' か 'false
```

### `clipboard.read(format)` _実験的_

* `format` String

戻り値 `String` - クリップボードから `format` 形式で読み出します。

### `clipboard.readBuffer(format)` _実験的_

* `format` String

戻り値 `Buffer` - クリップボードから `format` 形式で読み出します。

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _実験的_

* `format` String
* `buffer` Buffer
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

`format` でクリップボードに `buffer` を書き込みます。

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` Object
  * `text` String (任意)
  * `html` String (任意)
  * `image` [NativeImage](native-image.md) (任意)
  * `rtf` String (任意)
  * `bookmark` String (任意) - URL のタイトルの `text`。
* `type` String (任意) - `selection` または `clipboard` 。既定値は 'clipboard' です。 `selection` は Linux のみで有効です。

クリップボードに `data` を書き込みます。

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
