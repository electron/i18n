# IpcMainEvent オブジェクト extends `Event`

* `processId` Integer - このメッセージを送信したレンダラープロセスの内部 ID
* `frameId` Integer - このメッセージを送信したレンダラーフレームの ID
* `returnValue` any - 非同期メッセージで返された値がこれにセットされます
* `sender` WebContents - メッセージを送信した `webContents` を返します
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
* `ports` MessagePortMain[] - このメッセージで転送されたMessagePortsのリスト
* `reply` Function - 現在処理している元々のメッセージを送信したレンダラーフレームに IPC メッセージを送信する関数です。  返信が正しいプロセスとフレームに行くことを保証するために、送信されたメッセージに "返信" する際はこのメソッドを使うべきです。
  * `channel` String
  * `...args` any[]
