# Об'єкт IpcMainEvent наслідує `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - Ідентифікатор рендер фрейму, який відправив дане повідомлення
* `returnValue` any - Встановить значення, що буде повернене в синхронному повідомленні
* `sender` WebContents - Повертає `webContents`, який відправив повідомлення
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `reply` Function - Функція, яка відправить IPC повідомлення в рендер фрейм, який відправив оригінальне повідомлення, яке зараз обробляється.  Ви повинні використовувати цей метод щоб "відповісти" на відправлене повідомлення щоб гарантувати те, що відповідь піде в правильний process та frame.
  * `channel` String
  * `...args` any[]
