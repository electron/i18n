# L'objet IpcRendererEvent étend l'événement

* sender IpcRenderer - L'instance IpcRenderer qui a émis l'événement à l'origine
* `senderId` Integer - Le `webContents.id` qui a envoyé le message, tu peux appeler `event.sender.sendTo(event.senderId, ...)` pour répondre au message, voir [ipcRenderer.sendTo][ipc-renderer-sendto] pour plus d'informations. Cela ne s'applique qu'aux messages envoyés à partir d'un moteur de rendu différent.  Les messages envoyés directement à partir du processus principal définissent event.senderId sur 0.
* `ports` MessagePort[] - Une liste de MessagePorts qui ont été transférés par ce message

[ipc-renderer-sendto]: ../ipc-renderer.md#ipcrenderersendtowebcontentsid-channel-args
