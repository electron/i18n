# Objet IpcMainInvokeEvent hérite de `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `sender` WebContents - Retourne le `webContents`qui a envoyé le message
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
