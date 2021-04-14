# ipcRenderer

> Communiquer de manière asynchrone depuis le processus renderer au processus main.

Processus : [Rendu](../glossary.md#renderer-process)

Le module `ipcRender` est un [EventEmitter][event-emitter]. Il fournit quelques méthodes pour pouvoir envoyer des messages synchrones et asynchrones depuis le processus render (page web) pour le processus main. Vous pouvez également recevoir des réponses du processus main.

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

Ajoute un `listener` à déclenchement unique pour l’événement. Ce `listener` sera appelé uniquement lors de la prochaine émission d'un message sur le `channel`, après quoi il sera supprimé.

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

Envoyez un message asynchrone au processus principal via `channel`, ainsi que des arguments. Les arguments seront sérialisés avec le [Structured Clone Algorithm][SCA], tout comme [`window.postMessage`][], de sorte que les chaînes prototypes ne seront pas incluses. L’envoi de fonctions, de promesses, de symboles, de weakmaps ou de weaksets de lancer une exception.

> **REMARQUE :** l’envoi de types JavaScript non standard tels que les objets DOM ou objets électroniques spéciaux jettera une exception.
> 
> Étant donné que le processus principal n’a pas de support pour les objets DOM tels que `ImageBitmap`, `File`, `DOMMatrix` et ainsi de suite, ces objets ne peuvent pas être envoyés sur le CIP d' Electron au processus principal, car le processus principal n’aurait aucun moyen de les décoder . Tenter d’envoyer de tels objets sur IPC entraînera une erreur.

Le processus principal le gère en écoutant le `canal` avec le module [`ipcMain`](ipc-main.md).

Si vous avez besoin de transférer un [`MessagePort`][] au processus principal, utilisez-le [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Si vous souhaitez recevoir une seule réponse du processus principal, comme le résultat d’un appel de méthode, envisagez d’utiliser [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args).

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Retourne `Promise<any>` - résout avec la réponse du processus principal.

Envoie un message au processus principal via `channel` et attend un résultat asynchrone. Les arguments seront sérialisés avec le [Structured Clone Algorithm][SCA], tout comme [`window.postMessage`][], de sorte que les chaînes prototypes ne seront pas incluses. L’envoi de fonctions, de promesses, de symboles, de weakmaps ou de weaksets de lancer une exception.

> **REMARQUE :** l’envoi de types JavaScript non standard tels que les objets DOM ou objets électroniques spéciaux jettera une exception.
> 
> Étant donné que le processus principal n’a pas de support pour les objets DOM tels que `ImageBitmap`, `File`, `DOMMatrix` et ainsi de suite, ces objets ne peuvent pas être envoyés sur le CIP d' Electron au processus principal, car le processus principal n’aurait aucun moyen de les décoder . Tenter d’envoyer de tels objets sur IPC entraînera une erreur.

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

Si vous avez besoin de transférer un [`MessagePort`][] au processus principal, utilisez-le [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Si vous n’avez pas besoin d’une réponse au message, envisagez d’utiliser [`ipcRenderer.send`](#ipcrenderersendchannel-args).

### `ipcRenderer.sendSync(canal, ...args)`

* `channel` String
* `...args` any[]

Retourne `any` - La valeur renvoyé par l'écouteur du [`ipcMain`](ipc-main.md).

Envoyez un message au processus principal via `channel` et attendez un résultat de manière synchrone.  Les arguments seront sérialisés avec le [Structured Clone Algorithm][SCA], tout comme [`window.postMessage`][], de sorte que les chaînes prototypes ne seront pas incluses. L’envoi de fonctions, de promesses, de symboles, de weakmaps ou de weaksets de lancer une exception.

> **REMARQUE :** l’envoi de types JavaScript non standard tels que les objets DOM ou objets électroniques spéciaux jettera une exception.
> 
> Étant donné que le processus principal n’a pas de support pour les objets DOM tels que `ImageBitmap`, `File`, `DOMMatrix` et ainsi de suite, ces objets ne peuvent pas être envoyés sur le CIP d' Electron au processus principal, car le processus principal n’aurait aucun moyen de les décoder . Tenter d’envoyer de tels objets sur IPC entraînera une erreur.

Le processus principal le gère en écoutant le `canal` avec le module [`ipcMain`](ipc-main.md) , et répond en définissant `event.returnValue`.

> :warning: **AVERTISSEMENT**: L’envoi d’un message synchrone bloquera l’ensemble du processus de rendu jusqu’à ce que la réponse soit reçue, alors n’utilisez cette méthode qu’en dernier recours. Il est beaucoup mieux d’utiliser la version asynchrone, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.postMessage (canal, message, [transfer])`

* `channel` String
* `message` tous
* `transfer` MessagePort[] (facultatif)

Envoyez un message au processus principal, transférant en option la propriété de zéro ou plus [`MessagePort`][] objets.

Les objets `MessagePort` transférés seront disponibles dans le processus principal en tant qu’objets [`MessagePortMain`](message-port-main.md) en accédant à la propriété `ports` de l’événement émis.

Par exemple :

```js
Renderer process
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage ('port', { message: 'hello' }, [port1])

// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

Pour plus d’informations sur l' `MessagePort` et `MessageChannel`, consultez la documentation [MDN de](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel).

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

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
