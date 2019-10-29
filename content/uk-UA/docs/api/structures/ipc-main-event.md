# Об'єкт IpcMainEvent наслідує `Event`

* `frameId` Integer - Ідентифікатор рендер фрейму, який відправив дане повідомлення
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Повертає `webContents`, який відправив повідомлення
* `reply` Function - Функція, яка відправить IPC повідомлення в рендер фрейм, який відправив оригінальне повідомлення, яке зараз обробляється. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]