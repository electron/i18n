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

`error` Error - 通常は、根本的な原因を識別するエラー文字列を保持します。

レスポンスデータのイベントをストリーミングしている最中にエラーが発生したときに発生します。 例えば、レスポンスのストリーミング中にサーバーがその基をクローズした場合、`error` イベントがレスポンスオブジェクトで発生し、続いて `close` イベントがリクエストオブジェクトで発生します。

### インスタンスプロパティ

`IncomingMessage` のインスタンスには、以下の読み取り可能なプロパティがあります。

#### `response.statusCode`

HTTPレスポンスステータスコードを表す `Integer`。

#### `response.statusMessage`

HTTPステータスメッセージを表す `String`。

#### `response.headers`

HTTPレスポンスヘッダを表す `Object`。`headers` オブジェクトは、以下のようにフォーマットされます。

* すべてのヘッダ名は小文字です。
* 各ヘッダー名ごとに配列の値を返すプロパティがヘッダーオブジェクトに生成されます。
* 各ヘッダーの値はヘッダー名に関連付けられた配列に格納されます。

#### `response.httpVersion`

HTTPプロトコルのバージョン番号を示す `String`。 典型的な値は、'1.0'や'1.1'です。 さらに、`httpVersionMajor` と `httpVersionMinor` は、2つともIntegerの値を返す読み取り専用プロパティで、それぞれHTTPのメジャーとマイナーのバージョン番号を返します。

#### `response.httpVersionMajor`

HTTPプロトコルのメジャーバージョン番号を示す `Integer`。

#### `response.httpVersionMinor`

HTTPプロトコルのマイナーバージョン番号を示す `Integer`。