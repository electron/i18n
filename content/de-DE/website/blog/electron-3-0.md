---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Das Electron-Team freut sich, ankündigen zu können, dass die erste stabile Version von Electron 3 jetzt bei [electronjs verfügbar ist. rg](https://electronjs.org/) und via `npm electron@latest` installieren! Es ist mit Upgrades, Korrekturen und neuen Funktionen gepackt und wir können nicht warten, was du mit ihnen baust. Nachfolgend finden Sie Details zu dieser Version, und wir freuen uns über Ihr Feedback bei der Erkundung.

---

## Release-Prozess

Während wir die Entwicklung von `v3.0 durchgeführt haben.`, haben wir versucht, empirisch Kriterien für eine stabile Veröffentlichung zu definieren, indem wir den Feedback-Fortschritt für progressive Beta-Releases formalisieren. `v3.0.` wäre ohne unser [App Feedback Programm](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) Partner nicht möglich gewesen , die frühzeitige Tests und Rückmeldungen während des Beta-Zyklus lieferten. Vielen Dank an Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code und andere Programmmitglieder für ihre Arbeit. Wenn Sie an zukünftigen Betas teilnehmen möchten, senden Sie uns bitte eine E-Mail an [info@electronjs.org](mailto:info@electronjs.org).

## Änderungen / neue Funktionen

Wichtige Beulen zu mehreren wichtigen Teilen der Elektronik-Toolchain, darunter Chrome `v66.0.3359.181`, Knoten `v10.2.0`und V8 `v6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] feat: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] feat: `win.moveTop()` um Fenster z-Reihenfolge nach oben zu verschieben
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: TextField und Button APIs
* [[#13068](https://github.com/electron/electron/pull/13068)] feat: netLog API für dynamische Protokollierungssteuerung
* [[#13539](https://github.com/electron/electron/pull/13539)] feat: Aktiviere `Webview` in Sandbox-Renderer
* [[#14118](https://github.com/electron/electron/pull/14118)] feat: `fs.readSync` funktioniert jetzt mit massiven Dateien
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: node `fs` wrappers to make `fs.realpathSync.native` and `fs.realpath.native`

## API-Änderungen brechen

* [[#12362](https://github.com/electron/electron/pull/12362)] feat: Aktualisierungen zur Menü-Ordnungskontrolle
* [[#13050](https://github.com/electron/electron/pull/13050)] refactor: dokumentierte veraltete APIs entfernt
  * Siehe [Dokumentation](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) für weitere Details
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: `did-get-response-details entfernt` und `did-get-redirect-request` Ereignisse
* [[#12655](https://github.com/electron/electron/pull/12655)] feat: Standard zum Deaktivieren der Navigation auf Drag/Drop
* [[#12993](https://github.com/electron/electron/pull/12993)] feat: Knoten `v4.x` oder höher ist erforderlich mit dem `Elektron` npm Modul
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] feat: nicht mehr JSON verwenden, um das Ergebnis von `ipcRenderer.sendSync` zu senden
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: default to ignore command line arguments following a URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: Umbenennen `api::Fenster` zu `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] feat: Visueller Zoom ist standardmäßig ausgeschaltet
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: Benenne app-Befehl `media-play_pause umbenennen` in `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] feat: Workspace-Benachrichtigungen unterstützen
* [[#12496](https://github.com/electron/electron/pull/12496)] feat: `tray.setIgnoreDoubleClickEvents(ignorieren)` , um Tray Doppelklick Ereignisse zu ignorieren.
* [[#12281](https://github.com/electron/electron/pull/12281)] feat: Mouse-Forward-Funktionalität auf macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] feat: Displaysperre / Entsperr-Ereignisse

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] feat: DIP zu / von Bildschirm Koordinaten-Konversionen hinzugefügt

**Nota Bene:** Wenn du nach dem Ausführen dieser Version auf eine ältere Version von Electron wechselst, musst du dein Benutzerdatenverzeichnis löschen, um zu verhindern, dass ältere Versionen abstürzen. Sie können das Benutzerdatenverzeichnis durch Ausführen von `console.log(app.getPath("userData"))` oder siehe [Dokumentation](https://electronjs.org/docs/api/app#appgetpathname) für weitere Details.

## Fehlerkorrekturen

* [[#13397](https://github.com/electron/electron/pull/13397)] beheben: Problem mit `fs.statSyncNoException` warf Ausnahmen
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] behoben: Absturz beim Laden der Seite mit jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] behoben: Absturz in `net::ClientSocketHandle` Zerstörer
* [[#14453](https://github.com/electron/electron/pull/14453)] fix: Fokuswechsel sofort benachrichtigen statt beim nächsten Häkchen

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] beheben: Problem mit der Auswahl von Paketen in `<input file="type">` öffnen des Dateidialogs
* [[#12404](https://github.com/electron/electron/pull/12404)] beheben: Problem beim Blockieren des Hauptprozesses bei Verwendung des async-Dialogs
* [[#12043](https://github.com/electron/electron/pull/12043)] fix: Kontextmenü klicken Sie auf Rückruf
* [[#12527](https://github.com/electron/electron/pull/12527)] behoben: Ereignisleck bei der Wiederverwendung des Touchbar-Elements
* [[#12352](https://github.com/electron/electron/pull/12352)] behoben: Absturz des Tray Titel
* [[#12327](https://github.com/electron/electron/pull/12327)] behoben: nicht ziehbare Regionen
* [[#12809](https://github.com/electron/electron/pull/12809)] behoben: um eine Aktualisierung des Menüs während des Öffnens zu verhindern
* [[#13162](https://github.com/electron/electron/pull/13162)] behoben: Tray-Symbolgrenzen erlauben keine negativen Werte
* [[#13085](https://github.com/electron/electron/pull/13085)] behoben: Tray Titel nicht invertieren wenn hervorgehoben,
* [[#12196](https://github.com/electron/electron/pull/12196)] fix: Mac Build wenn `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] beheben: Zusätzliche Probleme in framelosen Fenstern mit Lebendigkeit
* [[#13326](https://github.com/electron/electron/pull/13326)] behoben: um nach dem Aufruf von `app.removeAsDefaultProtocolClient auf kein Protokoll zu setzen`
* [[#13530](https://github.com/electron/electron/pull/13530)] behoben: Falsche Verwendung privater APIs im MAS Build
* [[#13517](https://github.com/electron/electron/pull/13517)] behoben: `tray.setContextMenu` Absturz
* [[#14205](https://github.com/electron/electron/pull/14205)] fix: Das Drücken von Escapes in einem Dialog schließt es jetzt, auch wenn `defaultId` gesetzt ist

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] fix: `BrowserWindow.focus()` für Offscreen Fenster

## Andere Notizen

* PDF Viewer arbeitet derzeit nicht, wird aber in Kürze wieder funktionieren
* `TextField` und `Button` APIs sind experimentell und sind daher standardmäßig aus
  * Sie können mit dem `enable_view_api` build flag aktiviert werden

# Was ist als Nächstes

Das Electron-Team arbeitet weiterhin daran, unsere Prozesse für schnellere und reibungslose Upgrades zu definieren, da wir versuchen, letztendlich die Parität mit den Entwicklungskadenzen von Chromium aufrechtzuerhalten Knoten und V8.
