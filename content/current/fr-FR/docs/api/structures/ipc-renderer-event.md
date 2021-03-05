# L'objet IpcRendererEvent étend l'événement

* sender IpcRenderer - L'instance IpcRenderer qui a émis l'événement à l'origine
* `Idexpediteur`Integre-Les`Contenusweb.id`qui ont envoye le message, vous pouvez appeler`event.sender.sendTo(evenement, Idexpediteur,..)`pour repondre a ce message, voyez[ipcRender.envoyerA](../ipc-renderer.md#ipcrenderersendtowebcontentsid-channel-args)pour plus d'informations. Cela ne s'applique qu'aux messages envoyés à partir d'un moteur de rendu différent.  Les messages envoyés directement à partir du processus principal définissent event.senderId sur 0.
* `ports` MessagePort[] - Une liste de MessagePorts qui ont été transférés par ce message
