# net

> Chromium のネイティブのネットワークライブラリを使用して、 HTTP/HTTPS リクエストを発行します。

プロセス: [Main](../glossary.md#main-process)

`net` モジュールは HTTP(S) リクエストを発行するクライアントサイド API です。 これは Node.js の [HTTP](https://nodejs.org/api/http.html) および [HTTPS](https://nodejs.org/api/https.html) モジュールに似ていますが、Node.js 実装の代わりに Chromium のネイティブネットワークライブラリを使用し、ウェブプロキシをより効果的にサポートします。 また、ネットワーク状況の確認にも対応しています。

以下は、完全に網羅しているわけではありませんが、ネイティブ Node.js モジュールの代わりに `net` モジュールを使用することを検討する理由のリストです。

* システムプロキシ設定の自動管理、WPAD プロトコルとプロキシの PAC 設定ファイルのサポート。
* HTTPS リクエストの自動トンネリング。
* Basic、Digest、NTLM、Kerberosを使用したプロキシの認証、またはネゴシエート認証スキームをサポート。
* アクセス制御および監視に使用される、Fiddler のようなトラフィック監視プロキシのサポート。

API コンポーネント (クラス、メソッド、プロパティ、イベント名など) は、Node.js で使用されているものと同様です。

使用例:

```javascript
const { app } =
アプリを必要とする ('電子') .com) .com後に
  => { { net }
  コンスト要求 = net.request(''github.com')
  要求を要求します。 (応答) => {
    コンソール.log ('status: ${response.statusCode}')
    コンソール.log(HEADERS: ${JSON.stringify(応答.ヘッダー)})
    応答.on('data,(チャンク) => {
      コンソール.log (' ${chunk}'
    )
    応答
      > .log (.com )
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

### `ネットです。`

戻り値 `Boolean` - 現在インターネットに接続しているかどうか。

戻り値が `false` の場合、ユーザーがリモートサイトに接続できないことをかなり強く示しています。 しかし、`true` の戻り値は決定的ではありません。いくつかのリンクが見当たらなくても、特定リモートサイトへの特定の接続試行が成功するかどうかは不確かです。

## プロパティ

### `net.online` _読み出し専用_

`Boolean` 型のプロパティです。 これは現在インターネットに接続しているかどうかです。

戻り値が `false` の場合、ユーザーがリモートサイトに接続できないことをかなり強く示しています。 しかし、`true` の戻り値は決定的ではありません。いくつかのリンクが見当たらなくても、特定リモートサイトへの特定の接続試行が成功するかどうかは不確かです。
