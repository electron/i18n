Si prega di assicurarsi di usare la documentazione corrispondente alla versione in uso di Electron. Il numero di versione dovrebbe essere una parte dell'URL della pagina. Se non lo è, probabilmente si sta utilizzando la documentazione di un ramo di sviluppo che può contenere modifiche alle API che non sono compatibili con la versione di Electron in uso. Per visualizzare le versioni precedenti della documentazione, è possibile [navigare per tag](https://github.com/electron/electron/tree/v1.4.0) su GitHub aprendo il menu a tendina "Switch branches/tags" e selezionando il tag che corrisponde alla versione in uso.

## FAQ (Domande frequenti)

Ci sono domande che vengono poste molto spesso. Prova a vedere qui prima di proporne una nuova:

* [Domande frequenti su Electron](faq.md)

## Guide

* [Glossario dei termini](glossary.md)
* [Piattaforme supportate](tutorial/supported-platforms.md)
* [Sicurezza](tutorial/security.md)
* [Versionamento di Electron](tutorial/electron-versioning.md)
* [Distribuzione delle applicazioni](tutorial/application-distribution.md)
* [Guida alla pubblicazione su Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Guida a Windows Store](tutorial/windows-store-guide.md)
* [Packaging delle applicazioni](tutorial/application-packaging.md)
* [Uso dei moduli nativi di Node](tutorial/using-native-node-modules.md)
* [Debug del processo principale](tutorial/debugging-main-process.md)
* [Uso di Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Estensione DevTools](tutorial/devtools-extension.md)
* [Uso del plugin Flash Pepper](tutorial/using-pepper-flash-plugin.md)
* [Uso del plugin Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Test su sistemi Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Rendering Offscreen](tutorial/offscreen-rendering.md)
* [Scorciatoie da tastiera](tutorial/keyboard-shortcuts.md)

## Tutorial

* [Inizio rapido](tutorial/quick-start.md)
* [Integrazione con ambiente Desktop](tutorial/desktop-environment-integration.md)
* [Rilevamento di eventi online/offline](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Notifiche native](tutorial/notifications.md)

## Riferimenti API

* [Sinossi](api/synopsis.md)
* [Oggetto Process](api/process.md)
* [Opzioni di Chrome supportate da riga di comando](api/chrome-command-line-switches.md)
* [Variabili di ambiente](api/environment-variables.md)

### Elementi DOM personalizzati:

* [Oggetto `File`](api/file-object.md)
* [Tag `<webview>`](api/webview-tag.md)
* [Funzione `Window. Open`](api/window-open.md)

### Moduli del processo principale:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Moduli del processo Renderer (pagina Web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Moduli di entrambi i processi:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Sviluppo

* [Stile Codice](development/coding-style.md)
* [Uso di clang-format nel codice C++](development/clang-format.md)
* [Struttura della cartella del codice sorgente](development/source-code-directory-structure.md)
* [Differenze tecniche da NW.js (ex node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)