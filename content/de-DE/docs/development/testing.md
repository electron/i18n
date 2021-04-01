# Testen

Unser Ziel ist es, die Codeabdeckung von Electron hoch zu halten. Wir bitten darum, dass alle Pull- -Anforderung nicht nur alle vorhandenen Tests bestehen, sondern idealerweise auch neue Tests hinzufügen , um geänderten Code und neue Szenarien abzudecken. Die Sicherstellung, dass wir so viele Codepfade und Anwendungsfälle von Electron wie möglich erfassen, stellt sicher, dass wir alle alle Apps mit weniger Bugs versenden.

Dieses Repository enthält Linting-Regeln für JavaScript und C++ – sowie Einheiten- und Integrationstests. Weitere Informationen zu den Codierungsstils von Electron finden Sie im [](coding-style.md) -Dokument.

## Linting

Um sicherzustellen, dass Ihr JavaScript mit dem -Stil der Electron-Codierung in Einklang steht, führen Sie `npm run lint-js`aus, die sowohl für Electron selbst als auch für die Komponententests `standard` ausgeführt wird. Wenn Sie einen Editor mit einem Plugin/Addon-System verwenden, sollten Sie eines der vielen [StandardJS-Addons verwenden,][standard-addons] , um über den Codierungsstil Verstöße informiert zu werden, bevor Sie sie jemals übertragen.

Um `standard` mit Parametern auszuführen, führen Sie `npm run lint-js --` gefolgt von Argumenten aus, die an `standard`übergeben werden sollen.

Um sicherzustellen, dass Ihr C++ dem Electron-Codierungsstil entspricht, `npm run lint-cpp`ausführen, in dem ein `cpplint` Skript ausgeführt wird. Wir empfehlen , `clang-format` zu verwenden und [einem kurzen Tutorial](clang-format.md)vorbereitet zu haben.

Es gibt nicht viel Python in diesem Repository, aber es wird auch durch Codierungsstilregeln geregelt. `npm run lint-py` überprüft alle Pythons, indem `pylint` verwendet wird.

## Komponententests

Wenn Sie [Buildtools](https://github.com/electron/build-tools)nicht verwenden, stellen sicher, dass dieser Name, den Sie für Ihren lokalen Build von Electron konfiguriert haben, einer von `Testing`, `Release`, `Default`, `Debug`oder ist, die Sie `process.env.ELECTRON_OUT_DIR`festgelegt haben. Ohne diese Menge wird Electron einige Vortestschritte durchführen.

Um alle Komponententests auszuführen, führen Sie `npm run test`aus. Die Komponententests sind eine Electron App (Überraschung!), die im `spec` Ordner zu finden ist. Beachten Sie, dass es eigenen `package.json` hat und dass seine Abhängigkeiten daher nicht in der obersten Ebene `package.json`definiert sind.

Um nur bestimmte Tests auszuführen, die einem Muster entsprechen, führen Sie `npm-Lauftest aus --
-g=PATTERN`, und ersetzen Sie die `PATTERN` durch einen Regex, der den Tests entspricht, Sie ausführen möchten. Ein Beispiel: Wenn Sie nur IPC-Tests ausführen möchten, Sie `npm run test -- -g ipc`ausführen.

### Testen auf Windows 10-Geräten

#### Zusätzliche Schritte um den Unit-Test auszuführen:

1. Visual Studio 2019 muss installiert sein.
2. Node-Header müssen für Ihre Konfiguration kompiliert werden.

   ```powershell
   ninja -C out\Testing third_party-electron_node:headers
   ```

3. Die electron.lib muss als node.lib kopiert werden.

   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Fehlende Schriften

[Einige Windows 10-Geräte](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) nicht mit der installierten Meiryo-Schriftart ausgeliefert werden, was dazu führen kann, dass ein Schriftwartest fehlschlägt. So installieren Sie Meiryo:

1. Drücken Sie die Window-Taste und suchen Sie nach _Optionale Funktionen verwalten_.
2. Klicken Sie auf _Funktion hinzufügen_.
3. Wählen Sie _japanische Zusatzschrift_ aus und klicken Sie auf _installieren_.

#### Pixelmessungen

Einige Tests, die auf präzisen Pixelmessungen basieren, funktionieren möglicherweise nicht ordnungsgemäß auf Geräten mit Hi-DPI-Bildschirmeinstellungen aufgrund von Gleitkommagenauigkeitsfehlern. Um diese Tests korrekt auszuführen, stellen Sie sicher, dass das Gerät auf 100 % Skalierung eingestellt ist.

So konfigurieren Sie die Anzeigeskalierung:

1. Drücken Sie die Window-Taste und suchen Sie nach _Anzeigeeinstellungen_.
2. Stellen Sie unter _Skalieren und Layout_ sicher, dass das Gerät auf 100% gesetzt ist.

[standard-addons]: https://standardjs.com/#are-there-text-editor-plugins
