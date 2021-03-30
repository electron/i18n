---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Das Electron Team freut sich über die Veröffentlichung von Electron 5.0.0! Sie können es mit npm über `npm installieren, electron@latest` installieren oder die Tarballs von [unserer Release-Seite](https://github.com/electron/electron/releases/tag/v5.0.0) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features. Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

---

## Was ist Neu?

Ein Großteil der Funktionen von Electronic wird von den Kernkomponenten von Chromium, Node.js und V8 bereitgestellt. Electron hält über diese Projekte auf dem Laufenden, um unseren Nutzern neue JavaScript-Funktionen, Performance-Verbesserungen und Sicherheits-Korrekturen zu bieten. Jedes dieser Pakete hat einen Hauptversions-Bump in Electron 5:

- Chromium `73.0.3683.119`
  - [Neu in 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Neu in 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Neu in 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Neu in 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Knoten 12 Blog-Beitrag](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Neue JS-Funktionen](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 enthält auch Verbesserungen an Electron-spezifischen APIs. Eine Zusammenfassung der wichtigsten Änderungen ist unten, die vollständige Liste der Änderungen finden Sie in den [Electron v5.0.0 Release Notes](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 setzt [Promisifizierungsinitiative](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) fort, um die Callback-basierte API von Electronic in die Verwendung von Promises umzuwandeln. Diese APIs wurden für Electron 5 konvertiert:
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentTracing.startRecording`
* `contentTracing.stop-Aufnahme`
* `debugger.sendCommand`
* Cookies API
* `shell.openExternal`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Zugriff auf Systemfarben für macOS

Diese Funktionen wurden geändert oder in `Systemeinstellungen` hinzugefügt, um auf die Farben der MacOS-Systeme zuzugreifen:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### Speicherinformationen verarbeiten

Die Funktion `process.getProcessMemoryInfo` wurde hinzugefügt, um Speicherverbrauchsstatistiken über den aktuellen Prozess zu erhalten.

### Zusätzliche Filterung für Remote-APIs

Um die Sicherheit in der `Remote-` API zu verbessern, wurden neue Remote-Ereignisse hinzugefügt, so dass `Remote hinzugefügt wurde. etBuiltin`, `Remote. etCurrentWindow`, `remote.getCurrentWebContents` und `<webview>.getWebContents` können [gefiltert werden](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Mehrere BrowserViews im BrowserFenster

BrowserWindow unterstützt nun das Verwalten mehrerer BrowserViews innerhalb desselben BrowserWindows.

## Breaking Changes

### Standard für gepackte Apps

Gepackte Apps verhalten sich nun wie die Standard-App: Ein Standard-Anwendungsmenü wird erzeugt, es sei denn, die App hat ein und das `-Fenster-All-Closed` wird automatisch bearbeitet, sofern die App das Ereignis nicht bearbeitet.

### Gemischte Sandbox

Mixed Sandbox Modus ist nun standardmäßig aktiviert. Renderer, die mit `Sandbox gestartet wurden: true` wird jetzt tatsächlich Sandbox sein, wo sie bisher nur bei aktiviertem Mixed-Sandbox-Modus verwendet wurden.

### Sicherheitsverbesserungen
Die Standardwerte von `nodeIntegration` und `webviewTag` sind jetzt `false` um die Sicherheit zu verbessern.

### Rechtschreibprüfung jetzt asynchron

Die Rechtschreibprüfungs-API wurde geändert, um [asynchrone Ergebnisse](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider) zu liefern.

## Deprecations

Die folgenden APIs sind in Electron 5.0.0 neu veraltet und sollen in 6.0.0 entfernt werden:

### Mksnapshot-Binärdateien für Arm und Arm 64
Native Binärdateien von mksnapshot für Arm und arm64 sind veraltet und werden in 6 entfernt. .0. Snapshots können für Arm und arm64 mit den x64 Binärdateien erstellt werden.

### ServiceWorker-APIs auf Webcontent
Veraltete ServiceWorker-APIs auf WebContent in Vorbereitung auf deren Entfernung.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Automatische Module mit Sandbox WebContent
In order to improve security, the following modules are being deprecated for use directly via `require` and will instead need to be included via `remote.require` in a sandboxed webcontents:
* `elektron.screen`
* `child_process`
* `fs`
* `os`
* `path`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` wurden zugunsten `webFrame.setIsolatedWorldWorldInfo` veraltet.

### Gemischte Sandbox
`MixedSandbox` und die `--enable-mixed-sandbox` sind noch für Kompatibilität vorhanden, sind aber veraltet und haben keinen Effekt.

## Ende der Unterstützung für 2.0.x

Nach unserer [unterstützten Versionsrichtlinie](https://electronjs.org/docs/tutorial/support#supported-versions)hat 2.0.x das Ende des Lebens erreicht.

## App Feedback Programm

Wir verwenden weiterhin unser [App Feedback Programm](https://electronjs.org/blog/app-feedback-program) für Tests. Projekte, die an diesem Programm teilnehmen, testen Electron-Betas auf ihren Apps; und im Gegenzug werden die neuen Fehler, die sie finden, für die stabile Veröffentlichung priorisiert. If you'd like to participate or learn more, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 6.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) legt Schlüsseldaten im Entwicklungslebenszyklus von Electron 6 fest. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
