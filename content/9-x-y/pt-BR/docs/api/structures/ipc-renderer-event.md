# Objeto IpcRendererEvent herda de `Event`

* `sender` IpcRenderer - A instância `IpcRenderer` que emitiu o evento originalmente
* `senderId` Integer - O `webContents.id` que enviou a mensagem, você pode chamar `event.sender.sendTo(event.senderId, ...)` para responder à mensagem. Veja [ipcRenderer.sendTo][ipc-renderer-sendto] para mais informações. Isto só se aplica a mensagens enviadas por outro renderizador. Mensagens enviadas diretamente do processo principal com `event.senderId` igual a `0`.
* `ports` MessagePort[] - Uma lista de MessagePorts que foram transferidos com esta mensagem

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
