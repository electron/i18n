# session

> Verwalten Sie Browsersitzungen, Cookies, Cache, Proxy-Einstellungen usw.

Prozess: [Main](../glossary.md#main-process)

Das `session` Modul kann verwendet werden, um neue `Session` Objekte zu erstellen.

Sie können auch auf die `session` vorhandener Seiten zugreifen, indem Sie die `session` -Eigenschaft von [`WebContents`](web-contents.md)oder über das `session` -Modul verwenden.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Methoden

Das `session` Modul verfügt über die folgenden Methoden:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Objekt (optional)
  * `cache` Boolean – Gibt an, ob der Cache aktiviert werden soll.

Gibt `Session` zurück - Eine Sitzungsinstanz aus `partition` Zeichenfolge. Wenn ein vorhandener `Session` mit demselben `partition`vorhanden ist, wird er zurückgegeben. Andernfalls wird eine neue `Session` Instanz mit `options`erstellt.

Wenn `partition` mit `persist:`beginnt, verwendet die Seite eine persistente Sitzung die für alle Seiten in der App mit demselben `partition`verfügbar ist. Wenn kein `persist:` -Präfix vorhanden ist, verwendet die Seite eine In-Memory-Sitzung. Wenn die `partition` leer ist, wird die Standardsitzung der App zurückgegeben.

Um eine `Session` mit `options`zu erstellen, müssen Sie sicherstellen, dass die `Session` mit dem `partition` noch nie zuvor verwendet wurde. Es gibt keine Möglichkeit, die `options` eines vorhandenen `Session` Objekts zu ändern.

## Eigenschaften

Das `session` Modul verfügt über die folgenden Eigenschaften:

### `session.defaultSession`

Ein `Session` Objekt, das Standardsitzungsobjekt der App.

## Klasse: Sitzung

> Abrufen und Festlegen von Eigenschaften einer Sitzung.

Prozess: [Main](../glossary.md#main-process)

Sie können ein `Session` Objekt im `session` -Modul erstellen:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### Instanz Events

Die folgenden Ereignisse sind auf Instanzen von `Session`verfügbar:

#### Veranstaltung: 'will-download'

Rückgabewert:

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Emittiert, wenn Electron im Begriff ist, `item` in `webContents`herunterzuladen.

Der Aufruf `event.preventDefault()` bricht den Download ab, und `item` werden ab dem nächsten Tick des Vorgangs nicht verfügbar.

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => '
  event.preventDefault()
  require('request')(item.getURL(), (data) => '
    require('fs').writeFileSync('/somewhere

  ')
```

#### Ereignis: 'extension-loaded'

Rückgabewert:

* `event` Event
* `extension` [Erweiterungs-](structures/extension.md)

Emittiert, nachdem eine Erweiterung geladen wurde. Dies tritt auf, wenn eine Erweiterung dem "aktivierten" Erweiterungssatz hinzugefügt wird. Dazu gehören:

- Erweiterungen, die aus `Session.loadExtension`geladen werden.
- Erweiterungen, die neu geladen werden:
  * von einem Absturz.
  * wenn die Erweiterung sie angefordert hat ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Ereignis: 'Erweiterung-entladen'

Rückgabewert:

* `event` Event
* `extension` [Erweiterungs-](structures/extension.md)

Emittiert, nachdem eine Erweiterung entladen wurde. Dies tritt auf, wenn `Session.removeExtension` aufgerufen wird.

#### Veranstaltung: 'extension-ready'

Rückgabewert:

* `event` Event
* `extension` [Erweiterungs-](structures/extension.md)

Nach dem Laden einer Erweiterung wird der gesamte erforderliche Browserstatus initialisiert, um den Start der Hintergrundseite der Erweiterung zu unterstützen.

#### Veranstaltung: 'preconnect'

Rückgabewert:

* `event` Event
* `preconnectUrl` String - Die URL, die vom -Renderer zur Vorverbindung angefordert wird.
* `allowCredentials` Boolean - True, wenn der Renderer anfordert, dass die -Verbindung Anmeldeinformationen enthält (weitere Details finden Sie in der [-Spezifikation](https://w3c.github.io/resource-hints/#preconnect) .

Wird angezeigt, wenn ein Renderprozess eine Vorverbindung mit einer URL anfordert, im Allgemeinen aufgrund eines [Ressourcenhinweises](https://w3c.github.io/resource-hints/).

#### Ereignis: 'spellcheck-dictionary-initialized'

Rückgabewert:

* `event` Event
* `languageCode` String - Der Sprachcode der Wörterbuchdatei

Emittiert, wenn eine hunspell-Wörterbuchdatei erfolgreich initialisiert wurde. Dies tritt auf, nachdem die Datei heruntergeladen wurde.

#### Veranstaltung: 'spellcheck-dictionary-download-begin'

Rückgabewert:

* `event` Event
* `languageCode` String - Der Sprachcode der Wörterbuchdatei

Emittiert, wenn eine Hunspell-Wörterbuchdatei mit dem Herunterladen beginnt

#### Veranstaltung: 'spellcheck-dictionary-download-success'

Rückgabewert:

* `event` Event
* `languageCode` String - Der Sprachcode der Wörterbuchdatei

Emittiert, wenn eine Hunspell-Wörterbuchdatei erfolgreich heruntergeladen wurde

#### Ereignis: 'spellcheck-dictionary-download-failure'

Rückgabewert:

* `event` Event
* `languageCode` String - Der Sprachcode der Wörterbuchdatei

Es wird angezeigt, wenn ein Hunspell-Wörterbuchdateidownload fehlschlägt.  Für Details über den Fehler sollten Sie ein Netlog sammeln und den Download Anfrage überprüfen.

#### Ereignis: 'select-serial-port' _Experimental_

Rückgabewert:

* `event` Event
* serialPort[] `portList` [](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` String

Emittiert, wenn ein serieller Anschluss ausgewählt werden muss, wenn ein Aufruf `navigator.serial.requestPort` erfolgt. `callback` mit `portId` aufgerufen werden sollte, um ausgewählt zu werden, wird die Anforderung abbrechen, wenn eine leere Zeichenfolge an `callback` übergeben wird.  Darüber hinaus kann die Berechtigung für `navigator.serial` mithilfe [ses.setPermissionCheckHandler(handler)-](#sessetpermissioncheckhandlerhandler) mit der Berechtigung `serial` verwaltet werden.

Da es sich um ein experimentelles Feature handelt, ist es standardmäßig deaktiviert.  Um diese Funktion zu aktivieren, müssen Sie den Befehlszeilenschalter `--enable-features=ElectronSerialChooser` verwenden.  Darüber hinaus , da dies eine experimentelle Chromium-Funktion ist, müssen Sie `enableBlinkFeatures: 'Serial'` für die `webPreferences` -Eigenschaft festlegen, wenn Sie ein BrowserWindow öffnen.

```javascript
const { app, BrowserWindow } = require('electron')

lassen sie win = null
app.commandLine.appendSwitch('enable-features'), 'ElectronSerialChooser')

app.whenReady().then()=> '
  win = new BrowserWindow('
    breite: 800,
    höhe: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  ')
  win.webContents.session.on (ereignis, portList, callback) =>
    event.preventDefault()
    const selectedPort = portList.find(device) => '
      return device.vendorId === 0x2341 && device.productId === 0x0043
    ')
    wenn (!selectedPort)
      callback('')
    ,
      rückruf(result1.portId)

  

```

#### Ereignis: 'serial-port-added' _Experimental_

Rückgabewert:

* `event` Event
* `port` [SerialPort-](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emittiert, nachdem `navigator.serial.requestPort` aufgerufen wurde und `select-serial-port` ausgelöst wurde, wenn eine neue serielle Schnittstelle verfügbar wird.  Dieses Ereignis wird z. B. ausgelöst, wenn ein neues USB-Gerät angeschlossen ist.

#### Ereignis: 'serial-port-removed' _Experimental_

Rückgabewert:

* `event` Event
* `port` [SerialPort-](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emittiert, nachdem `navigator.serial.requestPort` aufgerufen wurde und `select-serial-port` ausgelöst wurde, wenn eine serielle Schnittstelle entfernt wurde.  Dieses Ereignis wird z. B. ausgelöst, wenn ein USB-Gerät getrennt ist.

### Instanz Methoden

Die folgenden Methoden sind für Instanzen von `Session`verfügbar:

#### `ses.getCacheSize()`

Gibt `Promise<Integer>` zurück - die aktuelle Cachegröße der Sitzung in Bytes.

#### `ses.clearCache()`

Gibt `Promise<void>` zurück - wird aufgelöst, wenn der Cache-Clear-Vorgang abgeschlossen ist.

Löscht den HTTP-Cache der Sitzung.

#### `ses.clearStorageData([options])`

* `options` Objekt (optional)
  * `origin` String (optional) - Folgen Sie `window.location.origin`darstellungs `scheme://host:port`.
  * `storages` String[] (optional) - Die zu löschenden Speichertypen können enthalten: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. Wenn nicht angegeben ist, löschen Sie alle Speichertypen.
  * `quotas` String[] (optional) - Die zu löschenden Kontingenttypen können enthalten: `temporary`, `persistent`, `syncable`. Wenn nicht angegeben, löschen Sie alle Kontingente.

Gibt `Promise<void>` zurück - löst auf, wenn die Speicherdaten gelöscht wurden.

#### `ses.flushStorageData()`

Schreibt alle ungeschriebenen DOMStorage-Daten auf den Datenträger.

#### `ses.setProxy(config)`

* `config` -Objekt
  * `mode` String (optional) - Der Proxy-Modus. Es sollte ein von `direct`, `auto_detect`, `pac_script`, `fixed_servers` oder `system`sein. Wenn es nicht angegeben ist, wird es automatisch basierend auf anderen angegebenen Optionen bestimmt.
    * `direct` Im Direktmodus werden alle Verbindungen direkt erstellt, ohne dass ein Proxy beteiligt ist.
    * `auto_detect` Im auto_detect Modus wird die Proxykonfiguration durch ein PAC-Skript bestimmt, das bei http://wpad/wpad.dat heruntergeladen werden kann.
    * `pac_script` Im pac_script Modus wird die Proxykonfiguration durch ein PAC-Skript bestimmt, das von der im `pacScript`angegebenen URL abgerufen wird. Dies ist der Standardmodus , wenn `pacScript` angegeben ist.
    * `fixed_servers` Im fixed_servers Modus wird die Proxykonfiguration in `proxyRules`angegeben. Dies ist der Standardmodus, wenn `proxyRules` angegeben ist.
    * `system` Im Systemmodus wird die Proxykonfiguration vom Betriebssystem übernommen. Beachten Sie, dass sich der Systemmodus von der Einstellung ohne Proxykonfiguration unterscheidet. Im letzteren Fall greift Electron auf die Systemeinstellungen nur zurück, wenn keine Befehlszeilenoptionen die Proxykonfiguration beeinflussen.
  * `pacScript` String (optional) - Die URL, die der PAC-Datei zugeordnet ist.
  * `proxyRules` String (optional) - Regeln, die angeben, welche Proxys verwendet werden sollen.
  * `proxyBypassRules` String (optional) - Regeln, die angeben, welche URLs die Proxyeinstellungen umgehen sollen.

Gibt `Promise<void>` zurück : Löst auf, wenn der Proxyeinstellungsprozess abgeschlossen ist.

Legt die Proxyeinstellungen fest.

Wenn `mode` nicht angegeben ist, werden `pacScript` und `proxyRules` zusammen bereitgestellt, die `proxyRules` Option wird ignoriert, und `pacScript` Konfiguration wird angewendet.

Möglicherweise müssen Sie `ses.closeAllConnections` , um derzeit in Flugverbindungen zu schließen, um zu verhindern, dass gepoolte Sockets mit vorherigem Proxy von zukünftigen Anforderungen wiederverwendet werden.

Die `proxyRules` muss sich an die nachstehenden Regeln halten:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

Ein Beispiel:

* `http=foopy:80;ftp=foopy2` : Verwenden Sie HTTP-Proxy- `foopy:80` für `http://` URLs und HTTP-Proxy- `foopy2:80` für `ftp://` URLs.
* `foopy:80` - Verwenden Sie HTTP-Proxy- `foopy:80` für alle URLs.
* `foopy:80,bar,direct://` : Verwenden Sie HTTP-Proxy- `foopy:80` für alle URLs, bei der auf `bar` , wenn `foopy:80` nicht verfügbar ist, und danach ohne Proxy.
* `socks4://foopy` - Verwenden Sie SOCKS v4-Proxy- `foopy:1080` für alle URLs.
* `http=foopy,socks5://bar.com` - Verwenden Sie HTTP-Proxy- `foopy` für HTTP-URLs, und führen Sie ein Failover auf die SOCKS5-Proxy- `bar.com` , wenn `foopy` nicht verfügbar ist.
* `http=foopy,direct://` : Verwenden Sie HTTP-Proxy- `foopy` für HTTP-URLs, und verwenden Sie keinen -Proxy, wenn `foopy` nicht verfügbar ist.
* `http=foopy;socks=foopy2` : Verwenden Sie HTTP-Proxy- `foopy` für HTTP-URLs und `socks4://foopy2` für alle anderen URLs.

Die `proxyBypassRules` ist eine durch Kommas getrennte Liste von Regeln, die unten beschrieben werden:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   Entspricht allen Hostnamen, die dem Muster HOSTNAME_PATTERN entsprechen.

   Beispiele: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

* `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Entspricht einem bestimmten Domänensuffix.

   Beispiele: ".google.com", ".com", "http://.google.com"

* `[ SCHEMA "://" ] IP_LITERAL [ ":" PORT ]`

   Entspricht URLs, bei denen es sich um IP-Adressliterale handelt.

   Beispiele: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Entspricht jeder URL, die sich um ein IP-Literal handelt, das zwischen dem angegebenen Bereich liegt. DER IP-Bereich wird mithilfe der CIDR-Notation angegeben.

   Beispiele: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Entspricht lokalen Adressen. Die Bedeutung von `<local>` ist, ob der Gastgeber mit einem von: "127.0.0.1", "::1", "localhost" übereinstimmt.

#### `ses.resolveProxy(url)`

* `url` URL

Gibt `Promise<String>` zurück - Wird mit den Proxyinformationen für `url`aufgelöst.

#### `ses.forceReloadProxyConfig()`

Gibt `Promise<void>` zurück - Löst auf, wenn alle internen Zustände des Proxydienstes zurückgesetzt werden und die neueste Proxykonfiguration erneut angewendet wird, wenn sie bereits verfügbar ist. Das pac-Skript wird erneut von `pacScript` abgerufen, wenn der Proxymodus `pac_script`ist.

#### `ses.setDownloadPath(path)`

* `path` String - Der Download-Speicherort.

Legt das Download-Speicherverzeichnis fest. Standardmäßig ist das Download-Verzeichnis der `Downloads` unter dem jeweiligen App-Ordner.

#### `ses.enableNetworkEmulation(options)`

* `options` -Objekt
  * `offline` Boolean (optional) - Ob Netzwerkausfall emuliert werden soll. Standardmäßig false.
  * `latency` Double (optional) - RTT in ms. Standardmäßig 0, wodurch Latenzdrosselung deaktiviert wird.
  * `downloadThroughput` Double (optional) - Download-Rate in Bps. Standardmäßig 0 , die downloaddrosseln deaktiviert.
  * `uploadThroughput` Double (optional) - Upload-Rate in Bps. Standardmäßig 0 , die die Upload-Einschränkung deaktiviert.

Emuliert das Netzwerk mit der angegebenen Konfiguration für die `session`.

```javascript
Emulieren einer GPRS-Verbindung mit 50 kbps Durchsatz und 500 ms Latenz.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

- Um einen Netzwerkausfall zu emulieren.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.preconnect(options)`

* `options` -Objekt
  * `url` String - URL für preconnect. Nur der Ursprung ist für das Öffnen des Sockels relevant.
  * `numSockets` Anzahl (optional) - Anzahl der Steckdosen, die vorhergestellt werden sollen. Muss zwischen 1 und 6 liegen. Der Standardwert ist 1.

Verbindet die angegebene Anzahl von Sockets vor an einen Ursprung.

#### `ses.closeAllConnections()`

Gibt `Promise<void>` zurück - Wird aufgelöst, wenn alle Verbindungen geschlossen sind.

**Hinweis:** Es wird alle Anfragen, die sich derzeit im Flug befinden, beenden / fehlschlagen.

#### `ses.disableNetworkEmulation()`

Deaktiviert alle Netzwerkemulationen, die bereits für die `session`aktiv sind. Setzt zurück, um die ursprüngliche Netzwerkkonfiguration .

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Funktion | Null
  * `request` -Objekt
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Zertifikat](structures/certificate.md)
    * `verificationResult` String - Verifizierungsergebnis aus Chrom.
    * `errorCode` Ganzzahl - Fehlercode.
  * `callback` Function
    * `verificationResult` Ganzzahl - Wert kann einer der Zertifikatsfehlercodes sein, die von [hier](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) werden. Neben den Zertifikatsfehlercodes können die folgenden Sondercodes verwendet werden.
      * `0` - Gibt den Erfolg an und deaktiviert die Zertifikattransparenzüberprüfung.
      * `-2` - Gibt einen Fehler an.
      * `-3` - Verwendet das Verifizierungsergebnis aus Chrom.

Legt das Zertifikat sifzfest, proc für `session`, wird der `proc` mit `proc(request, callback)` aufgerufen, wenn ein Serverzertifikat Überprüfung angefordert wird. Wenn `callback(0)` das Zertifikat akzeptiert, lehnt aufrufendes `callback(-2)` es ab.

Wenn `setCertificateVerifyProc(null)` aufzurufen, wird das Standardzertifikat zurückgesetzt, proc zu überprüfen.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) =>
  const { hostname } = request
  if (hostname === 'github.com') '
    callback(0)
  ' else '
    callback(-2)


```

> **HINWEIS:** Das Ergebnis dieses Verfahrens wird vom Netzwerkdienst zwischengespeichert.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Funktion | Null
  * `webContents` [WebContents](web-contents.md) - WebContents, das die Berechtigung anfordert.  Bitte beachten Sie, dass Sie, wenn die Anfrage von einem Subframe stammt, `requestingUrl` verwenden sollten, um den Ursprung der Anfrage zu überprüfen.
  * `permission` String - Der Typ der angeforderten Berechtigung.
    * `clipboard-read` - Anfordern Sie den Zugriff zum Lesen aus der Zwischenablage.
    * `media` - Anfordern sie den Zugriff auf Mediengeräte wie Kamera, Mikrofon und Lautsprecher.
    * `aufstellen-Eingreif`-Zugang dem Bildschirm antragen.
    * `mediaKeySystem` - Fordern Sie Zugriff auf DRM-geschützte Inhalte an.
    * `geolocation` - Anfordern sie den Zugriff auf den aktuellen Standort des Benutzers.
    * `notifications` - Anfordern der Benachrichtigungserstellung und der Möglichkeit, sie in der Taskleiste des Benutzers anzuzeigen.
    * `midi` - MIDI-Zugriff in der `webmidi` -API anfordern.
    * `midiSysex` - Fordern Sie die Verwendung von System-Exklusivnachrichten in der `webmidi` -API an.
    * `pointerLock` - Anforderung, Mausbewegungen direkt als Eingabemethode zu interpretieren. Klicken Sie hier [](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) um mehr zu erfahren.
    * `fullscreen` - Fordern Sie an, dass die App in den Vollbildmodus wechselt.
    * `openExternal` - Anforderung zum Öffnen von Links in externen Anwendungen.
  * `callback` Function
    * `permissionGranted` boolesch - Erlauben oder verweigern Sie die Berechtigung.
  * `details` -Objekt - Einige Eigenschaften sind nur für bestimmte Berechtigungstypen verfügbar.
    * `externalURL` String (optional) - Die URL der `openExternal` -Anforderung.
    * `mediaTypes` String[] (optional) - Die angeforderten Medienzugriffstypen, Elemente können `video` oder `audio`
    * `requestingUrl` String - Die letzte URL, die der anfordernde Frame geladen hat
    * `isMainFrame` Boolean - Ob der Rahmen, der die Anforderung stellt, der Hauptrahmen ist

Legt den Handler fest, der verwendet werden kann, um auf Berechtigungsanforderungen für die `session`zu antworten. Wenn `callback(true)` aufzurufen, wird die Berechtigung zugelassen, und `callback(false)` lehnt sie ab. Um den Handler zu löschen, rufen Sie `setPermissionRequestHandler(null)`auf.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => '
  if (webContents.getURL() === 'some-host' && permission === 'notifications') '
    rückruf(false) / /verweigert.
  -

  Rückruf(true)

```

#### `ses.setPermissionCheckHandler(Handler)`

* `handler` -Funktion<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents überprüfen die Berechtigung.  Bitte beachten Sie, dass Sie, wenn die Anfrage von einem Subframe stammt, `requestingUrl` verwenden sollten, um den Ursprung der Anfrage zu überprüfen.
  * `permission` String - Typ der Berechtigungsprüfung.  Gültige Werte sind `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`oder `serial`.
  * `requestingOrigin` String - Die Ursprungs-URL der Berechtigungsprüfung
  * `details` -Objekt - Einige Eigenschaften sind nur für bestimmte Berechtigungstypen verfügbar.
    * `securityOrigin` String - Der Sicherheitsursprung der `media` -Prüfung.
    * `mediaType` String - Der Typ des angeforderten Medienzugriffs kann `video`, `audio` oder `unknown`
    * `requestingUrl` String - Die letzte URL, die der anfordernde Frame geladen hat
    * `isMainFrame` Boolean - Ob der Rahmen, der die Anforderung stellt, der Hauptrahmen ist

Legt den Handler fest, der verwendet werden kann, um auf Berechtigungsprüfungen für die `session`zu reagieren. Wenn `true` zurückgegeben wird, wird die Berechtigung zugelassen, und `false` lehnt sie ab. Um den Handler zu löschen, rufen Sie `setPermissionCheckHandler(null)`auf.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => '
  if (webContents.getURL() === 'some-host' && permission === 'Notifications') '
    geben false * verweigert
  '

  geben true
zurück
```

#### `ses.clearHostResolverCache()`

Gibt `Promise<void>` zurück - Wird aufgelöst, wenn der Vorgang abgeschlossen ist.

Löscht den Host-Resolver-Cache.

#### `ses.allowNTLMCredentialsForDomains(Domänen)`

* `domains` String - Eine durch Kommas getrennte Liste von Servern, für die integrierte Authentifizierung aktiviert ist.

Legt dynamisch fest, ob immer Anmeldeinformationen für HTTP NTLM oder -Authentifizierung aushandeln werden sollen.

```javascript
const { session } = require('electron')
/ betrachten Sie jede URL, die mit 'example.com', 'foobar.com', 'baz'
/ für die integrierte Authentifizierung endet.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

/ alle URLs für die integrierte Authentifizierung berücksichtigen.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (optional)

Überschreibt die `userAgent` und `acceptLanguages` für diese Sitzung.

Die `acceptLanguages` muss eine durch Kommas getrennte geordnete Liste von Sprachcodes, zum Beispiel `"en-US,fr,de,ko,zh-CN,ja"` .

Dies wirkt sich nicht auf vorhandene `WebContents`aus, und jeder `WebContents` kann `webContents.setUserAgent` verwenden, um den sitzungsweiten Benutzer-Agent zu überschreiben.

#### `ses.isPersistent()`

Gibt `Boolean` zurück : Gibt an, ob es sich bei dieser Sitzung um eine persistente Sitzung handelt. Die Standardsitzung `webContents` einer `BrowserWindow` ist persistent. Beim Erstellen einer Sitzung die von einer Partition aus erstellt wird, ist die Sitzung mit dem `persist:` persistent, während andere temporär sind.

#### `ses.getUserAgent()`

Gibt `String` zurück : Der Benutzer-Agent für diese Sitzung.

#### `ses.setSSLConfig(config)`

* `config` -Objekt
  * `minVersion` String (optional) - Kann `tls1`, `tls1.1`, `tls1.2` oder `tls1.3`sein. Die minimalen SSL-Version, die beim Herstellen einer Verbindung mit Remoteservern zulässig ist. Standardmäßig `tls1`.
  * `maxVersion` String (optional) - Kann `tls1.2` oder `tls1.3`werden. Die maximale SSL-Version beim Herstellen einer Verbindung mit Remoteservern zulässig sein. Standardmäßig `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - Liste der Verschlüsselungssammlungen, die explizit daran gehindert werden sollten, zusätzlich zu den , die durch die integrierte Netzrichtlinie deaktiviert werden. Unterstützte Literalformulare: 0xAABB, bei dem AA `cipher_suite[0]` und BB `cipher_suite[1]`ist, wie in RFC 2246, Abschnitt 7.4.1.2 definiert. Unbekannte, aber analysebare Verschlüsselungssammlungen in diesem Formular geben keinen Fehler zurück. Ex: Um TLS_RSA_WITH_RC4_128_MD5 zu deaktivieren, geben Sie 0x0004 an, während Sie TLS_ECDH_ECDSA_WITH_RC4_128_SHA deaktivieren, 0xC002 angeben. Beachten Sie, dass TLSv1.3-Verschlüsselungen mit diesem Mechanismus nicht deaktiviert werden können.

Legt die SSL-Konfiguration für die Sitzung fest. Alle nachfolgenden Netzwerkanforderungen verwenden die neue Konfiguration. Vorhandene Netzwerkverbindungen (z. B. WebSocket Verbindungen) werden nicht beendet, aber alte Sockets im Pool werden nicht für neue Verbindungen wiederverwendet.

#### `ses.getBlobData(Bezeichner)`

* `identifier` String - Gültige UUID.

Gibt `Promise<Buffer>` zurück - wird mit Blobdaten aufgelöst.

#### `ses.downloadURL(url)`

* `url` String

Initiiert einen Download der Ressource bei `url`. Die API generiert eine [DownloadItem-](download-item.md) , auf die mit dem [](#event-will-download) -Ereignis heruntergeladen werden kann.

**Hinweis:** Dies führt keine Sicherheitsüberprüfungen durch, die sich auf den Ursprung einer Seite beziehen, im Gegensatz zu [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` -Objekt
  * `path` String - Absoluter Pfad des Downloads.
  * `urlChain` String[] - Vollständige URL-Kette für den Download.
  * `mimeType` String (optional)
  * `offset` Integer - Startbereich für den Download.
  * `length` Integer - Gesamtlänge des Downloads.
  * `lastModified` String (optional) - Last-Modified-Headerwert.
  * `eTag` String (optional) - ETag-Headerwert.
  * `startTime` Double (optional) - Zeit, zu der der Download in Anzahl von Sekunden seit der UNIX-Epoche gestartet wurde.

Ermöglicht die Wiederaufnahme `cancelled` oder `interrupted` Von Downloads aus früheren `Session`. Die API generiert eine [DownloadItem-](download-item.md) , auf die mit dem [](#event-will-download) -Ereignis heruntergeladen werden kann. Dem [DownloadItem-](download-item.md) sind keine `WebContents` zugeordnet, und der Anfangsstatus `interrupted`wird. Der Download wird erst gestartet, wenn die `resume` API auf der [DownloadItem](download-item.md)aufgerufen wird.

#### `ses.clearAuthCache()`

Gibt `Promise<void>` zurück : Löst auf, wenn der HTTP-Authentifizierungscache der Sitzung gelöscht wurde.

#### `ses.setPreloads(Vorspannungen)`

* `preloads` String[] - Ein Array mit absolutem Pfad zum Vorladen von Skripts

Fügt Skripts hinzu, die auf ALLE Webinhalte ausgeführt werden, die dieser Sitzung unmittelbar vor der normalen `preload` Skripts verknüpft sind.

#### `ses.getPreloads()`

Gibt `String[]` einem Array von Pfaden zurück, um Skripts vorzuladen, die registriert wurden.

#### `ses.setSpellCheckerEnabled(aktivieren)`

* `enable` Boolean

Legt fest, ob die integrierte Rechtschreibprüfung aktiviert werden soll.

#### `ses.isSpellCheckerEnabled()`

Gibt `Boolean` zurück - Gibt an, ob die integrierte Rechtschreibprüfung aktiviert ist.

#### `ses.setSpellCheckerLanguages(Sprachen)`

* `languages` String[] - Ein Array von Sprachcodes, für die die Rechtschreibprüfung aktiviert werden kann.

Die integrierte Rechtschreibprüfung erkennt nicht automatisch, in welche Sprache ein Benutzer eingibt.  Damit die Rechtschreibprüfung ihre Wörter korrekt überprüfen kann, müssen Sie diese API mit einer Reihe von Sprachcodes aufrufen.  Sie können die Liste der unterstützten Sprachcodes mit der `ses.availableSpellCheckerLanguages` -Eigenschaft abrufen.

**Hinweis:** unter macOS wird die OS-Rechtschreibprüfung verwendet und erkennt Ihre Sprache automatisch.  Diese API ist ein No-Op unter macOS.

#### `ses.getSpellCheckerLanguages()`

Gibt `String[]` zurück - Ein Array von Sprachcodes, für die die Rechtschreibprüfung aktiviert ist.  Wenn diese Liste leer ist, wird die Rechtschreibprüfung auf die Verwendung von `en-US`zurückgesetzt.  Standardmäßig beim Start, wenn es sich bei dieser Einstellung um eine leere Liste handelt, versucht Electron, diese Einstellung mit dem aktuellen OS-Gebietsschema aufzufüllen.  Diese Einstellung wird bei Neustarts beibehalten.

**Hinweis:** unter macOS wird die OS-Rechtschreibprüfung verwendet und verfügt über eine eigene Liste von Sprachen.  Diese API ist ein No-Op unter macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Eine Basis-URL für Electron zum Herunterladen von Hunspell-Wörterbüchern.

Standardmäßig lädt Electron hunspell Wörterbücher aus dem Chromium CDN herunter.  Wenn Sie dieses Verhalten überschreiben möchten, können Sie diese API verwenden, um den Wörterbuchdownloader auf Ihre eigene gehostete Version der Wörterbücher zu verweisen.  Wir veröffentlichen eine `hunspell_dictionaries.zip` Datei mit jeder Version, die die Dateien enthält, die Sie hier hosten müssen, muss der Dateiserver **Groß-/Kleinschreibung unsensibel sein,** Sie jede Datei zweimal hochladen müssen, einmal mit dem Fall, dass sie in der ZIP-Datei hat und einmal mit dem Dateinamen wie alle Kleinbuchstaben.

Wenn die in `hunspell_dictionaries.zip` vorhandenen Dateien unter `https://example.com/dictionaries/language-code.bdic` verfügbar sind, sollten Sie diese api mit `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`aufrufen.  Bitte beachten Sie den nachgestellten Schrägstrich.  Die URL zu den Wörterbüchern wird als `${url}${filename}`gebildet.

**Hinweis:** unter macOS wird die OS-Rechtschreibprüfung verwendet und deshalb laden wir keine Wörterbuchdateien herunter.  Diese API ist ein No-Op unter macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Gibt `Promise<String[]>` zurück - Ein Array aller Wörter im Benutzerwörterbuch der App. Löst auf, wenn das vollständige Wörterbuch vom Datenträger geladen wird.

#### `ses.addWordToSpellCheckerDictionary(Wort)`

* `word` - Das Wort, das Sie dem Wörterbuch hinzufügen möchten

Gibt `Boolean` zurück : Gibt an, ob das Wort erfolgreich in das Benutzerwörterbuch geschrieben wurde. Diese API funktioniert nicht auf nicht persistenten (in-Memory)-Sitzungen.

**Hinweis:** unter macOS und Windows 10 wird dieses Wort auch in das OS-Benutzerwörterbuch geschrieben

#### `ses.removeWordFromSpellCheckerDictionary(Wort)`

* `word` String - Das Wort, das Sie aus dem Wörterbuch entfernen möchten

Gibt `Boolean` zurück : Gibt an, ob das Wort erfolgreich aus dem Benutzerwörterbuch entfernt wurde. Diese API funktioniert nicht auf nicht persistenten (in-Memory)-Sitzungen.

**Hinweis:** unter macOS und Windows 10 wird dieses Wort auch aus dem BENUTZERwörterbuch des Betriebssystems entfernt

#### `ses.loadExtension(path[, options])`

* `path` String - Pfad zu einem Verzeichnis, das eine entpackte Chrome-Erweiterung enthält
* `options` Objekt (optional)
  * `allowFileAccess` Boolean - Gibt an, ob die Erweiterung lokale Dateien über `file://` Protokoll lesen und Inhaltsskripts in `file://` Seiten einfügen kann. Dies ist z.B. zum Laden devtools-Erweiterungen auf `file://` URLs erforderlich. Der Standardwert ist false.

Gibt `Promise<Extension>` zurück - wird aufgelöst, wenn die Erweiterung geladen wird.

Diese Methode löst eine Ausnahme aus, wenn die Erweiterung nicht geladen werden konnte. Wenn gibt es Warnungen bei der Installation der Erweiterung (z. B. wenn die Erweiterung eine API anfordert, die Electron nicht unterstützt), werden sie an der Konsole protokolliert.

Beachten Sie, dass Electron nicht die gesamte Palette der Chrome-Erweiterungs-APIs unterstützt. Weitere Informationen zu den unterstützten Informationen finden Sie unter [-unterstützungs-Erweiterungs-APIs ](extensions.md#supported-extensions-apis) .

Beachten Sie, dass in früheren Versionen von Electron, Erweiterungen, die geladen wurden, für zukünftige Ausführungen der Anwendung gespeichert werden. Dies ist nicht mehr der Fall: `loadExtension` müssen bei jedem Start Ihrer App aufgerufen werden, wenn Sie möchten, dass die Erweiterung geladen wird.

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => '
  warte session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    / allowFileAccess ist erforderlich, um die devtools-Erweiterung auf file:// URLs zu laden.
    { allowFileAccess: true }
  )
  / Beachten Sie, dass Sie zur Verwendung der Erweiterung React DevTools
  müssen , eine Kopie der Erweiterung herunterzuladen und zu entpacken.
})
```

Diese API unterstützt das Laden von gepackten (.crx) Erweiterungen nicht.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Das Laden von Erweiterungen in Speichersitzungen (nicht persistent) wird nicht unterstützt und löst einen Fehler aus.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID der zu entfernenden Erweiterung

Entlädt eine Erweiterung.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID der Erweiterung, die Abfrage ist

Rücksendungen `Extension` | `null` - Die geladene Erweiterung mit der angegebenen ID.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

#### `ses.getAllExtensions()`

Gibt `Extension[]` zurück - Eine Liste aller geladenen Erweiterungen.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `Session`verfügbar:

#### `ses.availableSpellCheckerLanguages` _Readonly_

Ein `String[]` Array, das aus allen bekannten verfügbaren Rechtschreibprüfungssprachen besteht.  Das Bereitstellen einer Sprache Code für die `setSpellCheckerLanguages` -API, die sich nicht in diesem Array befindet, führt zu einem Fehler.

#### `ses.spellCheckerAktiviert`

Ein `Boolean` , der angibt, ob die integrierte Rechtschreibprüfung aktiviert ist.

#### `ses.cookies` _Readonly_

Ein [`Cookies`](cookies.md) Objekt für diese Sitzung.

#### `ses.serviceWorkers` _Readonly_

Ein [`ServiceWorkers`](service-workers.md) Objekt für diese Sitzung.

#### `ses.webRequest` _Readonly_

Ein [`WebRequest`](web-request.md) Objekt für diese Sitzung.

#### `ses.protocol` _Readonly_

Ein [`Protocol`](protocol.md) Objekt für diese Sitzung.

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then()=> '
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => '
    const url = request.url.substr(7)
    callback(' path: path.normalize('${__dirname}/${url}') ')
  ')) '
    console.error('Failed to register protocol')
  '
')
```

#### `ses.netLog` _Readonly_

Ein [`NetLog`](net-log.md) Objekt für diese Sitzung.

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => '
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  / Nach einigen Netzwerkereignissen
  const-Pfad = await netLog.stopLogging()
.log

```
