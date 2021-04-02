# IpcMainInvokeEvent Object extiende `Event`

* Integer `processId` -el ID interno del proceso de representador que envió este mensaje
* `frameId` Integer - El ID de frame renderer que enviá este mensaje
* `sender` WebContents - Devuelve el `webContents` que enviá el mensaje
* `senderFrame` WebFrameMain _SoloLectura_ - El frame que envió este mensaje
