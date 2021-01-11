# IpcMainEvent Object estende `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Intero - L'ID del frame di render che ha inviato questo messaggio
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Restituisce il `webContents` che ha inviato il messaggio
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `reply` Funzione - Una funzione che invierà un messaggio IPC al frame di render che ha inviato il messaggio originale che stai al momento gestendo.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `channel` String
  * `...args` any[]
