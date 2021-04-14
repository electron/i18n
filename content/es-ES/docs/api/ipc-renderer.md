# ipcRenderer

> Comunica asincrónicamente desde un proceso de renderizado al proceso principal.

Proceso: [Renderer](../glossary.md#renderer-process)

El módulo `ipcRenderer` es un [EventEmitter][event-emitter]. Proporciona un par de métodos para enviar mensajes sincrónicos y asincrónicos desde el proceso de renderizado (página web) al proceso principal. También puede recibir respuestas del proceso principal.

Ver [ipcMain](ipc-main.md) para ejemplos de códigos.

## Métodos

El módulo `ipcRenderer` tiene los siguientes métodos para escuchar los eventos y mensajes enviados:

### `ipcRenderer.on(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcRendererEvent
  * `...args` any[]

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcRendererEvent
  * `...args` any[]

Agrega una función de `listener` una vez para el evento. Este `listener` se invoca solo la próxima vez que se envíe un mensaje a `channel`, después del cual se elimina.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `...args` any[]

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Cadena

Elimina todos los oyentes, o aquellos del `channel` especificado.

### `ipcRenderer. Send (Channel,... args`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asíncrono al main process a través de `channel`, junto con los argumentos. Los argumentos se serializan con el [clon estructurado algoritmo][SCA], al igual que [`window.postMessage`][], por lo que las cadenas de prototipos no se incluirán incluidas. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

> **NOTA**: Enviar tipos de JavaScript no estándar tales como objetos DOM o objetos especiales de Electron lanzará una excepción.
> 
> Dado que el proceso principal no tiene soporte para objetos DOM tales como  `ImageBitmap`, `File`, `DOMMatrix`  y así sucesivamente, tales objetos no pueden ser enviados sobre el IPC de Eectron al proceso principal, ya que el proceso principal no tendría forma de decodificarlos. Intentar enviar tales objetos sobre el IPC resultará en un error.

El main process maneja esto escuchando por `channel` con el módulo [`ipcMain`](ipc-main.md).

Si necesitas transferir una [`MessagePort`][] al proceso principal, usa [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Si quieres recibir una respuesta única del proceso principal, como el resultado de una llamada al método, considera usar [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args).

### `ipcRenderer. Invoke (Channel,... args`

* `channel` Cadena
* `...args` any[]

Devuelve `Promise<any>` - Resuelve con la respuesta desde el main process.

Envía un mensaje al main process a través de `channel` y espera un resultado asíncrono. Los argumentos se serializan con el [clon estructurado algoritmo][SCA], al igual que [`window.postMessage`][], por lo que las cadenas de prototipos no se incluirán incluidas. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

> **NOTA**: Enviar tipos de JavaScript no estándar tales como objetos DOM o objetos especiales de Electron lanzará una excepción.
> 
> Dado que el proceso principal no tiene soporte para objetos DOM tales como  `ImageBitmap`, `File`, `DOMMatrix`  y así sucesivamente, tales objetos no pueden ser enviados sobre el IPC de Eectron al proceso principal, ya que el proceso principal no tendría forma de decodificarlos. Intentar enviar tales objetos sobre el IPC resultará en un error.

El main process debería escuchar por el `channel` con [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Por ejemplo:

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

Si necesitas transferir una [`MessagePort`][] al proceso principal, usa [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Si no necesitas una respuesta al mensaje, considera usar [`ipcRenderer.send`](#ipcrenderersendchannel-args).

### `ipcRenderer. sendSync (Channel,... args`

* `channel` Cadena
* `...args` any[]

Devuelve `any` - El valor enviado de vuelta por el controlador [`ipcMain`](ipc-main.md).

Envía un mensaje al main process a través de `channel` y expera un resultado sincrónicamente. Los argumentos se serializan con el [clon estructurado algoritmo][SCA], al igual que [`window.postMessage`][], por lo que las cadenas de prototipos no se incluirán incluidas. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

> **NOTA**: Enviar tipos de JavaScript no estándar tales como objetos DOM o objetos especiales de Electron lanzará una excepción.
> 
> Dado que el proceso principal no tiene soporte para objetos DOM tales como  `ImageBitmap`, `File`, `DOMMatrix`  y así sucesivamente, tales objetos no pueden ser enviados sobre el IPC de Eectron al proceso principal, ya que el proceso principal no tendría forma de decodificarlos. Intentar enviar tales objetos sobre el IPC resultará en un error.

El processo principal lo controlo por escuchar `channel` con el módulo [`ipcMain`](ipc-main.md), y contesta configurando `event.returnValue`.

> :warning: **ADVERTENCIA**: enviar un mensaje sincrónico bloqueará todo el proceso del representador de hasta que se reciba la respuesta, por lo que usar este método solo como último recurso . Es mucho mejor usar la versión asincróna [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer. postMessage (canal, mensaje, [transfer])`

* `channel` Cadena
* `mensaje` cualquiera
* `transfer` MessagePort [] (opcional)

Enviar un mensaje al proceso principal, de manera opcional, transferir la propiedad de cero o más [`MessagePort`][] objetos.

Los objetos `MessagePort` transferidos estarán disponibles en el proceso principal como [`MessagePortMain`](message-port-main.md) objetos al acceder a la propiedad `ports` del evento emitido.

Por ejemplo:

```js
// Renderer process
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

Para más información sobre el uso de `MessagePort` y `MessageChannel`, vea la [Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel).

### `ipcRenderer. sendTo (webContentsId, Channel,... args`

* `webContentsId` Number
* `channel` Cadena
* `...args` any[]

Envía un mensaje a la ventana con `webContentsId` a través de `channel`.

### `ipcRenderer. sendToHost (Channel,... args`

* `channel` Cadena
* `...args` any[]

Es como `ipcRenderer.send` pero el evento se enviará al `<webview>`elemento en la página host en vez de el proceso principal.

## Objeto de evento

La documentación para el objeto `event` pasado a `callback` pude ser encontrada en la estructura de documentos de [`ipc-renderer-event`](structures/ipc-renderer-event.md).

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
