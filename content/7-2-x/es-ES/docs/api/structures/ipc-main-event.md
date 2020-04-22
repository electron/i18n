# Objeto KeyboardEvent que extiende de <037tulotero>Event</code></0>373

* `frameId` Integer - El ID de frame renderer que enviá este mensaje
* `returnValue` any - Configura este al valor a ser devuelto en un mensaje sincrónico
* `sender` WebContents - Devuelve el `webContents` que enviá el mensaje
* `reply` Function - Una función que enviara un mensaje IPC al renderizador del frame que enviá el mensaje original que actualmente estas manejando.  Deberías usar este método para "responder" al envío de mensajes en orden para garantizar que la respuesta se irá al proceso y frame correcto.
  * `...args` any[]
