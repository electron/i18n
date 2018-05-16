# protocol

> カスタムプロトコルを登録し、既存のプロトコルリクエストを傍受します。

プロセス: [Main](../glossary.md#main-process)

`file://` プロトコルと同じ効果を持つプロトコルの実装の例:

```javascript
const {app, protocol} = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, (error) => {
    if (error) console.error('プロトコルの登録に失敗しました')
  })
})
```

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## メソッド

`protocol` モジュールには以下のメソッドがあります。

### `protocol.registerStandardSchemes(schemes[, options])`

* `schemes` String[] - 標準スキームとして登録されるカスタムスキーム。
* `options` Object (任意) 
  * `secure` Boolean (任意) - `true` でセキュアとしてスキームを登録します。省略値は `false`。

標準スキームは、RFC 3986 で [Generic URI Syntax](https://tools.ietf.org/html/rfc3986#section-3) と呼ぶものに準拠しています。 例えば `http` と `https` は標準スキームですが、`file` はそうではありません。

スキームを標準として登録することにより、サービスが提供されるときに相対的および絶対的なリソースが正しく解決されます。 そうでないと、スキームは `file` プロトコルのように動作しますが、相対 URL を解決することはできません。

たとえば、標準スキームとして登録せずにカスタムプロトコルで以下のページをロードすると、非標準スキームが相対URLを認識できないため、イメージはロードされません。

```html
<body>
  <img src='test.png'>
</body>
```

スキームを標準で登録すると、[FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) を介してファイルにアクセスできます。 そうしない場合、レンダラーはスキームのセキュリティエラーをスローします。

デフォルトでは、非標準スキームはウェブストレージ API (localStorage, sessionStorage, webSQL, indexedDB, cookies) が無効にされます。 なので、一般的に、`http` プロトコルを置き換えるカスタムプロトコルを登録する場合は、標準スキームとして登録する必要があります。

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**注意:** このメソッドは `app` モジュールの `ready` イベントが発生する前に呼び出すことはできません。

### `protocol.registerServiceWorkerSchemes(schemes)`

* `schemes` String[] - サービスワーカーを処理するために登録されるカスタムスキーム。

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `filePath` String (任意)
* `completion` Function (任意) 
  * `error` Error

ファイルをレスポンスとして送信する `scheme` のプロトコルを登録します。 `request` が `scheme` で作成されると、`handler` が `handler(request, callback)` で呼び出されます。 `completion` は、`scheme` が正常に登録された場合は `completion(null)`、失敗した場合は `completion(error)` で呼び出されます。

`request` を処理するには、`callback` を、ファイルのパスまたは `path` プロパティを持つオブジェクトのいずれかを使用して、例えば、`callback(filePath)` や `callback({path: filePath})` で呼び出す必要があります。

引数なし、数、または `error` プロパティを持つオブジェクトで `callback` が呼び出されると、 `request` は指定した `error` 番号で失敗します。 使用できる利用可能なエラー番号については、[net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) を参照してください。

デフォルトでは、`scheme` は `http:` のように扱われます。これは、`file:` のような "Generic URI Syntax" に従うプロトコルとは違って解析されるため、`protocol.registerStandardSchemes` を呼び出し、あなたのスキームを標準スキームとして扱おうとします。

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (任意)
* `completion` Function (任意) 
  * `error` Error

`Buffer` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `Buffer` オブジェクト、または `data`、`mimeType` 、`charset` プロパティを持つオブジェクトで呼び出す必要があります。

サンプル:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('プロトコルの登録に失敗しました')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `data` String (任意)
* `completion` Function (任意) 
  * `error` Error

`String` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `String` オブジェクト、または `data`、`mimeType` 、`charset` プロパティを持つオブジェクトで呼び出す必要があります。

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (任意)
      * `uploadData` Object (任意) 
        * `contentType` String - コンテンツの MIME タイプ。
        * `data` String - 送信されるコンテンツ。
* `completion` Function (任意) 
  * `error` Error

HTTP リクエストをレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `redirectRequest` オブジェクト、または `url`、`method` 、`referrer`、`uploadData`、`session` プロパティを持つオブジェクトで呼び出す必要があります。

デフォルトでは、HTTP リクエストは現在のセッションを再利用します。リクエストが別のセッションであるようにするには、`session` を `null` に設定する必要があります。

POST リクエストの場合、`uploadData` オブジェクトを提供する必要があります。

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (任意) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

サンプル:

```javascript
const {protocol} = require('electron')
const {PassThrough} = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const {protocol} = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (任意) 
  * `error` Error

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function 
  * `error` Error

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `filePath` String
* `completion` Function (任意) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `data` String (任意)
* `completion` Function (任意) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `buffer` Buffer (optional)
* `completion` Function (任意) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (任意)
      * `uploadData` Object (任意) 
        * `contentType` String - コンテンツの MIME タイプ。
        * `data` String - 送信されるコンテンツ。
* `completion` Function (任意) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (任意) 
  * `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (任意) 
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.