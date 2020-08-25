# IpcMainEvent objeto extendido de `Event`5256783105227699

* `remitente` IpcRenderer - La instancia `IpcRenderer` que emitió el evento originalmente
* `senderId` Integer - The `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo][ipc-renderer-sendto] for more information. Esto sólo aplica a mensajes enviado desde un renderer diferente. Mensajes enviados directamente desde el main process establece `event.senderId` a `0`.
* `ports` MessagePort[] - A list of MessagePorts that were transferred with this message

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
