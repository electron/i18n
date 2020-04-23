## Classe : BrowserWindowProxy

> Manipule la fenêtre enfant

Processus : [Renderer](../glossary.md#renderer-process)

L'objet `BrowserWindowProxy` est retournée par `window.open` et fournit les fonctionnalités limitées avec la fenêtre enfant.

### Méthodes d’instance

L’objet `BrowserWindowProxy` dispose des méthodes d’instance suivantes :

#### `win.blur()`

Retire le focus de la fenêtre enfant.

#### `win.close()`

Force la fermeture de la fenêtre enfant sans appeler l'événement unload.

#### `win.eval(code)`

* `code` String

Évalue le code dans la fenêtre enfant.

#### `win.focus()`

Donne le focus à la fenêtre enfant (met la fenêtre au premier-plan).

#### `win.print()`

Appelle la boîte de dialogue Impression sur la fenêtre enfant.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Envoie un message à la fenêtre enfant avec l'origine spécifié ou `*` pour aucune préférence d'origine.

En plus de ces méthodes, la fenêtre enfant implémente l'objet `window.opener` avec aucune propriété et une méthode unique.

### Propriétés d'instance

L’objet `BrowserWindowProxy` dispose des propriétés d’instance suivantes :

#### `win.closed`

Un `Boolean` qui a la valeur true après que la fenêtre enfant soit fermée.
