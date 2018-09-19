# ipcMain

> Communiquer de manière asynchrone depuis le processus main aux processus renderer.

Processus : [Main](../glossary.md#main-process)

Le module `ipcMain` est une instance de la classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Lorsqu'il est utilisé dans le processus main, il gère les messages asynchrones et synchrones envoyés à partir d'un processus renderer (page web). Les messages envoyés par un renderer seront émis vers ce module.

## Envoyer des messages

It is also possible to send messages from the main process to the renderer process, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.

* Lors de l'envoi d'un message, le nom de l'événement est `channel`.
* Pour répondre à un message synchrone, vous devez définir `event.returnValue`.
* Pour envoyer un message asynchrone à l'expéditeur, vous pouvez utiliser `event.sender.send(...)`.

Un exemple d'envoi et de gestion des messages entre le processus main et renderer :

```javascript
// Dans le processus principal .
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.returnValue = 'pong'
})
```

```javascript
// Dans le processus de rendu (page web).
const {ipcRenderer} = require('electron')
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

En écoutant `channel`, lorsqu'un nouveau message arrive, `listener` sera appelé comme ceci `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Permet une seule exécution de la fonction `listener` pour cet événement. Ce `listener` est invoqué seulement après qu'un message est envoyé à `channel`, après quoi il sera supprimé.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Supprime tous les écouteurs du `channel` spécifié.

## Objet event

L'objet `event` passé au `callback` dispose des méthodes suivantes :

### `event.returnValue`

Définir ceci à la valeur à renvoyer pour un message synchrone.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.