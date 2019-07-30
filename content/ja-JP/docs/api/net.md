# net

> Chromium のネイティブのネットワークライブラリを使用して、 HTTP/HTTPS リクエストを発行します。

プロセス: [Main](../glossary.md#main-process)

`net` モジュールは HTTP(S) リクエストを発行するクライアントサイド API です。 これは Node.js の [HTTP](https://nodejs.org/api/http.html) および [HTTPS](https://nodejs.org/api/https.html) モジュールに似ていますが、Node.js 実装の代わりに Chromium のネイティブネットワークライブラリを使用し、ウェブプロキシをより効果的にサポートします。

以下は、完全に網羅しているわけではありませんが、ネイティブ Node.js モジュールの代わりに `net` モジュールを使用することを検討する理由のリストです。

* システムプロキシ設定の自動管理、WPAD プロトコルとプロキシの PAC 設定ファイルのサポート。
* HTTPS リクエストの自動トンネリング。
* Basic、Digest、NTLM、Kerberosを使用したプロキシの認証、またはネゴシエート認証スキームをサポート。
* アクセス制御および監視に使用される、Fiddler のようなトラフィック監視プロキシのサポート。

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

```javascript
const { app } = require('electron')
app.on('ready', () => {
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

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## メソッド

The `net` module has the following methods:

### `net.request(options)`

* `options` (Object | String) - `ClientRequest` のコンストラクタのオプション。

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.