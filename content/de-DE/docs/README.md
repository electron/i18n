# Offizielle Anleitungen

Bitte nutze die Dokumentation, die mit der Version von Electron übereinstimmt. Die Versionsnummer sollte ein Bestandteil der Seiten-URL sein. Andernfalls nutzen Sie möglicherweise unbeabsichtigt die Dokumentation einer Version von Electron, die Änderungen der API enthält, die mit Ihrer Version von Electron nicht kompatibel sind. Um sich ältere Versionen der Dokumentation anzuschauen, können Sie auf GitHub [nach Tag filtern](https://github.com/electron/electron/tree/v1.4.0) indem Sie das Dropdownmenü "Switch branches/tags" öffnen und den Tag auswählen, der mit Ihrer Version übereinstimmt.

## Häufig gestellte Fragen

Bevor Sie ein neues Thema ansprechen, schauen Sie bitte vorher in der Liste der häufig gestellten Fragen nach:

* [Electron FAQ](faq.md)

## Leitfäden und Tutorials

* [Entwicklungsumgebung einrichten](tutorial/development-environment.md) 
  * [Einrichtung auf macOSX](tutorial/development-environment.md#setting-up-macos)
  * [Einrichtung auf Windows](tutorial/development-environment.md#setting-up-windows)
  * [Einrichtung auf Linux](tutorial/development-environment.md#setting-up-linux)
  * [Wähle einen Editor](tutorial/development-environment.md#a-good-editor)
* [Erstelle deine erste App](tutorial/first-app.md) 
  * [Installiere Electron](tutorial/first-app.md#installing-electron)
  * [Electron-Entwicklung auf einen Blick](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Ihre App ausführen](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Anwendungsarchitektur](tutorial/application-architecture.md) 
  * [Main und Render Prozesse](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron's APIs benutzen](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js APIs benutzen](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Features zu deiner App hinzufügen 
  * [Benachrichtigungen](tutorial/notifications.md)
  * [Kürzliche Dokumente](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Anwendungsprozess](tutorial/progress-bar.md)
  * [Benutzerdefiniertes Dockmenu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Benutzerdefinierte Windows Taskleiste](tutorial/windows-taskbar.md)
  * [Benutzerdefinierte Linux Desktop Aktionen](tutorial/linux-desktop-actions.md)
  * [Tastenkürzel](tutorial/keyboard-shortcuts.md)
  * [Offline/Online erkennung](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Application Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Barrierefreiheit aktivieren](tutorial/accessibility.md#enabling-accessibility)
* [Testen und debuggen der App](tutorial/application-debugging.md) 
  * [Debuggen des Hauptprozesses](tutorial/debugging-main-process.md)
  * [Verwendung von Selenium und WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testen auf Headless CI-Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools Erweiterung](tutorial/devtools-extension.md)
* [Veröffentlichung der Anwendung](tutorial/application-distribution.md) 
  * [Unterstützte Plattformen](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Anwendungssicherheit](tutorial/security.md) 
  * [Berichterstattung von Sicherheitsproblemen](tutorial/security.md#reporting-security-issues)
  * [Chromium Sicherheitsprobleme und Updates](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Sicherheitswarnungen](tutorial/security.md#electron-security-warnings)
  * [Sicherheits-Checkliste](tutorial/security.md#checklist-security-recommendations)
* [Updaten der App](tutorial/updates.md) 
  * [Bereitstellung eines Update-Servers](tutorial/updates.md#deploying-an-update-server)
  * [Implementieren von Updates in deiner App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Updates anwenden](tutorial/updates.md#applying-updates)

## detaillierte Tutorials

Diese individuellen Tutorials erweitern die Überschriften aus dem Guide obendrüber.

* [Im Detail: Electron installieren](tutorial/installation.md) 
  * [Globale vs. lokale Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxys](tutorial/installation.md#proxies)
  * [Benutzerdefinierte Mirrors und Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Problemlösungen](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabillisations Branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Asar Archive generieren](tutorial/application-packaging.md#generating-asar-archives)
  * [Verwenden von asar Archiven](tutorial/application-packaging.md#using-asar-archives)
  * [Einschränkungen](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Ungepacket Dateien zu Asar Archiven hinzufügen](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)

* * *

* [Glossar](glossary.md)

## API-Referenz

* [Übersicht](api/synopsis.md)
* [Prozess-Objekt](api/process.md)
* [Unterstützte Chrome-Befehlszeilenoptionen](api/chrome-command-line-switches.md)
* [Umgebungsvariablen](api/environment-variables.md)

### Benutzerdefinierte DOM-Elemente:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funktion](api/window-open.md)

### Module für den Hauptprozess:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [Browserfenster](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [In-App-Käufe](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menü](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Fach](api/tray.md)
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
* [screen](api/screen.md)
* [shell](api/shell.md)

## Entwicklung

* [Coding Style](development/coding-style.md)
* [clang-format im C++ Code verwenden](development/clang-format.md)
* [Testen](development/testing.md)
* [Struktur des Quellcode-Verzeichnisses](development/source-code-directory-structure.md)
* [Technische Unterschiede zum NW.js (ehemals node-Webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Übersicht](development/build-system-overview.md)
* [Build Anweisungen (macOS)](development/build-instructions-osx.md)
* [Build Anweisungen (Windows)](development/build-instructions-windows.md)
* [Build Anweisungen (Linux)](development/build-instructions-linux.md)
* [Debug Anweisungen (macOS)](development/debugging-instructions-macos.md)
* [Debug Anweisungen (Windows)](development/debug-instructions-windows.md)
* [Einen Symbol-Server im Debugger einrichten](development/setting-up-symbol-server.md)
* [Gestaltungsrichtlinien für die Dokumentation](styleguide.md)
* [Zu Electron beitragen](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Chrominum upgraden](development/upgrading-chromium.md)
* [Chromium-Entwicklung](development/chromium-development.md)
* [V8 Entwicklung](development/v8-development.md)