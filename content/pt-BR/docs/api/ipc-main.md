# ipcMain

> Comunica de forma assíncrona o processo principal aos processos de renderização.

Processo: [Main](../glossary.md#main-process)

O módulo `ipcMain` é uma instância da classe [EventEmiiter](https://nodejs.org/api/events.html#events_class_eventemitter). Quando usado no processo principal, ele lida com mensagens assíncronas e síncronas enviadas a partir de um processo de renderização (página da web). As mensagens enviadas de um renderizador serão emitidas para este módulo.

## Enviando Mensagens

Também é possível enviar mensagens do processo principal para o processo de renderização, veja [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) para obter mais informações.

* Ao enviar uma mensagem, o nome do evento é o `channel`.
* Para responder a uma mensagem síncrona, você precisa de configurar `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

Um exemplo de enviar e manipular mensagens entre os processos de renderização e principais:

```javascript
// In main process.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// In renderer process (web page).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Métodos

O módulo `ipcMain` possui o seguinte método para ouvir eventos:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function

Ouve o `channel`, quando uma mensagem chega, o `listener` deve ser chamado com `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Removes listeners of the specified `channel`.

## Event object

The `event` object passed to the `callback` has the following methods:

### `event.frameId`

An `Integer` representing the ID of the renderer frame that sent this message.

### `event.returnValue`

Set this to the value to be returned in a synchronous message.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for more information.

### `event.reply`

A function that will send an IPC message to the renderer frane that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.