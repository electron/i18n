# Chrome Extension Support

Electron supports a subset of the [Chrome Extensions API][chrome-extensions-api-index], primarily to support DevTools extensions and Chromium-internal extensions, but it also happens to support some other extension capabilities.

> **Note:** Electron does not support arbitrary Chrome extensions from the store, and it is a **non-goal** of the Electron project to be perfectly compatible with Chrome's implementation of Extensions.

## Cargar extensiones

Electron only supports loading unpacked extensions (i.e., `.crx` files do not work). Extensions are installed per-`session`. Para cargar una extensión, llame a [`ses.loadExtension`](session.md#sesloadextensionpath-options):

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Loaded extensions will not be automatically remembered across exits; if you do not call `loadExtension` when the app runs, the extension will not be loaded.

Note that loading extensions is only supported in persistent sessions. Attempting to load an extension into an in-memory session will throw an error.

See the [`session`](session.md) documentation for more information about loading, unloading, and querying active extensions.

## Supported Extensions APIs

We support the following extensions APIs, with some caveats. Other APIs may additionally be supported, but support for any APIs not listed here is provisional and may be removed.

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

Las siguientes propiedades de `chrome.runtime` son soportadas:

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

> **Note:** In Chrome, passing `-1` as a tab ID signifies the "currently active tab". Since Electron has no such concept, passing `-1` as a tab ID is not supported and will raise an error.

### `chrome.management`

The following methods of `chrome.management` are supported:

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

Todas las características de esta API son compatibles.

> **NOTE:** Electron's [`webRequest`](web-request.md) module takes precedence over `chrome.webRequest` if there are conflicting handlers.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
