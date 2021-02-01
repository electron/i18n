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
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

En el código anterior el [`BrowserWindow`](browser-window.md) que fue creado tiene Node.js deshabilitado y solo puede comunicarse a través de IPC. El uso de esta opción impide que Electron cree un tiempo de ejecución de Node.js en el renderizador. Además, dentro de esta nueva ventana `window.open` sigue el comportamiento nativo (por defecto Electron crea un [`BrowserWindow`](browser-window.md) y devuelve un proxy a este a través de `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) puede ser usado para forzar `sandbox: true` para todas las instancias de`BrowserWindow`.

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Precarga

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.whenReady().then(() => {
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
// ámbito privado que puede acceder a un subconjunto de APIs de rendererizado de Electron. Without
// contextIsolation enabled, it's possible to accidentally leak privileged
// globals like ipcRenderer to web content.
const { ipcRenderer } = require('electron')

const defaultWindowOpen = window.open

window.open = function customWindowOpen (url, ...args) {
  ipcRenderer.send('report-window-open', location.origin, url, args)
  return defaultWindowOpen(url + '?from_electron=1', ...args)
}
```

Cosas importantes que notar en el script precargado:

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate`, `clearImmediate` and `require` are available.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like webpack or browserify. An example of using browserify is below.

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
  - `NativeImage`
  - `webFrame`
- `eventos`
- `contadores`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox.

## Rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. Beaker Browser). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code, unless [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) is also enabled.
- Some bug in the V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).
- While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.
