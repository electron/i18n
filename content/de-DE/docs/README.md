# Offizielle Anleitungen

Bitte nutze die Dokumentation, die mit der Version von Electron übereinstimmt. Die Versionsnummer sollte ein Bestandteil der Seiten-URL sein. Andernfalls nutzen Sie möglicherweise unbeabsichtigt die Dokumentation einer Version von Electron, die Änderungen der API enthält, die mit Ihrer Version von Electron nicht kompatibel sind. Um sich ältere Versionen der Dokumentation anzuschauen, können Sie auf GitHub [nach Tag filtern](https://github.com/electron/electron/tree/v1.4.0) indem Sie das Dropdownmenü "Switch branches/tags" öffnen und den Tag auswählen, der mit Ihrer Version übereinstimmt.

## Häufig gestellte Fragen

Bevor Sie ein neues Thema ansprechen, schauen Sie bitte vorher in der Liste der häufig gestellten Fragen nach:

* [Electron FAQ](faq.md)

## Leitfäden und Tutorials

* [Über Electron](tutorial/about.md)
* [Entwicklungsumgebung einrichten](tutorial/development-environment.md) 
  * [Einrichtung auf macOS](tutorial/development-environment.md#setting-up-macos)
  * [Einrichtung auf Windows](tutorial/development-environment.md#setting-up-windows)
  * [Einrichtung auf Linux](tutorial/development-environment.md#setting-up-linux)
  * [Einen Editor wählen](tutorial/development-environment.md#a-good-editor)
* [Erstelle deine erste App](tutorial/first-app.md) 
  * [Installiere Electron](tutorial/first-app.md#installing-electron)
  * [Electron-Entwicklung auf einen Blick](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Starten deiner Anwendung](tutorial/first-app.md#running-your-app)
* [Boilerplates und CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Andere Tools und Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Anwendungsarchitektur](tutorial/application-architecture.md) 
  * [Haupt- und Render-Prozesse](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron's APIs benutzen](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js APIs verwenden](tutorial/application-architecture.md#using-nodejs-apis)
  * [Native Node.js Module benutzen](tutorial/using-native-node-modules.md)
* Features zu deiner App hinzufügen 
  * [Benachrichtigungen](tutorial/notifications.md)
  * [Zuletzt verwendete Dokumente](tutorial/recent-documents.md)
  * [Anwendungsprozess](tutorial/progress-bar.md)
  * [Benutzerdefiniertes Dockmenu](tutorial/macos-dock.md)
  * [Benutzerdefinierte Windows Taskleiste](tutorial/windows-taskbar.md)
  * [Benutzerdefinierte Linux Desktop Aktionen](tutorial/linux-desktop-actions.md)
  * [Tastenkürzel](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Erkennung](tutorial/online-offline-events.md)
  * [Repräsentative Datei für macOS BrowserWindows](tutorial/represented-file.md)
  * [Natives Datei Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [MakOS Dunkler Modus unterstützen](tutorial/mojave-dark-mode-guide.md)
* [Zugänglichkeit](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Zugänglichkeit aktivieren](tutorial/accessibility.md#enabling-accessibility)
* [Testen und Debuggen](tutorial/application-debugging.md) 
  * [Debuggen des Hauptprozesses](tutorial/debugging-main-process.md)
  * [Debuggen des Hauptprozesses mit Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Selenium und WebDriver nutzen](tutorial/using-selenium-and-webdriver.md)
  * [Testen auf Headless CI-Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Erweiterung](tutorial/devtools-extension.md)
  * [Automatisiertes Testen mit einem benutzerdefinierten Treiber](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Unterstützte Plattformen](tutorial/support.md#supported-platforms)
  * [Code Signierung](tutorial/code-signing.md)
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
  * [App Feedback Programm](tutorial/app-feedback-program.md)
* [Anwendungsquellcode packen mit asar](tutorial/application-packaging.md) 
  * [asar Archive generieren](tutorial/application-packaging.md#generating-asar-archives)
  * [Verwenden von asar Archiven](tutorial/application-packaging.md#using-asar-archives)
  * [Einschränkungen](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Ungepackte Dateien zu asar Archiven hinzufügen](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM testen](tutorial/testing-widevine-cdm.md)
* [Verwenden des Pepper Flash-Plugins](tutorial/using-pepper-flash-plugin.md)

* * *

* [Glossar](glossary.md)

## API-Referenz

* [Übersicht](api/synopsis.md)
* [Prozess-Objekt](api/process.md)
* [Unterstützte Chrome-Befehlszeilenoptionen](api/chrome-command-line-switches.md)
* [Umgebungsvariablen](api/environment-variables.md)
* [Breaking API Veränderungen](api/breaking-changes.md)

### Benutzerdefinierte DOM-Elemente:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funktion](api/window-open.md)
* [`BrowserWindowProxy` Objekt](api/browser-window-proxy.md)

### Module für den Hauptprozess:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

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

Siehe <development/README.md>