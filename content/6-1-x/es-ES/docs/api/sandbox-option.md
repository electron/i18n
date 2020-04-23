# Opción `sandbox`

> Create a browser window with a sandboxed renderer. Con esta opción activada, la renderización debe comunicarse vía IPC al procesador principal para poder acceder a los nodos API.

Una de las características clave de la seguridad de Chromium es que toda la renderización y el código de JavaScript es ejecutado dentro d una caja de arena. Esta caja de area usa características específicas para cada OS para asegurar que un explosivo en el proceso de renderización no pueda lastimar al sistema.

En otras palabras, cuando la caja de arena está activada, los renderizadores solamente pueden hacer cambios al sistema delegando tareas al proceso principal via IPC. [aquí](https://www.chromium.org/developers/design-documents/sandbox) hay más información sobre las cajas de arena.

Dado que una de la mayor característica en Electron es la habilidad de ejecutar Node.js en el renderer process (esto que facilita el desarrollo de aplicaciones de escritorio usando las tecnologías web), el sanbox está deshabilitado por Electron. Esto es porque la mayoría de las APIs Node.js requieren acceso al sistema. `require()` por ejemplo, no es posible sin el permiso de archivo del sistema, el cual no está disponible en un ambiente sandbox.

Usualmente este no es un problema para aplicaciones de escritorio dado que el código siempre es confiable, pero esto hace a Electron menos seguro que Chromium para mostrar contenido web inseguro. Para aplicaciones que requieren más seguridad, la bandera `sandbox` forzará a Electron a generar un renderizador clásico de Chromium que es compatible con el sandbox.

Un renderizador en sandbox no tiene un ambiente de Node.js ejecutándose y no expone las APIs JavaScript de Node.js al código del cliente. La única excepción es la pre carga de script, el cual tiene acceso a un subconjunto de API renderer de Electron.

Otra diferencia es que los renderizadores en caja de arena no modifican ninguno de los JavaScript APIs que está por defecto. Por consiguiente, algunas APIs como `window.open` funcionarán como en Chromium (por ejemplo, no devuelven un [`BrowserWindowProxy`](browser-window-proxy.md)).

## Ejemplo

Para crear una ventana en sandbox, pase `sandbox: true` a `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

En el código anterior el [`BrowserWindow`](browser-window.md) que fue creado tiene Node.js deshabilitado y solo puede comunicarse a través de IPC. El uso de esta opción impide que Electron cree un tiempo de ejecución de Node.js en el renderizador. Además dentro de esa ventana nueva `window.open` sigue el comportamiento nativo(por defecto Electron crea un [`BrowserWindow`](browser-window.md) y devuelve un proxy a este via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox-experimental) puede ser usado para forzar `sandbox: true` para todas las instancias de`BrowserWindow`.

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Precargado

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

y preload.js:

```js
// Este archivo se carga cada vez que se crea un contexto de javascript. Corre en un
// ámbito privado que puede acceder a un subconjunto de APIs de rendererizado de Electron. Debemos ser
// cuidadosos de no dejar salir ningún objeto en el ámbito global!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Cosas importantes que notar en el script precargado:

- A pesar de que el renderizador en caja de arena no tiene Node.js ejecutándose, todavía tiene acceso a un entorno limitado parecido a node: `Buffer`, `process`, `setImmediate` y `require` están disponible.
- El script precargado puede acceder indirectamente todas las APIs desde el proceso principal a través de los módulos `remote` y `ipcRenderer`.
- El script precargado debe contener un único script, pero es posible tener códigos precargados complejos compuestos con múltiples módulos usando una herramienta como browserify, como explicamos abajo. De echo, browserify ya es utilizado por Electron para proveer a ambiente parecido a node para el scrip de precarga.

Para crear un paquete browserify y usarlo como un script precargado, algo como lo siguiente puede ser usado:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

La bandera `-x`debe ser usada con cualquier modulo requerido que ya está expuesto en un ambiente precargado, y le dice a browserify que use la función que la encierra `require` para ello. `--insert-global-vars` Asegurará que `process`, `Buffer` y `setImmediate` también sean llevado para el ambiente cerrado (normalmente browsefiry inyecta códigos para ellos).

Actualmente la function `require` proveída en el ambiente de precargado expone los siguiente módulos:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `eventos`
- `contadores`
- `url`

Se pueden agregar más si se necesitan para exponer más APIs de Electron en el sandbox, pero cualquier módulo en el proceso principal puede ser usado a través de `electron.remote.require`.

## Estado

Por favor use la opción de `sandbox` con cuidado, debido a que todavía es una característica experimental. Nosotros todavía no estamos seguros de las implicaciones de seguridad al exponer algunas APIs renderer de Electron a un script de precarga, pero aquí hay algunas cosas a considerar antes de renderizar contenido no confiable:

- Un script precargado puede filtrar accidentalmente APIs privilegiadas a códigos no confiables.
- Algún bug en el motor v8 también puede permitir que un código malicioso acceda al API precargado del renderizador, dandole efectivamente acceso completo al sistema mediante el módulo `remote`.

Dado que el renderizado de contenido no confiable en Electron sigue siendo un territorio inexplorado, las APIs expuestas al script de pre carga del sandbox deben ser consideradas más inestables que el resto de las APIs de Electron, y pueden tener cambios repentinos para solucionar problemas de seguridad.

Una mejora planificada que debería incrementar mucho la seguridad es bloquear los mensajes IPC de los renderizadores de la caja de arena por defecto, permitiendo al proceso principal definir un grupo de mensajes que el renderizador está autorizado para enviar.
