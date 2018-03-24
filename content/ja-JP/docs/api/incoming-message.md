## クラス: IncomingMessage

> HTTP/HTTPSリクエストに対するレスポンスを処理します。

プロセス: [Main](../glossary.md#main-process)

`IncomingMessage` は [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) インターフェースを実装しているため、[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

### インスタンスイベント

#### イベント: 'data'

戻り値:

* `chunk` Buffer - レスポンスボディのデータのチャンク。

`data` イベントはレスポンスデータを実用的なコードに移す常套手段です。

#### イベント: 'end'

レスポンスボディが終了したことを示します。

#### イベント: 'aborted'

現在進行しているHTTPのやり取り中にリクエストがキャンセルされたときに発生します。

#### イベント: 'error'

戻り値:

`error` Error - 通常、失敗の根本的な原因を識別するエラー文字列を保持しています。

レスポンスデータのイベントが流れている最中にエラーが発生したときに発生します。 例えば、レスポンスがまだ流れている最中にサーバーがその基をクローズすると、レスポンスオブジェクトで `error` イベントが発生し、続いてリクエストオブジェクトで `close` イベントが発生します。

### インスタンスプロパティ

`IncomingMessage` のインスタンスには、以下の読み取り可能なプロパティがあります。

#### `response.statusCode`

HTTPレスポンスステータスコードを表す `Integer`。

#### `response.statusMessage`

HTTPステータスメッセージを表す `String`。

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