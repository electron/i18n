# IpcMainEvent Object erweitert `Event`

* `sender` IpcRenderer - Die `IpcRenderer` Instanz, die das Ereignis ursprünglich gesendet hat
* `senderId` Integer - Die `webContents.id` welche die Nachricht sendet. Sie können `event.sender.sendTo(event.senderID,...)` anrufen, um auf die Nachricht zu antworten. Schauen Sie unter [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) für mehr Informationen. Dies gilt nur für Nachrichten, welche von einem anderen Renderer gesendet werden. Nachrichten werden direkt von der Hauptprozessgruppe `event.senderId` zu `0` gesendet.
