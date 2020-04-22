# Objeto IpcMainEvent herda de `Event`

* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `returnValue` any - Defina este valor para ser devolvido em uma mensagem síncrona
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `reply` Função - Uma função que enviará uma mensagem IPC para o quadro renderizador que enviou a mensagem original que você está usando atualmente.  Você deve usar este método para "responder" à mensagem enviada para garantir que a resposta vá para o processo e quadro corretos.
  * `...args` any[] IpcRenderer
