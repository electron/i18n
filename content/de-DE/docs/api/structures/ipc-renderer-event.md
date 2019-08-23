# IpcRendererEvent Objekt erweitert `Ereignis`

* `sender` IpcRenderer - Die `IpcRenderer` Instanz, die das Ereignis ursprünglich gesendet hat
* `senderId` Integer - The `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) for more information. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.