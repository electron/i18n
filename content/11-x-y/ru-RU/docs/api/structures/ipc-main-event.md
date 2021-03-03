# Объект IpcMainEvent расширяет `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - ID графического фрейма, который отправил сообщения
* `returnValue` any - установите это значение, которое будет возвращено в синхронном сообщении
* `sender` WebContents - возвращает `webContents`, которое отправило сообщение
* `ports` MessagePortMain - Список MessagePorts, которые были переданы с этим сообщением
* `reply` Function - функция, которая отправит IPC-сообщение в графический фрейм, который отправил сообщение, которое Вы сейчас обрабатываете.  Вы должны использовать этот метод, чтобы "ответить" на отправленное сообщение, чтобы гарантировать, что ответ будет отправлен в корректные процесс и фрейм.
  * `channel` String (Строка)
  * `...args` any[]
