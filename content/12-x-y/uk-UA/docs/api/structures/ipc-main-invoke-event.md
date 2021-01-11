# Об'єкт IpcMainInvokeEvent наслідує `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - Ідентифікатор рендер фрейму, який відправив дане повідомлення
* `sender` WebContents - Повертає `webContents`, який відправив повідомлення
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
