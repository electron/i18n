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
* `options` objet (facultatif)
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

Émis après le chargement d’une extension. Cela se produit chaque fois qu’une extension ajoutée à l’ensemble d’extensions « activées ». Cela comprend :

- Extensions chargées à partir `session.loadExtension`.
- Extensions rechargées :
  * à partir d'un plantage.
  * si l'extension l'a demandée ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

Retourne :

* `event` Événement
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

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

#### Event: 'spellcheck-dictionary-initialized'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Event: 'spellcheck-dictionary-download-begin'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Event: 'spellcheck-dictionary-download-success'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Émis lorsqu’un fichier de dictionnaire hunspell a été téléchargé avec succès

#### Evénement: 'spellcheck-dictionary-download-failure'

Retourne :

* `event` Événement
* `languageCode` String - The language code of the dictionary file

Émis lorsqu’un téléchargement de fichier de dictionnaire hunspell échoue.  Pour plus de sur la défaillance, vous devez collecter un netlog et inspecter le téléchargement demande.

#### Evénement: 'select-serial-port' _Experimental_

Retourne :

* `event` Événement
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` String

Émis lorsqu’un port de série doit être sélectionné lorsqu’un appel `navigator.serial.requestPort` est effectué. `callback` doit être appelé avec `portId` à sélectionner, en passant une chaîne vide à `callback` vous annuler la demande.  En outre, l’autorisation `navigator.serial` peut être gérée en utilisant [ses.setPermissionCheckHandler (gestionnaire)](#sessetpermissioncheckhandlerhandler) l’autorisation `serial` .set.

Parce qu’il s’agit d’une fonctionnalité expérimentale, il est désactivé par défaut.  Pour activer cette fonctionnalité, vous utiliser le commutateur de `--enable-features=ElectronSerialChooser` de commande.  En parce qu’il s’agit d’une fonctionnalité de chrome expérimental, vous devrez définir `enableBlinkFeatures: 'Serial'` sur la propriété `webPreferences` lors de l’ouverture d’un BrowserWindow.

```javascript
const { app, BrowserWindow } = require ('electron')

let win = null
app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

app.whenReady().then()) => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (événement, portList, rappel) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === 0x2341 && device.productId === 0x0043
    })
    si (!selectedPort) {
      rappel ('')
    } autre {
      rappel (result1.portId)
    }
  })
})
```

#### Evénement: 'serial-port-added' _Experimental_

Retourne :

* `event` Événement
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Émis après `navigator.serial.requestPort` a été appelé et `select-serial-port` a tiré si un nouveau port en série devient disponible.  Par exemple, cet événement s’en tirera lorsqu’un nouvel appareil USB est branché.

#### Evénement: 'serial-port-removed' _Experimental_

Retourne :

* `event` Événement
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Émis après `navigator.serial.requestPort` a été appelé et `select-serial-port` a tiré si un port en série a été supprimé.  Par exemple, cet événement s’en tirera lorsqu’un périphérique USB est débranché.

### Méthodes d’instance

Les méthodes suivantes sont disponibles pour les instances de `Session` :

#### `ses.getCacheSize()`

Retourne `Promise<Integer>` - la taille actuelle du cache de la session, en octets.

#### `ses.clearCache()`

Retourne `Promise<void>` - résout lorsque l'opération de nettoyage du cache est terminée.

Efface le cache HTTP de la session.

#### `ses.clearStorageData([options])`

* `options` objet (facultatif)
  * `origin` String (facultatif) - Doit suivre la représentation de `window.location.origin` `scheme://host:port`.
  * `storages` String[] (facultatif) - Les types de stockage à effacer, peuvent contenir : `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. S’il n pas spécifié, effacer tous les types de stockage.
  * `quotas` String[] (facultatif) - Les types de quotas à effacer, peuvent contenir: `temporary`, `persistent`, `syncable`. S’il n’est pas spécifié, effacer tous les quotas.

Retourne `Promise<void>` - se résout lorsque les données de stockage ont été effacées.

#### `ses.flushStorageData()`

Écrit toutes les données DOMStorage non écrites sur disque.

#### `ses.setProxy (config)`

* `config` objet
  * `mode` String (facultatif) - Le mode proxy. Devrait être l’un des `direct`, `auto_detect`, `pac_script`, `fixed_servers` ou `system`. S’il n' pas précisé, il sera automatiquement déterminé en fonction d’autres options spécifiques.
    * `direct` en mode direct toutes les connexions sont créées directement, sans aucun proxy impliqué.
    * `auto_detect` En mode auto_detect, la configuration proxy est déterminée par un script PAC qui peut être téléchargé à http://wpad/wpad.dat.
    * `pac_script` En mode pac_script, la configuration proxy est déterminée par un script PAC qui est extrait de l’URL spécifiée dans le `pacScript`. Il s’agit du mode si `pacScript` est spécifié.
    * `fixed_servers` En mode fixed_servers, la configuration proxy est spécifiée dans `proxyRules`. Il s’agit du mode par défaut `proxyRules` est spécifié.
    * `system` en mode système, la configuration proxy est prise à partir du système d’exploitation. Notez que le mode système est différent de ne pas définir de configuration proxy. Dans ce dernier cas, Electron retombe dans les paramètres du système que si aucune option de ligne de commande n’influence la configuration du proxy.
  * `pacScript` String (facultatif) - L’URL associée au fichier PAC.
  * `proxyRules` String (facultatif) - Règles indiquant les procurations à utiliser.
  * `proxyBypassRules` String (facultatif) - Règles indiquant quelles URL doivent être les paramètres proxy.

Renvois `Promise<void>` - Se résout lorsque le processus de paramètre de proxy est terminé.

Indique les paramètres de proxy.

Lorsque `mode` n’est pas spécifié, `pacScript` et `proxyRules` sont fournis ensemble, l’option `proxyRules` est ignorée et la configuration `pacScript` est appliquée.

Vous devrez peut `ses.closeAllConnections` fermer actuellement dans les connexions de vol pour empêcher prises poolées à l’aide de proxy précédent d’être réutilisées par des demandes futures.

Les `proxyRules` doivent suivre les règles ci-dessous :

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Par exemple :

* `http=foopy:80;ftp=foopy2` - Utilisez les `foopy:80` proxy HTTP pour `http://` URL et proxy HTTP `foopy2:80` pour `ftp://` URL.
* `foopy:80` - Utilisez les proxys HTTP `foopy:80` pour toutes les URL.
* `foopy:80,bar,direct://` - Utilisez les `foopy:80` proxy HTTP pour toutes les URL, à défaut de à `bar` si `foopy:80` n’est pas disponible, et après cela en utilisant aucun proxy.
* `socks4://foopy` - Utilisez des proxy SOCKS v4 `foopy:1080` pour toutes les URL.
* `http=foopy,socks5://bar.com` - Utilisez les `foopy` proxy HTTP pour les URL http, et ne pas sur le proxy SOCKS5 `bar.com` si `foopy` n’est pas disponible.
* `http=foopy,direct://` - Utilisez les proxys HTTP `foopy` pour les URL http, et n’utilisez aucun proxy si `foopy` n’est pas disponible.
* `http=foopy;socks=foopy2` - Utilisez la `foopy` proxy HTTP pour les URL http, et utilisez `socks4://foopy2` pour toutes les autres URL.

