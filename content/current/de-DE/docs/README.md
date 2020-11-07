# Offizielle Anleitungen

Bitte nutze die Dokumentation, die mit der Version von Electron übereinstimmt. Die Versionsnummer sollte ein Bestandteil der Seiten-URL sein. Andernfalls nutzen Sie möglicherweise unbeabsichtigt die Dokumentation einer Version von Electron, die Änderungen der API enthält, die mit Ihrer Version von Electron nicht kompatibel sind. Um sich ältere Versionen der Dokumentation anzuschauen, können Sie auf GitHub [nach Tag filtern](https://github.com/electron/electron/tree/v1.4.0) indem Sie das Dropdownmenü "Switch branches/tags" öffnen und den Tag auswählen, der mit Ihrer Version übereinstimmt.

## Häufig gestellte Fragen

Es gibt sehr häufig gestellte Fragen. Prüfe das bitte vor dem Erstellen eines Issue:

* [Electron FAQ](faq.md)

## Leitfäden und Tutorials

* [Entwicklungsumgebung einrichten](tutorial/development-environment.md)
  * [Einrichtung auf macOSX](tutorial/development-environment.md#setting-up-macos)
  * [Einrichtung auf Windows](tutorial/development-environment.md#setting-up-windows)
  * [Einrichtung auf Linux](tutorial/development-environment.md#setting-up-linux)
  * [Wähle einen Editor](tutorial/development-environment.md#a-good-editor)
* [Erstelle deine erste App](tutorial/quick-start.md)
  * [Vorrausetzungen](tutorial/quick-start.md#prerequisites)
  * [Erstelle eine Basisanwendung](tutorial/quick-start.md#create-a-basic-application)
  * [Paket und verteilen Sie die Anwendung](tutorial/quick-start.md#package-and-distribute-the-application)
* [Boilerplates und CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Andere Tools und Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Anwendungsarchitektur](tutorial/quick-start.md#application-architecture)
  * [Haupt- und Renderprozesse](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [Native Node.js Module benutzen](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Features zu deiner App hinzufügen
  * [Benachrichtigungen](tutorial/notifications.md)
  * [Kürzliche Dokumente](tutorial/recent-documents.md)
  * [Anwendungsprozess](tutorial/progress-bar.md)
  * [Benutzerdefiniertes Dockmenu](tutorial/macos-dock.md)
  * [Benutzerdefinierte Windows Taskleiste](tutorial/windows-taskbar.md)
  * [Benutzerdefinierte Linux Desktop Aktionen](tutorial/linux-desktop-actions.md)
  * [Tastenkürzel](tutorial/keyboard-shortcuts.md)
  * [Offline/Online erkennung](tutorial/online-offline-events.md)
  * [Repräsentative Datei für macOS BrowserWindows](tutorial/represented-file.md)
  * [Natives Datei Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Webbetten in Electron](tutorial/web-embeds.md)
* [Barrierefreiheit](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Manuelle Aktivierung der Bedienungshilfen](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testen und Debuggen](tutorial/application-debugging.md)
  * [Debuggen des Hauptprozesses](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
  * [Verwendung von Selenium und WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testen auf Headless CI-Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Erweiterung](tutorial/devtools-extension.md)
  * [Automatisiertes Testen mit einem benutzerdefinierten Treiber](tutorial/automated-testing-with-a-custom-driver.md)
* [Verteilung](tutorial/application-distribution.md)
  * [Unterstützte Plattformen](tutorial/support.md#supported-platforms)
  * [Codesignatur](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Sicherheit](tutorial/security.md)
  * [Berichterstattung von Sicherheitsproblemen](tutorial/security.md#reporting-security-issues)
  * [Chromium Sicherheitsprobleme und Updates](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Sicherheitswarnungen](tutorial/security.md#electron-security-warnings)
  * [Sicherheits-Checkliste](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md)
  * [Bereitstellung eines Update-Servers](tutorial/updates.md#deploying-an-update-server)
  * [Implementieren von Updates in deiner App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Updates anwenden](tutorial/updates.md#applying-updates)
* [Support erhalten](tutorial/support.md)

## Detaillierte Tutorials

Diese individuellen Tutorials bauen auf den Themen auf, die in dem Handbuch weiter oben diskutiert wurden.

* [Installiere Electron](tutorial/installation.md)
  * [Proxys](tutorial/installation.md#proxies)
  * [Benutzerdefinierte Mirrors und Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Problemlösungen](tutorial/installation.md#troubleshooting)
* Electron Veröffentlichungen & Entwickler Feedback
  * [Versionsrichtlinie](tutorial/electron-versioning.md)
  * [Veröffentlichungszeitleisten](tutorial/electron-timelines.md)
* [Anwendungsquellcode packen mit asar](tutorial/application-packaging.md)
  * [asar Archive generieren](tutorial/application-packaging.md#generating-asar-archives)
  * [Verwenden von asar Archiven](tutorial/application-packaging.md#using-asar-archives)
  * [Einschränkungen](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Ungepackte Dateien zu asar Archiven hinzufügen](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM testen](tutorial/testing-widevine-cdm.md)

---

* [Glossar](glossary.md)

## API-Referenz

* [Übersicht](api/synopsis.md)
* [Prozess-Objekt](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Umgebungsvariablen](api/environment-variables.md)
* [Unterstützung für Chrome-Erweiterungen](api/extensions.md)
* [Breaking API Veränderungen](breaking-changes.md)

### Benutzerdefinierte DOM-Elemente:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funktion](api/window-open.md)
* [`BrowserWindowProxy` Objekt](api/browser-window-proxy.md)

### Module für den Hauptprozess:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [Browserfenster](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menü](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Mitteilung](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Fach](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Module für den Renderer-Prozess (Webseite):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Module für beide Prozesse:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Entwicklung

Siehe [development/README.md](development/README.md)
