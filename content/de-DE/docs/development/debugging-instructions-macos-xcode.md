## Debugging mit XCode

### Xcode-Projekt zum Debuggen von Quellen generieren (kann keinen Code aus xcode erstellen)

Führen Sie `gn gen` mit dem Argument --ide=xcode aus.

```sh
$ gn gen out/Testing --ide=xcode
```

Dadurch wird die Datei electron.ninja.xcworkspace generiert. Sie müssen diesen Arbeitsbereich öffnen, , um Haltepunkte festzulegen und zu überprüfen.

Weitere Informationen zum Generieren von IDE-Projekten mit GN finden Sie in `gn help gen` .

### Debuggen und Haltepunkte

Starten Sie die Electron-App nach dem Build. Sie können nun den oben erstellten xcode-Arbeitsbereich öffnen und über das Debug-Debug-Menü "Debug > Attach To Process > Electron" an den Electron-Prozess anfügen. [Hinweis: Wenn Sie renderer-Prozesses debuggen möchten, müssen Sie auch an den Elektronenhelfer anfügen.]

Sie können jetzt Haltepunkte in jeder der indizierten Dateien festlegen. Sie können jedoch nicht, Haltepunkte direkt in der Chromium-Quelle festzulegen. Um Haltepunkte in der Chromium-Quelle festzulegen, können Sie Debug > Haltepunkte auswählen > erstellen symbolischen Haltepunkt und einen beliebigen Funktionsnamen als Symbol festlegen. Dadurch wird der Haltepunkt für alle Funktionen mit diesem Namen festgelegt, von allen Klassen, wenn mehr als eine vorhanden ist. Sie können diesen Schritt auch zum Festlegen von Haltepunkten ausführen, bevor Sie den Debugger anfügen, jedoch werden tatsächliche Haltepunkte für symbolische Haltepunktfunktionen möglicherweise erst angezeigt, wenn der Debugger an die App angefügt ist.
