# Объект IpcMainInvokeEvent расширяет `Event`

* `processId` Integer - Внутренний идентификатор процесса рендерера, который отправил это сообщение
* `frameId` Integer - ID графического фрейма, который отправил сообщения
* `sender` WebContents - возвращает `webContents`, которое отправило сообщение
* `senderFrame` WebFrameMain _Readonly_ - кадр, который послал это сообщение