Le `proxyBypassRules` est une liste de règles séparées par des virgules, comme décrites ci-dessous :

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Correspond à tous les noms d'hôte qui correspondent au pattern HOSTNAME_PATTERN.

   Exemples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

* `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Correspond à un suffixe de domaine particulier.

   Exemples: « .google.com », « .com », « http://.google.com »

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Correspond aux URLs qui sont des adresses IP littérales.

   Exemples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL « / » PREFIX_LENGTH_IN_BITS`

   Faire correspondre n’importe quelle URL qui est à un littéral IP qui se situe entre plage donnée. La plage IP est spécifiée à l’aide de la notation CIDR.

   Exemples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Correspondre aux adresses locales. Le sens de `<local>` est de savoir si l’hôte correspond à l’un des: « 127.0.0.1 », « :1 », « localhost ».

#### `ses.resolveProxy(url)`

* `url` URL

Retours `Promise<String>` - Se résout avec les informations proxy pour `url`.

#### `ses.forceReloadProxyConfig ()`

Retours `Promise<void>` - Se résout lorsque tous les états internes du service proxy sont réinitialisés et que la dernière configuration proxy est réappliquée si elle est déjà disponible. Le script pac sera récupéré à partir de `pacScript` nouveau si le mode proxy est `pac_script`.

#### `ses.setDownloadPath(path)`

* `path` String - Emplacement de téléchargement.

Définit l’annuaire d’enregistrement de téléchargement. Par défaut, l’annuaire de téléchargement sera le `Downloads` le dossier d’application respectif.

#### `ses.enableNetworkEmulation(options)`

* `options` objet
  * `offline` Boolean (facultatif) - S’il y a à imiter la panne réseau. Par défaut, est faux.
  * `latency` Double (facultatif) - RTT en ms. Défauts à 0 qui désactiveront limitation de latence.
  * `downloadThroughput` Double (facultatif) - Taux de téléchargement en bps. Par défaut à 0 qui désactivera la limitation de téléchargement.
  * `uploadThroughput` Double (facultatif) - Taux de téléchargement en bps. Par défaut à 0 qui désactivera la limitation de téléchargement.

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

* `options` objet
  * `url` String - URL pour préconnecter. Seule l’origine est pertinente pour l’ouverture de la prise.
  * `numSockets` numéro (facultatif) - nombre de prises à préconnecter. Ça doit être entre 1 et 6. 1 par défaut.

Préconnecte le nombre donné de prises à une origine.

#### `ses.closeAllConnections()`

Retours `Promise<void>` - Se résout lorsque toutes les connexions sont fermées.

**Note:** Il mettra fin / échouer toutes les demandes actuellement en vol.

