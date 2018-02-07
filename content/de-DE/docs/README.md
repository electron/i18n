Bitte nutze die Dokumentation, die mit der Version von Electron übereinstimmt. Die Versionsnummer sollte ein Bestandteil der Seiten-URL sein. Andernfalls nutzen Sie möglicherweise unbeabsichtigt die Dokumentation einer Version von Electron, die Änderungen der API enthält, die mit Ihrer Version von Electron nicht kompatibel sind. Um sich ältere Versionen der Dokumentation anzuschauen, können Sie auf GitHub [nach Tag filtern](https://github.com/electron/electron/tree/v1.4.0) indem Sie das Dropdownmenü "Switch branches/tags" öffnen und den Tag auswählen, der mit Ihrer Version übereinstimmt.

## Häufig gestellte Fragen

Bevor Sie ein neues Thema ansprechen, schauen Sie bitte vorher in der Liste der häufig gestellten Fragen nach:

* [Electron FAQ](faq.md)

## Leitfäden

* [Glossar](glossary.md)
* [Unterstützte Plattformen](tutorial/supported-platforms.md)
* [Sicherheit](tutorial/security.md)
* [Versionierung](tutorial/electron-versioning.md)
* [Veröffentlichung der Anwendung](tutorial/application-distribution.md)
* [Veröffentlichung im Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Veröffentlichung im Windows Store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Anwendungspakete](tutorial/application-packaging.md)
* [Verwendung von Native Node Modules](tutorial/using-native-node-modules.md)
* [Debugging des Hauptprozesses](tutorial/debugging-main-process.md)
* [Verwendung von Selenium und WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools Erweiterung](tutorial/devtools-extension.md)
* [Verwendung des Pepper Flash-Plugins](tutorial/using-pepper-flash-plugin.md)
* [Verwendung des Widevine CDM-Plugins](tutorial/using-widevine-cdm-plugin.md)
* [Testen auf Headless CI-Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Tastenkürzel](tutorial/keyboard-shortcuts.md)
* [Anwendungen aktualisieren](tutorial/updates.md)

## Anleitungen

* [Schnellstart](tutorial/quick-start.md)
* [Integration der Desktop-Umgebung](tutorial/desktop-environment-integration.md)
* [Online/Offline Ereigniserkennung](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Benachrichtigungen](tutorial/notifications.md)

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
* [automatischerUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
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

* [Zwischenablage (clipboard)](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Entwicklung

* [Coding Style](development/coding-style.md)
* [clang-format im C++ Code verwenden](development/clang-format.md)
* [Testing](development/testing.md)
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
* [Upgrading Chromium](development/upgrading-chromium.md)
* [Chromium-Entwicklung](development/chromium-development.md)
* [V8 Entwicklung](development/v8-development.md)