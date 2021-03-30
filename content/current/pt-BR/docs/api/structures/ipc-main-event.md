# Objeto IpcMainEvent herda de `Event`

* `processId` Integer - O ID interno do processo de renderização que enviou esta mensagem
* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
* `ports` MessagePortMain[] - Uma lista de MessagePorts que foram transferidos com esta mensagem
* `reply` Função - Uma função que enviará uma mensagem IPC para o quadro renderizador que enviou a mensagem original que você está usando atualmente.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `channel` String
  * `...args` any[]
