# session

> Gère les sessions du navigateur, les cookies, le cache, les paramètres de proxy, etc.

Processus : [Main](../glossary.md#main-process)

Le module `session` peut être utilisé pour créer des objets `Session`.

Vous pouvez également accéder à la `session` des pages existantes à l’aide de la propriété `session` des [`WebContents`](web-contents.md), ou le module `session`.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Méthodes

Le module `session` dispose des méthodes suivantes :

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Objet 
  * `cache` Boolean - Si vous voulez activer le cache.

Returns `Session` - A session instance from `partition` string. When there is an existing `Session` with the same `partition`, it will be returned; otherwise a new `Session` instance will be created with `options`.

If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. If the `partition` is empty then default session of the app will be returned.

To create a `Session` with `options`, you have to ensure the `Session` with the `partition` has never been used before. There is no way to change the `options` of an existing `Session` object.

## Propriétés

Le module `session` dispose des propriétés suivantes :

### `session.defaultSession`

Un objet `Session`, l'objet d'une session par défaut de l'application.

## Classe : Session

> Les propriétés getter et setter d'une session.

Processus : [Main](../glossary.md#main-process)

Vous pouvez créer un objet `Session` avec le module `session` :

```javascript
const {session} = require('electron')
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
const {session} = require('electron')
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

Le callback est appelé avec la taille de cache actuelle de la session.

#### `ses.clearCache(callback)`

* `callback` Function - Called when operation is done

Efface le cache HTTP de la session.

#### `ses.clearStorageData([options, callback])`

* `options` Object (facultatif) 
  * `origin` String - (optional) Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` String[] - (optional) The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (optional) The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
* `callback` Function (optionnelle) - Appelée lorsque l’opération est effectuée.

Efface les données de stockage du web.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config, callback)`

* `config` Objet 
  * `pacScript` String - The URL associated with the PAC file.
  * `proxyRules` String - Rules indicating which proxies to use.
  * `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.
* `callback` Function - Appelée lorsque l’opération est effectuée.

Indique les paramètres de proxy.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

Les `proxyRules` doivent suivre les règles ci-dessous :

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
    

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

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
  Correspond à n'importe quelle URL qui est une IP littérale, comprise dans la fourchette d'adresse donnée. La portée IP est spécifiée avec la notation CIDR.
  
  Exemples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Correspond aux adresses locales. Le sens de `<local>` indique si l'hôte correspond à une des valeurs suivantes: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function 
  * `proxy` String

Résout les informations du proxy pour l'`url`. Le `callback` sera appelé avec `callback(proxy)` lorsque la requête est effectuée.

#### `ses.setDownloadPath(path)`

* `path` String - The download location

Paramètre le répertoire de sauvegarde des téléchargements. Par défaut, le répertoire des téléchargements sera `Downloads` dans le dossier de l'application respective.

#### `ses.enableNetworkEmulation(options)`

* `options` Objet 
  * `offline` Boolean (optionnel) - S'il faut simuler une extinction du réseau ou non. Est positionné sur False par défaut.
  * `latency` Double (optional) - RTT en ms. Par défaut à 0, ce qui désactive la limitation de latence.
  * `downloadThroughput` Double (optionnel) - Taux de téléchargement en Bps. Par défaut à 0, ce qui désactive la limitation de téléchargement.
  * `uploadThroughput` Double (optionnel) - Taux d'émission en Bps. Par défaut à 0, ce qui désactive la limitation d'émission.

Emule le réseau avec la configuration donnée pour la `session`.

```javascript
// Pour émuler une connexion GPRS avec un débit de 50kbps et une latence de 500 ms.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Pour simuler une panne réseau.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Désactive toute émulation de réseau déjà active pour la `session`. Réinitialise vers la configuration réseau originale.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `request` Objet 
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `error` String - Verification result from chromium.
  * `callback` Function 
    * `verificationResult` Integer - La valeur peut être un des codes d'erreur de certificat trouvés [ici](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Mis à part les codes d’erreur de certificat, les codes spéciaux suivants peuvent être utilisés. 
      * `` - Indicates success and disables Certificate Transperancy verification.
      * `-2` - Indique l'échec.
      * `-3` - Utilise le résultat de la vérification de Chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const {hostname} = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function 
  * `webContents` [WebContents](web-contents.md) - WebContents qui demandent la permission.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function 
    * `permissionGranted` Boolean - Allow or deny the permission

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it.

```javascript
const {session} = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // interdit.
  }

  callback(true)
})
```

#### `ses.clearHostResolverCache([callback])`

* `callback` Function (optionnel) - Appelée quand l'opération est terminée.

Vide le cache de résolution de l'hôte.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (facultatif)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Renvoie `String` - L'utilisateur de cette session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - UUID valide.
* `callback` Function 
  * `result` Buffer - données Blob.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `options` Objet 
  * `path` String - Chemin d'accès absolu pour le téléchargement.
  * `urlChain` String[] - Chaîne de caractère complète de l'URL du téléchargement.
  * `type` String (facultatif)
  * `offset` Integer - Portée de départ pour le téléchargement.
  * `length` Integer - Longueur totale du le téléchargement.
  * `lastModified` String - Valeur Last-Modified du header.
  * `eTag` String - Valeur du ETag dans le header.
  * `startTime` Double (facultatif) - Heure du début de téléchargement, en nombre de secondes depuis la date initiale UNIX (1er janvier 1970 à 0 heure (UTC)).

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (optional) - Called when operation is done

Clears the session’s HTTP authentication cache.

### Instance Properties

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

```javascript
const {app, session} = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, function (error) {
    if (error) console.error('Enregistrement du protocole échoué')
  })
})
```