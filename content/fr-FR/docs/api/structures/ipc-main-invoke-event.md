# Objet IpcMainInvokeEvent hérite de `Event`

* `processId` Integer - L’id interne du processus de rendu qui a envoyé ce message
* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `sender` WebContents - Retourne le `webContents`qui a envoyé le message
* `senderFrame` WebFrameMain _Readonly_ - Le cadre qui a envoyé ce message
