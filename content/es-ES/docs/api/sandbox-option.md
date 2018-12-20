# `sandbox` Option

> Crea una ventana en el navegador con un renderizador que corra dentro de la caja de arena del sistema operativo de Chromium. Con esta opción activada, la renderización debe comunicarse vía IPC al procesador principal para poder acceder a los nodos API. However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

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

Es importante notar que esta opción sola no va a habilitar la caja de arena impuesta por el OS. Para activar esta característica, el argumento de linea de comando `--enable-sandbox` debe ser pasado a Electron, que lo forzará `sandbox: true` por todas `BrowserWindow` instancias.

Para habilitar la caja de arena impuesta por el OS en `BrowserWindow` o por el proceso `webview` con `sandbox:true` sin mover toda la aplicación en la caja de arena, el argumento de comando de linea `--enable-mixed-sandbox` debe ser pasado por Electron. Esta opción está actualmente soportado en macOS y Windows.

```js
let win
app.on('ready', () => {
  // no hay necesidad de pasar`sandbox: true` ya que `--enable-sandbox` fue habilitada.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
electron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Precarga

Una aplicación puede hacer personalizaciones a los renderizadores de las cajas de arena usando un script precargado. Aquí hay un ejemplo:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

y preload.js:

```js
// Este archivo se carga cada vez que se crea un contexto de javascript. It runs in a
// private scope that can access a subset of Electron renderer APIs. Debemos ser
// cuidadosos de no dejar salir ningún objeto en el ámbito global!
const fs = require('fs')
const { ipcRenderer } = require('electron')

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
- El script precargado puede acceder indirectamente todas las APIs desde el proceso principal a través de los módulos `remote` y `ipcRenderer`. Así es como `fs` (usado arriba) y otros módulos son implementados: Son proxies de las contrapartes remotas en el proceso principal.
- El script precargado debe contener un único script, pero es posible tener códigos precargados complejos compuestos con múltiples módulos usando una herramienta como browserify, como explicamos abajo. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

Para crear un paquete browserify y usarlo como un script precargado, algo como lo siguiente puede ser usado:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

La bandera `-x`debe ser usada con cualquier modulo requerido que ya está expuesto en un ambiente precargado, y le dice a browserify que use la función que la encierra `require` para ello. `--insert-global-vars` Asegurará que `process`, `Buffer` y `setImmediate` también sean llevado para el ambiente cerrado (normalmente browsefiry inyecta códigos para ellos).

Actualmente la function `require` proveída en el ambiente de precargado expone los siguiente módulos:

- `child_process`
- `electron` 
  - `crashReporter`
  - `remote`
  - `ipcRenderer`
  - `webFrame`
- `fs`
- `os`
- `contadores`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Estado

Por favor use la opción de `sandbox` con cuidado, debido a que todavía es una característica experimental. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- Un script precargado puede filtrar accidentalmente APIs privilegiadas a códigos no confiables.
- Algún bug en el motor v8 también puede permitir que un código malicioso acceda al API precargado del renderizador, dandole efectivamente acceso completo al sistema mediante el módulo `remote`.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

Una mejora planificada que debería incrementar mucho la seguridad es bloquear los mensajes IPC de los renderizadores de la caja de arena por defecto, permitiendo al proceso principal definir un grupo de mensajes que el renderizador está autorizado para enviar.