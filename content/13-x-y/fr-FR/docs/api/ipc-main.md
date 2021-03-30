# ipcMain

> Communiquer de manière asynchrone depuis le processus main aux processus renderer.

Processus : [Main](../glossary.md#main-process)

Le module `ipcMain` est un [Event Emitter][event-emitter]. Lorsqu'il est utilisé dans le processus main, il gère les messages asynchrones et synchrones envoyés à partir d'un processus renderer (page web). Les messages envoyés par un renderer seront émis vers ce module.

## Envoyer des messages

Il est également possible d'envoyer des messages depuis le processus main pour le processus renderer. Voir [webContents.send][web-contents-send] pour plus d'information.

* Lors de l'envoi d'un message, le nom de l'événement est `channel`.
* Pour répondre à un message synchrone, vous devez définir `event.returnValue`.
* Pour renvoyer un message asynchrone à l'expéditeur, vous pouvez utiliser `event.reply(...)`.  Cette méthode d'aide gérera automatiquement les messages provenant des images qui ne sont pas le cadre principal (e. . iframes) alors que `event.sender.send(...)` enverra toujours au cadre principal.

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
  * `événement` IpcMainEvent
  * `...args` any[]

En écoutant `channel`, lorsqu'un nouveau message arrive, `listener` sera appelé comme ceci `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `événement` IpcMainEvent
  * `...args` any[]

Ajoute un `listener` à déclenchement unique pour l’événement. Ce `listener` sera appelé uniquement lors de la prochaine émission d'un message sur le `channel`, après quoi il sera supprimé.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (facultatif)

Supprime tous les écouteurs du `channel` spécifié.

### `ipcMain.handle(canal, écouteur)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `événement` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

Si `listener` renvoie une Promise, le résultat final de la promesse sera retourné en réponse à l'appelant distant. Sinon, la valeur de retour de l'écouteur sera utilisée comme valeur de la réponse.

```js
// Processus principal
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = wait somePromise(... rgs)
  return result
})



 // Processus de rendu
async () => {
  const result = wait ipcRenderer. nvoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

Le `event` qui est passé comme premier argument au gestionnaire est le même que que celui passé à un event listener régulier. Il contient des informations sur lequel WebContents est la source de la demande d'appel.

Errors thrown through `handle` in the main process are not transparent as they are serialized and only the `message` property from the original error is provided to the renderer process. Please refer to [#24427](https://github.com/electron/electron/issues/24427) for details.

### `ipcMain.handleOnce(channel, listener)`

* `channel` String
* `listener` Function<Promise\<void> | any>
  * `événement` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String

Supprime tout gestionnaire pour `canal`, si présent.

## Objet IpcMainEvent

La documentation de l'objet `événement` passé à la `callback` peut être trouvée dans la documentation de la structure [`ipc-main-event`](structures/ipc-main-event.md).

## Objet IpcMainInvokeEvent

La documentation de l'objet `événement` passé à `handle` callbacks peut être trouvée dans la documentation de la structure [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) .

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
