# Anwendungspakete erstellen

Um [Probleme](https://github.com/joyent/node/issues/6960) mit langen Pfadnamen unter Windows zu entschärfen, `require` etwas zu beschleunigen und ihren Quellcode vor flüchtigen Blicken zu verstecken, können Sie Ihre App in ein [asar][asar]-Archiv mit kleinen Änderungen am Code packen.

Most users will get this feature for free, since it's supported out of the box by [`electron-packager`][electron-packager], [`electron-forge`][electron-forge], and [`electron-builder`][electron-builder]. Wenn Sie keine dieser Tools verwenden, lesen Sie weiter.

## `asar` Archive generieren

Ein [asar][asar]-Archiv ist ein simples tar-ähnliches Format, das die Dateien in einer einzelnen Datei zusammenführt. Electron kann willkürliche Dateien aus dem Archiv lesen ohne diese zu entpacken.

Schritte um Ihre App in ein `asar`-Archiv zu packen:

### 1. asar Utility installieren

```sh
$ npm install -g asar
```

### 2. Packen mit `asar pack`

```sh
$ asar pack your-app app.asar
```

## Verwenden von `asar` Archiven

In Electron gibt es zwei APIs-Sätze: Knoten-APIs von Node.js und Web- -APIs von Chromium. Beide APIs unterstützen das Lesen von Dateien aus `asar` Archiven.

### Node API

Mit speziellen Patches in Electron behandeln Node APIs (bspw. `fs.readFile` und `require`) `asar`-Archive als virtuelle Verzeichnisse und die Dateien darin als normale Dateien des Dateisystems.

Beispiel: Angenommen es existiert ein `example.asar`-Archiv unter `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Lesen einer Datei im `asar`-Archiv:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Alle Dateien unterhalb der Archivwurzel auflisten:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Ein Modul aus dem Archiv nutzen:

```javascript
require('./path/to/example.asar/dir/module.js')
```

Sie können außerdem eine Website in einem `asar`-Archiv mit `BrowserWindow` anzeigen lassen:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

In einer Webseite können Dateien in einem Archiv mit der `-Datei angefordert werden:` Protokoll. Wie die Node API werden `asar` Archive als Verzeichnisse behandelt.

Zum Beispiel, Holen einer Datei mit `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Behandeln eines `asar`-Archives als normale Datei

In einigen Fällen, wie z.B. beim Bestätigen der Prüfsumme des `asar`-Archivs, ist es notwendig den Inhalt des `asar`-Archivs als Datei zu lesen. Zu diesem Zweck können Sie das integrierte `original-fs`-Modul nutzen. Dieses stellt originale `fs` APIs ohne `asar`-Unterstützung bereit:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Sie können zudem den `process.noAsar` auf `true` setzen, um die Unterstützung für `asar` im `fs`-Modul zu deaktivieren:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Einschränkungen der Node API

Obwohl wir uns bemüht haben `asar`-Archive in der Node API soweit es geht als Verzeichnisse funktionieren zu lassen, gibt es dennoch Einschränkungen aufgrund der low-level-Natur der Node API.

### Archive sind Read-only

Die Archive können nicht modifiziert werden, sodass alle Node APIs die Dateien modifizieren können, nicht mit `asar`-Archiven funktionieren.

### Festlegen von Arbeitsverzeichnissen innerhalb von Archiven nicht möglich

Trotz dessen, dass `asar`-Archive als Verzeichnisse behandelt werden, existieren diese nicht als tatsächlichen Verzeichnis im Dateisystem. Deshalb kann das Arbeitsverzeichnis niemals auf Verzeichnisse innerhalb eines `asar`-Archives festgelegt werden. Das Übergeben als `cwd`-Option einiger APIs wird ebenfalls Fehler hervorbringen.

### Zusätzliches Entpacken einiger APIs

Die meisten `fs` APIs können eine Datei oder die Informationen einer Datei innerhalb eines `asar`-Archives lesen ohne dieses zu entpacken. Für einige APIs, die sich darauf stützen den realen Dateipfad den zugrunde liegenden Systemaufrufen zu übergeben, wird Electron jedoch die benötigte Datei in eine temporäre Datei entpacken und den Dateipfad der temporären Datei an die API weitergeben, damit die API funktioniert. Dies erhöht den Aufwand für diese APIs leicht.

APIs, die zusätzliches Entpacken benötigen sind:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - verwendet von `require` bei nativen Modulen

### Falsche Statusmeldung von `fs.stat`

Das `Stats` Object, welches von `fs.stat` zurückgegeben wird, und seine Freunde in Dateien in `asar`-Archiven, wird durch Raten generiert, da diese Dateien nicht im Dateisystem existieren. Deshalb sollten Sie dem `Stats` Objekt nicht trauen außer um die Dateigröße und Dateiart zu bestimmen.

### Ausführen von Dateien innerhalb eines `asar`-Archives

Es gibt Node APIs, die Binärdateien wie `child_process.exec`, `child_process.spawn` und `child_process.execFile` ausführen können, jedoch ist nur `execFile` innerhalb eines `asar`-Archivs unterstützt.

Das rührt daher, dass `exec` und `spawn` `command` an Stelle von `file` als Eingabe akzeptieren, und `command`s in der Shell ausgeführt werden. Es existiert kein verlässlicher Weg herauszufinden, ob ein Command eine Datei in einem asar-Archiv nutzt. Und selbst wenn, kann man nicht sicher sein, ob man den Pfad im Command ohne Nebeneffekte austauschen kann.

## Füge entpackte Dateien zu `asar` Archiven hinzu

Wie oben erwähnt, werden einige Knoten-APIs die Datei im Dateisystem entpacken, wenn aufgerufen wird. Abgesehen von den Performance-Problemen könnten verschiedene Antiviren-Scanner durch dieses Verhalten ausgelöst werden.

Als Problemumgehung können Sie verschiedene Dateien mit der Option `--unpack` entpacken. Im folgenden Beispiel werden freigegebene Bibliotheken mit nativen Node.js Modulen nicht gepackt:

```sh
$ asar pack app app.asar --unpack *.node
```

Nachdem Sie den Befehl ausgeführt haben, werden Sie feststellen, dass ein Ordner namens `app.asar.unpackt` zusammen mit der Datei `app.asar` erstellt wurde. Es enthält die entpackten Dateien und sollte zusammen mit dem `app.asar` Archiv ausgeliefert werden.

[asar]: https://github.com/electron/asar
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
