# ipcRenderer

> Communiquer de manière asynchrone depuis le processus renderer au processus main.

Processus : [Renderer](../glossary.md#renderer-process)

Le module `ipcRenderer` est une instance de la classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Il fournit quelques méthodes pour pouvoir envoyer des messages synchrones et asynchrones depuis le processus render (page web) pour le processus main. Vous pouvez également recevoir des réponses du processus main.

Voir [ipcMain](ipc-main.md) pour des exemples de code.

## Méthodes

Le module de `ipcRenderer` possède les méthodes suivantes pour écouter les événements et envoyer des messages :

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function

En écoutant `channel`, lorsqu'un nouveau message arrive, `listener` sera appelé comme ceci `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

Permet une seule exécution de la fonction `listener` pour cet événement. Ce `listener` est invoqué seulement après qu'un message est envoyé à `channel`, après quoi il sera supprimé.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Supprime le `listener` spécifié du tableau d'écouteurs pour le `channel` spécifié.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` String (facultatif)

Supprime tous les écouteurs, ou ceux du `channel` spécifié.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Envoi un message au processus main de façon asynchrone via le `channel`, vous pouvez également envoyer des arguments arbitraire. Les arguments seront sérialisés en JSON en interne et par conséquent aucune fonction ou chaîne de prototype ne sera inclus.

Le processus main récupère cela en écoutant les `channel` avec le module `ipcMain`.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Retourne `any` - La valeur renvoyé par l'écouteur du [`ipcMain`](ipc-main.md).

Envoi un message au processus main de façon synchrone via le `channel`, vous pouvez également envoyer des arguments arbitraire. Les arguments seront sérialisés en JSON en interne et par conséquent aucune fonction ou chaîne de prototype ne sera inclus.

Le processus main récupère cela en écoutant les `channel` avec le module `ipcMain`, et répond en définissant `event.returnValue`.

**Remarque :** Envoyer un message synchrone permet de bloquer le processus renderer entièrement, sauf si vous savez ce que vous faites, vous ne devez jamais l'utiliser.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Comme `ipcRenderer.send`, mais l'événement sera envoyé à l'élément `<webview>` dans la page hôte au lieu du processus main.