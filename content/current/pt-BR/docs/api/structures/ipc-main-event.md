# Objeto IpcMainEvent herda de `Event`

* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `reply` Função - Uma função que enviará uma mensagem IPC para o quadro renderizador que enviou a mensagem original que você está usando atualmente.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `...args` any[]
