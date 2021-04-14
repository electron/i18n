# Verwendung von Native Node Modules

Native Node.js Module werden von Electron unterstützt, aber da Electron eine andere [Application Binary Interface (ABI)][abi] von einer bestimmten Node.js-Binärdatei hat (aufgrund Unterschiede wie die Verwendung von Chromiums BoringSSL anstelle von OpenSSL), müssen die nativen Module, die Sie verwenden, für Electron neu kompiliert werden. Ansonsten bekommst du die folgende Fehlerklasse, wenn du versuchst, deine App auszuführen:

```sh
Fehler: Das Modul '/path/to/native/module.node'
wurde mit Hilfe von
NODE_MODULE_VERSION $XYZ gegen eine andere Node.js-Version kompiliert. Diese Version von Node.js erfordert
NODE_MODULE_VERSION $ABC. Bitte versuchen Sie
das Modul neu zu kompilieren oder neu zu installieren (zum Beispiel mit `npm rebuild` oder `npm install`).
```

## Wie man native Module installiert

Es gibt mehrere verschiedene Möglichkeiten, native Module zu installieren:

### Installation von Modulen und Neuaufbau für Electron

Sie können Module wie andere Node-Projekte installieren und dann die Module für Electron mit dem paket- [`electron-rebuild`][electron-rebuild] neu erstellen. Dieses -Modul kann automatisch die Version von Electron bestimmen und die manuellen Schritte des Herunterladens von Headern und des Neuaufbaus von nativen Modulen für Ihre App handhaben. Wenn Sie [Electron Forge][electron-forge]verwenden, wird dieses Tool automatisch sowohl im Entwicklungsmodus als auch bei der Verteilung verwendet.

So installieren Sie z. B. das standalone `electron-rebuild` -Tool und erstellen Sie dann Module mit ihm über die Befehlszeile neu:

```sh
npm install --save-dev electron-rebuild

- Jedes Mal, wenn Sie "npm install" ausführen, führen Sie dies aus:
./node_modules/.bin/electron-rebuild

. Wenn Sie Probleme unter Windows haben, versuchen Sie:
.\node_modules-.bin-Elektronen-Rebuild.cmd
```

Weitere Informationen zur Verwendung und Integration mit anderen Tools wie [Electron Packager][electron-packager]finden Sie im README des Projekts.

### `npm` verwenden

Durch das Setzen einiger Umgebungsvariablen können Sie `npm` verwenden, um Module direkt zu installieren.

Zum Beispiel, um alle Abhängigkeiten für Electronic zu installieren:

```sh
# Elektronische Version.
export npm_config_target=1.2.3
# Die Architektur von Electron, siehe https://electronjs.org/docs/tutorial/support#supported-platforms
# für unterstützte Architekturen.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Header für Electron herunterladen.
export npm_config_disturl=https://electronjs.org/headers
# Sage node-pre-gyp das wir fur Electron bauen.
export npm_config_runtime=electron
# Geben Sie node-pre-gyp an, das Modul aus dem Quellcode zu erstellen.
export npm_config_build_from_source=true
# Installieren Sie alle Abhängigkeiten und speichern Sie den Cache auf ~/.electron-gyp.
HOME=~/.electron-gyp npm installieren
```

### Manuelles Erstellen für Electron

