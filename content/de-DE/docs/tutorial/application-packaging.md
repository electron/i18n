# Anwendungspakete erstellen

Um [Probleme](https://github.com/joyent/node/issues/6960) mit langen Pfadnamen unter Windows zu entschärfen, `require` etwas zu beschleunigen und ihren Quellcode vor flüchtigen Blicken zu verstecken, können Sie Ihre App in ein [asar](https://github.com/electron/asar)-Archiv mit kleinen Änderungen am Code packen.

## `asar`-Archiv generieren

Ein [asar](https://github.com/electron/asar)-Archiv ist ein simples tar-ähnliches Format, das die Dateien in einer einzelnen Datei zusammenführt. Electron kann willkürliche Dateien aus dem Archiv lesen ohne diese zu entpacken.

Schritte um Ihre App in ein `asar`-Archiv zu packen:

### 1. Installieren Sie die "asar Utility"

```sh
$ npm install -g asar
```

### 2. Packen mit `asar pack`

```sh
$ asar pack your-app app.asar
```

## Verwenden von `asar` Archiven

In Electron existieren zwei Arten von APIs: Node APIs bereitgestellt von Node.js und Web APIs bereitgestellt von Chromium. Beide APIs unterstützen das Lesen von Dateien aus `asar`-Archiven.

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
require('/path/to/example.asar/dir/module.js')
```

Sie können außerdem eine Website in einem `asar`-Archiv mit `BrowserWindow` anzeigen lassen:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Auf einer Website können Dateien aus einem Archiv mit dem `file:`-Protokoll angefragt werden. Ähnlich wie bei der Node API werden `asar`-Archive als reguläre Verzeichnisse behandelt.

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

There are Node APIs that can execute binaries like `child_process.exec`, `child_process.spawn` and `child_process.execFile`, but only `execFile` is supported to execute binaries inside `asar` archive.

This is because `exec` and `spawn` accept `command` instead of `file` as input, and `command`s are executed under shell. There is no reliable way to determine whether a command uses a file in asar archive, and even if we do, we can not be sure whether we can replace the path in command without side effects.

## Adding Unpacked Files in `asar` Archive

As stated above, some Node APIs will unpack the file to filesystem when calling, apart from the performance issues, it could also lead to false alerts of virus scanners.

To work around this, you can unpack some files creating archives by using the `--unpack` option, an example of excluding shared libraries of native modules is:

```sh
$ asar pack app app.asar --unpack *.node
```

After running the command, apart from the `app.asar`, there is also an `app.asar.unpacked` folder generated which contains the unpacked files, you should copy it together with `app.asar` when shipping it to users.