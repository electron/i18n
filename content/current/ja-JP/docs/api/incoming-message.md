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

`Record<string, string | string[]>` 型。HTTP レスポンスヘッダを表します。 `headers` オブジェクトは以下のようにフォーマットされます:

* すべてのヘッダ名は小文字です。
* `age`、`authorization`、`content-length`、`content-type`、`etag`、`expires`、`from`、`host`、`if-modified-since`、`if-unmodified-since`、`last-modified`、`location`、`max-forwards`、`proxy-authorization`、`referer`、`retry-after`、`server`、`user-agent` の重複は破棄されます。
* `set-cookie` は常に配列です。 重複は配列へと追加されます。
* 重複した `cookie` ヘッダは、値を '; ' で結合します。
* 他の重複したヘッダはすべて、値を ', ' で結合します。

#### `response.httpVersion`

HTTPプロトコルのバージョン番号を示す `String`。 典型的な値は、'1.0'や'1.1'です。 さらに、`httpVersionMajor` と `httpVersionMinor` は、2つともIntegerの値を返す読み取り専用プロパティで、それぞれHTTPのメジャーとマイナーのバージョン番号を返します。

#### `response.httpVersionMajor`

HTTPプロトコルのメジャーバージョン番号を示す `Integer`。

#### `response.httpVersionMinor`

HTTPプロトコルのマイナーバージョン番号を示す `Integer`。
