## クラス: ClientRequest

> HTTP/HTTPリクエストを行います。

プロセス: [Main](../glossary.md#main-process)

`ClientRequest` は [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) インターフェースを実装しているため、 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

### `new ClientRequest(options)`

* `options` (Object | String) - もし `options` が String の場合、リクエストURLとして解釈されます。もし Object の場合、以下のプロパティによるHTTPリクエストとして完全に指定されていることが期待されます。 
  * `method` String (任意) - HTTPリクエストメソッド。省略値は、GETメソッドです。
  * `url` String (任意) - リクエストURL。httpまたはhttpsとして指定されているプロトコルスキームを伴う完全な形式で指定しなければなりません。
  * `session` Object (任意) - リクエストが関連付けられている [`Session`](session.md) のインスタンス。
  * `partition` String (任意) - リクエストが関連付けられている [`partition`](session.md) の名前。 省略値は、空の文字列です。 `session` オプションは、`partition` よりも優先されます。 そのため、`session` が明示的に指定されている場合、`partition` は無視されます。
  * `protocol` String (任意) - 'scheme:' という形式のプロトコルスキーム。 現在サポートされている値は、'http:' または 'https:' です。省略値は、'http:' です。
  * `host` String (任意) - ホスト名とポート番号を連結した 'hostname:port' として指定されたサーバーホスト。
  * `hostname` String (任意) - サーバーホスト名。
  * `port` Integer (任意) - サーバーのリスニングポート番号。
  * `path` String (任意) - リクエストURLのパスの部分。
  * `redirect` String (任意) - このリクエストのリダイレクトモード。 `follow`、`error` または `manual` のいずれかにする必要があります。 省略値は、`follow` です。 モードが `error` のとき、リダイレクトは中止されます。 モードが `manual` のとき、[`request.followRedirect`](#requestfollowredirect) が呼び出されるまで、リダイレクトは遅延されます。 リダイレクトリクエストの詳細を得るため、このモードでは、[`redirect`](#event-redirect) イベントを待ち受けるようにしてください。

`protocol`、`host`、`hostname`、`port` や `path` といった `options` プロパティは、[URL](https://nodejs.org/api/url.html) モジュールで説明されている Node.js モデルに厳密に従うようにしてください。

例えば、以下のようにすると、'github.com' に対してリクエストをしているのと同じです。

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### インスタンスイベント

#### イベント: 'response'

戻り値:

* `response` IncomingMessage - HTTPレスポンスメッセージを表すオブジェクト。

#### イベント: 'login'

戻り値:

* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

認証プロキシがユーザの資格情報を要求しているときに発生します。

`callback` ファンクションは、ユーザの資格情報と共にコールバックされます。

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

空の資格情報を指定すると、リクエストがキャンセルされ、レスポンスオブジェクトで認証エラーが返ります。

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### イベント: 'finish'

`request` のデータの最後のチャンクが `request` オブジェクトに書き込まれた直後に発生します。

#### イベント: 'abort'

`request` が中止されたときに発生します。`request` が既に終了している場合、`abort` イベントは発生しません。

#### イベント: 'error'

戻り値:

* `error` Error - 失敗に関するいくつかの情報を提供するエラーオブジェクト。

`net` モジュールがネットワークリクエストを行うのに失敗するときに発生します。 通常、`request` オブジェクトが `error` イベントを発生させるとき、続いて `close` イベントが発生し、レスポンスオブジェクトが返ることはありません。

#### イベント: 'close'

HTTPのリクエストからレスポンスまでのやり取りの最後のイベントして発生します。 `close` イベントは、`request` または `response` オブジェクトのいずれでもこれ以上のイベントが発生しないことを示します。

#### イベント: 'redirect'

戻り値:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

リダイレクトがあり、モードが `manual` のときに発生します。[`request.followRedirect`](#requestfollowredirect) を呼び出すことでリダイレクトが続行されます。

### インスタンスプロパティ

#### `request.chunkedEncoding`

リクエストがHTTPのチャンク形式転送エンコーディングを使用するかどうかを指定する `Boolean` 型。 省略値は false 。 プロパティは読み書き可能ですが、HTTPヘッダーがまだ送信されていない最初の書き込み操作の前でしか設定できません。 最初の書き込みの後、`chunkedEncoding` プロパティを設定しようとすると、エラーがスローされます。

Electronのプロセスメモリの中で内部的にバッファする代わりにデータが細切れにストリーミングされるため、大きなリクエストボディを送信する必要がある場合、チャンク形式のエンコーディングを使用することを強く推奨します。

### インスタンスメソッド

#### `request.setHeader(name, value)`

* `name` String - 追加するHTTPヘッダーの名前。
* `value` Object - 追加するHTTPヘッダーの値。

さらなるHTTPヘッダーを追加します。 ヘッダー名は小文字にされることなく、そのまま出力されます。 最初の書き込み前のみ呼び出すことができます。 最初の書き込み後にこのメソッドを呼び出すとエラーがスローされます。 渡された値が `String` 型でない場合、最終的な値を得るために `toString()` メソッドが呼び出されます。

#### `request.getHeader(name)`

* `name` String - 追加したヘッダーの名前を指定します。

戻り値 `Object` - 先に設定した追加したヘッダーの名前の値。

#### `request.removeHeader(name)`

* `name` String - 追加したヘッダーの名前を指定します。

先に設定した追加したヘッダーの名前を削除します。このメソッドは、最初の書き込み前のみ呼び出すことができます。最初の書き込み後に呼び出そうとするとエラーがスローされます。

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - リクエストボディのデータのチャンク。文字列の場合、指定されたエンコーディングを使用して Buffer に変換されます。
* `encoding` String (任意) - 文字列のチャンクをBufferオブジェクトに変換するために使用します。省略値は、'utf-8' です。
* `callback` Function (任意) - 書き込み操作の終了後に呼び出されます。

`callback` は、Node.jsのAPIとの類似性を維持する目的で導入された本質的にはダミーのファンクションです。 `chunk` コンテンツがChromiumのネットワークレイヤーに到達した後、すぐに非同期で呼び出されます。 Node.jsの実装とは違って、`callback` が呼び出される前に `chunk` コンテンツが書き込まれていることは保証されません。

リクエストボディにデータのチャンクを追加します。 最初の書き込み操作では、リクエストヘッダーも出力される可能性があります。 最初の書き込み操作の後、カスタムヘッダーを追加したり、削除したりすることはできません。

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (任意)
* `encoding` String (任意)
* `callback` Function (任意)

リクエストデータの最後のチャックを送信します。これ以上の書き込みや終了操作をすることはできません。`finish` イベントが終了操作の直後に発生します。

#### `request.abort()`

現在進行中のHTTPトランザクションをキャンセルします。 リクエストで既に `close` イベントが発生していた場合、中止操作は無効になります。 そうでない場合、進行中のイベントでは、`abort` と `close` イベントが発生します。 さらに、処理中のレスポンスオブジェクトがある場合、`aborted` イベントが発生します。

#### `request.followRedirect()`

リダイレクトモードが、`manual` のとき、遅延しているリダイレクトリクエストを続行します。