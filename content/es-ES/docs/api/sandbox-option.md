# Opción `sandbox`

> Crear una ventana del explorador con un representador de espacio aislado. Con esta opción activada, la renderización debe comunicarse vía IPC al procesador principal para poder acceder a los nodos API.

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

Una APP puede realizar personalizaciones en renderizadores de espacio aislado utilizando un script de precarga. Aquí hay un ejemplo:

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
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of Electron renderer APIs. Without
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
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like webpack or browserify. Un ejemplo de uso de browserify está a continuación.

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
- `events`
- `timers`
- `url`

Se puede agregar más según sea necesario para exponer más API de electrones en el entorno Sandbox.

## Procesando contenido no confiable

Representar contenido no confiable en electrones sigue siendo un territorio poco explorado, aunque algunas apps están encontrando éxito (p. ej., beaker browser). Nuestro objetivo es obtener tan cerca de Chrome como podemos en cuanto a la seguridad del contenido en espacio aislado, pero en última instancia, siempre estaremos atrasados debido a algunas propuestas fundamentales:

1. No tenemos los recursos dedicados o la experiencia que Chromium tiene que aplicar a la seguridad de su producto. Hacemos todo lo posible para hacer uso de lo que tenemos, para heredar todo lo que podemos del cromo, y para responder con rapidez a problemas de seguridad, pero los electrones no pueden ser tan seguros como el cromo sin los recursos que Chromium puede dedicar.
2. Algunas características de seguridad en Chrome (como navegación segura y certificado transparencia) requieren una autoridad centralizada y servidores dedicados, ambos de que se ejecutan en contra de los objetivos del proyecto de electrones. Como tal, inhabilitamos esas características en Electron, al costo de la seguridad asociada que traerían de otra manera.
3. Hay solo un cromo, mientras que hay muchos miles de apps construidas en electrones, todas las cuales se comportan de manera ligeramente diferente. La contabilidad de esas diferencias de puede generar un espacio enorme de posibilidades, y hacer que sea un reto para garantizar la seguridad de la plataforma en casos de uso inusuales.
4. No podemos subir las actualizaciones de seguridad a los usuarios directamente, por lo que confiamos en los proveedores de la App para actualizar la versión de Electron subyacente a su app a fin de actualizaciones de seguridad para llegar a los usuarios.

Aquí hay algunas cosas a considerar antes de representar contenido que no es de confianza:

- Un script de precarga puede debilitar accidentalmente APIs privilegiadas a código no confiable, a menos que [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) también esté habilitado.
- Algunos errores en el motor V8 pueden permitir a códigos maliciosos acceder a los APIs de precarga del renderer, otorgando de manera efectiva acceso completo al sistema a través del módulo `remote`. Por lo tanto, es muy recomendable [inhabilitar el `remote` Module](../tutorial/security.md#15-disable-the-remote-module). Si la desactivación no es factible, deberías [filtrar selectivamente el `remote` Module](../tutorial/security.md#16-filter-the-remote-module).
- A la vez que hacemos todo lo posible para corregir las correcciones de seguridad de Chromium a versiones anteriores de de Electron, no garantizamos que cada arreglo será retrotransportado. Tu mejor oportunidad para mantenerte seguro es estar en la última versión estable de Electron.
