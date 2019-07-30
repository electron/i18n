# IpcRendererEvent Object extends `Event`

* `sender` IpcRenderer - 元々イベントが発行された `IpcRenderer` インスタンス
* `senderId` Integer - メッセージを送信した `webContents.id` であり、メッセージに返信する `event.sender.sendTo(event.senderId、...)` を呼び出せます。詳細は [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) をご覧ください。 これは異なるレンダラーからのメッセージ送信にのみ適用します。 メインプロセスから直接メッセージ送信するには `event.senderId` を `0` にしてください。