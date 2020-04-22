# protocol

> カスタムプロトコルを登録し、既存のプロトコルリクエストを傍受します。

プロセス: [Main](../glossary.md#main-process)

`file://` プロトコルと同じ効果を持つプロトコルの実装の例:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## `protocol` をカスタムの `partition` や `session` で使用する

プロトコルは特定の Electron [`session`](./session.md) オブジェクトに登録されます。 セッションを指定しない場合は、Electron が使用するデフォルトセッションに `protocol` が適用されます。 ただし、`browserWindow` の `webPreferences` に `partition` または `session` を定義すると、そのウィンドウに `electron.protocol.XXX` を使用しただけでは別のセッションやカスタムプロトコルは機能しません。

カスタムプロトコルをカスタムセッションと組み合わせて機能させるには、それを明示的にそのセッションに登録する必要があります。

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      partition: partition
    }
  })
})
```

## メソッド

`protocol` モジュールには以下のメソッドがあります。

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)


**注意:** このメソッドは、`app` モジュールの `ready` イベントが発行される前にのみ使用でき、一度だけ呼び出すことができます。

`scheme` を標準の安全なものとして登録し、リソースに対するコンテンツセキュリティポリシーをバイパスし、ServiceWorker を登録し、fetch API をサポートします。

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

標準スキームは、RFC 3986 で [Generic URI Syntax](https://tools.ietf.org/html/rfc3986#section-3) と呼ぶものに準拠しています。 例えば `http` と `https` は標準スキームですが、`file` はそうではありません。

スキームを標準として登録することにより、サービスが提供されるときに相対的および絶対的なリソースが正しく解決されます。 そうでないと、スキームは `file` プロトコルのように動作しますが、相対 URL を解決することはできません。

たとえば、標準スキームとして登録せずにカスタムプロトコルで以下のページをロードすると、非標準スキームが相対URLを認識できないため、イメージはロードされません。

```html
<body>
  <img src='test.png'>
</body>
```

スキームを標準で登録すると、[FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) を介してファイルにアクセスできます。 そうしない場合、レンダラーはスキームのセキュリティエラーをスローします。

デフォルトでは、非標準スキームはウェブストレージ API (localStorage, sessionStorage, webSQL, indexedDB, cookies) が無効にされます。 そのため、一般的に、カスタムプロトコルを登録して `http` プロトコルを置き換える場合は、標準のスキームとして登録する必要があります。

`protocol.registerSchemesAsPrivileged` は、Electron 5.0.0 以前に存在していた以前の `protocol.registerStandardSchemes`、`webFrame.registerURLSchemeAs*`、および `protocol.registerServiceWorkerSchemes` 関数の機能を再現するために使用できます。以下に例を示します。

**before (<= v4.x)**
```javascript
// メイン
protocol.registerStandardSchemes(['scheme1', 'scheme2'], { secure: true })
// レンダラー
webFrame.registerURLSchemeAsPrivileged('scheme1', { secure: true })
webFrame.registerURLSchemeAsPrivileged('scheme2', { secure: true })
```

**after (>= v5.x)**
```javascript
protocol.registerSchemesAsPrivileged([
  { scheme: 'scheme1', privileges: { standard: true, secure: true } },
  { scheme: 'scheme2', privileges: { standard: true, secure: true } }
])
```

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String | [FilePathWithHeaders](structures/file-path-with-headers.md) (任意)
* `completion` Function (optional)
  * `error` Error

ファイルをレスポンスとして送信する `scheme` のプロトコルを登録します。 `request` が `scheme` で作成されると、`handler` が `handler(request, callback)` で呼び出されます。 `completion` は、`scheme` が正常に登録された場合は `completion(null)`、失敗した場合は `completion(error)` で呼び出されます。

`request` を処理するには、`callback` を、ファイルのパスまたは `path` プロパティを持つオブジェクトのいずれかを使用して、例えば、`callback(filePath)` や `callback({ path: filePath })` で呼び出す必要があります。 オブジェクトは、レスポンスヘッダの値にヘッダのマップを与える `headers` プロパティ - 例えば `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})` - を持つこともできます。

引数なし、数、または `error` プロパティを持つオブジェクトで `callback` が呼び出されると、 `request` は指定した `error` 番号で失敗します。 使用できる利用可能なエラー番号については、[net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) を参照してください。

デフォルトでは、`scheme` は `http:` のように扱われます。これは、`file:` のような "Generic URI Syntax" に従うプロトコルとは違って解析されます。

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (任意)
* `completion` Function (optional)
  * `error` Error

`Buffer` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `Buffer` オブジェクト、または `data`、`mimeType` 、`charset` プロパティを持つオブジェクトで呼び出す必要があります。

サンプル:

```javascript
const { protocol } = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (任意)
* `completion` Function (optional)
  * `error` Error

`String` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `String` オブジェクト、または `data`、`mimeType` 、`charset` プロパティを持つオブジェクトで呼び出す必要があります。

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String (任意)
      * `session` Session | null (任意)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (任意)
* `completion` Function (optional)
  * `error` Error

HTTP リクエストをレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `registerFileProtocol` と同じですが、 `callback` を `redirectRequest` オブジェクト、または `url`、`method` 、`referrer`、`uploadData`、`session` プロパティを持つオブジェクトで呼び出す必要があります。

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

POST リクエストの場合、`uploadData` オブジェクトを提供する必要があります。

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (任意)
* `completion` Function (optional)
  * `error` Error

`Readable` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使用法は `register{Any}Protocol` と同じですが、 `callback` を `Readable` オブジェクト、または `data`、`statusCode` 、`headers` プロパティを持つオブジェクトで呼び出す必要があります。

サンプル:

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough は Readable ストリームでもある
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

Readable ストリーム API (`data` / `end` / `error` イベントが発生するもの) を実装するオブジェクトを渡すことが可能です。 例として、ファイルを返す方法を以下に示します。

```javascript
const { protocol } = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('プロトコルの登録に失敗しました')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

`scheme` のカスタムプロトコルを登録解除します。

### `protocol.isProtocolHandled(scheme)`

* `scheme` String

戻り値 `Promise<Boolean>` - `scheme` のハンドラがすでに存在するかどうかを示すブール値が入ります。

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String
* `completion` Function (optional)
  * `error` Error

`scheme` プロトコルを傍受し、ファイルをレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (任意)
* `completion` Function (optional)
  * `error` Error

`scheme` プロトコルを傍受し、`String` をレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` Buffer (任意)
* `completion` Function (optional)
  * `error` Error

`scheme` プロトコルを傍受し、`Buffer` をレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String (任意)
      * `session` Session | null (任意)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (任意)
* `completion` Function (optional)
  * `error` Error

`scheme` プロトコルを傍受し、新しい HTTP リクエストをレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (任意)
* `completion` Function (optional)
  * `error` Error

`protocol.registerStreamProtocol` と同じですが、既存のプロトコルハンドラを置き換える点が異なります。

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

`scheme` のためにインストールされた傍受するハンドラを削除し、元のハンドラを復元します。
