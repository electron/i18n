# ipcMain

> Communiquer de manière asynchrone depuis le processus main aux processus renderer.

Processus : [Main](../glossary.md#main-process)

Le module `ipcMain` est une instance de la classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Lorsqu'il est utilisé dans le processus main, il gère les messages asynchrones et synchrones envoyés à partir d'un processus renderer (page web). Les messages envoyés par un renderer seront émis vers ce module.

## Envoyer des messages

Il est également possible d'envoyer des messages depuis le processus main pour le processus renderer. Voir [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) pour plus d'information.

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

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Supprime tous les écouteurs du `channel` spécifié.

## Objet event

La documentation de l'objet `événement` passé à la `callback` peut être trouvée dans la documentation de la structure [`ipc-main-event`](structures/ipc-main-event.md).