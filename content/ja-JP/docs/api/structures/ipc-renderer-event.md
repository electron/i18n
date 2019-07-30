# IpcRendererEvent Object extends `Event`

* `sender` IpcRenderer - 元々イベントが発行された `IpcRenderer` インスタンス
* `senderId` Integer - The `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) for more information. これは異なるレンダラーからのメッセージ送信にのみ適用します。 メインプロセスから直接メッセージ送信するには `event.senderId` を `0` にしてください。