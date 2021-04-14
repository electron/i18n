# Build System Übersicht

Electron verwendet [GN-](https://gn.googlesource.com/gn) für die Projektgenerierung und [Ninja-](https://ninja-build.org/) für den Bau. Projektkonfigurationen finden Sie in den `.gn` - und `.gni` -Dateien.

## GN-Dateien

Die folgenden `gn` Dateien enthalten die wichtigsten Regeln für den Gebäude von Electron:

* `BUILD.gn` definiert, wie Electron selbst gebaut wird und enthält die Standardkonfigurationen für die Verknüpfung mit Chromium.
* `build/args/{debug,release,all}.gn` enthalten die Standardbuildargumente für Erstellen von Electron.

## Bauen von Komponenten

Da Chromium ein ziemlich großes Projekt ist, kann die letzte Verbindungsphase einige Minuten dauern, was es schwierig für die Entwicklung macht. Um diesem Problem zu lösen, führte Chromium den "Komponentenbuild" ein, der jede Komponente als einer separaten freigegebenen Bibliothek erstellt, wodurch die Verknüpfung sehr schnell, aber das Opfern der Dateigröße und Leistung.

Electron erbt diese Build-Option von Chromium. In `Debug` Builds wird die Binärdatei mit einer freigegebenen Bibliotheksversion der Chromium-Komponenten verknüpft, um schnelle Verknüpfungszeit zu erreichen. Für `Release` Builds wird die Binärdatei mit den statischen Bibliotheksversionen verknüpft, sodass wir die bestmögliche binäre Größe und Leistung haben können.

## Tests

**NB** _dieser Abschnitt veraltet ist und Informationen enthält, die für das GN-gebaute Elektron nicht mehr relevant sind._

Testen Sie Ihre Änderungen entsprechend dem Projektcodierungsstil, indem Sie:

```sh
$pm-Lauffuss
```

Testfunktionalität mit:

```sh
$pm-Test
```

Wenn Sie Änderungen am Electron-Quellcode vornehmen, müssen Sie den Build vor den Tests erneut ausführen:

```sh
$ npm-Laufbuild && npm-Test
```

Sie können die Testsammlung schneller ausführen lassen, indem Sie den spezifischen Test isolieren oder blockieren, an dem Sie gerade arbeiten, indem Sie Mochas [exklusive Tests](https://mochajs.org/#exclusive-tests) Funktion verwenden. Fügen Sie `.only` an einen `describe` oder `it` Funktionsaufruf an:

```js
describe.only('some feature', () => '
  / ... Nur Tests in diesem Block werden
ausgeführt.
```

Alternativ können Sie die `grep` -Option von moc verwenden, um nur Tests auszuführen, die dem angegebenen Musters für reguläre Ausdrücke entsprechen:

```sh
$pm-Test -- --grep-child_process
```

Tests, die systemeigene Module enthalten (z. B. `runas`) kann nicht mit dem -Debugbuild ausgeführt werden (siehe [#2558](https://github.com/electron/electron/issues/2558) für Details), aber sie funktionieren mit dem Release-Build.

So führen Sie die Tests mit der Releasebuildverwendung aus:

```sh
$ npm-Test -- -R
```
