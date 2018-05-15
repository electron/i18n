# ipcRenderer

> Comunica asincrónicamente desde un proceso de renderizado al proceso principal.

Proceso: [Renderer](../glossary.md#renderer-process)

El módulo `ipcRenderer` es una instancia de la clase [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Proporciona un par de métodos para enviar mensajes sincrónicos y asincrónicos desde el proceso de renderizado (página web) al proceso principal. También puede recibir respuestas del proceso principal.

Ver [ipcMain](ipc-main.md) para ejemplos de códigos.

## Métodos

El módulo `ipcRenderer` tiene los siguientes métodos para escuchar los eventos y mensajes enviados:

### `ipcRenderer.on(channel, listener)`

* `channel` Cadena
* `listener` Función

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` Cadena
* `listener` Función

Agrega una función `listener` para el evento. Este `listener` es invocado solo la próxima vez que se envía un mensaje a `channel`, después que se elimina.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función

Elimina el `listener` especificado del arreglo listener para el `channel` especificado.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Cadena

Elimina todos los oyentes, o aquellos del `channel` especificado.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Envíe un mensaje al proceso principal de forma asíncrona a través de `canal`, también puede enviar argumentos arbitrarios. Los argumentos se serializarán en JSON internamente y por lo tanto, no se incluirán funciones ni cadenas de prototipos.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` cualquiera[]

Devuelve `any` - El valor enviado de vuelta por el controlador [`ipcMain`](ipc-main.md).

Envía un mensaje al proceso principal sincrónicamente a través de `channel`, también puede enviar argumentos arbitrarios. Los argumentos se serializarán en JSON internamente y por lo tanto, no se incluirán funciones ni cadenas de prototipos.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Nota:** Enviar un mensaje sincrónico bloqueará el proceso todo el proceso de renderizado, nunca se debe utilizar a menos que se sepa lo que está haciendo.

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` Cadena
* `...args` any[]

Envía un mensaje a una ventana con `windowid` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Es como `ipcRenderer.send` pero el evento se enviará al `<webview>`elemento en la página host en vez de el proceso principal.