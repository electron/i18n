# ipcRenderer

> Communiquer de manière asynchrone depuis le processus renderer au processus main.

Processus : [Renderer](../glossary.md#renderer-process)

Le module `ipcRender` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Il fournit quelques méthodes pour pouvoir envoyer des messages synchrones et asynchrones depuis le processus render (page web) pour le processus main. Vous pouvez également recevoir des réponses du processus main.

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
  * `...args` any[]

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Supprime tous les écouteurs, ou ceux du `channel` spécifié.

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

Envoi un message au processus main de façon asynchrone via le `channel`, vous pouvez également envoyer des arguments arbitraire. Les arguments seront sérialisés en tant que JSON en interne et donc aucune fonction ou chaîne de prototype ne sera incluse.

Le processus principal le gère en écoutant le `canal` avec le module [`ipcMain`](ipc-main.md).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Retourne `Promise<any>` - résout avec la réponse du processus principal.

Envoie un message au processus principal de manière asynchrone via `canal` et attend un résultat asynchrone. Les arguments seront sérialisés en tant que JSON en interne et donc aucune fonction ou chaîne de prototype ne sera incluse.

Le processus principal devrait écouter le `canal` avec [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Par exemple :
```javascript
// Processus de rendu
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Processus principal
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = wait doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(canal, ...args)`

* `channel` String
* `...args` any[]

Retourne `any` - La valeur renvoyé par l'écouteur du [`ipcMain`](ipc-main.md).

Envoi un message au processus main de façon synchrone via le `channel`, vous pouvez également envoyer des arguments arbitraire. Les arguments seront sérialisés en JSON en interne et par conséquent aucune fonction ou chaîne de prototype ne sera inclus.

Le processus principal le gère en écoutant le `canal` avec le module [`ipcMain`](ipc-main.md) , et répond en définissant `event.returnValue`.

**Remarque :** Envoyer un message synchrone permet de bloquer le processus renderer entièrement, sauf si vous savez ce que vous faites, vous ne devez jamais l'utiliser.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Envoie un message à une fenêtre avec `webContentsId` via `canal`.

### `ipcRenderer.sendToHost(canal, ...args)`

* `channel` String
* `...args` any[]

Comme `ipcRenderer.send`, mais l'événement sera envoyé à l'élément `<webview>` dans la page hôte au lieu du processus main.

## Objet event

La documentation de l'objet `événement` passé à la `callback` peut être trouvée dans la documentation de la structure [`ipc-renderer-event`](structures/ipc-renderer-event.md).
