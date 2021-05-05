# MessagePortMain

`MessagePortMain` est l’équivalent de [`MessagePort`][] du DOM mais coté processus principal. Il se comporte de la même manière que la version DOM, sauf qu'il utilise le système d'événements de Node.js `EventEmitter` au lieu du système `EventTarget` du DOM. Cela signifie que vous devrez utiliser `port.on('message', ...)` pour écouter les événements, au lieu de `port. nmessage = ...` ou `port.addEventListener('message', ...)`

Pour plus d'informations sur son utilisation consultez la documentation de [Channel Messaging API][].

`MessagePortMain` est un \[EventEmitter\]\[event-emitter\].

## Classe: MessagePortMain

> Port interface for channel messaging in the main process.

Processus : [Main](../glossary.md#main-process)

### Méthodes d’instance

#### `port.postMessage(message, [transfer])`

* `message` tous
* `transfer` MessagePortMain[] (optional)

Envoie un message depuis le port, et le cas échéant, transfère la propriété d'objets à d’autres contextes de navigation.

#### `port.start()`

Démarre l'envoi de messages en file d'attente sur le port. Les messages seront mis en file d'attente jusqu'à ce que cette méthode soit appelée.

#### `port.close()`

Déconnecte le port qui ne sera donc plus actif.

### Événements d’instance

#### Événement : 'message'

Retourne :

* `messageEvent` Object
  * `data` {any}
  * `ports` MessagePortMain[]

Émis lorsqu'un objet MessagePortMain reçoit un message.

#### Événement : 'close'

Émis lorsque l’extrémité distante d’un objet MessagePortMain devient déconnectée.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
