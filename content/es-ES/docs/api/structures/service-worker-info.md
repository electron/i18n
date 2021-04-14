# Objeto ServiceWorkerInfo

* `scriptUrl` String - La ruta completa al script que ejecuta este service worker
* `scope` String - La URL base para la que este service worker está activo.
* `renderProcessId` Number - El ID virtual del proceso en el que este service worker está funcionando.  Este no es un PID a nivel de sistema operativo.  Esto se alinea con el conjunto de ID usado por `webContents.getProcessId()`.
