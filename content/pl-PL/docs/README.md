Upewnij się, że dokumentacja dotyczy twojej wersji Electrona. Numer wersji powinien być zawarty w URL tej strony. Jeżeli nie jest, prawdopodobnie przeglądasz dokumentację gałęzi deweloperskiej, która może zawierać zmiany w API, które nie są kompatybilne z twoją wersją Electrona. Aby przeglądać starsze wersje dokumentacji, możesz [przeglądać tagami](https://github.com/electron/electron/tree/v1.4.0) na GitHubie, rozwijając pole "Zmień gałąź/tagi" oraz wybierając tag, który odpowiada twojej wersji.

## FAQ

Istnieje kilka pytań, które są bardzo często zadawane. Przeglądnij je, zanim stworzysz zapytanie:

* [Electron FAQ](faq.md)

## Przewodniki

* [Słownik Terminów](glossary.md)
* [Wspierane Platformy](tutorial/supported-platforms.md)
* [Bezpieczeństwo](tutorial/security.md)
* [Numer Wersji](tutorial/electron-versioning.md)
* [Dystrybuowanie Aplikacji](tutorial/application-distribution.md)
* [Dodawanie aplikacji do Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Dodawanie aplikacji do Windows Store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Pakowanie Aplikacji](tutorial/application-packaging.md)
* [Używanie Natywnych Modułów Node.JS](tutorial/using-native-node-modules.md)
* [Debugowanie Głównego Wątku](tutorial/debugging-main-process.md)
* [Używanie Selenium oraz WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Rozszerzenie DevTools](tutorial/devtools-extension.md)
* [Używanie Pluginu Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Używanie Pluginu Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Testowanie na Systemach Beznagłówkowych (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Renderowanie Pozaekranowe](tutorial/offscreen-rendering.md)
* [Skróty Klawiszowe](tutorial/keyboard-shortcuts.md)
* [Aktualizowanie aplikacji](tutorial/updates.md)

## Poradniki

* [Pierwsze Kroki](tutorial/quick-start.md)
* [Integracja z Powłoką Systemową](tutorial/desktop-environment-integration.md)
* [Wykrywanie Wydarzeń Offline oraz Online](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Natywne Powiadomienia](tutorial/notifications.md)

## API

* [Streszczenie](api/synopsis.md)
* [Obiekt Process](api/process.md)
* [Wspierane Zmienne Konsoli Chrome](api/chrome-command-line-switches.md)
* [Zmienne Środowiskowe](api/environment-variables.md)

### Własne Elementy DOM:

* [Obiekt `File`](api/file-object.md)
* [Tag `<webview>`](api/webview-tag.md)
* [Funkcja `window.open`](api/window-open.md)

### Moduły Głównego Wątku:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [zakupy w aplikacji](api/in-app-purchase.md)
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

### Moduły Procesu Renderowania (Strony Internetowej):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Moduły wspólne obu procesów:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Rozwój

* [Styl Kodowania](development/coding-style.md)
* [Używanie formatu clang w kodzie C++](development/clang-format.md)
* [Testowanie](development/testing.md)
* [Struktura Ścieżki Kodu Źródłowego](development/source-code-directory-structure.md)
* [Techniczne Różnice wobec NW.js (wcześniej node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Przegląd Systemu Budowania](development/build-system-overview.md)
* [Instrukcje Budowania (macOS)](development/build-instructions-osx.md)
* [Instrukcje Budowania (Windows)](development/build-instructions-windows.md)
* [Instrukcje Budowania (Linux)](development/build-instructions-linux.md)
* [Instrukcje Debugowania (macOS)](development/debugging-instructions-macos.md)
* [Instrukcje Debugowania (Windows)](development/debug-instructions-windows.md)
* [Ustawianie Serwera Symboli w Debuggerze](development/setting-up-symbol-server.md)
* [Formatowanie Dokumentacji](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Aktualizacja Chromium](development/upgrading-chromium.md)
* [Programowanie Chrome](development/chromium-development.md)
* [Rozwój V8](development/v8-development.md)