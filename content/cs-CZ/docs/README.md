Použijte prosím dokumentaci, která odpovídá vámi používanou Elektron verzi. Číslo verze by mělo být součástí URL. Pokud ne, používáte pravděpodobně dokumentaci vývojové větve, která může obsahovat změny v API, který nemusí být kompatibilní s vaší verzí Elektronu. Chcete-li zobrazit starší verze dokumentace, můžete na GitHubu využít možnost [Switch branches/tags](https://github.com/electron/electron/tree/v1.4.0) a tak pomocí značek přepnout na starší verzi.

## Časté dotazy

Zde jsou často pokládané otázky. Prosím zkontrolujte tento list před tím než vytvoříte problém:

* [Electron FAQ](faq.md)

## Průvodce

* [Slovníček pojmů](glossary.md)
* [Podporované platformy](tutorial/supported-platforms.md)
* [Bezpečnost](tutorial/security.md)
* [Správa verzí](tutorial/electron-versioning.md)
* [Distribuce aplikací](tutorial/application-distribution.md)
* [Mac App Store podání Průvodce](tutorial/mac-app-store-submission-guide.md)
* [Aplikace Windows Obchodu](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Aplikace balení](tutorial/application-packaging.md)
* [Používání nativních Node modulů](tutorial/using-native-node-modules.md)
* [Ladění hlavního procesu](tutorial/debugging-main-process.md)
* [Využití Selenium a WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools rozšíření](tutorial/devtools-extension.md)
* [Používání Pepper Flash Pluginu](tutorial/using-pepper-flash-plugin.md)
* [Pomocí Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testování na bezhlavý CI systémů (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen vykreslování](tutorial/offscreen-rendering.md)
* [Klávesové zkratky](tutorial/keyboard-shortcuts.md)
* [Aktualizace aplikací](tutorial/updates.md)

## Návody

* [Rychlý začátek](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## API Reference

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### Vlastní prvky DOM:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funkce](api/window-open.md)

### Moduly pro hlavní proces:

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
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Moduly pro renderovací proces (webová stránka):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Vývoj

* [Styl kódování](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Testing](development/testing.md)
* [Source Code Directory Structure](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Upgrading Chromium](development/upgrading-chromium.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)