# Объект IpcMainEvent расширяет `Event`

* `frameId` Integer - ID графического фрейма, который отправил сообщения
* `returnValue` any - установите это значение, которое будет возвращено в синхронном сообщение
* `sender` WebContents - возвращает `webContents`, которое отправило сообщение
* `reply` Function - функция, которая отправит IPC-сообщение в графический фрейм, который отправил сообщение, которое Вы сейчас обрабатываете. You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame. 
  * `...args` any[] IpcRenderer