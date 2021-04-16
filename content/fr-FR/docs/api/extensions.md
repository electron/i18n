# Prise en charge de l’extension Chrome

Electron prend en charge un sous-ensemble des extensions [Chrome API][chrome-extensions-api-index], principalement pour prendre en charge les extensions DevTools et les extensions internes au chrome , mais il arrive également de prendre en charge d’autres fonctionnalités d’extension .

> **Remarque :** Electron ne prend pas en charge les extensions Chrome arbitraires du magasin , et il s’agit d’un</strong> non objectif **du projet Electron qui est parfaitement compatible avec la mise en œuvre des extensions par Chrome.</p> </blockquote> 
> 
> ## Extensions de chargement
> 
> Electron ne prend en charge que le chargement des extensions déballées (c’est-à-dire `.crx` les fichiers ne fonctionnent pas). Des extensions sont installées par`session`. Pour charger une extension, appelez [`ses.loadExtension`](session.md#sesloadextensionpath-options):
> 
> ```js
const { session } = require ('electron')

session.loadExtension ('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Les extensions chargées ne seront pas automatiquement rappelées à travers les sorties; si vous n' pas appeler `loadExtension` l’application s’exécute, l’extension ne sera pas chargée.

Notez que les extensions de chargement ne sont prises en charge que dans les sessions persistantes. Attempting to load an extension into an in-memory session will throw an error.

See the [`session`](session.md) documentation for more information about loading, unloading, and querying active extensions.

## Supported Extensions APIs

We support the following extensions APIs, with some caveats. Other APIs may additionally be supported, but support for any APIs not listed here is provisional and may be removed.

### `chrome.devtools.inspectedWindow`

All features of this API are supported.

### `chrome.devtools.network`

All features of this API are supported.

### `chrome.devtools.panels`

All features of this API are supported.

### `chrome.extension`

The following properties of `chrome.extension` are supported:

- `chrome.extension.lastError`

The following methods of `chrome.extension` are supported:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

The following properties of `chrome.runtime` are supported:

- `chrome.runtime.lastError`
- `chrome.runtime.id`

The following methods of `chrome.runtime` are supported:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

The following events of `chrome.runtime` are supported:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Only `chrome.storage.local` is supported; `chrome.storage.sync` and `chrome.storage.managed` are not.

### `chrome.tabs`

The following methods of `chrome.tabs` are supported:

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Note:** Chrome, passer `-1` un identifiant d’onglet signifie le « onglet actif ». Since Electron has no such concept, passing `-1` as a tab ID is not supported and will raise an error.

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

All features of this API are supported.

> **NOTE:** Electron's [`webRequest`](web-request.md) module takes precedence over `chrome.webRequest` if there are conflicting handlers.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
