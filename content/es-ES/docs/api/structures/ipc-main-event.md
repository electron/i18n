# IpcMainEvent objeto extendido de `Event`

* `frameId` Integer - El ID de frame renderer que enviá este mensaje
* `returnValue` any - Establece esto al valor que es devuelto en un mensaje síncrono
* `sender` WebContents - Devuelve el `webContents` que enviá el mensaje
* `reply` Function - Una función que enviara un mensaje IPC al renderizador del frame que enviá el mensaje original que actualmente estas manejando. Tú deberías usar este método para "responder" al mensaje al mensaje enviado para garantizar que la respuesta vaya al frame y al proceso correcto. 
  * `...args` any[] IpcRenderer