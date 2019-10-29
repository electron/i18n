# Objeto KeyboardEvent que extiende de <037tulotero>Event</code></0>373

* `frameId` Integer - El ID de frame renderer que enviá este mensaje
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Devuelve el `webContents` que enviá el mensaje
* `reply` Function - Una función que enviara un mensaje IPC al renderizador del frame que enviá el mensaje original que actualmente estas manejando. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]