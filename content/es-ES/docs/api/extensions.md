# Chrome Extension Support

Electron supports a subset of the [Chrome Extensions API][chrome-extensions-api-index], primarily to support DevTools extensions and Chromium-internal extensions, but it also happens to support some other extension capabilities.

> **Nota:** Electron no admite extensiones de cromo arbitrarias desde la tienda de , y es una</strong> **no objetivo del proyecto Electron para ser perfectamente compatible con la implementación de extensiones de Chrome.</p> </blockquote> 
> 
> ## Cargar extensiones
> 
> Electron solo admite la carga de extensiones desempaquetadas (es decir, los archivos `.crx` no funcionan). Las extensiones se instalan por`session`. Para cargar una extensión, llame a [`ses.loadExtension`](session.md#sesloadextensionpath-options):
> 
> ```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Las extensiones cargadas no se recordaron automáticamente en las salidas; Si no llamar `loadExtension` cuando se ejecuta la aplicación, la extensión no se cargará.

Ten en cuenta que cargar extensiones solo se admite en sesiones persistentes. Si intentas cargar una extensión en una sesión en memoria, se producirá un error.

Consulta la [`session`](session.md) documentación para obtener más información acerca de cargar, descargar y consultar extensiones activas.

## API de extensiones admitidas

Admitimos las siguientes API de extensiones, con algunas advertencias. Otras API pueden ser soportadas Adicionalmente, pero la compatibilidad con cualquier API que no se enumeren aquí es provisional y puede ser eliminada.

### `chrome.devtools.inspectedWindow`

Todas las características de esta API son compatibles.

### `chrome.devtools.network`

Todas las características de esta API son compatibles.

### `chrome.devtools.panels`

Todas las características de esta API son compatibles.

### `chrome.extension`

Se admiten las siguientes propiedades de `chrome.extension` :

- `chrome.extension.lastError`

Los siguientes métodos de `chrome.extension` son soportados:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

Se admiten las siguientes propiedades de `chrome.runtime` :

- `chrome.runtime.lastError`
- `chrome.runtime.id`

Los siguientes métodos de `chrome.runtime` son soportados:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

Los siguientes eventos de `chrome.runtime` están soportados:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Solo `chrome.storage.local` está soportado; `chrome.storage.sync` y `chrome.storage.managed` no lo están.

### `chrome.tabs`

Los siguientes métodos de `chrome.tabs` son soportados:

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Nota:** en Chrome, pasar `-1` como un ID de tabulación significa la pestaña " activa actualmente". Dado que Electron no tiene tal concepto, pasar `-1` como un ID de pestaña no es compatible y generará un error.

### `chrome.management`

Se admiten los siguientes métodos de `chrome.management` :

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

Todas las características de esta API son compatibles.

> **Nota:** [`webRequest`módulo de](web-request.md) de electrones tiene prioridad sobre `chrome.webRequest` si hay controladores en conflicto.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
