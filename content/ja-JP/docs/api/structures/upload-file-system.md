# UploadFileSystem オブジェクト

* `type` String - `fileSystem`。
* `filsSystemURL` String - アップロードするデータを読み取る FileSystem の URL。
* `offset` Integer - 省略値は `0`。
* `length` Integer - Number of bytes to read from `offset`. Defaults to `0`.
* `modificationTime` Double - UNIX エポックからの最終変更した秒数。