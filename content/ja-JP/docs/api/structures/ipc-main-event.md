# IpcMainEvent オブジェクト extends `Event`

* `frameId` Integer - このメッセージを送信したレンダラーフレームのID
* `returnValue` any - 非同期メッセージで返された値がこれにセットされます
* `sender` WebContents - メッセージを送信した `webContents` を返します
* `reply` Function - 現在処理している元々のメッセージを送信したレンダラーフレームに IPC メッセージを送信する関数 返信が正しいプロセスとフレームに行くことを保証するために、送信されたメッセージに "返信" するこのメソッドを使うべきです。 
  * `...args` any[]