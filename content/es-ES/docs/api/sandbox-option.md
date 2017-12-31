# Opciones de la `caja de arena`

> Crea una ventana en el navegador con un renderizador que corra dentro de la caja de arena del sistema operativo de Chromium. Con esta opción activada, la renderización debe comunicarse vía IPC al procesador principal para poder acceder a los nodos API. Sin embargo, con el fin de activar la caja de arena de Chromium OS, Electron debe ser ejecutado con el argumento del comando de linea `--enable-sandbox`.

Una de las características clave de la seguridad de Chromium es que toda la renderización y el código de JavaScript es ejecutado dentro d una caja de arena. Esta caja de area usa características específicas para cada OS para asegurar que un explosivo en el proceso de renderización no pueda lastimar al sistema.

En otras palabras, cuando la caja de arena está activada, los renderizadores solamente pueden hacer cambios al sistema delegando tareas al proceso principal via IPC. [aquí](https://www.chromium.org/developers/design-documents/sandbox) hay más información sobre las cajas de arena.

Puesto que la mayor característica de Electron es la habilidad de ejecutar node.js en el proceso de renderizado (haciendo más fácil el desarrollo de aplicaciones de escritorio usando tecnologías web), la caja de arena está deshabilitada por Electron. Esto se debe a que la mayoría de los API de node.js requieren acceso al sistema. `require()` por ejemplo, no es posible si el permiso del sistema, el cual no está disponible en un ambiente de caja de arena.

Usualmente esto no es un problema para aplicaciones de escritorio ya que el código siempre es confiable, pero hace Electron menos seguro que Chromium para abrir contenido web sospechoso. Para aplicaciones que requieren más seguridad, la bandera de `sandbox` forzará a Electrón a iniciar una renderización de Chomium clásica que es compatible con la caja de arena.

Un renderizador en una caja de arena no tiene un ambiente de node.js ejecutandose y no expone el node.js JavaScript API al código del cliente. La única excepción es el script precargado, que tiene el acceso al subset de los renderizadores API de electron.

Otra diferencia es que los renderizadores en caja de arena no modifican ninguno de los JavaScript APIs que está por defecto. En consecuencia, algunos APIs como `window.open` trabajarán como lo harían en chromium (i.e ellos no regresan a `BrowserWindowProxy`).

## Ejemplo

Para crear una ventana de caja de arena, simplemente pase `sandbox: true` a `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  w.loadURL('http://google.com')
})
```

En el código anterior el `BrowserWindow` que fue creado tiene el node.jsdeshabilitado y puede comunicarse solo via IPC. El uso de esta opción detiene a Electron de crear un node.js en el tiempo de corrida dentro del renderizador. También, en esta nueva ventana `window.open` sigue el comportamiento nativo (por defecto Electron crea un `BrowserWindow` y regresa un proxy a este via `window.open`).

Es importante notar que esta opción sola no va a habilitar la caja de arena impuesta por el OS. Para activar esta característica, el argumento de linea de comando `--enable-sandbox` debe ser pasado a Electron, que lo forzará `sandbox: true` por todas `BrowserWindow` instancias.

Para habilitar la caja de arena impuesta por el OS en `BrowserWindow` o por el proceso `webview` con `sandbox:true` sin mover toda la aplicación en la caja de arena, el argumento de comando de linea `--enable-mixed-sandbox` debe ser pasado por Electron. Esta opción está actualmente soportado en macOS y Windows.

```js
let win
app.on('ready', () => {
  // no hay necesidad de pasar`sandbox: true` ya que `--enable-sandbox` fue habilitada.
  win = new BrowserWindow()
  w.loadURL('http://google.com')
})
```

Note que esto no es suficiente para llamar `app.commandLine.appendSwitch('--enable-sandbox')` como Electron/nodo código de inicio corre después si es posible para hacer cambios a la configuración de la caja de aren de Chromium. El cambio debe ser pasado por la linea de comando de electron:

    electron --enable-sandbox app.js
    

No es posible tener el OS caja de arena activo solo por algunos renderizadores, si `--enable-sandbox` está habilitado, no se puede crear una ventana normal de Electron.

Si usted necesita mezclar renderizadores dentro y fuera de la caja de arena en una aplicación simplemente omita el argumento `--enable-sandbox`. Sin este argumento, ventanas creadas con `sandbox: true` todavía tendrán deshabilitado node.js y podrán comunicarse solo via IPC, que ya es una ganancia de seguridad POV en si misma.

## Precargado

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
  w.loadURL('http://google.com')
})
```

y preload.js:

```js
// Este archivo se carga cada vez que se crea un contexto de javascript. Corre en un
// enlace privado que puede acceder al a la selección de renderizadores APIs de Electron. Debemos ser
// cuidadosos de no dejar salir ningún objeto en el ámbito global!
const fs = require('fs')
const {ipcRenderer} = require('electron')

// Lea un archivo de configuración usando el módulo "fs"
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

- Even though the sandboxed renderer doesn't have node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like browserify, as explained below. In fact, browserify is already used by electron to provide a node-like environment to the preload script.

To create a browserify bundle and use it as a preload script, something like the following should be used:

    browserify preload/index.js \
      -x electron \
      -x fs \
      --insert-global-vars=__filename,__dirname -o preload.js
    

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `child_process`
- `electron` (crashReporter, remote and ipcRenderer)
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.