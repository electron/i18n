# IpcMainInvokeEvent オブジェクト extends `Event`

* `processId` Integer - このメッセージを送信したレンダラープロセスの内部 ID
* `frameId` Integer - このメッセージを送信したレンダラーフレームの ID
* `sender` WebContents - メッセージを送信した `webContents` を返します
* `senderFrame` WebFrameMain _Readonly_ - このメッセージを送信したフレーム
