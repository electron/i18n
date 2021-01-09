# IpcRendererEvent Object extends `Event`

* `sender` IpcRenderer - The `IpcRenderer` instance that emitted the event originally
* `senderId` Integer - De `webContents.id` die het bericht heeft verzonden, u kan `event.sender.sendTo(event.senderId, ...)` oproepen om het bericht te beantwoorden, zie [ipcRenderer.sendTo][ipc-renderer-sendto] voor meer informatie. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.
* `ports` MessagePort[] - A list of MessagePorts that were transferred with this message

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
