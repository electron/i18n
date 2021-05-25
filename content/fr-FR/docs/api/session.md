# session

> Gère les sessions du navigateur, les cookies, le cache, les paramètres de proxy, etc.

Processus : [Main](../glossary.md#main-process)

Le module `session` peut être utilisé pour créer des objets `Session`.

Vous pouvez également accéder à la `session` des pages existantes à l’aide de la propriété `session` des [`WebContents`](web-contents.md), ou le module `session`.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
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

Retourne :

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

#### Événement : 'extension-loaded'

Retourne :

* `event` Événement
* `extension` [Extension](structures/extension.md)

Émis après le chargement d’une extension. Cela se produit chaque fois qu’une extension ajoutée à l’ensemble d’extensions « activées ». Ceci comprend :

* Extensions chargées à partir `session.loadExtension`.
* Extensions rechargées :
  * à partir d'un plantage.
  * si l'extension l'a demandée ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

Retourne :

* `event` Événement
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. Cela se produit lorsque `Session.removeExtension` est appelée.

#### Event: 'extension-ready'

Retourne :

* `event` Événement
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

#### Event: 'preconnect'

Retourne :

* `event` Événement
* `preconnectUrl` String - L'URL demandée pour la préconnexion par le moteur de rendu .
* `allowCredentials` Booléen - Vrai si le moteur de rendu demande que la connexion inclue les informations d'identification (voir la [spec](https://w3c.github.io/resource-hints/#preconnect) pour plus de détails.)

Émis lorsqu'un processus de rendu demande de préconnexion à une URL, généralement à cause de un hint[ressource ](https://w3c.github.io/resource-hints/).

#### Événement : 'spellcheck-dictionary-initialized'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Événement : 'spellcheck-dictionary-download-begin'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Événement : 'spellcheck-dictionary-download-success'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

#### Événement : 'spellcheck-dictionary-download-failure'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails.  For details on the failure you should collect a netlog and inspect the download request.

#### Événement : 'select-serial-port' _Expérimental_

Retourne :

* `event` Événement
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` String

Emitted when a serial port needs to be selected when a call to `navigator.serial.requestPort` is made. `callback` should be called with `portId` to be selected, passing an empty string to `callback` will cancel the request.  Additionally, permissioning on `navigator.serial` can be managed by using [ses.setPermissionCheckHandler(handler)](#sessetpermissioncheckhandlerhandler) with the `serial` permission.

Parce qu'il s'agit d'une fonctionnalité expérimentale, elle est désactivée par défaut.  To enable this feature, you will need to use the `--enable-features=ElectronSerialChooser` command line switch.  Additionally because this is an experimental Chromium feature you will need to set `enableBlinkFeatures: 'Serial'` on the `webPreferences` property when opening a BrowserWindow.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === '9025' && device.productId === '67'
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(selectedPort.portId)
    }
  })
})
```

#### Événement : 'serial-port-added' _Expérimental_

Retourne :

* `event` Événement
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available.  Par exemple, cet événement se déclenchera lorsqu'un nouveau périphérique USB est branché.

#### Événement : 'serial-port-removed' _Expérimental_

Retourne :

* `event` Événement
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed.  Par exemple, cet événement se déclenchera lorsqu'un périphérique USB est débranché.

### Méthodes d’instance

Les méthodes suivantes sont disponibles pour les instances de `Session` :

#### `ses.getCacheSize()`

Retourne `Promise<Integer>` - la taille actuelle du cache de la session, en octets.

#### `ses.clearCache()`

Retourne `Promise<void>` - résout lorsque l'opération de nettoyage du cache est terminée.

Efface le cache HTTP de la session.

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (facultatif) - Doit suivre la représentation de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (facultatif) - Les types de stockage à effacer, peuvent contenir : `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. Si ce n'est pas spécifié, effacez tous les types de stockage.
  * `quotas` String[] (optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`. S'il n'est pas spécifié, effacez tous les quotas.

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

#### `ses.setProxy(config)`

* Objet `config`
  * `mode` String (optional) - The proxy mode. Should be one of `direct`, `auto_detect`, `pac_script`, `fixed_servers` or `system`. If it's unspecified, it will be automatically determined based on other specified options.
    * `direct` In direct mode all connections are created directly, without any proxy involved.
    * `auto_detect` In auto_detect mode the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat.
    * `pac_script` In pac_script mode the proxy configuration is determined by a PAC script that is retrieved from the URL specified in the `pacScript`. C'est le mode par défaut si `pacScript` est spécifié.
    * `fixed_servers` En mode fixed_servers, la configuration du proxy est spécifiée dans `proxyRules`. Il s'agit du mode par défaut si `proxyRules` est spécifié.
    * `system` In system mode the proxy configuration is taken from the operating system. Note that the system mode is different from setting no proxy configuration. In the latter case, Electron falls back to the system settings only if no command-line options influence the proxy configuration.
  * `pacScript` String (optional) - The URL associated with the PAC file.
  * `proxyRules` String (optional) - Rules indicating which proxies to use.
  * `proxyBypassRules` String (optional) - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Indique les paramètres de proxy.

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

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

   Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Correspond aux URLs qui sont des adresses IP littérales.

   Exemples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Exemples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<String>` - Resolves with the proxy information for `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. Le script pac sera à nouveau extrait de `pacScript` si le mode proxy est `pac_script`.

#### `ses.setDownloadPath(path)`

* `path` String - Emplacement de téléchargement.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* Objet `options`
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

#### `ses.preconnect(options)`

* Objet `options`
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. 1 par défaut.

Preconnects the given number of sockets to an origin.

#### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

**Note:** It will terminate / fail all requests currently in flight.

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * Objet `request`
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Résultat de la vérification par Chromium.
    * `errorCode` Integer - Code d'erreur.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Indique la réussite et désactive la vérification de transparence de certificat.
      * `-2` - Indique l'échec.
      * `-3` - Utilise le résultat de la vérification de Chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

> **NOTE:** The result of this procedure is cached by the network service.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - WebContents qui demandent la permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - The type of requested permission.
    * `clipboard-read` - Demande d'accès à la lecture depuis le presse-papiers.
    * `média` - Demande l'accès à des périphériques multimédia tels que la caméra, le microphone et les haut-parleurs.
    * `afficher-capture` Demander acces pour capturer l'ecran.
    * `mediaKeysystem` - Demande d’accès au contenu protégé par DRM.
    * `geolocation` - Demande d'accès à l'emplacement actuel de l'utilisateur.
    * `notifications` - Request notification creation and the ability to display them in the user's system tray.
    * `midi` - Request MIDI access in the `webmidi` API.
    * `midiSysex` - Request the use of system exclusive messages in the `webmidi` API.
    * `pointerLock` - Request to directly interpret mouse movements as an input method. Cliquez [ici](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) pour en savoir plus.
    * `fullscreen` - Demande de l'application pour passer en mode plein écran.
    * `openExternal` - Request to open links in external applications.
    * `unknown` - An unrecognized permission request
  * `callback` Function
    * `permissionGranted` Boolean - Allow or deny the permission.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. Pour effacer le gestionnaire, appelez `setPermissionRequestHandler(null)`.  Please note that you must also implement `setPermissionCheckHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied.

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

* `handler` Function\<Boolean> | null
  * `webContents` ([WebContents](web-contents.md) | null) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.  Cross origin sub frames making permission checks will pass a `null` webContents to this handler.  You should use `embeddingOrigin` and `requestingOrigin` to determine what origin the owning frame and the requesting frame are on respectively.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `embeddingOrigin` String (optional) - The origin of the frame embedding the frame that made the permission check.  Only set for cross-origin sub frames making permission checks.
    * `securityOrigin` String (optional) - The security origin of the `media` check.
    * `mediaType` String (optional) - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String (optional) - The last URL the requesting frame loaded.  This is not provided for cross-origin sub frames making permission checks.
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it.  Please note that you must also implement `setPermissionRequestHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied. Pour effacer le gestionnaire, appelez `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
const url = require('url')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // granted
  }

  return false // denied
})
```

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

#### `ses.isPersistent()`

Returns `Boolean` - Whether or not this session is a persistent one. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

#### `ses.getUserAgent()`

Renvoie `String` - L'utilisateur de cette session.

#### `ses.setSSLConfig(config)`

* Objet `config`
  * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. `tls1` par défaut.
  * `maxVersion` String (optional) - Can be `tls1.2` or `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Par défaut, `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

#### `ses.getBlobData(identifier)`

* `identifier` String - UUID valide.

Retourne `Promise<Buffer>` - résout avec des données Blob.

#### `ses.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* Objet `options`
  * `path` String - Chemin d'accès absolu pour le téléchargement.
  * `urlChain` String[] - Chaîne de caractère complète de l'URL du téléchargement.
  * `type` String (facultatif)
  * `offset` Integer - Portée de départ pour le téléchargement.
  * `length` Integer - Longueur totale du le téléchargement.
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` Double (facultatif) - Heure du début de téléchargement, en nombre de secondes depuis la date initiale UNIX (1er janvier 1970 à 0 heure (UTC)).

Autorise la reprise des téléchargements `annulés` ou `interrompus` depuis la `Session`précédente. L'API va générer un [DownloadItem](download-item.md) accessible avec l'événement [will-download](#event-will-download) . Le [DownloadItem](download-item.md) n'aura aucun `WebContents` associé et l'état initial sera `interrompu`. Le téléchargement ne démarre que lorsque l'API `resume` est appelée sur [DownloadItem](download-item.md).

#### `ses.clearAuthCache()`

Retourne `Promise<void>` - résout lorsque le cache d'authentification HTTP de la session a été effacé.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - Un tableau de chemin absolu pour précharger les scripts

Ajoute des scripts qui seront exécutés sur TOUS les contenus web qui sont associés à cette session juste avant l'exécution normale des scripts `preload`.

#### `ses.getPreloads()`

Retourne `String[]` un tableau de chemins pour précharger les scripts qui ont été enregistrés.

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Boolean

Sets whether to enable the builtin spell checker.

#### `ses.isSpellCheckerEnabled()`

Returns `Boolean` - Whether the builtin spell checker is enabled.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in.  In order for the spell checker to correctly check their words you must call this API with an array of language codes.  You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically.  This API is a no-op on macOS.

#### `ses.getSpellCheckerLanguages()`

Returns `String[]` - An array of language codes the spellchecker is enabled for.  If this list is empty the spellchecker will fallback to using `en-US`.  By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale.  This setting is persisted across restarts.

**Note:** On macOS the OS spellchecker is used and has its own list of languages.  This API is a no-op on macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN.  If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries.  We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here, the file server must be **case insensitive** you must upload each file twice, once with the case it has in the ZIP file and once with the filename as all lower case.

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Please note the trailing slash.  The URL to the dictionaries is formed as `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<String[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

Returns `Boolean` - Whether the word was successfully written to the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be written to the OS custom dictionary as well

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - The word you want to remove from the dictionary

Returns `Boolean` - Whether the word was successfully removed from the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be removed from the OS custom dictionary as well

#### `ses.loadExtension(path[, options])`

* `path` String - Path to a directory containing an unpacked Chrome extension
* `options` Object (optional)
  * `allowFileAccess` Boolean - Whether to allow the extension to read local files over `file://` protocol and inject content scripts into `file://` pages. This is required e.g. for loading devtools extensions on `file://` URLs. Par défaut, faux.

Returns `Promise<Extension>` - resolves when the extension is loaded.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. See [Supported Extensions APIs](extensions.md#supported-extensions-apis) for more details on what is supported.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess is required to load the devtools extension on file:// URLs.
    { allowFileAccess: true }
  )
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```

This API does not support loading packed (.crx) extensions.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Returns `Extension` | `null` - The loaded extension with the given ID.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `ses.getAllExtensions()`

Returns `Extension[]` - A list of all loaded extensions.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `ses.getStoragePath()`

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `Session` :

#### `ses.availableSpellCheckerLanguages` _Readonly_

A `String[]` array which consists of all the known available spell checker languages.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.

#### `ses.storagePath` _Readonly_

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

#### `ses.cookies` _Readonly_

Un objet [`Cookies`](cookies.md) pour cette session.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

Un objet [`WebRequest`](web-request.md) pour cette session.

#### `ses.protocol` _Readonly_

Un objet [`Protocole`](protocol.md) pour cette session.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _Readonly_

Un objet [`NetLog`](net-log.md) pour cette session.

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
