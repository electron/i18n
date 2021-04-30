# Objecto IpcMainInvokeEvent extiende `Event`

* Integer `processId` - El ID interno del proceso de renderizado que envió este mensaje
* `frameId` Integer - El ID del frame de renderizado que envía este mensaje
* `sender` WebContents - Devuelve el `webContents` que envía el mensaje
* `senderFrame` WebFrameMain _Readonly_ - El frame que envió este mensaje
