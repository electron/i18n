---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 wurde veröffentlicht! Es enthält Upgrades auf Chromium `80`, V8 `8.0`und Node.js `12.13.0`. Wir haben Chromes eingebauter Rechtschreibprüfer hinzugefügt und vieles mehr!

---

Das Electron Team freut sich über die Veröffentlichung von Electron 8.0.0! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Das Release ist voll mit Upgrades, Korrekturen und neuen Features. Wir können nicht warten, was du mit ihnen baust! Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen

### Stapeländerungen
* Chromium `80,0,3987.86`
    * [Neu in Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Neu in Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Knoten 12.13.0 Blogbeitrag](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 Blog-Beitrag](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 Blog-Beitrag](https://v8.dev/blog/v8-release-80)

### Merkmale hervorheben
* Implementierte Nutzung von Chromes eingebauter Rechtschreibprüfung. Weitere Details finden Sie unter [#20692](https://github.com/electron/electron/pull/20692) und [#21266](https://github.com/electron/electron/pull/21266).
* IPC-Kommunikation verwendet nun v8 strukturierten Clone Algorithmus. Dies ist schneller, funktionsfähiger und weniger überraschend als die bestehende Logik und bringt eine 2x Leistungssteigerung für große Puffer und komplexe Objekte. Die Latenz für kleine Nachrichten ist nicht signifikant betroffen. Weitere Details finden Sie in [#20214](https://github.com/electron/electron/pull/20214).

Lesen Sie die [8.0.0 Versionshinweise](https://github.com/electron/electron/releases/tag/v8.0.0) für eine vollständige Liste der neuen Funktionen und Änderungen.

## Breaking Changes

* Modulname in der Veraltungswarnung für kontextabhängige Module anzeigen. [#21952](https://github.com/electron/electron/pull/21952)
    * Dies wird für eine zukünftige Anforderung fortgesetzt, dass die im Renderer-Prozess geladenen nativen Knotenmodule entweder [N-API](https://nodejs.org/api/n-api.html) oder [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons) sind. Vollständige Informationen und vorgeschlagene Zeitleiste sind in [dieses Ticket](https://github.com/electron/electron/issues/18397) detailliert beschrieben.
* Über IPC gesendete Werte werden nun mit dem strukturierten Clone Algorithmus serialisiert.  [#20214](https://github.com/electron/electron/pull/20214)
* Offscreen Rendering ist derzeit deaktiviert, da kein Betreuer an dieser Funktion arbeitet.  Sie brach während des Chromium-Upgrades und wurde anschließend deaktiviert. [#20772](https://github.com/electron/electron/issues/20772)

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) Seite.

## API-Änderungen
* `App` API-Änderungen:
    * `app.getApplicationNameForProtocol(url)` hinzugefügt. [#20399](https://github.com/electron/electron/pull/20399)
    * `app.showAboutPanel()` und `app.setAboutPanelOptions(options)` Unterstützung unter Windows hinzugefügt. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` API-Änderungen:
    * Aktualisierte Dokumentation, um festzustellen, dass BrowserWindow Optionen `hasShadow` auf allen Plattformen verfügbar ist [#20038](https://github.com/electron/electron/pull/20038)
    * `trafficLightPosition` Option zu BrowserWindow-Optionen hinzugefügt, um eine benutzerdefinierte Positionierung der Ampeltasten zu ermöglichen. [#21781](https://github.com/electron/electron/pull/21781)
    * `zugänglichen Titel` Option zum BrowserFenster hinzugefügt, um den Titel des zugänglichen Fensters zu setzen [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` kann nun Null [#19983](https://github.com/electron/electron/pull/19983) zurückgeben
    * `BrowserWindow.getMediaSourceId()` und `BrowserWindow.moveAbove(mediaSourceId)` hinzugefügt. [#18926](https://github.com/electron/electron/pull/18926)
    * Unterstützung für `will-move` Event auf macOS hinzugefügt. [#19641](https://github.com/electron/electron/pull/19641)
* Vorher nicht dokumentierter `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `Dialog` API-Änderungen:
    * `dontAddToRecent` Eigenschaft zu `dialog.showOpenDialog` und `hinzugefügt. howOpenDialogSync` , um zu verhindern, dass Dokumente unter Windows in geöffneten Dialogen hinzugefügt werden. [#19669](https://github.com/electron/electron/pull/19669)
    * Eigenschaftsanpassung zu `dialog.showSaveDialog` und `dialog.showSaveDialogSync` hinzugefügt. [#19672](https://github.com/electron/electron/pull/19672)
* `Benachrichtigung` API-Änderungen:
    * `TimeoutType` Option hinzugefügt, damit Linux/Windows Benutzer die Art der Benachrichtigungs-Timeout festlegen können. [#20153](https://github.com/electron/electron/pull/20153)
    * `Dringlichkeit`  hinzugefügt, um die Dringlichkeit auf Linux-Benachrichtigungen zu setzen. [#20152](https://github.com/electron/electron/pull/20152)
* `Sitzung` API-Änderungen:
    * Aktualisierte Dokumentation auf `session.setProxy(config)` und `session.setCertificateVerifyProc(proc)` , um optionale Optionen anzumerken. [#19604](https://github.com/electron/electron/pull/19604)
    * `session.downloadURL(url)` hinzugefügt, um Downloads ohne Browserfenster auszulösen. [#19889](https://github.com/electron/electron/pull/19889)
    * Unterstützung für HTTP-Vorverbindungshinweise über `session.preconnect(options)` und das `Vorverbindung` Ereignis hinzugefügt. [#18671](http://github.com/electron/electron/pull/18671)
    * `session.addWordToSpellCheckerDictionary` hinzugefügt, um benutzerdefinierte Wörter im Wörterbuch [#21297](http://github.com/electron/electron/pull/21297) zu erlauben
* Option zu `shell.moveItemToTrash(fullPath[, deleteOnFail])` auf macOS hinzugefügt, um anzugeben, was passiert, wenn moveItemToTrash fehlschlägt. [#19700](https://github.com/electron/electron/pull/19700)
* `Systemeinstellungen` API-Änderungen:
    * `systemPreferences.getColor(color)` Dokumentation für macOS aktualisiert. [#20611](https://github.com/electron/electron/pull/20611)
    * `Bildschirm-Typ` zu `systemPreferences.getMediaAccessStatus()` hinzugefügt. [#20764](https://github.com/electron/electron/pull/20764)
* `nativeTheme.themeSource` hinzugefügt, damit Apps Chromium und die Theme-Auswahl des Betriebssystems überschreiben können. [#19960](https://github.com/electron/electron/pull/19960)
* TouchBar API-Änderungen:
    * `AccessibilityLabel` Eigenschaft zu `TouchBarButton` und `TouchBarLabel` hinzugefügt, um die Bedienbarkeit von TouchBarButton/TouchBarLabel zu verbessern. [#20454](https://github.com/electron/electron/pull/20454)
    * Aktualisierte TouchBar Dokumentation [#19444](https://github.com/electron/electron/pull/19444)
* `Tray` API-Änderungen:
    * Neue Optionen zu `tray.displayBalloon()`hinzugefügt: `iconType`, `largeIcon`, `noSound` und `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Tray.removeBalloon() hinzugefügt, wodurch eine bereits angezeigte Ballonbenachrichtigung entfernt wird. [#19547](https://github.com/electron/electron/pull/19547)
    * Tray.focus() wurde hinzugefügt, was den Fokus auf den Benachrichtigungsbereich der Taskleiste zurückgibt. feat: add tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `WebContents` API-Änderungen:
    * `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` hinzugefügt, um executeJavaScriptInIsolatedWorld in der WebContents API zu enthüllen. [#21190](https://github.com/electron/electron/pull/21190)
    * Methoden zum Erfassen eines versteckten WebInhalts hinzugefügt. [#21679](https://github.com/electron/electron/pull/21679)
    * Optionen zu `webContents.print([options], [callback])` hinzugefügt, um die Anpassung von Drucküberschriften und Fußzeilen zu ermöglichen. [#19688](https://github.com/electron/electron/pull/19688)
    * Möglichkeit zur Überprüfung bestimmter geteilter Arbeitnehmer durch `webContents.getAllSharedWorkers()` und `webContents.inspectSharedWorkerById(workerId)` hinzugefügt. [#20389](https://github.com/electron/electron/pull/20389)
    * Unterstützung von `fitToPageEnabled` und `scaleFactor` Optionen in WebContents.printToPDF() hinzugefügt. [#20436](https://github.com/electron/electron/pull/20436)
* `webview.printToPDF` Dokumentation aktualisiert, um zu zeigen, dass der Rückgabetyp nun Uint8Array ist. [#20505](https://github.com/electron/electron/pull/20505)

### Veraltete APIs
Die folgenden APIs sind jetzt veraltet:
* Veraltet die nicht funktionale `sichtbare OnFullScreen` Option in `BrowserWindow.setVisibleOnAllWorkspaces` vor der Entfernung in der nächsten Hauptversion. [#21732](https://github.com/electron/electron/pull/21732)
* Veraltet `alternativ ausgewählter Control-Text` auf `systemPreferences.getColor(color)` für macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Veraltete `setLayoutZoomLevelLimits` auf `webContents`, `webFrame`und `<webview> Tag` weil Chromium diese Fähigkeit entfernt hat. [#21296](https://github.com/electron/electron/pull/21296)
* Der Standardwert von `false` für `app.allowRendererProcessReuse` ist jetzt veraltet. [#21287](https://github.com/electron/electron/pull/21287)
* Veraltet `<webview>.getWebContents()` da es vom entfernten Modul abhängt. [#20726](https://github.com/electron/electron/pull/20726)

## Ende der Unterstützung für 5.x.y

Electron 5.x.y hat das Ende der Unterstützung gemäß der [Unterstützungsrichtlinie des Projekts erreicht](https://electronjs.org/docs/tutorial/support#supported-versions). Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## App Feedback Programm

Wir verwenden weiterhin unser [App Feedback Programm](https://electronjs.org/blog/app-feedback-program) für Tests. Projekte, die an diesem Programm teilnehmen, testen Electron-Betas auf ihren Apps; und im Gegenzug werden die neuen Fehler, die sie finden, für die stabile Veröffentlichung priorisiert. If you'd like to participate or learn more, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufige 9.0.0 Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) legt Schlüsseldaten im Entwicklungslebenszyklus von Electron 9 fest. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecation von `Remote-` Modul (Start in Electron 9)
Aufgrund ernsthafter Sicherheitsverpflichtungen beginnen wir mit Plänen, das [`entfernte` Modul](https://www.electronjs.org/docs/api/remote) ab Electron 9 aufzugeben. Sie können [dieses Ticket](https://github.com/electron/electron/issues/21408) lesen und verfolgen, das unsere Gründe dafür detailliert und eine vorgeschlagene Zeitleiste für die Deprecation enthält.
