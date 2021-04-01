# ServiceWorkerInfo Objekt

* `scriptUrl` String - Die vollständige URL zu dem Skript, das dieser Service-Worker ausführt
* `scope` String - Die Basis-URL, für die dieser Service Worker aktiv ist.
* `renderProcessId` Number - Die virtuelle ID des Prozesses, in dem dieser Service Worker läuft.  Es handelt sich nicht um eine PID auf Betriebssystemebene.  Dies stimmt mit dem ID-Satz überein, der für `webContents.getProcessId()` verwendet wird.
