# Chrome Extension Support

Electron supports a subset of the [Chrome Extensions API][chrome-extensions-api-index], primarily to support DevTools extensions and Chromium-internal extensions, but it also happens to support some other extension capabilities.

> **Nota:** Electron no admite extensiones de cromo arbitrarias desde la tienda de , y es una</strong> **no objetivo del proyecto Electron para ser perfectamente compatible con la implementación de extensiones de Chrome.</p> </blockquote> 
> 
> ## Cargar extensiones
> 
> Electron solo admite la carga de extensiones desempaquetadas (es decir, los archivos `.crx` no funcionan). Las extensiones se instalan por`session`. Para cargar una extensión, llame a [`ses.loadExtension`](session.md#sesloadextensionpath-options):
> 
> ```js
const { session } = require (' Electron ')

Session. loadExtension (' Path/to/unpacked/Extension '). luego (({ id }) => {
  //...
})
```

Las extensiones cargadas no se recordaron automáticamente en las salidas; Si no llamar `loadExtension` cuando se ejecuta la aplicación, la extensión no se cargará.

Ten en cuenta que cargar extensiones solo se admite en sesiones persistentes. Si intentas cargar una extensión en una sesión en memoria, se producirá un error.

Consulta la [`session`](session.md) documentación para obtener más información acerca de cargar, descargar y consultar extensiones activas.

## API de extensiones admitidas

Admitimos las siguientes API de extensiones, con algunas advertencias. Otras API pueden ser soportadas Adicionalmente, pero la compatibilidad con cualquier API que no se enumeren aquí es provisional y puede ser eliminada.

### `Chrome. DevTools. inspectedWindow`

Todas las características de esta API son compatibles.

### `Chrome. DevTools. Network`

Todas las características de esta API son compatibles.

### `Chrome. DevTools. Panels`

Todas las características de esta API son compatibles.

### `Chrome. Extension`

Se admiten las siguientes propiedades de `chrome.extension` :

- `Chrome. Extension. lastError`

Los siguientes métodos de `chrome.extension` son soportados:

- `Chrome. Extension. getURL`
- `Chrome. Extension. getBackgroundPage`

### `Chrome. Runtime`

Se admiten las siguientes propiedades de `chrome.runtime` :

- `Chrome. Runtime. lastError`
- `chrome.runtime.id`

Los siguientes métodos de `chrome.runtime` son soportados:

- `Chrome. Runtime. getBackgroundPage`
- `Chrome. Runtime. getManifest`
- `Chrome. Runtime. getPlatformInfo`
- `Chrome. Runtime. getURL`
- `Chrome. Runtime. Connect`
- `Chrome. Runtime. sendMessage`

Se admiten los siguientes eventos de `chrome.runtime` :

- `Chrome. Runtime. onStartup`
- `Chrome. Runtime. onInstalled`
- `Chrome. Runtime. onSuspend`
- `Chrome. Runtime. onSuspendCanceled`
- `Chrome. Runtime. onConnect`
- `Chrome. Runtime. onMessage`

### `Chrome. Storage`

Solo se admite `chrome.storage.local` ; `chrome.storage.sync` y `chrome.storage.managed` no lo son.

### `Chrome. tabs`

Los siguientes métodos de `chrome.tabs` son soportados:

- `Chrome. Tabs. sendMessage`
- `Chrome. Tabs. executeScript`

> **Nota:** en Chrome, pasar `-1` como un ID de tabulación significa la pestaña " activa actualmente". Dado que Electron no tiene tal concepto, pasar `-1` como un ID de pestaña no es compatible y generará un error.

### `Chrome. Management`

Se admiten los siguientes métodos de `chrome.management` :

- `Chrome. Management. getAll`
- `Chrome. Management. get`
- `Chrome. Management. getSelf`
- `Chrome. Management. getPermissionWarningsById`
- `Chrome. Management. getPermissionWarningsByManifest`
- `Chrome. Management. onEnabled`
- `Chrome. Management. onDisabled`

### `Chrome. webRequest`

Todas las características de esta API son compatibles.

> **Nota:** [`webRequest`módulo de](web-request.md) de electrones tiene prioridad sobre `chrome.webRequest` si hay controladores en conflicto.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
