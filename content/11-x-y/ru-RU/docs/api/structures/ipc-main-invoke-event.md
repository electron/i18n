# Объект IpcMainInvokeEvent расширяет `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - ID графического фрейма, который отправил сообщения
* `sender` WebContents - возвращает `webContents`, которое отправило сообщение
