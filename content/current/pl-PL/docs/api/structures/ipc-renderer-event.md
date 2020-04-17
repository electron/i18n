# Obiekt IpcRendererEvent rozszerzający `Event`

* `sender` IpcRenderer - instancja `IpcRenderer` która pierwotnie emitowała zdarzenie
* `senderId` Integer - id `WebContents`, który wysłał wiadomość, możesz wywołać `event.sender.sendTo(event.senderId, ...)` aby odpowiedzieć na wiadomość, zobacz [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) aby uzyskać więcej informacji. Dotyczy to tylko wiadomości wysyłanych przez innego rendera. Wiadomości wysłane bezpośrednio z głównego procesu ustawiają `event.senderId` na `0`.
