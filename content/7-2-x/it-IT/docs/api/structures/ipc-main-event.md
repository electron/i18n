# IpcMainEvent Object estende `Event`

* `frameId` Intero - L'ID del frame di render che ha inviato questo messaggio
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Restituisce il `webContents` che ha inviato il messaggio
* `reply` Funzione - Una funzione che invierà un messaggio IPC al frame di render che ha inviato il messaggio originale che stai al momento gestendo.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `...args` any[]
