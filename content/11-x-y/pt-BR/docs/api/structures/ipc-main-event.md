# Objeto IpcMainEvent herda de `Event`

* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `returnValue` any - Defina isso como o valor a ser retornado em uma mensagem síncrona
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `ports` MessagePortMain[] - Uma lista de MessagePorts que foram transferidos com esta mensagem
* `reply` Função - Uma função que enviará uma mensagem IPC para o quadro renderizador que enviou a mensagem original que você está usando atualmente.  Você deve usar este método para "responder" à mensagem enviada a fim de garantir que a resposta irá para o processo e o quadro corretos.
  * `channel` String
  * `...args` any[]
