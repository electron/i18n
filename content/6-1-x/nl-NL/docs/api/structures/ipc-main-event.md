# IpcMainEvent Object extends `Event`

* `frameId` Integer - Het ID van het rendererframe dat dit bericht verzonden heeft
* `returnValue` any - Stel dit in op de waarde die teruggegeven moet worden in een syncroneus bericht
* `sender` WebContents - Geeft de `webContents` terug die het bericht verstuurde
* `Antwoord` Function - Een functie die een IPC-bericht zal sturen naar het rendererframe die het oorspronkelijke bericht dat u momenteel verwerkt, heeft verzonden.  U moet deze methode gebruiken om te "reageren" op het verzonden bericht om te garanderen dat het antwoord naar het juiste proces en frame zal gaan.
  * `...args` any[] IpcRenderer
