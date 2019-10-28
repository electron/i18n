# Объект IpcMainEvent расширяет `Event`

* `frameId` Integer - ID графического фрейма, который отправил сообщения
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - возвращает `webContents`, которое отправило сообщение
* `reply` Function - функция, которая отправит IPC-сообщение в графический фрейм, который отправил сообщение, которое Вы сейчас обрабатываете. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]