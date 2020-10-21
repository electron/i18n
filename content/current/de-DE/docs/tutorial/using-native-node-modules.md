# Verwendung von Native Node Modules

Native Knoten-Module werden von Electron unterstützt, aber da Electron sehr wahrscheinlich eine andere V8-Version als die auf Ihrem System installierte Knotenbinärdatei verwenden wird die Module, die Sie verwenden, müssen für Electron neu kompiliert werden. Ansonsten bekommst du die folgende Fehlerklasse, wenn du versuchst, deine App auszuführen:

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

Sie können Module wie andere Node-Projekte installieren und dann die Module für Electron mit dem Paket [`Elektron-rebuild`](https://github.com/electron/electron-rebuild) neu erstellen. Dieses -Modul kann automatisch die Version von Electron bestimmen und die manuellen Schritte des Herunterladens von Headern und des Neuaufbaus von nativen Modulen für Ihre App handhaben.

Zum Beispiel um `Elektron-Rebuild` zu installieren und dann Module mit ihm über die Kommandozeile neu zu erstellen:

```sh
npm install --save-dev electron-rebuild

# Jedes Mal, wenn Sie "npm install" ausführen, führen Sie dies aus
./node_modules/aus. in/electron-rebuild

# Wenn Sie Probleme haben, versuchen Sie:
.\node_modules\.bin\electron-rebuild.cmd
```

Für weitere Informationen zur Nutzung und Integration mit anderen Werkzeugen konsultieren Sie das Projekt README.

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

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook.  Wenn das Modul mit Knoten gebaut wurde, stellen Sie sicher, dass die `win_delay_load_hook` Variable auf `true` in der `Bindung gesetzt ist. Typ` Datei und wird nirgends überschrieben.  Wenn das Modul mit einem anderen System erstellt wurde müssen Sie sicherstellen, dass Sie mit einem Delayload Hook bauen, der im Haupt `installiert ist. ode` Datei. Ihr `link.exe` Aufruf sollte folgendermaßen aussehen:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

Insbesondere ist es wichtig, dass:

- Sie verlinken gegen `node.lib` von _Electron_ und nicht Knoten. Wenn Sie gegen das falsche `node.lib` verlinken, werden Sie bei der Anforderung des Moduls in Electron zu Ladefehlern kommen.
- Sie fügen die Flagge `/DELAYLOAD:node.exe` hinzu. Wenn der `Knoten. Axt` Link ist nicht verzögert, dann wird der Hook mit der Verzögerungslast nicht angefeuert und der Knoten wird nicht korrekt aufgelöst.
- `win_delay_load_hook.obj` ist direkt mit der finalen DLL verbunden. Wenn der Hook in einer abhängigen DLL eingerichtet ist, wird er nicht zur richtigen Zeit abfeuern.

Siehe [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) für einen Beispiel Verzögerungs-Load-Hook wenn Sie Ihren eigenen implementieren.

## Module, die auf `vor Build` angewiesen sind

[`Prebuild`](https://github.com/prebuild/prebuild) bietet eine Möglichkeit, native Knotenmodule mit vorkompilierten Binärdateien für mehrere Versionen von Knoten und Electron zu veröffentlichen.

Wenn Module Binärdateien für die Verwendung in Electron bereitstellen, stellen Sie sicher, dass `--build-from-source` und die `npm_config_build_from_source` environment Variable weggelassen werden, um die vorkompilierten Binärdateien voll zu nutzen.

## Module, die auf `Knoten-Pre-gyp angewiesen sind`

Das [`node-pre-gyp` Tool](https://github.com/mapbox/node-pre-gyp) bietet eine Möglichkeit, native Knoten Module mit vorkompilierten Binärdateien zu verteilen und viele beliebte Module verwenden es.

Normalerweise funktionieren diese Module unter Electron, aber manchmal kann es passieren, wenn Electron eine neuere Version von V8 als Node verwendet und/oder es Änderungen an ABI gibt, dass schlechte Dinge passieren. Daher wird generell empfohlen, immer native Module aus dem Quellcode zu erstellen. `Elektron-Rebuild` behandelt dies automatisch.

Wenn Sie der `npm` Methode zur Installation von Modulen folgen, wird dies standardmäßig durchgeführt, falls nicht, Sie müssen `--build-from-source` an `npm`übergeben , oder setzen Sie die `npm_config_build_from_source` Umgebungsvariable.
