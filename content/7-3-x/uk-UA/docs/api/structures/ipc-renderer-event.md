# Об'єкт IpcRendererEvent наслідує `Event`

* `sender` IpcRenderer - `IpcRenderer` екземпляр, який спровокував подію
* `senderId` Integer - `webContents.id`, який відправив повідомлення, ви можете викликати `event.sender.sendTo(event.senderId, ...)` для відповіді на повідомлення, дивись [ipcRenderer.sendTo][ipc-renderer-sendto] для деталей. Це відноситься до повідомлень відправлених з різних рендерів. Повідомлення відправлені конкретно з головного процесу встановлють `event.senderId` в `0`.

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
