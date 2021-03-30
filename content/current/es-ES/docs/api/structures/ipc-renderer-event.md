# IpcMainEvent objeto extendido de `Event`5256783105227699

* `remitente` IpcRenderer - La instancia `IpcRenderer` que emitió el evento originalmente
* `senderId` Integer- El `webContents.id` que envió el mensaje, puedes llamar a `event.sender.sendTo(event.senderId, ...)` para responder al mensaje, consulta [ipcRenderer. sendTo][ipc-renderer-sendto] para obtener más información. Esto sólo aplica a mensajes enviado desde un renderer diferente. Mensajes enviados directamente desde el main process establece `event.senderId` a `0`.
* </code>portsPortMensajes-Una lista de MessagePorts que han sido transferido con este mensaje</li>
</ul>

[ipc-renderer-sendto]: ../ipc-renderer.md#ipcrenderersendtowebcontentsid-channel-args
