# `sandbox` Option

> Crea una ventana en el navegador con un renderizador que corra dentro de la caja de arena del sistema operativo de Chromium. Con esta opción activada, la renderización debe comunicarse vía IPC al procesador principal para poder acceder a los nodos API. Sin embargo, con el fin de activar la caja de arena de Chromium OS, Electron debe ser ejecutado con el argumento del comando de linea `--enable-sandbox`.

Una de las características clave de la seguridad de Chromium es que toda la renderización y el código de JavaScript es ejecutado dentro d una caja de arena. Esta caja de area usa características específicas para cada OS para asegurar que un explosivo en el proceso de renderización no pueda lastimar al sistema.

En otras palabras, cuando la caja de arena está activada, los renderizadores solamente pueden hacer cambios al sistema delegando tareas al proceso principal via IPC. [aquí](https://www.chromium.org/developers/design-documents/sandbox) hay más información sobre las cajas de arena.

Puesto que la mayor característica de Electron es la habilidad de ejecutar node.js en el proceso de renderizado (haciendo más fácil el desarrollo de aplicaciones de escritorio usando tecnologías web), la caja de arena está deshabilitada por Electron. Esto se debe a que la mayoría de los API de node.js requieren acceso al sistema. `require()` por ejemplo, no es posible si el permiso del sistema, el cual no está disponible en un ambiente de caja de arena.

Usualmente esto no es un problema para aplicaciones de escritorio ya que el código siempre es confiable, pero hace Electron menos seguro que Chromium para abrir contenido web sospechoso. Para aplicaciones que requieren más seguridad, la bandera de `sandbox` forzará a Electrón a iniciar una renderización de Chomium clásica que es compatible con la caja de arena.

Un renderizador en una caja de arena no tiene un ambiente de node.js ejecutandose y no expone el node.js JavaScript API al código del cliente. La única excepción es el script precargado, que tiene el acceso al subset de los renderizadores API de electron.

Otra diferencia es que los renderizadores en caja de arena no modifican ninguno de los JavaScript APIs que está por defecto. Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

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
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has node.js disabled and can communicate only via IPC. El uso de esta opción detiene a Electron de crear un node.js en el tiempo de corrida dentro del renderizador. Also, within this new window `window.open` follows the native behaviour (by default electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Es importante notar que esta opción sola no va a habilitar la caja de arena impuesta por el OS. Para activar esta característica, el argumento de linea de comando `--enable-sandbox` debe ser pasado a Electron, que lo forzará `sandbox: true` por todas `BrowserWindow` instancias.

Para habilitar la caja de arena impuesta por el OS en `BrowserWindow` o por el proceso `webview` con `sandbox:true` sin mover toda la aplicación en la caja de arena, el argumento de comando de linea `--enable-mixed-sandbox` debe ser pasado por Electron. Esta opción está actualmente soportado en macOS y Windows.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note que esto no es suficiente para llamar `app.commandLine.appendSwitch('--enable-sandbox')` como Electron/nodo código de inicio corre después si es posible para hacer cambios a la configuración de la caja de aren de Chromium. El cambio debe ser pasado por la linea de comando de electron:

```sh
electron --enable-sandbox app.js
```

No es posible tener el OS caja de arena activo solo por algunos renderizadores, si `--enable-sandbox` está habilitado, no se puede crear una ventana normal de Electron.

Si usted necesita mezclar renderizadores dentro y fuera de la caja de arena en una aplicación simplemente omita el argumento `--enable-sandbox`. Sin este argumento, ventanas creadas con `sandbox: true` todavía tendrán deshabilitado node.js y podrán comunicarse solo via IPC, que ya es una ganancia de seguridad POV en si misma.

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

- A pesar de que el renderizador en la caja de arena no tiene un node.js corriendo, todavía tiene acceso a un ambiente limitado parecido a uno nodal: `Buffer`, `process`, `setImmediate` y `require` están disponibles.
- El script precargado puede acceder indirectamente todas las APIs desde el proceso principal a través de los módulos `remote` y `ipcRenderer`. Así es como `fs` (usado arriba) y otros módulos son implementados: Son proxies de las contrapartes remotas en el proceso principal.
- El script precargado debe contener un único script, pero es posible tener códigos precargados complejos compuestos con múltiples módulos usando una herramienta como browserify, como explicamos abajo. De hecho, browserify ya está siendo usada por Electron para proveer un ambiente parecido al nodal para el script precargado.

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

Se pueden agregar más si se necesitan para exponer más APIs de Electron en la caja de arena, pero cualquier módulo en el proceso principar ya puede ser usado a través de `electron.remote.require`.

## Estado

Por favor use la opción de `sandbox` con cuidado, debido a que todavía es una característica experimental. Todavía no estamos seguros de las implicaciones de seguridad de exponer algunos renderizadores API de Electron a un script precargado, pero aquí hay algunas cosas a considerar antes de renderizar contenido no confiable:

- A preload script can accidentally leak privileged APIs to untrusted code.
- Algún bug en el motor v8 también puede permitir que un código malicioso acceda al API precargado del renderizador, dandole efectivamente acceso completo al sistema mediante el módulo `remote`.

Dado que renderizar contenido no confiable en Electron es un territorio inexplorado, las APIs expuestas a los script de la caja de arena precargada deben ser considerados más inestables que el resto de las APIs de Electron, y debe tener cambios radicales para arreglar los problemas de seguridad.

Una mejora planificada que debería incrementar mucho la seguridad es bloquear los mensajes IPC de los renderizadores de la caja de arena por defecto, permitiendo al proceso principal definir un grupo de mensajes que el renderizador está autorizado para enviar.