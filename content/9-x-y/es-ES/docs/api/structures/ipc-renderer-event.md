# IpcMainEvent objeto extendido de `Event`5256783105227699

* `remitente` IpcRenderer - La instancia `IpcRenderer` que emitió el evento originalmente
* Devuelve el `webContents` que envió el mensaje. Puede llamar a `event.sender.send` para responder al mensaje asincrónico. Consulte [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) para obtener más información. Esto sólo aplica a mensajes enviado desde un renderer diferente. Mensajes enviados directamente desde el main process establece `event.senderId` a `0`.
