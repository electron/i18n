# Objeto IpcMainEvent herda de `Event`

* `processId` Integer - O ID interno do processo de renderização que enviou esta mensagem
* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `returnValue` qualquer - Defina isso para o valor a ser devolvido em uma mensagem síncronia
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `senderFrame` WebFrameMain _Readonly_ - O quadro que enviou esta mensagem
* `ports` MessagePortMain[] - Uma lista de MessagePorts que foram transferidos com esta mensagem
* `reply` Função - Uma função que enviará uma mensagem IPC para o quadro renderizador que enviou a mensagem original que você está usando atualmente.  Você deve usar este método para "responder" à mensagem enviada, a fim de garantir que a resposta irá para o processo e o quadro corretos.
  * `channel` Cordas
  * `...args` qualquer[]
