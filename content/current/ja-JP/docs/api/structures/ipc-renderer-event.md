# IpcRendererEvent オブジェクト extends `Event`

* `sender` IpcRenderer - 元々イベントが発行された `IpcRenderer` インスタンス
* `senderId` Integer - メッセージを送信した `webContents.id` であり、メッセージに返信する `event.sender.sendTo(event.senderId、...)` を呼び出せます。詳細は [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) をご覧ください。 これは異なるレンダラーからのメッセージ送信においてのみ適用できます。 メインプロセスから直接メッセージを送信するには `event.senderId` を `0` にしてください。
