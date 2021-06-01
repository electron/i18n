# Título 1 Xpath:/h 1

`MessagePortMain` is the main-process-side equivalent of the DOM [`MessagePort`][] object. It behaves similarly to the DOM version, with the exception that it uses the Node.js `EventEmitter` event system, instead of the DOM `EventTarget` system. This means you should use `port.on('message', ...)` to listen for events, instead of `port.onmessage = ...` or `port.addEventListener('message', ...)`

Ve la documentacion de [Channel Messaging API][] para mas información sobre el uso de channel messaging.

`MessagePortMain` is an \[EventEmitter\]\[event-emitter\].

## Clase: MessagePortMain

> Interfaz del puerto para la mensajería de canales del proceso principal.

Proceso: [Main](../glossary.md#main-process)

### Métodos de Instancia

#### `port.postMessage(message, [transfer])`

* `mensaje` cualquiera
* `transfer` MessagePortMain[] (optional)

Sends a message from the port, and optionally, transfers ownership of objects to other browsing contexts.

#### `port.start()`

Starts the sending of messages queued on the port. Messages will be queued until this method is called.

#### `port.close()`

Disconnects the port, so it is no longer active.

### Eventos de Instancia

#### Evento: 'message'

Devuelve:

* `messageEvent` Object
  * `data` any
  * `ports` MessagePortMain[]

Emitted when a MessagePortMain object receives a message.

#### Evento: "close"

Emitted when the remote end of a MessagePortMain object becomes disconnected.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
