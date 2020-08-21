# IpcMainEvent Object extends `Event`

* `frameId` Integer - Het ID van het rendererframe dat dit bericht verzonden heeft
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Geeft de `webContents` terug die het bericht verstuurde
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `Antwoord` Function - Een functie die een IPC-bericht zal sturen naar het rendererframe die het oorspronkelijke bericht dat u momenteel verwerkt, heeft verzonden.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `channel` String
  * `...args` any[]
