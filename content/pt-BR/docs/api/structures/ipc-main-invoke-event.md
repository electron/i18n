# IpcMainInvokeEvent Object extends `Event`

* `processId` Integer - O ID interno do processo de renderização que enviou esta mensagem
* `frameId` Integer - O ID do quadro do renderizador que enviou esta mensagem
* `sender` WebContents - Retorna o `webContents` que enviou a mensagem
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
