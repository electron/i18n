# webFrameMain

> Controla las páginas web y los iframes.

Proceso: [Main](../glossary.md#main-process)

El módulo `webFrameMain` se puede usar para buscar fotogramas en las existentes[`WebContents`](web-contents.md) instancias. Los eventos de navegación son el caso de uso común.

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

Se puede acceder a estos métodos desde el módulo `webFrameMain` :

### `webFrameMain. fromId (processId, Rutingid)`

* `processId` Integer - Un `Integer` representando el ID interno del proceso que posee el frame.
* `routingId` Integer - Un `Integer` representando el ID único del frame en el renderer process actual. Los ID de enrutamiento se pueden recuperar desde `WebFrameMain`instancias de (`frame.routingId`) y también se pasan por fotogramas eventos de navegación `WebContents` específicos (p. ej. `did-frame-navigate`).

Devuelve `WebFrameMain | undefined` -un marco con el proceso dado y identificadores de direccionamiento, o `undefined` si no hay un WebFrameMain asociado con los ID dados.

## Clase: WebFrameMain

Proceso: [Main](../glossary.md#main-process)

### Métodos de Instancia

#### `Frame. executeJavaScript (Code [, userGesture])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<unknown>` -una promesa que se resuelve con el resultado del código de ejecutado o se rechaza si se produce una ejecución o se produce una promesa rechazada.

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
* `transfer` MessagePortMain [] (opcional)

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

Una `Integer` que representa el ID de trama único en el proceso de representador actual. Las instancias distintas de `WebFrameMain` que se refieren al mimo frame subyacente tendrán el mismo `routingId`.
