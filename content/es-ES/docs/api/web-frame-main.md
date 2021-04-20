# webFrameMain

> Control web pages and iframes.

Proceso: [Main](../glossary.md#main-process)

The `webFrameMain` module can be used to lookup frames across existing [`WebContents`](web-contents.md) instances. Navigation events are the common use case.

```javascript
const { BrowserWindow, webFrameMain } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, isMainFrame, frameProcessId, frameRoutingId) => {
    const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
    if (frame) {
      const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.executeJavaScript(code)
    }
  }
)
```

También puedes acceder a los frames de una página existente usando la propiedad `mainFrame` de [`WebContents`](web-contents.md).

```javascript
const { BrowserWindow } = require('electron')

async function main () {
  const win = new BrowserWindow({ width: 800, height: 600 })
  await win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.filter((frame) => {
    try {
      const url = new URL(frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log(youtubeEmbeds)
}

main()
```

## Métodos

These methods can be accessed from the `webFrameMain` module:

### `webFrameMain.fromId(processId, routingId)`

* `processId` Integer - Un `Integer` representando el ID interno del proceso que posee el frame.
* `routingId` Integer - Un `Integer` representando el ID único del frame en el renderer process actual. Routing IDs can be retrieved from `WebFrameMain` instances (`frame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`).

Returns `WebFrameMain | undefined` - A frame with the given process and routing IDs, or `undefined` if there is no WebFrameMain associated with the given IDs.

## Clase: WebFrameMain

Proceso: [Main](../glossary.md#main-process)

### Métodos de Instancia

#### `frame.executeJavaScript(code[, userGesture])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Returns `Promise<unknown>` - A promise that resolves with the result of the executed code or is rejected if execution throws or results in a rejected promise.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

#### `frame.reload()`

Devuelve `boolean` - Si la recarga fue iniciada correctamente. Solo resulta en `false` cuando el frame no tiene historial.

#### `frame.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asíncrono al renderer process a través de `channel` junto con los argumentos. Los argumentos serán serializados con la \[Structured Clone Algorithm\]\[SCA\], al igual que [`postMessage`][], así que las cadenas de prototipos no serán incluidas. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

El proceso de renderizado puede manejar el mensaje escuchando el `canal` con el módulo [`ipcRenderer`](ipc-renderer.md).

#### `frame.postMessage(channel, message, [transfer])`

* `channel` Cadena
* `mensaje` cualquiera
* `transfer` MessagePortMain[] (optional)

Envía un mensaje al renderer process, transfiriendo opcionalmente la propiedad de cero o más objetos [`MessagePortMain`][].

Los objetos `MessagePortMain` transferidos estarán disponible en el renderer process accediendo a la propiedad `ports` del evento emitido. Cuando llegan al renderer, serán objetos DOM `MessagePort` nativos.

Por ejemplo:

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

### Propiedades de Instancia

#### `frame.url` _Readonly_

Un `string` representando la URL actual del frame.

#### `frame.top` _Readonly_

Un `WebFrameMain | null` representando el frame superior en la jerarquía a la que pertenece el `frame`.

#### `frame.parent` _Readonly_

Un `WebFrameMain | null` representando al frame padre de `frame`, la propiedad debería ser `null` si el `frame` es el frame superior en la jerarquía de frame.

#### `frame.frames` _Readonly_

Una colección `WebFrameMain[]` que contiene los descendientes directos del `frame`.

#### `frame.framesInSubtree` _Readonly_

Una colección `WebFrameMain[]` que contiene cada frame en el subárbol de `frame` incluyendo el mismo. Esto puede resultar útil al atravesar todos los frames.

#### `frame.frameTreeNodeId` _Readonly_

Un `Integer` que representa el id de la instancia FrameTreeNode del frame. Este id es global del navegador y unicamente identifica a un frame que aloja contenido. El identificador se fija en la creación del frame y permanece constante por durante el ciclo de vida del frame. Cuando el frame es eliminado, el id no se vuelve a utilizar.

#### `frame.name` _Readonly_

Un `String` que representa el nombre del frame.

#### `frame.osProcessId` _Readonly_

Un `Integer` que representa el `pid` del proceso del sistema operativo al cual pertenece este frame.

#### `frame.processId` _Readonly_

Un `Integer` que representa el `pid` del proceso interno de Chromium al cual pertenece este frame. Esto no es el mismo que el process ID del sistema operativo; para leer eso use `frame.osProcessId`.

#### `frame.routingId` _Readonly_

An `Integer` representing the unique frame id in the current renderer process. Las instancias distintas de `WebFrameMain` que se refieren al mimo frame subyacente tendrán el mismo `routingId`.
