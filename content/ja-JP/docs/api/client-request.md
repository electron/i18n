## クラス: ClientRequest

> HTTP/HTTPリクエストを行います。

プロセス: [Main](../glossary.md#main-process)

`ClientRequest` は [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) インターフェースを実装しているため、 [EventEmitter][event-emitter] です。

### `new ClientRequest(options)`

* `options` (Object | String) - もし `options` が String なら、リクエスト URL として処理されます。 オブジェクトの場合は、次のプロパティによる HTTP リクエストの完全な指定と予期されます。
  * `method` String (任意) - HTTP リクエストのメソッド。 既定では GET メソッドです。
  * `url` String (任意) - リクエスト URL 。 http または https のプロトコルスキームを含む絶対形式である必要があります。
  * `session` Session (任意) - リクエストが関連付けられている [`Session`](session.md) のインスタンス。
  * `partition` String (任意) - リクエストが関連付けられている [`partition`](session.md) の名前。 省略値は、空の文字列です。 `session` オプションは `partition` を上書きします。 そのため、`session` が明示的に指定されている場合、`partition` は無視されます。
  * `credentials` String (任意) - `include` か `omit` にできます。 このリクエストと一緒に [資格情報](https://fetch.spec.whatwg.org/#credentials) を送信するかどうか。 `include` に設定した場合、リクエストに関連付けられたセッションからの資格情報が使用されます。 `omit` に設定した場合、資格情報はリクエストと一緒に送信されません (そして 401 の場合に `'login'` イベントが発生しません)。 これは、同名の [fetch](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) オプションの動作と同じです。 このオプションを指定しない場合、セッションからの認証データは送信され、(`useSessionCookies` を設定しない限り) Cookie は送信されません。
  * `useSessionCookies` Boolean (任意) - 指定のセッションからこのリクエストで Cookie を送るかどうか。 `credentials` を指定した場合、このオプションの効果はありません。 省略値は、`false` です。
  * `protocol` String (任意) - `http:` か `https:` にできます。 これは 'scheme:' という形式のプロトコルスキームです。 既定値は 'http:' です。
  * `host` String (任意) - ホスト名とポート番号を連結した 'hostname:port' として指定されたサーバーホスト。
  * `hostname` String (任意) - サーバーホスト名。
  * `port` Integer (任意) - サーバーのリスニングポート番号。
  * `path` String (任意) - リクエストURLのパスの部分。
  * `redirect` String (任意) - `follow`、`error`、`manual` のいずれかにできます。 これはこのリクエストのリダイレクトモードです。 モードが `error` のとき、リダイレクトは中止されます。 モードが `manual` のときは、[`request.followRedirect`](#requestfollowredirect) が呼び出されるまで [`redirect`](#event-redirect) イベントは同期的に中止されます。  省略値は、`follow` です。
  * `origin` String (任意) - リクエストのオリジン URL。

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

* `response` [IncomingMessage](incoming-message.md) - HTTP レスポンスメッセージを表すオブジェクト。

#### イベント: 'login'

戻り値:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (任意)
  * `password` String (任意)

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

`request` が中止されたときに発生します。 `request` が既に閉じられている場合、 `abort` イベントは発生しません。

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
* `responseHeaders` Record<String, String[]>

サーバーがリダイレクトのレスポンス (301 Moved Permanently など) を返すときに生成されます。 [`request.followRedirect`](#requestfollowredirect) を呼び出すと、リダイレクトが続行されます。  このイベントを処理する場合、[`request.followRedirect`](#requestfollowredirect) を **同期的に** で呼び出す必要があります。でなければ、リクエストはキャンセルされます。

### インスタンスプロパティ

#### `request.chunkedEncoding`

リクエストがHTTPのチャンク形式転送エンコーディングを使用するかどうかを指定する `Boolean` 型。 省略値は false 。 プロパティは読み書き可能ですが、HTTPヘッダーがまだ送信されていない最初の書き込み操作の前でしか設定できません。 最初の書き込みの後、`chunkedEncoding` プロパティを設定しようとすると、エラーがスローされます。

Electronのプロセスメモリの中で内部的にバッファする代わりにデータが細切れにストリーミングされるため、大きなリクエストボディを送信する必要がある場合、チャンク形式のエンコーディングを使用することを強く推奨します。

### インスタンスメソッド

#### `request.setHeader(name, value)`

* `name` String - 追加する HTTP ヘッダーの名前。
* `value` String - 追加する HTTP ヘッダーの値。

別の HTTP ヘッダーを追加します。 ヘッダー名は小文字にされることなく、そのまま出力されます。 最初の書き込み前のみ呼び出すことができます。 最初の書き込み後にこのメソッドを呼び出すとエラーがスローされます。 渡された値が `String` 型でない場合、最終的な値を得るために `toString()` メソッドが呼び出されます。

特定のヘッダーはアプリによって設定されないように制限されています。 これらのヘッダは以下にリストアップしています。 制限付きヘッダーの詳細は、[Chromium のヘッダー ユーティリティ](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22) を参照してください。

* `Content-Length`
* `ホスト`
* `Trailer` または `Te`
* `Upgrade`
* `Cookie2`
* `Keep-Alive`
* `Transfer-Encoding`

さらに、`Connection` ヘッダを `upgrade` の値に設定することも禁止されています。

#### `request.getHeader(name)`

* `name` String - 追加したヘッダーの名前を指定します。

戻り値 `String` - 先に設定した追加したヘッダーの名前の値。

#### `request.removeHeader(name)`

* `name` String - 追加したヘッダーの名前を指定します。

以前に設定した追加ヘッダーの名前を削除します。 このメソッドは、最初の書き込み前のみ呼び出すことができます。 最初の書き込み後にこのメソッドを呼び出すとエラーがスローされます。

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - リクエストボディのデータのチャンク。 文字列の場合、指定されたエンコーディングで Buffer に変換されます。
* `encoding` String (任意) - 文字列のチャンクを Buffer オブジェクトへ変換する際に使用されます。 既定値は 'utf-8' です。
* `callback` Function (任意) - 書き込み操作の終了後に呼び出されます。

`callback` は、Node.jsのAPIとの類似性を維持する目的で導入された本質的にはダミーのファンクションです。 `chunk` コンテンツがChromiumのネットワークレイヤーに到達した後、すぐに非同期で呼び出されます。 Node.jsの実装とは違って、`callback` が呼び出される前に `chunk` コンテンツが書き込まれていることは保証されません。

リクエストボディにデータのチャンクを追加します。 最初の書き込み操作では、リクエストヘッダーも出力される可能性があります。 最初の書き込み操作の後、カスタムヘッダーを追加したり、削除したりすることはできません。

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (任意)
* `encoding` String (任意)
* `callback` Function (任意)

リクエストデータの最終チャンクを送信します。 後続の書き込みまたは終了の操作は許可されません。 終了操作の直後に `finish` イベントが発生します。

#### `request.abort()`

現在進行中のHTTPトランザクションをキャンセルします。 リクエストで既に `close` イベントが発生していた場合、中止操作は無効になります。 そうでない場合、進行中のイベントでは、`abort` と `close` イベントが発生します。 さらに、処理中のレスポンスオブジェクトがある場合、`aborted` イベントが発生します。

#### `request.followRedirect()`

保留中のリダイレクトを続行します。 `'redirect'` イベントの間のみ呼び出せます。

#### `request.getUploadProgress()`

戻り値 `Object`:

* `active` Boolean - リクエストが現在アクティブかどうか。 これが false の場合、他のプロパティは設定されません。
* `started` Boolean - アップロードが開始されたかどうか。 これが false の場合、 `current` と `total` は 0 になります。
* `current` Integer - どのくらいアップロードしたかのバイト数。
* `total` Integer - このリクエストでアップロードされるバイト数。

このメソッドを `POST` リクエストと組み合わせて使用すると、ファイルのアップロードや他のデータ転送の進行状況を取得できます。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
