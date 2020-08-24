# Объект IpcRendererEvent расширяет `Event`

* `sender` IpcRenderer - экземпляр `IpcRenderer`, который изначально вызвал событие
* `senderId` Integer - `webContents.id`, который отправил сообщение, Вы можете вызвать `event.sender.sendTo(event.senderId, ...)`, чтобы ответить на сообщение, см. [ipcRenderer.sendTo][ipc-renderer-sendto] для подробной информации. Это относится только к сообщениям, отправленным из других графических процессов. Сообщения, отправленные непосредственно из основного процесса, устанавливают `event.senderId` в `0`.

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
