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

`clipboard` モジュールには以下のメソッドがあります。

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

クリップボード内のブックマークを表す `title` と `url` のキーを含む Object を返します。 ブックマークが無効なとき、`title` と `url` の値は空文字です。

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (任意)

ブックマークとしてクリップボードに `title` と `url` を書き込みます。

**注:** Windowsの大抵のアプリは、ブックマークのペーストをサポートしていないため、ブックマークと縮退したテキストの両方をクリップボードに書き込むため、`clipboard.write` を使うようにしてください。

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

戻り値 `String` - 検索ペーストボードのテキスト。 このメソッドは、レンダラープロセスから呼び出されたとき、同期IPCを使います。 アプリケーションがアクティブにされるたびに、キャッシュされた値は、検索ペーストボードから再読込されます。

### `clipboard.writeFindText(text)` *macOS*

* `text` String

プレーンテキストとして検索ペーストボードに `text` を書き込みます。このメソッドは、レンダラープロセスから呼び出されたとき、同期IPCを使います。

### `clipboard.clear([type])`

* `type` String (任意)

クリップボードの内容を消去します。

### `clipboard.availableFormats([type])`

* `type` String (任意)

戻り値 `String[]` - クリップボードがサポートしている形式の `type` の配列。

### `clipboard.has(format[, type])` *実験的*

* `format` String
* `type` String (任意)

戻り値 `Boolean` - クリップボードが指定した `format` をサポートしているかどうか。

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *実験的*

* `format` String

戻り値 `String` - クリップボードから `format` 形式で読み出します。

### `clipboard.readBuffer(format)` *実験的*

* `format` String

戻り値 `Buffer` - クリップボードから `format` 形式で読み出します。

### `clipboard.writeBuffer(format, buffer[, type])` *実験的*

* `format` String
* `buffer` Buffer
* `type` String (任意)

`format` でクリップボードに `buffer` を書き込みます。

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (任意)
  * `html` String (任意)
  * `image` [NativeImage](native-image.md) (任意)
  * `rtf` String (任意)
  * `bookmark` String (任意) - URLのタイトルの `text`。
* `type` String (任意)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

クリップボードに `data` を書き込みます。