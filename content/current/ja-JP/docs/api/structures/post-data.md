# PostData オブジェクト

* `type` String - 以下のいずれかです。
  * `rawData` - このデータは `rawData` フィールドの `Buffer` として利用できます。
  * `file` - このオブジェクトはファイルを表します。 `filePath`、`offset`、`length`、`modificationTime` フィールドでファイルを記述します。
  * `Blob` - このオブジェクトは `Blob` を表します。 `Blob` の説明に `blobUUID` フィールドを使います。
* `bytes` String (任意) - `Buffer` 型の送信データの生バイト。 type が `rawData` である必要があります。
* `filePath` String (任意) - アップロードされるファイルのパス。 type が `file` である必要があります。
* `blobUUID` String (任意) - アップロードされる `Blob` の `UUID`。 type が `blob` である必要があります。
* `offset` Integer (任意) - アップロードするファイルの先頭からのバイト単位オフセット。 type が `file` の場合のみ有効です。
* `length` Integer (任意) - アップロードされるファイルのバイト長。 `-1` にすると、ファイル全体がアップロードされます。 type が `file` の場合のみ有効です。
* `modificationTime` Double (任意) - `UNIX エポック` (1970年1月1日) からの秒数で表したファイルの最終変更時刻です。 type が `file` の場合のみ有効です。
