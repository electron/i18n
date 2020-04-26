# IpcMainEvent Object estende `Event`

* `frameId` Intero - L'ID del frame di render che ha inviato questo messaggio
* `returnValue` any - Imposta questo al valore da restituire in un messaggio sincrono
* `sender` WebContents - Restituisce il `webContents` che ha inviato il messaggio
* `reply` Funzione - Una funzione che invierà un messaggio IPC al frame di render che ha inviato il messaggio originale che stai al momento gestendo.  Dovresti usare questo metodo per "rispondere" al messaggio inviato per garantire che la risposta vada al processo e frame corretti.
  * `...args` any[] IpcRenderer
