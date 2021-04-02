---
title: Elektron 12.0.0
author:
  - VerteDinde
  - mlaurencin
  - sofianguy
date: '2021-03-02'
---

Electron 12.0.0 wurde veröffentlicht! Es enthält Upgrades auf Chromium `89`, V8 `8.9` und Node.js `14.16`. Wir haben Änderungen am Remotemodul, neue Standardeinstellungen für contextIsolation, eine neue webFrameMain-API und allgemeine Verbesserungen hinzugefügt. Lesen Sie unten für weitere Details!

---

Das Electron-Team freut sich, die Veröffentlichung von Electron 12.0.0 ankündigen zu können! Sie können es mit npm installieren über `npm electron@latest` installieren oder von unserer [Release-Website](https://electronjs.org/releases/stable) herunterladen. Lesen Sie weiter für Details zu dieser Version, und teilen Sie bitte Ihr Feedback!

## Bemerkenswerte Änderungen

### Stapeländerungen

* Chrom- `89`
    * [Neu in Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Neu in Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Knoten.js `14.16`
    * [Knoten 14.16.0 Blogbeitrag](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Blogbeitrag Knoten 14.0.0](https://nodejs.org/en/blog/release/v14.0.0/)
* V8- `8.9`
    * [V8 8.8 Blog-Beitrag](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 Blog-Beitrag](https://v8.dev/blog/v8-release-89)

### Merkmale hervorheben

* Die ContextBridge `exposeInMainWorld` -Methode kann jetzt Nicht-Objekt-APIs verfügbar machen. [#26834](https://github.com/electron/electron/pull/26834)
* Upgrade von Knoten 12 auf Knoten 14. [#23249](https://github.com/electron/electron/pull/25249)
* Es wurde eine neue `webFrameMain` -API für den Zugriff auf Unterframes einer `WebContents` -Instanz aus dem Hauptprozess hinzugefügt. [#25464](https://github.com/electron/electron/pull/25464)
* Die Standardwerte von `contextIsolation` und `worldSafeExecuteJavaScript` sind jetzt `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

Eine vollständige Liste der neuen Funktionen und Änderungen finden Sie in den [12.0.0-Versionshinweisen](https://github.com/electron/electron/releases/tag/v12.0.0) .

## Breaking Changes

* Das `remote` Modul wurde veraltet. Er wird durch [`@electron/remote`](https://github.com/electron/remote)ersetzt. [#25293](https://github.com/electron/electron/pull/25293)
    * Wenn Sie derzeit das `remote` -Modul verwenden, haben wir hier [eine Anleitung zur Migration zu `@electron/remote` geschrieben.](https://github.com/electron/remote#migrating-from-remote)
* Der Standardwert von `contextIsolation` wurde in `true`geändert. [#27949](https://github.com/electron/electron/pull/27949)
* Der Standardwert von `worldSafeExecuteJavaScript` wurde in `true`geändert. [#27502](https://github.com/electron/electron/pull/27502)
* Der Standardwert von `crashReporter.start({ compress })` wurde von `false` in `true`geändert. [#25288](https://github.com/electron/electron/pull/25288)
* Flash-Unterstützung entfernt: Chromium hat die Unterstützung für Flash entfernt, die auch in Electron 12 entfernt wurde. Weitere Informationen finden Sie in [Flash Roadmap](https://www.chromium.org/flash-roadmap) von Chromium.
* Erforderliches SSE3 für Chrome auf x86: Chromium hat die Unterstützung für [älteren x86-CPUs entfernt, die nicht mindestens DIE SSE3-Unterstützung (Streaming SIMD Extensions 3)](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64)erfüllen. Diese Unterstützung wurde auch in Electron 12 entfernt.

Weitere Informationen zu diesen und zukünftigen Änderungen finden Sie auf der [geplanten Änderungen](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) Seite.

## API-Änderungen

* `webFrameMain` -API hinzugefügt: Das `webFrameMain` -Modul kann verwendet werden, um Frames über vorhandene [`WebContents`](/docs/api/web-contents.md) -Instanzen hinweg nachzuschlagen. Dies ist das hauptprozessäquivalent der vorhandenen webFrame-API. Weitere Informationen zu dieser neuen API finden Sie [hier](https://github.com/electron/electron/pull/25464)und in unserer [-Dokumentation](https://www.electronjs.org/docs/api/web-frame-main).
* `App` API-Änderungen:
    * Nicht lokalisierte `serviceName` wurde `'child-process-gone'` / `app.getAppMetrics()`hinzugefügt. [#25975](https://github.com/electron/electron/pull/25975)
    * Neue `app.runningUnderRosettaTranslation` -Eigenschaft hinzugefügt, um zu erkennen, wenn sie unter Rosetta auf Apple-Silizium ausgeführt wird. [#26444](https://github.com/electron/electron/pull/26444)
    * `exitCode` zu `render-process-gone` Details hinzugefügt (App & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` API-Änderungen:
    * `BrowserWindow.isTabletMode()` -API hinzugefügt. [#25209](https://github.com/electron/electron/pull/25209)
    * `resized` (Windows/macOS) und `moved` (Windows) Ereignisse zu `BrowserWindow`hinzugefügt. [#26216](https://github.com/electron/electron/pull/26216)
    * Neue `system-context-menu` -Ereignis hinzugefügt, um das Systemkontextmenü zu verhindern und zu überschreiben. [#25795](https://github.com/electron/electron/pull/25795)
    * `win.setTopBrowserView()` hinzugefügt, damit `BrowserView`s erhöht werden können. [#27713](https://github.com/electron/electron/pull/27713)
    * Es wurde `webPreferences.preferredSizeMode` hinzugefügt, um Größenansichten entsprechend der Mindestgröße ihres Dokuments zu ermöglichen. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` API-Änderungen:
    * Zulässige ContextBridge- `exposeInMainWorld` Methode zum Verfügbarmachen von Nicht-Objekt-APIs. [#26834](https://github.com/electron/electron/pull/26834)
* `display` API-Änderungen:
    * `displayFrequency` Eigenschaft zum `Display` -Objekt hinzugefügt, um informationen zur Aktualisierungsrate unter Windows zu erhalten. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` API-Änderungen:
    * Unterstützung für einige `chrome.management` -APIs wurde hinzugefügt. [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` API-Änderungen:
    * Unterstützung für die Anzeige des macOS-Freigabemenüs wurde hinzugefügt. [#25629](https://github.com/electron/electron/pull/25629)
* `net` API-Änderungen:
    * Es wurde eine neue `credentials` Option für `net.request()`hinzugefügt. [#25284](https://github.com/electron/electron/pull/25284)
    * Es wurde `net.online` hinzugefügt, um festzustellen, ob derzeit eine Internetverbindung besteht. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API-Änderungen:
    * `powerMonitor.onBatteryPower`hinzugefügt. [#26494](https://github.com/electron/electron/pull/26494)
    * Schnelles Benutzerwechselereignis zu powerMonitor unter macOS hinzugefügt. [#25321](https://github.com/electron/electron/pull/25321)
* `Sitzung` API-Änderungen:
    * `allowFileAccess` Option zum `ses.loadExtension()` -API hinzugefügt. [#27702](https://github.com/electron/electron/pull/27702)
    * `display-capture` API für `session.setPermissionRequestHandler`hinzugefügt. [#27696](https://github.com/electron/electron/pull/27696)
    * Es wurde eine `disabledCipherSuites` Option zum `session.setSSLConfig`hinzugefügt. [#25818](https://github.com/electron/electron/pull/25818)
    * `session``extension-loaded`, `extension-unloaded`und `extension-ready` Ereignisse hinzugefügt. [#25385](https://github.com/electron/electron/pull/25385)
    * `session.setSSLConfig()` hinzugefügt, um die Konfiguration von SSL zu ermöglichen. [#25461](https://github.com/electron/electron/pull/25461)
    * Unterstützung für die explizite Angabe von `direct`, `auto_detect` oder `system` Modi in `session.setProxy()`hinzugefügt. [#24937](https://github.com/electron/electron/pull/24937)
    * [Unterstützung für serial API](https://web.dev/serial/) hinzugefügt. [#25237](https://github.com/electron/electron/pull/25237)
    * APIs wurden hinzugefügt, um die Rechtschreibprüfung zu aktivieren/deaktivieren. [#26276](https://github.com/electron/electron/pull/26276)
* `Shell` API-Änderungen:
    * Es wurde eine neue asynchrone `shell.trashItem()` -API hinzugefügt, die die synchrone `shell.moveItemToTrash()`ersetzt. [#25114](https://github.com/electron/electron/pull/25114)
* `WebContents` API-Änderungen:
    * Es wurde ein kleiner Konsolenhinweis zur Konsole hinzugefügt, um den Rendererabstürze zu debuggen. [#25317](https://github.com/electron/electron/pull/25317)
    * `frame` und `webContents` Eigenschaften zum Detailobjekt in webRequest-Handlern hinzugefügt. [#27334](https://github.com/electron/electron/pull/27334)
    * `webContents.forcefullyCrashRenderer()` hinzugefügt, um einen Rendererprozess gewaltsam zu beenden, um die Wiederherstellung eines hängenden Renderers zu unterstützen. [#25580](https://github.com/electron/electron/pull/25580)
    * Es wurde `setWindowOpenHandler` API für vom Renderer erstellte untergeordnete Fenster hinzugefügt, und `new-window` Ereignis abwerten. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API-Änderungen:
    * Rechtschreibprüfungs-API für den Renderer hinzugefügt. [#25060](https://github.com/electron/electron/pull/25060)

### Entfernte/veraltete Änderungen

Die folgenden APIs wurden entfernt oder sind jetzt veraltet:

* Das `remote` Modul wurde veraltet. Er wird durch [`@electron/remote`](https://github.com/electron/remote)ersetzt. [#25293](https://github.com/electron/electron/pull/25293)
* Veraltete `crashReporter` -APIs wurden entfernt. [#26709](https://github.com/electron/electron/pull/26709)
* Links zur Electron-Website aus dem Standardmenü "Hilfe" in verpackten Apps entfernt. [#25831](https://github.com/electron/electron/pull/25831)

## Ende der Unterstützung für 9.x.y

Electron 9.x.y hat gemäß der [Support-Richtlinie des Projekts](https://electronjs.org/docs/tutorial/support#supported-versions)das Ende der Unterstützung erreicht. Entwickler und Anwendungen werden ermutigt, auf eine neuere Version von Electron zu aktualisieren.

## Was ist als Nächstes

Kurzfristig Sie können erwarten, dass sich das Team weiterhin auf die Entwicklung der wichtigsten Komponenten konzentriert, aus denen Electron besteht, einschließlich Chromium, Knoten und V8. Obwohl wir darauf achten, keine Versprechungen über Veröffentlichungstermine zu machen, unser Plan ist die Veröffentlichung neuer Hauptversionen von Electron mit neuen Versionen dieser Komponenten etwa vierteljährlich. Der [vorläufigen 13.0.0-Zeitplan](https://electronjs.org/docs/tutorial/electron-timelines) die wichtigsten Daten im Entwicklungslebenszyklus von Electron 13.0 abbildet. Siehe [auch unser Versionierungsdokument](https://electronjs.org/docs/tutorial/electron-versioning) für genauere Informationen zur Versionierung in Electron.

Für Informationen über geplante Änderungen in zukünftigen Versionen von Electron, [lesen Sie unseren geplanten Breaking Changes Doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
