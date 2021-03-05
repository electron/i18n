# L'objet IpcRendererEvent étend l'événement

* sender IpcRenderer - L'instance IpcRenderer qui a émis l'événement à l'origine
* `senderId` Integer - The `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo][ipc-renderer-sendto] for more information. Cela ne s'applique qu'aux messages envoyés à partir d'un moteur de rendu différent.  Les messages envoyés directement à partir du processus principal définissent event.senderId sur 0.
* `ports` MessagePort[] - Une liste de MessagePorts qui ont été transférés par ce message

[ipc-renderer-sendto]: ../ipc-renderer.md#ipcrenderersendtowebcontentsid-channel-args
