# ipcRenderer

> Comunica de forma assíncrona de um processo de renderização para o processo principal.

Processo: [Renderizador](../glossary.md#renderer-process)

O módulo `ipcRenderer` é uma instância da classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ele fornece alguns métodos para que você possa enviar mensagens síncronas e assíncronas do processo de renderização (página da web) para o processo principal. Você também pode receber respostas do processo principal.

Veja [ipcMain](ipc-main.md) para exemplos de código.

## Métodos

O módulo `ipcRenderer` possui o seguinte método para ouvir eventos e enviar mensagens:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

Ouve o `channel`, quando uma mensagem chega, o `listener` deve ser chamado com `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Removes all listeners, or those of the specified `channel`.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Argumentos serão serializados em JSON internamente e, portanto, nenhuma função ou cadeia de protótipo será incluída.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Envie uma mensagem ao processo principal de forma síncrona via `channel`, você também pode enviar argumentos arbitrários. Argumentos serão serializados em JSON internamente e, portanto, nenhuma função ou cadeia de protótipo será incluída.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Nota:**O envio de uma mensagem síncrona bloqueará todo o processo de renderização, a menos que você saiba o que está fazendo, você nunca deve usá-lo.

### `ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## Event object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.
