## クラス: IncomingMessage

> HTTP/HTTPS リクエストへの応答を処理します。

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

応答データのイベントをストリーミング中に、エラーが発生したときに発行されます。 For instance, if the server closes the underlying while the response is still streaming, an `error` event will be emitted on the response object and a `close` event will subsequently follow on the request object.

### インスタンスプロパティ

An `IncomingMessage` instance has the following readable properties:

#### `response.statusCode`

An `Integer` indicating the HTTP response status code.

#### `response.statusMessage`

A `String` representing the HTTP status message.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* All header names are lowercased.
* Each header name produces an array-valued property on the headers object.
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.