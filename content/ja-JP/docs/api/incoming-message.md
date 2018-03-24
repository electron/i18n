## クラス: IncomingMessage

> HTTP/HTTPSリクエストに対するレスポンスを処理します。

プロセス: [Main](../glossary.md#main-process)

`ClientRequest` は [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) インターフェースを実装しているため、[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

### インスタンスイベント

#### イベント: 'data'

戻り値:

* `chunk` Buffer - 応答の本文のデータのチャンク。

`data` イベントは、アプリケーションコードにデータを転送するよくある方法です。

#### イベント: 'end'

応答の本文が終了したことを示します。

#### イベント: 'aborted'

現在進行中の HTTP のトランザクション中に、リクエストが取り消されたときに発行されます。

#### イベント: 'error'

戻り値:

`error` Error - 通常は、根本的な原因を特定するエラー文字列を保持します。

応答データのイベントをストリーミング中に、エラーが発生したときに発行されます。 たとえば、応答のストリーミング中にサーバーがその元をクローズした場合、`error` イベントが応答オブジェクトに発行され、`close` イベントがリクエストオブジェクトに続いて実行されます。

### インスタンスプロパティ

`IncomingMessage` のインスタンスには、以下の読み取り可能なプロパティがあります。

#### `response.statusCode`

HTTP 応答ステータスコードを表す `Integer`。

#### `response.statusMessage`

HTTP ステータスメッセージを表す `String`。

#### `response.headers`

HTTP 応答ヘッダを表す `Object`。`headers` オブジェクトのフォーマットは以下のとおりです。

* すべてのヘッダ名は小文字です。
* 各ヘッダ名は、ヘッダオブジェクトに配列値のプロパティを生成します。
* 各ヘッダの値は、そのヘッダ名に関連付けられている配列にプッシュされます。

#### `response.httpVersion`

HTTP プロトコルのバージョン番号を示す `String`。 よくある値は '1.0' や '1.1'。 Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.