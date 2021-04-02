# Supported Command Line Switches

> Befehlszeilenoptionen unterstützt von Electron.

[app.commandLine.appendSwitch][append-switch] kann benutzt werden um die Befehlszeilenoptionen zu dem Hauptskript der App, bevor das [ready][ready]-Ereignis des [app][app]-Moduls eintritt, hinzuzufügen:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then() =

  >
```

## Elektronen-CLI-Flags

### --auth-server-whitelist=`url`

Eine durch Kommas getrennte Liste von Servern, für die die integrierte Authentifizierung aktiviert ist.

Ein Beispiel:

```sh
--auth-server-whitelist='*beispiel.com, *foobar.com, *baz'
```

dann werden alle `url` , die mit `example.com`, `foobar.com`, `baz` enden, als für die integrierte Authentifizierung betrachtet. Ohne `*` Präfix muss die URL genau übereinstimmen.

### --auth-negotiate-delegate-whitelist=`url`

Eine durch Kommas getrennte Liste von Servern, für die eine Delegierung von Benutzeranmeldeinformationen erforderlich ist. Ohne `*` Präfix muss die URL genau übereinstimmen.

### --disable-ntlm-v2

Deaktiviert NTLM v2 für posix-Plattformen, an anderer Stelle kein Effekt.

### --disable-http-cache

Deaktiviert den Datenträgercache für HTTP-Anforderungen.

### --deaktivieren-http2

Deaktivieren Sie die Protokolle HTTP/2 und SPDY/3.1.

### --disable-renderer-backgrounding

Verhindert, dass Chromium die Priorität des Renderers unsichtbarer Seiten -Prozessen verringert.

Dieses Flag ist global für alle Renderer-Prozesse, wenn Sie nur Drosselung in einem Fenster deaktivieren möchten, können Sie den Hack von [die Wiedergabe von stillen Audio-][play-silent-audio].

### --disk-cache-size=`size`

Erzwingt den maximalen Speicherplatz, der vom Datenträgercache in Bytes verwendet werden soll.

### --enable-api-filtering-logging

Aktiviert die Aufruferlistenprotokollierung für die folgenden APIs (Filterereignisse):

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Druckt die Anmeldung von Chromium bei der Konsole.

Dieser Schalter kann nicht in `app.commandLine.appendSwitch` verwendet werden, da er früher analysiert wird, als die App des Benutzers geladen ist, Aber Sie können die `ELECTRON_ENABLE_LOGGING` Umgebungsvariable festlegen, um den gleichen Effekt zu erzielen.

### --host-rules=`rules`

Eine durch Kommas getrennte Liste von `rules` , die steuern, wie Hostnamen zugeordnet werden.

Ein Beispiel:

* `MAP * 127.0.0.1` Erzwingt die Zuordnung aller Hostnamen zu 127.0.0.1
* `MAP *.google.com proxy` Erzwingt, dass alle google.com Subdomains aufgelöst werden, um "Proxy" zu .
* `MAP test.com [::1]:77` Erzwingt "test.com", um in IPv6-Loopback zu lösen. Wird auch den Port der resultierenden Socketadresse auf 77 zwingen.
* `MAP * baz, EXCLUDE www.google.com` ordnet alles "baz" neu zu, mit Ausnahme "www.google.com".

Diese Zuordnungen gelten für den Endpunkthost in einer Netzanforderung (der TCP-Verbindungs- und host-Resolver in einer direkten Verbindung und der `CONNECT` in einer HTTP-Proxy- -Verbindung und der Endpunkthost in einer `SOCKS` Proxyverbindung).

### --host-resolver-rules=`rules`

Wie `--host-rules` , aber diese `rules` nur für den Host-Resolver gelten.

### --ignore-certificate-errors

Ignoriert zertifikatsbezogene Fehler.

### --ignore-connections-limit=`domains`

Ignorieren Sie das Verbindungslimit für `domains` Liste, die durch `,`getrennt ist.

### --js-flags=`flags`

Gibt die Angaben der Flags an das Modul Node.js an. Es muss beim Starten Electron übergeben werden, wenn Sie die `flags` im Hauptprozess aktivieren möchten.

```sh
$ Elektron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Eine Liste der verfügbaren Flags finden Sie in der Dokumentation [Node.js][node-cli] oder `node --help` in Ihrem Terminal. Führen Sie außerdem `node --v8-options` aus, um eine Liste von Flags anzuzeigen, die sich speziell auf das V8-JavaScript-Modul von Node.js beziehen.

### --lang

Legen Sie ein benutzerdefiniertes Gebietsschema fest.

