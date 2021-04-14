# MessagePortMain

`MessagePortMain` es el equivalente del lado del proceso principal del DOM [`MessagePort`][] objeto. Se comporta de manera similar a la versión DOM, con la excepción de que utiliza el sistema de eventos node. js `EventEmitter` , en lugar del sistema DOM `EventTarget` . Esto significa que deberías usar `port.on('message', ...)` para escuchar los eventos, en lugar de `port.onmessage = ...` o `port.addEventListener('message', ...)`

Consulta la documentación de la API de mensajería de [Channel][] para obtener más información sobre el uso de mensajería de canal.

`MessagePortMain` es una\[event-emitter\]\[EventEmitter\].

## Clase: MessagePortMain

Proceso: [Main](../glossary.md#main-process)

### Métodos de Instancia

#### `port.postMessage(message, [transfer])`

* `mensaje` cualquiera
* `transfer` MessagePortMain [] (opcional)

Envía un mensaje desde el puerto y, de manera opcional, transfiere la propiedad de los objetos a otros contextos de exploración.

#### `port.start()`

Inicia el envío de mensajes en cola en el puerto. Los mensajes se ponen en cola hasta que se llame a este método.

#### `port.close()`

Desconecta el puerto, por lo que ya no está activo.

### Eventos de Instancia

#### Evento: 'message'

Devuelve:

* Objeto `messageEvent`
  * `data`
  * `ports` MessagePortMain []

Se emite cuando un objeto MessagePortMain recibe un mensaje.

#### Evento: "close"

Se emite cuando se desconecta el extremo remoto de un objeto MessagePortMain.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
