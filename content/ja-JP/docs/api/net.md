# net

> Chromium のネイティブのネットワークライブラリを使用して、 HTTP/HTTPS リクエストを発行します。

プロセス: [Main](../glossary.md#main-process)

`net` モジュールは HTTP(S) リクエストを発行するクライアントサイド API です。 これは Node.js の [HTTP](https://nodejs.org/api/http.html) および [HTTPS](https://nodejs.org/api/https.html) モジュールに似ていますが、Node.js 実装の代わりに Chromium のネイティブネットワークライブラリを使用し、ウェブプロキシをより効果的にサポートします。

以下は、完全に網羅しているわけではありませんが、ネイティブ Node.js モジュールの代わりに `net` モジュールを使用することを検討する理由のリストです。

* システムプロキシ設定の自動管理、WPAD プロトコルとプロキシの PAC 設定ファイルのサポート。
* HTTPS リクエストの自動トンネリング。
* Basic、Digest、NTLM、Kerberosを使用したプロキシの認証、またはネゴシエート認証スキームをサポート。
* アクセス制御および監視に使用される、Fiddler のようなトラフィック監視プロキシのサポート。

`net` モジュール API は、馴染みの Node.js API を可能な限り模倣するように特別に設計されています。 クラス、メソッド、プロパティ、イベント名などの API コンポーネントは、Node.js で一般的に使用されているものと同様です。

例として、次のサンプルは簡単な `net` API の使用方法を示します。

```javascript
const {app} = require('electron')
app.on('ready', () => {
  const {net} = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('もう応答にデータはないよ。')
    })
  })
  request.end()
})
```

ところで、これは Node.js の [HTTP](https://nodejs.org/api/http.html) / [HTTPS](https://nodejs.org/api/https.html) モジュールを通常どおりに使用する方法とほぼ同じです。

`net` API は、アプリケーションが `ready` イベントを発行した後にのみ使用できます。 `ready` イベントの前にモジュールを使用しようとすると、エラーが発生します。

## メソッド

`net` モジュールには以下のメソッドがあります。

### `net.request(options)`

* `options` (Object | String) - `ClientRequest` のコンストラクタのオプション。

戻り値 [`ClientRequest`](./client-request.md)

`ClientRequest` コンストラクタに直接転送される `options` を使用して[`ClientRequest`](./client-request.md) インスタンスを作成します。 `net.request` メソッドは、`options` オブジェクト内の指定されたプロトコルにしたがって、セキュアとインセキュア両方の HTTP リクエストを発行するために使用されます。