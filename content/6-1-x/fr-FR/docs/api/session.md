# session

> Gère les sessions du navigateur, les cookies, le cache, les paramètres de proxy, etc.

Processus : [Main](../glossary.md#main-process)

Le module `session` peut être utilisé pour créer des objets `Session`.

Vous pouvez également accéder à la `session` des pages existantes à l’aide de la propriété `session` des [`WebContents`](web-contents.md), ou le module `session`.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Méthodes

Le module `session` dispose des méthodes suivantes :

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (optional)
  * `cache` Boolean - Si vous voulez activer le cache.

Retourne `Session` - Une instance de session de la chaîne de caractères `partition`. Quand il y a une `Session` existante avec la même `partition`, elle sera retournée; sinon une nouvelle instance `Session` sera créée avec `options`.

Si `partition` commence par `persist:`, la page utilisera une session persistante disponible pour toutes les pages de l'application avec la même `partition`. s'il n'y a pas de `persist:` préfixe, la page utilisera une session en mémoire. Si le `partition` est vide puis la session par défaut de l'application sera retournée.

Pour créer une `Session` avec `options`, vous devez vous assurer que la `Session` avec la `partition` n'a jamais été utilisée auparavant. Il n'y a pas moyen de changer les `options` d'un objet `Session` existant.

## Propriétés

Le module `session` dispose des propriétés suivantes :

### `session.defaultSession`

Un objet `Session`, l'objet d'une session par défaut de l'application.

## Classe : Session

> Les propriétés getter et setter d'une session.

Processus : [Main](../glossary.md#main-process)

Vous pouvez créer un objet `Session` avec le module `session` :

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Événements d’instance

Les événements suivants sont disponibles pour les instances de `Session` :

#### Événement : 'will-download'

* `event` Événement
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Émis lorsque Electron est sur le point de télécharger `item` dans `webContents`.

Faire appel à `Event.preventDefault ()` annule le téléchargement et `item` ne sera pas disponible dans le battement suivant du processus.

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Méthodes d’instance

Les méthodes suivantes sont disponibles pour les instances de `Session` :

#### `ses.getCacheSize(callback)`

* `callback` Function
  * `taille` Integer - Taille du cache utilisé en octets.
  * `error` Integer - The error code corresponding to the failure.

Le callback est appelé avec la taille de cache actuelle de la session.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.getCacheSize()`

Retourne `Promise<Integer>` - la taille actuelle du cache de la session, en octets.

#### `ses.clearCache(callback)`

* `callback` Function - Appelée lorsque l’opération est effectuée.
  * `error` Integer - The error code corresponding to the failure.

Efface le cache HTTP de la session.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearCache()`

Retourne `Promise<void>` - résout lorsque l'opération de nettoyage du cache est terminée.

Efface le cache HTTP de la session.

#### `ses.clearStorageData([options,] callback)`

* `options` Object (optional)
  * `origin` String (facultatif) - Doit suivre la représentation de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (facultatif) - Les types de stockage à effacer, peuvent contenir : `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (optionnel) - Appelée quand l'opération est terminée.

Clears the storage data for the current session.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (facultatif) - Doit suivre la représentation de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (facultatif) - Les types de stockage à effacer, peuvent contenir : `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config, callback)`

* `config` Object
  * `pacScript` String - The URL associated with the PAC file.
  * `proxyRules` String - Rules indicating which proxies to use.
  * `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.
* `callback` Function - Appelée lorsque l’opération est effectuée.

Indique les paramètres de proxy.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

Les `proxyRules` doivent suivre les règles ci-dessous :

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Par exemple :

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

Le `proxyBypassRules` est une liste de règles séparées par des virgules, comme décrites ci-dessous :

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Correspond à tous les noms d'hôte qui correspondent au pattern HOSTNAME_PATTERN.

   Exemples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Correspond à un suffixe de domaine particulier.

   Exemples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Correspond aux URLs qui sont des adresses IP littérales.

   Exemples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Exemples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String - The URL associated with the PAC file.
  * `proxyRules` String - Rules indicating which proxies to use.
  * `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Indique les paramètres de proxy.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

Les `proxyRules` doivent suivre les règles ci-dessous :

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Par exemple :

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

Le `proxyBypassRules` est une liste de règles séparées par des virgules, comme décrites ci-dessous :

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Correspond à tous les noms d'hôte qui correspondent au pattern HOSTNAME_PATTERN.

   Exemples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Correspond à un suffixe de domaine particulier.

   Exemples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Correspond aux URLs qui sont des adresses IP littérales.

   Exemples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Exemples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

#### `ses.setDownloadPath(path)`

* `path` String - Emplacement de téléchargement.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. Par défaut, est faux.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emule le réseau avec la configuration donnée pour la `session`.

```javascript
// Pour émuler une connexion GPRS avec un débit de 50kbps et une latence de 500 ms.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Pour simuler une panne réseau.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Résultat de la vérification par Chromium.
    * `errorCode` Integer - Code d'erreur.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Indique la réussite et désactive la vérification de transparence de certificat.
      * `-2` - Indique l'échec.
      * `-3` - Utilise le résultat de la vérification de Chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - WebContents qui demandent la permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function
    * `permissionGranted` Boolean - Allow or deny the permission.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (Optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (Optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. To clear the handler, call `setPermissionRequestHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // interdit.
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - The security orign of the `media` check.
    * `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. To clear the handler, call `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // denied
  }

  return true
})
```

#### `ses.clearHostResolverCache(callback)`

* `callback` Function (optionnel) - Appelée quand l'opération est terminée.

Vide le cache de résolution de l'hôte.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

Vide le cache de résolution de l'hôte.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domaines` String - Une liste de serveurs séparés par des virgules pour lesquels l'authentification intégrée est activée.

Définit dynamiquement s'il faut toujours envoyer des identifiants pour l'authentification HTTP NTLM ou Négocier .

```javascript
const { session } = require('electron')
// considère n'importe quelle url se terminant par `example.com`, `foobar.com`, `baz`
// pour une authentification intégrée.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// considère toutes les urls pour une authentification intégrée.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (facultatif)

Remplace les `userAgent` et `acceptLanguages` pour cette session.

Le `acceptLanguages` doit être une liste ordonnée de codes de langue séparés par des virgules, pour exemple `"en-US,fr,de,ko,zh-CN,ja"`.

Cela n'affecte pas les `WebContents`, et chaque `WebContents` peut utiliser `webContents.setUserAgent` pour remplacer l'agent utilisateur à l'échelle de la session.

#### `ses.getUserAgent()`

Renvoie `String` - L'utilisateur de cette session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - UUID valide.
* `callback` Function
  * `result` Buffer - données Blob.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identifier` String - UUID valide.

Retourne `Promise<Buffer>` - résout avec des données Blob.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - Chemin d'accès absolu pour le téléchargement.
  * `urlChain` String[] - Chaîne de caractère complète de l'URL du téléchargement.
  * `type` String (facultatif)
  * `offset` Integer - Portée de départ pour le téléchargement.
  * `length` Integer - Longueur totale du le téléchargement.
  * `lastModified` String - Valeur Last-Modified du header.
  * `eTag` String - Valeur du ETag dans le header.
  * `startTime` Double (facultatif) - Heure du début de téléchargement, en nombre de secondes depuis la date initiale UNIX (1er janvier 1970 à 0 heure (UTC)).

Autorise la reprise des téléchargements `annulés` ou `interrompus` depuis la `Session`précédente. L'API va générer un [DownloadItem](download-item.md) accessible avec l'événement [will-download](#event-will-download) . Le [DownloadItem](download-item.md) n'aura aucun `WebContents` associé et l'état initial sera `interrompu`. Le téléchargement ne démarre que lorsque l'API `resume` est appelée sur [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function - Appelée lorsque l’opération est effectuée.

Vide le cache d'authentification HTTP de la session.

**[Deprecated Soon](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(deprecated)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Retourne `Promise<void>` - résout lorsque le cache d'authentification HTTP de la session a été effacé.

#### `ses.clearAuthCache()`

Retourne `Promise<void>` - résout lorsque le cache d'authentification HTTP de la session a été effacé.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - Un tableau de chemin absolu pour précharger les scripts

Ajoute des scripts qui seront exécutés sur TOUS les contenus web qui sont associés à cette session juste avant l'exécution normale des scripts `preload`.

#### `ses.getPreloads()`

Retourne `String[]` un tableau de chemins pour précharger les scripts qui ont été enregistrés.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `Session` :

#### `ses.cookies`

Un objet [Cookies](cookies.md) pour cette session.

#### `ses.webRequest`

Un objet [WebRequest](web-request.md) pour cette session.

#### `ses.protocol`

Un objet [Protocol](protocol.md) pour cette session.

```javascript
const { app, session } = require('electron')
const path = require('path')

application. n('ready', function () {
  protocole const = session.fromPartition('some-partition').protocole
  . egisterFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({ path: path. ormalize(`${__dirname}/${url}`) })
  }, function (error) {
    if (error) console. rror('Échec de l'enregistrement du protocole)
  })
})
```

#### `ses.netLog`

A [NetLog](net-log.md) object for this session.

```javascript
const { app, session } = require('electron')

app.on('ready', async function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog. tartLogging('/path/to/net-log')
  // Après quelques événements de réseau
  const path = wait netLog. topLogging()
  console.log('Net-logs écrit vers', chemin)
})
```
