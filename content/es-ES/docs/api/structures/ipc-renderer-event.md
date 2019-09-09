# Objeto IpcRendererEvent que extiende de `Event`

* `sender` IpcRenderer - La instancia de `IpcRenderer` que emite el evento originalmente
* `senderId` Integer - El `webContents.id` que envió el mensaje, puedes llamar a `event.sender.sendTo(event.senderId, ...)` para responder al mensaje, mira [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) para más información. Esto sólo aplica a mensajes enviado desde un renderer diferente. Mensajes enviados directamente desde el main process establece `event.senderId` a `0`.