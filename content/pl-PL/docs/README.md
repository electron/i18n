Upewnij się, że dokumentacja dotyczy twojej wersji Electrona. Numer wersji powinien być zawarty w URL tej strony. Jeżeli nie jest, prawdopodobnie przeglądasz dokumentację gałęzi deweloperskiej, która może zawierać zmiany w API, które nie są kompatybilne z twoją wersją Electrona. Aby przeglądać starsze wersje dokumentacji, możesz [przeglądać tagami](https://github.com/electron/electron/tree/v1.4.0) na GitHubie, rozwijając pole "Zmień gałąź/tagi" oraz wybierając tag, który odpowiada twojej wersji.

## FAQ

Istnieje kilka pytań, które są bardzo często zadawane. Przeglądnij je, zanim stworzysz zapytanie:

* [Electron FAQ](faq.md)

## Poradniki

* [Słownik terminów](glossary.md)
* [Wspierane platformy](tutorial/supported-platforms.md)
* [Bezpieczeństwo](tutorial/security.md)
* [Wersjonowanie wersji Electrona](tutorial/electron-versioning.md)
* [Dystrybuowanie Aplikacji](tutorial/application-distribution.md)
* [Dodawanie aplikacji do Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Dodawanie aplikacji do Windows Store](tutorial/windows-store-guide.md)
* [Pakowanie Aplikacji](tutorial/application-packaging.md)
* [Używanie Natywnych Modułów Node.JS](tutorial/using-native-node-modules.md)
* [Debugowanie Głównego Wątku](tutorial/debugging-main-process.md)
* [Używanie Selenium oraz WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Rozszerzenie DevTools](tutorial/devtools-extension.md)
* [Używanie Pluginu Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Używanie Pluginu Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Testowanie na Systemach Beznagłówkowych (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)

## Tutorials

* [Quick Start](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## API References

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### Custom DOM Elements:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### Modules for the Main Process:

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

### Modules for the Renderer Process (Web Page):

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

## Development

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
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
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)