Wenn du ein Entwickler bist, das ein natives Modul entwickelt und es mit Electron testen möchtest, können Sie das Modul für Electron manuell neu erstellen. Sie können `node-gyp` direkt verwenden, um für Electronic zu erstellen:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` ändert, wo die Entwicklungs-Header zu finden sind.
* `--target=1.2.3` ist die Version von Electron.
* `--dist-url=...` gibt an, wo die Header heruntergeladen werden sollen.
* `--arch=x64` sagt, dass das Modul für ein 64-Bit-System gebaut wurde.

### Manuelles Erstellen für eine benutzerdefinierte Erstellung von Electron

Um native Node-Module mit einer benutzerdefinierten Version von Electron zu kompilieren, die nicht mit einer öffentlichen Version übereinstimmt, weist `npm` an, die Version von Knoten zu verwenden, die Sie mit Ihrer benutzerdefinierten Version gebündelt haben.

```sh
npm neu erstellen --nodedir=/path/to/electron/vendor/node
```

## Problemlösungen

Wenn Sie ein natives Modul installiert haben und es nicht funktioniert haben, müssen Sie folgende Dinge überprüfen:

* Wenn Zweifel bestehen, führen Sie zuerst `Elektron-Rebuild` aus.
* Stellen Sie sicher, dass das native Modul mit der Zielplattform und der -Architektur für Ihre Electron-App kompatibel ist.
* Stellen Sie sicher, dass `win_delay_load_hook` nicht auf `false gesetzt ist` im Modul `binding.gyp`.
* Nach dem Upgrade von Electron müssen Sie die Module in der Regel neu erstellen.

### Eine Notiz über `win_delay_load_hook`

Unter Windows verbindet `node-gyp` standardmäßig native Module mit `node.dll`. In Electron 4.x und höher werden die Symbole, die von nativen Modulen benötigt werden, mit `Elektron exportiert. Axt`und es gibt keine `node.dll`. Um native Module unter Windows zu laden, `node-gyp` installiert einen [Verzögerungslade Hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) , der auslöst, wenn das native Modul geladen wird, und leitet den Knoten `weiter. ll` Referenz für die ausführbare Datei laden statt nach `Knoten zu suchen. ll` in der Bibliothekssuche Pfad (würde nichts auftauchen). Aus diesem Grund wird bei Electron 4.x und höher `'win_delay_load_hook': 'true'` benötigt, um native Module zu laden.

Wenn Sie eine Fehlermeldung wie `Module did not self-register`oder `Die angegebene
Prozedur konnte nicht gefunden werden`, kann dies bedeuten, dass das Modul, das Sie verwenden möchten, den Delay-Load-Hook nicht korrekt enthält.  Wenn das Modul mit Knoten gebaut wurde, stellen Sie sicher, dass die `win_delay_load_hook` Variable auf `true` in der `Bindung gesetzt ist. Typ` Datei und wird nirgends überschrieben.  Wenn das Modul mit einem anderen System erstellt wurde müssen Sie sicherstellen, dass Sie mit einem Delayload Hook bauen, der im Haupt `installiert ist. ode` Datei. Ihr `link.exe` Aufruf sollte folgendermaßen aussehen:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

Insbesondere ist es wichtig, dass:

* Sie verlinken gegen `node.lib` von _Electron_ und nicht Knoten. Wenn Sie gegen das falsche `node.lib` verlinken, werden Sie bei der Anforderung des Moduls in Electron zu Ladefehlern kommen.
* Sie fügen die Flagge `/DELAYLOAD:node.exe` hinzu. Wenn der `Knoten. Axt` Link ist nicht verzögert, dann wird der Hook mit der Verzögerungslast nicht angefeuert und der Knoten wird nicht korrekt aufgelöst.
* `win_delay_load_hook.obj` ist direkt mit der finalen DLL verbunden. Wenn der Hook in einer abhängigen DLL eingerichtet ist, wird er nicht zur richtigen Zeit abfeuern.

Siehe [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) für einen Beispiel Verzögerungs-Load-Hook wenn Sie Ihren eigenen implementieren.

## Module, die auf `vor Build` angewiesen sind

[`Prebuild`](https://github.com/prebuild/prebuild) bietet eine Möglichkeit, native Knotenmodule mit vorkompilierten Binärdateien für mehrere Versionen von Knoten und Electron zu veröffentlichen.

Wenn das `prebuild`-betriebene Modul Binärdateien für die Verwendung in Electron bereitstellen, sicherstellen, dass `--build-from-source` und die `npm_config_build_from_source` Umgebungsvariable weggelassen werden, um die vorgefertigten Binärdateien voll auszuschöpfen.

## Module, die auf `Knoten-Pre-gyp angewiesen sind`

Das [`node-pre-gyp` -Tool][node-pre-gyp] bietet eine Möglichkeit, systemeigene Knoten- Module mit vordefinierten Binärdateien bereitzustellen, und viele beliebte Module verwenden es.

Manchmal funktionieren diese Module unter Electron gut, aber wenn keine Elektronen-spezifischen Binärdateien verfügbar sind, müssen Sie aus der Quelle erstellen. Aus diesem Grund wird empfohlen, `electron-rebuild` für diese Module zu verwenden.

Wenn Sie die `npm` Art und Weise der Installation von Modulen befolgen, müssen Sie `--build-from-source` an `npm`übergeben oder die `npm_config_build_from_source` Umgebungsvariable festlegen.

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
