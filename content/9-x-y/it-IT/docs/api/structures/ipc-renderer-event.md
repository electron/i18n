# IpcRendererEvent Object estende `Event`

* `sender` IpcRenderer - L'istanza `IpcRenderer` che ha emesso l'evento in origine
* `senderId` Intero - Il `webContents.id` che ha inviato il messaggio, puoi chiamare `event.sender.sendTo(event.senderId, ...)` per rispondere al messaggio, vedi [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) per ulteriori informazioni. Questo vale solo per messaggi inviati da un differente renderer. Messaggi inviati direttamente dal processo principale impostato `event.senderId` a `0`.
