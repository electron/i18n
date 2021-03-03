# net

> Chromium のネイティブのネットワークライブラリを使用して、 HTTP/HTTPS リクエストを発行します。

プロセス: [Main](../glossary.md#main-process)

`net` モジュールは HTTP(S) リクエストを発行するクライアントサイド API です。 これは Node.js の [HTTP](https://nodejs.org/api/http.html) および [HTTPS](https://nodejs.org/api/https.html) モジュールに似ていますが、Node.js 実装の代わりに Chromium のネイティブネットワークライブラリを使用し、ウェブプロキシをより効果的にサポートします。 It also supports checking network status.

以下は、完全に網羅しているわけではありませんが、ネイティブ Node.js モジュールの代わりに `net` モジュールを使用することを検討する理由のリストです。

* システムプロキシ設定の自動管理、WPAD プロトコルとプロキシの PAC 設定ファイルのサポート。
* HTTPS リクエストの自動トンネリング。
* Basic、Digest、NTLM、Kerberosを使用したプロキシの認証、またはネゴシエート認証スキームをサポート。
* アクセス制御および監視に使用される、Fiddler のようなトラフィック監視プロキシのサポート。

API コンポーネント (クラス、メソッド、プロパティ、イベント名など) は、Node.js で使用されているものと同様です。

使用例:

```javascript
const { app } = require('electron')
app.whenReady().then(() => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

`net` API は、アプリケーションが `ready` イベントを発生させた後でのみ使用できます。 `ready` イベントの前にモジュールを使用しようとすると、エラーがスローされます。

## メソッド

`net` モジュールには以下のメソッドがあります。

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - `ClientRequest` コンストラクタのオプション。

戻り値 [`ClientRequest`](./client-request.md)

`ClientRequest` コンストラクタに直接転送される `options` を使用して[`ClientRequest`](./client-request.md) インスタンスを作成します。 `net.request` メソッドは、`options` オブジェクト内の指定されたプロトコルにしたがって、セキュアとインセキュア両方の HTTP リクエストを発行するために使用されます。

### `net.isOnline()`

Returns `Boolean` - Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.

## プロパティ

### `net.online` _読み出し専用_

A `Boolean` property. Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.
