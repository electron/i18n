# PostData オブジェクト

* `type` String - 以下のいずれかです。
  * `rawData` - `rawData` フィールドで`Buffer`としてこのデータが使用できます。
  * `file` - オブジェクトはファイルを表す。 `filePath`, `offset`, `length`または `modificationTime` フィールドをつかってファイルを説明します。
  * `Blob` - オブジェクトは `Blob` を表します。 `blobUUID` フィールドは `Blob` を説明するために使います。
* `bytes` String (任意) - `Buffer` のポストデータの生のバイト。 `rawData` 型に必要です。
* `filePath` String (任意) - アップロードされるファイルのパス。 `file` 型に必要です。
* `blobUUID` String (任意) - アップロードされた `Blob` の `UUID`。 `blob` 型に必要です。
* `offset` Integer (任意) - アップロードされたファイルの先頭からのオフセット(バイト単位)。 `file` 型のみ有効です。
* `length` Integer (任意) - アップロードされたファイルの長さ(バイト単位)。 `-1`に設定すると、ファイル全体がアップロードされます。 `file` 型のみ有効です。
* `modificationTime` 倍精度 (オプション) - 倍精度で表したファイルの変更時刻で、`UNIX Epoch`の1970年1月1日からの経過時間(秒数)で表します。 `file` 型のみ有効です。
