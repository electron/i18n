# ipcMain

> Communiquer de manière asynchrone depuis le processus main aux processus renderer.

Processus : [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). Lorsqu'il est utilisé dans le processus main, il gère les messages asynchrones et synchrones envoyés à partir d'un processus renderer (page web). Les messages envoyés par un renderer seront émis vers ce module.

## Envoyer des messages

Il est également possible d'envoyer des messages depuis le processus main pour le processus renderer. Voir [webContents.send](web-contents.md#contentssendchannel-args) pour plus d'information.

* Lors de l'envoi d'un message, le nom de l'événement est `channel`.
* Pour répondre à un message synchrone, vous devez définir `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

Un exemple d'envoi et de gestion des messages entre le processus main et renderer :

```javascript
// Dans le processus principal .
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.returnValue = 'pong'
})
```

```javascript
// Dans le processus de rendu (page web).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // affiche "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // affiche "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Méthodes

Le module de `ipcMain` possède les méthodes suivantes pour écouter les événements :

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcMainEvent
  * `...args` any[]

En écoutant `channel`, lorsqu'un nouveau message arrive, `listener` sera appelé comme ceci `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcMainEvent
  * `...args` any[]

Permet une seule exécution de la fonction `listener` pour cet événement. Ce `listener` est invoqué seulement après qu'un message est envoyé à `channel`, après quoi il sera supprimé.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (facultatif)

Supprime tous les écouteurs du `channel` spécifié.

### `ipcMain.handle(channel, listener)`

* `channel` String
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.

```js
// Main process
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// Renderer process
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.