### --log-net-log=`path`

Ermöglicht das Speichern von Netzprotokollereignissen und schreibt sie in `path`.

### --no-proxy-server

Verwenden Sie keinen Proxyserver und stellen Sie immer direkte Verbindungen her. Überschreibt alle anderen Proxyserverflags, die übergeben werden.

### --no-sandbox

Deaktiviert die Chromium-Sandbox, die jetzt standardmäßig aktiviert ist. Sollte nur zum Testen verwendet werden.

### --proxy-bypass-list=`hosts`

Weist Electron an, den Proxyserver für die angegebene semikolongetrennte Liste der Hosts zu umgehen. Dieses Flag hat nur dann einen Effekt, wenn es zusammen mit `--proxy-server`verwendet wird.

Ein Beispiel:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Verwendet den Proxyserver für alle Hosts mit Ausnahme lokaler Adressen (`localhost`, `127.0.0.1` usw.), `google.com` Subdomänen, Hosts, die das Suffix enthalten, `foo.com` und alles auf `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Verwendet das PAC-Skript an der angegebenen `url`.

### --proxy-server=`address:port`

Verwenden Sie einen angegebenen Proxyserver, der die Systemeinstellung überschreibt. Dieser Switch wirkt sich nur auf Anforderungen mit HTTP-Protokoll aus, einschließlich HTTPS- und WebSocket- -Anforderungen. Bemerkenswert ist auch, dass nicht alle Proxyserver HTTPS- und WebSocket-Anforderungen unterstützen. Die Proxy-URL unterstützt keine Benutzername und Kennwort Authentifizierung [nach Chromium-Problem](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Ermöglicht Remote-Debugging über HTTP auf dem angegebenen `port`.

### --v=`log_level`

Gibt die standardmäßige maximale aktive V-Protokollierungsebene an. 0 ist die Standardeinstellung. Normalerweise werden positive Werte für V-Logging-Ebenen verwendet.

Dieser Schalter funktioniert nur, wenn `--enable-logging` ebenfalls übergeben wird.

### --vmodule=`pattern`

Gibt den maximalen V-Protokollierungsebenen pro Modul an, um den von `--v`angegebenen Wert zu überschreiben. z.B. `my_module=2,foo*=3` würde die Protokollierungsebene für den gesamten Code in Quelldateien `my_module.*` und `foo*.*`ändern.

Jedes Muster, das einen Schrägstrich nach vorne oder rückwärts enthält, wird anhand des gesamten Pfadnamens und nicht nur des Moduls getestet. z.B. `*/foo/bar/*=2` würde die Protokollierungsebene für den gesamten Code in den Quelldateien unter einem `foo/bar` -Verzeichnis ändern.

Dieser Schalter funktioniert nur, wenn `--enable-logging` ebenfalls übergeben wird.

### --force_high_performance_gpu

Erzwingen Sie die Verwendung diskreter GPU, wenn mehrere GPUs verfügbar sind.

### --force_low_power_gpu

Erzwingen Sie die Verwendung integrierter GPU, wenn mehrere GPUs verfügbar sind.

## Knoten.js Flags

Electron unterstützt einige der [CLI-Flags, die von Node.js unterstützt][node-cli] .

**Hinweis:** Das Übergeben nicht unterstützter Befehlszeilenwechsel an Electron, wenn es nicht in `ELECTRON_RUN_AS_NODE` läuft, hat keine Auswirkungen.

### --inspect-brk[=[host:]port]

Aktivieren Sie den Inspektor auf host:port und brechen Sie am Anfang des Benutzerskripts. Standardhost:port ist 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Legen Sie die `host:port` fest, die verwendet werden soll, wenn der Inspektor aktiviert ist. Nützlich beim Aktivieren des Inspektors durch Senden des SIGUSR1-Signals. Der Standardhost ist `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Aktivieren Sie den Inspektor auf `host:port`. Der Standardwert ist `127.0.0.1:9229`.

Die V8-Inspektorintegration ermöglicht Tools wie Chrome DevTools und IDEs das Debuggen und Profilieren von Electron-Instances. Die Tools werden über einen TCP-Port an Electron-Instanzen angefügt und kommunizieren über das [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

Weitere Informationen finden Sie in der [Debugging the Main Process][debugging-main-process] -Anleitung.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http

Geben Sie Möglichkeiten für die Url-Belichtung des Inspektor-Websockets an.

Standardmäßig ist die Websocket-URL des Inspektors in stderr und unter /json/list endpoint auf http://host:port/json/list verfügbar.

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
