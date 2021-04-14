# Objeto ServiceWorkerInfo

* `scriptUrl` String - A URL completa para o script que este trabalhador de serviço executa
* `scope` String - A URL base para a a que este trabalhador de serviço está ativo.
* número `renderProcessId` - O ID virtual do processo em que esse trabalhador está executando.  Este não é um PID nível de SISTEMA.  Isso se alinha com o conjunto de ID usado para `webContents.getProcessId()`.
