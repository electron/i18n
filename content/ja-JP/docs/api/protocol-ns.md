# protocol (NetworkService) (草案)

このドキュメントでは、[NetworkService](https://www.chromium.org/servicification) に基づいた新しい protocol API について説明します。

現時点では、Electron でデフォルトで `NetworkService` を有効にする時期は推定されていませんが、Chromium は既に `NetworkService` 以外のコードを削除しているため、Electron 10 より前に切り替わる可能性があります。

Electron でデフォルトで `NetworkService` を有効にされれば、このドキュメントの内容を `protocol.md` に移動する必要があります。

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
  })

  mainWindow = new BrowserWindow({ webPreferences: { partition } })
})
```

## メソッド

`protocol` モジュールには以下のメソッドがあります。

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**注意:** このメソッドは、`app` モジュールの `ready` イベントが発行される前にのみ使用でき、一度だけ呼び出すことができます。

`scheme` を標準の安全なものとして登録し、リソースに対するコンテンツセキュリティポリシーをバイパスし、ServiceWorker を登録し、fetch API をサポートします。 機能を有効にするには、`true` の値で特権を指定します。

以下はコンテンツセキュリティポリシーをバイパスする特権スキームを登録する例です。

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

デフォルトの非標準スキームでは、ウェブストレージ API (localStorage、sessionStorage、webSQL、indexedDB、クッキー) が無効にされます。 そのため、一般的に、カスタムプロトコルを登録して `http` プロトコルを置き換える場合は、標準のスキームとして登録する必要があります。

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

ファイルをレスポンスとして送信する `scheme` のプロトコルを登録します。 `handler` は `request` と `callback` で呼び出されます。この `request` は `scheme` の接続リクエストです。

`request` を処理するには、`callback` を、ファイルのパスまたは `path` プロパティを持つオブジェクトのいずれかを使用して、例えば、`callback(filePath)` や `callback({ path: filePath })` で呼び出す必要があります。 `filePath` は絶対パスでなければなりません。

デフォルトでは、`scheme` は `http:` のように扱われます。これは、`file:` のような "Generic URI Syntax" に従うプロトコルとは違った解析がなされます。

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

`Buffer` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使い方は `registerFileProtocol` と同じですが、 `callback` を、`Buffer` オブジェクトか `data` プロパティを持つオブジェクトで呼び出す必要があります。

サンプル:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`String` をレスポンスとして送信する `scheme` のプロトコルを登録します。

使い方は `registerFileProtocol` と同じですが、 `callback` を、`String` か `data` プロパティを持つオブジェクトで呼び出す必要があります。

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

HTTP リクエストをレスポンスとして送信する `scheme` のプロトコルを登録します。

使い方は `registerFileProtocol` と同じですが、 `callback` を、`url` プロパティを持つオブジェクトで呼び出す必要があります。

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

ストリームをレスポンスとして送信する `scheme` のプロトコルを登録します。

使い方は `registerFileProtocol` と同じですが、 `callback` を、[`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) オブジェクトか `data` プロパティを持つオブジェクトで呼び出す必要があります。

サンプル:

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough も ReadableStream の一種
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
})
```

Readable ストリーム API (`data` / `end` / `error` イベントが発生するもの) を実装するオブジェクトを渡すことが可能です。 例として、ファイルを返す方法を以下に示します。

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

`scheme` のカスタムプロトコルを登録解除します。

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

戻り値 `Boolean` - `scheme` がすでに登録されているかどうか。

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`scheme` プロトコルを傍受し、ファイルをレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`scheme` プロトコルを傍受し、`String` をレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

`scheme` プロトコルを傍受し、`Buffer` をレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

`scheme` プロトコルを傍受し、新しい HTTP リクエストをレスポンスとして送信するプロトコルの新しいハンドラとして `handler` を使用します。

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

`protocol.registerStreamProtocol` と同じですが、既存のプロトコルハンドラを置き換える点が異なります。

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

`scheme` のためにインストールされた傍受するハンドラを削除し、元のハンドラを復元します。

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

戻り値 `Boolean` - `scheme` がすでにインターセプトされているかどうか。
