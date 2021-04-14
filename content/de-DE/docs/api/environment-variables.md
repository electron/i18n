# Umgebungsvariablen

> Die Konfiguration und das Verhalten des Programms kontrollieren ohne das Programm umzuschreiben.

Bestimmte Electron-Verhalten werden durch Umgebungsvariablen gesteuert, da sie früher als die Befehlszeilenflags und den Code der App initialisiert werden.

POSIX-Shellbeispiel:

```sh
Export ELECTRON_ENABLE_LOGGING=true
- Elektron
```

Beispiel für die Windows-Konsole:

```powershell
> ELECTRON_ENABLE_LOGGING=true
> Elektron eingestellt
```

## Produktionsvariablen

Die folgenden Umgebungsvariablen sind in erster Linie für die Verwendung zur Laufzeit in verpackten Electron-Anwendungen vorgesehen.

### `NODE_OPTIONS`

Electron unterstützt eine Teilmenge der [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options)von Node . Die Mehrheit wird unterstützt, mit Ausnahme derjenigen, die mit DerVerwendung von BoringSSL durch Chromium in Konflikt stehen.

Beispiel:

```sh
Export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Nicht unterstützte Optionen sind:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` sind in verpackten Apps ausdrücklich nicht zulässig, mit Ausnahme der folgenden:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

Geolocation-Unterstützung in Electron erfordert die Nutzung des -Geolocation-Webservice der Google Cloud Platform. Um diese Funktion zu aktivieren, erwerben Sie einen [Google-API-Schlüssel](https://developers.google.com/maps/documentation/geolocation/get-api-key) und platzieren Sie den folgenden Code in Ihrer Hauptprozessdatei, bevor Sie Browserfenster öffnen, die Geolocation-Anforderungen stellen:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

Standardmäßig ist es einem neu generierten Google-API-Schlüssel möglicherweise nicht gestattet, Geolocation-Anforderungen zu stellen. Um den Geolocation-Webservice für Ihr Projekt zu aktivieren, aktivieren Sie ihn über die [-API-Bibliothek](https://console.cloud.google.com/apis/library).

N.b. Sie müssen dem Projekt</a> , das dem API-Schlüssel zugeordnet ist, ein

Rechnungskonto hinzufügen, damit der Geolocation-Webservice funktioniert.</p> 



### `ELECTRON_NO_ASAR`

Deaktiviert die ASAR-Unterstützung. Diese Variable wird nur in gegabelten untergeordneten Prozessen und laichenden untergeordneten Prozessen unterstützt, die `ELECTRON_RUN_AS_NODE`festlegen.



### `ELECTRON_RUN_AS_NODE`

Startet den Prozess als normalen Node.js-Prozess.

In diesem Modus können Sie [cli-Optionen](https://nodejs.org/api/cli.html) an Nodeübergeben .js, wie Sie es tun würden, wenn Sie die normale ausführbare Node.js ausführen, mit Ausnahme der folgenden Flags:

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

Diese Flags sind deaktiviert, da Electron Beim Erstellen des `crypto` -Moduls von Node.js BoringSSL anstelle von OpenSSL verwendet und daher nicht wie vorgesehen funktioniert.



### `ELECTRON_NO_ATTACH_CONSOLE` _Windows-_

Fügen Sie sich nicht an die aktuelle Konsolensitzung an.



### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux-_

Verwenden Sie nicht die globale Menüleiste unter Linux.



### `ELECTRON_TRASH` _Linux-_

Legen Sie die Trash-Implementierung unter Linux fest. Der Standardwert ist `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`



## Entwicklungsvariablen

Die folgenden Umgebungsvariablen sind in erster Linie für Entwicklungs- und -Debugging-Zwecke gedacht.



### `ELECTRON_ENABLE_LOGGING`

Druckt die interne Protokollierung von Chrome auf der Konsole.



### `ELECTRON_LOG_ASAR_READS`

Wenn Electron aus einer ASAR-Datei liest, protokollieren Sie den Leseversatz und den Dateipfad, um das System `tmpdir` . Die resultierende Datei kann dem ASAR-Modul zur Verfügung gestellt werden, , um die Dateireihenfolge zu optimieren.



### `ELECTRON_ENABLE_STACK_DUMPING`

Druckt die Stapelablaufverfolgung auf die Konsole, wenn Electron abstürzt.

Diese Umgebungsvariable funktioniert nicht, wenn die `crashReporter` gestartet wird.



### `ELECTRON_DEFAULT_ERROR_MODE` _Windows-_

Zeigt das Windows-Absturzdialogfeld an, wenn Electron abstürzt.

Diese Umgebungsvariable funktioniert nicht, wenn die `crashReporter` gestartet wird.



### `ELECTRON_OVERRIDE_DIST_PATH`

Beim Ausführen des `electron` -Pakets teilt diese Variable `electron` Befehl mit, den angegebenen Build von Electron zu verwenden, anstatt den von `npm install`heruntergeladenen zu . Beispiel:



```sh
Export ELECTRON_OVERRIDE_DIST_PATH=/Benutzer/Benutzername/Projekte/Elektronen/Out/Testing
```




## Set By Electron

Electron legt einige Variablen in Ihrer Umgebung zur Laufzeit fest.



### `ORIGINAL_XDG_CURRENT_DESKTOP`

Diese Variable wird auf den Wert von `XDG_CURRENT_DESKTOP` festgelegt, mit dem Ihre Anwendung ursprünglich gestartet .  Electron ändert manchmal den Wert von `XDG_CURRENT_DESKTOP` , um andere Logik innerhalb von Chromium zu beeinflussen, so dass Sie stattdessen nach dieser Umgebungsvariablen suchen sollten, wenn Sie Zugriff auf den _ursprünglichen_ Wert haben möchten.
