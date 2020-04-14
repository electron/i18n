# ipcRenderer

> Communiquer de manière asynchrone depuis le processus renderer au processus main.

Processus : [Rendu](../glossary.md#renderer-process)

The `ipcRenderer` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. Il fournit quelques méthodes pour pouvoir envoyer des messages synchrones et asynchrones depuis le processus render (page web) pour le processus main. Vous pouvez également recevoir des réponses du processus main.

Voir [ipcMain](ipc-main.md) pour des exemples de code.

## Méthodes

Le module de `ipcRenderer` possède les méthodes suivantes pour écouter les événements et envoyer des messages :

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function
  * `événement` IpcRendererEvent
  * `...args` any[]

En écoutant `channel`, lorsqu'un nouveau message arrive, `listener` sera appelé comme ceci `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function
  * `événement` IpcRendererEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Supprime tous les écouteurs, ou ceux du `channel` spécifié.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Retourne `any` - La valeur renvoyé par l'écouteur du [`ipcMain`](ipc-main.md).

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

Le processus principal le gère en écoutant le `canal` avec le module [`ipcMain`](ipc-main.md) , et répond en définissant `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Envoie un message à une fenêtre avec `webContentsId` via `canal`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Comme `ipcRenderer.send`, mais l'événement sera envoyé à l'élément `<webview>` dans la page hôte au lieu du processus main.

## Objet event

La documentation de l'objet `événement` passé à la `callback` peut être trouvée dans la documentation de la structure [`ipc-renderer-event`](structures/ipc-renderer-event.md).