#### `ses.disableNetworkEmulation()`

Désactive toute émulation réseau déjà active pour la `session`. Réinitialise pour la configuration réseau d’origine.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` fonction | Null
  * `request` objet
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [certificat](structures/certificate.md)
    * `verificationResult` String - Résultat de la vérification par Chromium.
    * `errorCode` Integer - Code d'erreur.
  * `callback` Function
    * `verificationResult` Integer - La valeur peut être l’un des codes d’erreur de de [ici](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Outre les codes d’erreur de certificat, les codes spéciaux suivants peuvent être utilisés.
      * `0` - Indique la réussite et désactive la vérification de transparence de certificat.
      * `-2` - Indique l'échec.
      * `-3` - Utilise le résultat de la vérification de Chromium.

Définit le certificat vérifier proc pour `session`, le `proc` sera appelé avec `proc(request, callback)` chaque fois qu’un certificat serveur vérification est demandée. Appeler `callback(0)` accepte le certificat, appelle `callback(-2)` le rejette.

Appeler `setCertificateVerifyProc(null)` revient au certificat par défaut pour vérifier proc.

```javascript
const { BrowserWindow } = require ('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((demande, rappel) => {
  const { hostname } = demande
  si (nom d’hôte === 'github.com') { rappel
    (0)
  } autre { rappel
    (-2)
  }
})
```

> **NOTE :** résultat de cette procédure est mis en cache par le service réseau.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` fonction | Null
  * `webContents` [WebContents](web-contents.md) - WebContents qui demandent la permission.  Veuillez noter que si la demande provient d’un sous-cadre, vous devez utiliser `requestingUrl` vérifier l’origine de la demande.
  * `permission` String - Le type d’autorisation demandée.
    * `clipboard-read` - Demande d'accès à la lecture depuis le presse-papiers.
    * `média` - Demande l'accès à des périphériques multimédia tels que la caméra, le microphone et les haut-parleurs.
    * `afficher-capture` Demander acces pour capturer l'ecran.
    * `mediaKeysystem` - Demande d’accès au contenu protégé par DRM.
    * `geolocation` - Demande d'accès à l'emplacement actuel de l'utilisateur.
    * `notifications` - Demander la création de notification et la possibilité de les afficher dans le plateau système de l’utilisateur.
    * `midi` - Demandez à MIDI l’accès à l `webmidi` API.
    * `midiSysex` - Demander l’utilisation de messages exclusifs système dans l' `webmidi` API.
    * `pointerLock` - Demande d’interpréter directement les mouvements de la souris comme une méthode d’entrée. Cliquez [ici](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) pour en savoir plus.
    * `fullscreen` - Demande de l'application pour passer en mode plein écran.
    * `openExternal` - Demande d’ouverture de liens dans des applications externes.
  * `callback` Function
    * `permissionGranted` Boolean - Autoriser ou refuser la permission.
  * `details` objet - Certaines propriétés ne sont disponibles que sur certains types d’autorisation.
    * `externalURL` String (facultatif) - L’url du `openExternal` demande.
    * `mediaTypes` String[] (facultatif) - Les types d’accès aux médias demandés, les éléments peuvent être `video` ou `audio`
    * `requestingUrl` String - La dernière URL du cadre de demande chargé
    * `isMainFrame` Boolean - Si le cadre faisant la demande est le cadre principal

Définit le gestionnaire qui peut être utilisé pour répondre aux demandes d’autorisation pour le `session`. Appeler `callback(true)` permettra la permission et `callback(false)` la rejettera. Pour dégager le gestionnaire, appelez- `setPermissionRequestHandler(null)`.

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

* `handler` fonction\<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Veuillez noter que si la demande provient d’un sous-cadre, vous devez utiliser `requestingUrl` vérifier l’origine de la demande.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` objet - Certaines propriétés ne sont disponibles que sur certains types d’autorisation.
    * `securityOrigin` String - The security origin of the `media` check.
    * `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String - La dernière URL du cadre de demande chargé
    * `isMainFrame` Boolean - Si le cadre faisant la demande est le cadre principal

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. Pour effacer le gestionnaire, appelez `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // denied
  }

  return true
})
```

#### `ses.clearHostResolverCache()`

Retourne `Promise<void>` - Se résout lorsque l’opération est terminée.

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

* `config` objet
  * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. Defaults to `tls1`.
  * `maxVersion` String (optional) - Can be `tls1.2` or `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Defaults to `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

#### `ses.getBlobData(identifier)`

* `identifier` String - UUID valide.

Retourne `Promise<Buffer>` - résout avec des données Blob.

#### `ses.downloadURL(url)`

* `url` String

Lance un téléchargement de la ressource à `url`. L’API générera un [downloaditem](download-item.md) qui peut être consulté avec l' [va-t-il](#event-will-download) événement.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` objet
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
* `options` objet (facultatif)
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

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `Session` :

#### `ses.availableSpellCheckerLanguages` _Readonly_

A `String[]` array which consists of all the known available spell checker languages.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.

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
