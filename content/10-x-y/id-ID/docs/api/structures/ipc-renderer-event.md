# IpcRendererEvent Object extends `Event`

* `sender` IpcRenderer - The `IpcRenderer` instance that emitted the event originally
* `senderId` Bilangan Bulat - `webContents.id` yang mengirimkan pesan, anda dapat menghubiungi `event.sender.sendTo(event.senderId, ...)` untuk membalas pesan, kunjungi [ipcRenderer.sendTo][ipc-renderer-sendto] untuk informasi lebih lanjut. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.
* `ports` MessagePort[] - A list of MessagePorts that were transferred with this message

[ipc-renderer-sendto]: #ipcrenderersendtowindowid-channel--arg1-arg2-
