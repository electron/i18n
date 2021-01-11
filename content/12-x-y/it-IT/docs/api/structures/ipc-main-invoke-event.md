# IpcMainInvokeEvent Object extends `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Intero - L'ID del frame di render che ha inviato questo messaggio
* `sender` WebContents - Restituisce il `webContents` che ha inviato il messaggio
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
