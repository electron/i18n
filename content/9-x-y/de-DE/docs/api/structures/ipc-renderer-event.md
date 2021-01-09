# IpcMainEvent Object erweitert `Event`

* `sender` IpcRenderer - Die `IpcRenderer` Instanz, die das Ereignis ursprünglich gesendet hat
* `senderId` Integer - Die `webContents.id` welche die Nachricht sendet. Sie können `event.sender.sendTo(event.senderID,...)` anrufen, um auf die Nachricht zu antworten. Schauen Sie unter [ipcRenderer.sendTo][ipc-renderer-sendto] für mehr Informationen. Dies gilt nur für Nachrichten, welche von einem anderen Renderer gesendet werden. Nachrichten werden direkt von der Hauptprozessgruppe `event.senderId` zu `0` gesendet.
* `ports` MessagePort[] - A list of MessagePorts that were transferred with this message

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
