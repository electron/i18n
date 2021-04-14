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

Notez que les extensions de chargement ne sont prises en charge que dans les sessions persistantes. Tenter de charger une extension dans une session en mémoire lancera une erreur.

Consultez la documentation [`session`](session.md) pour plus d’informations sur chargement, le déchargement et la requête des extensions actives.

## API extensions prises en charge

Nous soutenons les API d’extensions suivantes, avec quelques mises en garde. D’autres API peuvent en outre être prises en charge, mais le soutien pour toutes les API non répertoriées ici provisoire et peut être supprimé.

### `chrome.devtools.inspectedWindow`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.devtools.network Chrome`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.devtools.panels Chrome.devtools.panels Chrome.devtools.panels chrome.`

Toutes les fonctionnalités de cette API sont prises en charge.

### `chrome.extension`

Les propriétés suivantes des `chrome.extension` prises en charge :

- `chrome.extension.lastError Chrome`

Les méthodes suivantes d' `chrome.extension` sont prises en charge :

- `chrome.extension.getURL Chrome`
- `chrome.extension.getBackgroundPage Chrome`

### `chrome.runtime Chrome`

Les propriétés suivantes des `chrome.runtime` prises en charge :

- `chrome.runtime.lastError Chrome`
- `chrome.runtime.id`

Les méthodes suivantes d' `chrome.runtime` sont prises en charge :

- `chrome.runtime.getBackgroundPage Chrome.runtime.getBackgroundPage Chrome.runtime.getBackgroundPage chrome.`
- `chrome.runtime.getManifest Chrome.runtime.getManifest Chrome.runtime.getManifest chrome.`
- `chrome.runtime.getPlatformInfo Chrome`
- `chrome.runtime.getURL Chrome`
- `chrome.runtime.connect Chrome`
- `chrome.runtime.sendMessage Chrome.runtime.sendMessage chrome.runtime.sendMessage chrome.`

Les événements suivants de `chrome.runtime` sont pris en charge :

- `chrome.runtime.onStartup Chrome.runtime.onStartup Chrome.runtime.onStartup chrome.`
- `chrome.runtime.onInstallé`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled Chrome.runtime.onSuspendCanceled Chrome.runtime.onSuspendCanceled chrome.`
- `chrome.runtime.onConnect Chrome`
- `chrome.runtime.onMessage Chrome`

### `chrome.storage Chrome`

Seuls `chrome.storage.local` sont pris en charge; `chrome.storage.sync` et `chrome.storage.managed` ne le sont pas.

### `chrome.tabs Chrome`

Les méthodes suivantes d' `chrome.tabs` sont prises en charge :

- `chrome.tabs.sendMessage Chrome.tabs.sendMessage chrome.tabs.sendMessage chrome.`
- `chrome.tabs.executeScript Chrome.tabs.executeScript Chrome.tabs.executeScript chrome.`

> **Note:** Chrome, passer `-1` un identifiant d’onglet signifie le « onglet actif ». Étant donné qu’Electron n’a pas un tel concept, passer `-1` comme un identifiant d’onglet n' pas pris en charge et soulèvera une erreur.

### `chrome.management Chrome`

Les méthodes suivantes d' `chrome.management` sont prises en charge :

- `chrome.management.getAll Chrome`
- `chrome.management.get Chrome`
- `chrome.management.getSelf Chrome`
- `chrome.management.getPermissionWarningsById Chrome`
- `chrome.management.getPermissionWarningsByManifest Chrome`
- `chrome.management.onEnabled Chrome`
- `chrome.management.onDisabled Chrome`

### `chrome.webRequest Chrome.webRequest Chrome.webRequest Chrome.`

Toutes les fonctionnalités de cette API sont prises en charge.

> **NOTE :** module de [`webRequest`](web-request.md) 'Electron a préséance sur `chrome.webRequest` s’il y a des gestionnaires contradictoires.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
