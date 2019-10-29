# IpcMainEvent オブジェクト extends `Event`

* `frameId` Integer - このメッセージを送信したレンダラーフレームのID
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - メッセージを送信した `webContents` を返します
* `reply` Function - 現在処理している元々のメッセージを送信したレンダラーフレームに IPC メッセージを送信する関数 You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]