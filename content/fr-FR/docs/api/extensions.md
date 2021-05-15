# Chrome Extension Support

Electron supports a subset of the [Chrome Extensions API][chrome-extensions-api-index], primarily to support DevTools extensions and Chromium-internal extensions, but it also happens to support some other extension capabilities.

> **Note:** Electron does not support arbitrary Chrome extensions from the store, and it is a **non-goal** of the Electron project to be perfectly compatible with Chrome's implementation of Extensions.

## Chargement des extensions

Electron only supports loading unpacked extensions (i.e., `.crx` files do not work). Extensions are installed per-`session`. To load an extension, call [`ses.loadExtension`](session.md#sesloadextensionpath-options):

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Loaded extensions will not be automatically remembered across exits; if you do not call `loadExtension` when the app runs, the extension will not be loaded.

Notez que le chargement d'extensions n'est pris en charge que dans les sessions persistantes. Tenter de charger une extension dans une session en mémoire générera une erreur.

See the [`session`](session.md) documentation for more information about loading, unloading, and querying active extensions.

## Supported Extensions APIs

Nous prenons en charge les API d'extensions suivantes, avec quelques mises en garde. Other APIs may additionally be supported, but support for any APIs not listed here is provisional and may be removed.

### `chrome.devtools.inspectedWindow`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.devtools.network`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.devtools.panels`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.extension`

Les propriétés suivantes de `chrome.extension` sont prises en charge :

- `chrome.extension.lastError`

Les méthodes suivantes de `chrome.extension` sont prises en charge :

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

Les propriétés suivantes de `chrome.runtime` sont prises en charge :

- `chrome.runtime.lastError`
- `chrome.runtime.id`

Les méthodes suivantes de `chrome.runtime` sont prises en charge :

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

Les événements suivants de `chrome.runtime` sont pris en charge :

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Only `chrome.storage.local` is supported; `chrome.storage.sync` and `chrome.storage.managed` are not.

### `chrome.tabs`

Les méthodes suivantes de `chrome.tabs` sont prises en charge :

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Note:** Chrome, passer `-1` un identifiant d’onglet signifie le « onglet actif ». Since Electron has no such concept, passing `-1` as a tab ID is not supported and will raise an error.

### `chrome.management`

Les méthodes suivantes de `chrome.management` sont prises en charge :

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

Toutes les fonctionnalités de cette API sont prises en charge.

> **REMARQUE :** Le module [`webRequest`](web-request.md) d’Electron est prioritaire sur `chrome.webRequest` en cas de conflit de gestionnaires.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
