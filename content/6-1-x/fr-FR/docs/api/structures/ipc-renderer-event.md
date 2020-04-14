# L'objet IpcRendererEvent étend l'événement

* sender IpcRenderer - L'instance IpcRenderer qui a émis l'événement à l'origine
* senderId Integer - Le fichier webContents.id qui a envoyé le message peut être appelé event.sender.sendTo (event.senderId, ...) pour répondre au message. Pour plus d'informations, consultez ipcRenderer.sendTo. Cela ne s'applique qu'aux messages envoyés à partir d'un moteur de rendu différent.  Les messages envoyés directement à partir du processus principal définissent event.senderId sur 0.
