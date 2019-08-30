# `sandbox` Option

> Crea un ventana de navegador con un renderizador en modo sandbox. Con esta opción habilitada, el renderer debe comunicarse a través de IPC con el proceso principal para acceder a las APIs de node.

Una de las características clave de la seguridad de Chromium es que toda la renderización y el código de JavaScript es ejecutado dentro d una caja de arena. Esta caja de area usa características específicas para cada OS para asegurar que un explosivo en el proceso de renderización no pueda lastimar al sistema.

En otras palabras, cuando la caja de arena está activada, los renderizadores solamente pueden hacer cambios al sistema delegando tareas al proceso principal via IPC. [aquí](https://www.chromium.org/developers/design-documents/sandbox) hay más información sobre las cajas de arena.

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. `require()` por ejemplo, no es posible si el permiso del sistema, el cual no está disponible en un ambiente de caja de arena.

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

Otra diferencia es que los renderizadores en caja de arena no modifican ninguno de los JavaScript APIs que está por defecto. Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Ejemplo

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

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

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox-experimental) puede ser usado para forzar `sandbox: true` para todas las instancias de`BrowserWindow`.

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no se necesita pasar  `sandbox: true` ya que  `app.enableSandbox()` fue llamado.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Precarga

Una aplicación puede hacer personalizaciones a los renderizadores de las cajas de arena usando un script precargado. Aquí hay un ejemplo:

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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- El script precargado puede acceder indirectamente todas las APIs desde el proceso principal a través de los módulos `remote` y `ipcRenderer`.
- El script precargado debe contener un único script, pero es posible tener códigos precargados complejos compuestos con múltiples módulos usando una herramienta como browserify, como explicamos abajo. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

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

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

Una mejora planificada que debería incrementar mucho la seguridad es bloquear los mensajes IPC de los renderizadores de la caja de arena por defecto, permitiendo al proceso principal definir un grupo de mensajes que el renderizador está autorizado para enviar.