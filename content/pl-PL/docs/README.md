# Oficialny Poradnik

Upewnij się, że dokumentacja dotyczy twojej wersji Electrona. Numer wersji powinien być zawarty w URL tej strony. Jeżeli nie jest, prawdopodobnie przeglądasz dokumentację gałęzi deweloperskiej, która może zawierać zmiany w API, które nie są kompatybilne z twoją wersją Electrona. Aby przeglądać starsze wersje dokumentacji, możesz [przeglądać tagami](https://github.com/electron/electron/tree/v1.4.0) na GitHubie, rozwijając pole "Zmień gałąź/tagi" oraz wybierając tag, który odpowiada twojej wersji.

## FAQ

Istnieje kilka pytań, które są bardzo często zadawane. Przeglądnij je, zanim stworzysz zapytanie:

* [Electron FAQ](faq.md)

## Poradniki i Samouczki

* [Konfigurowanie środowiska programistycznego](tutorial/development-environment.md) 
  * [Konfigurowanie systemu macOS](tutorial/development-environment.md#setting-up-macos)
  * [Konfigurowanie systemu Windows](tutorial/development-environment.md#setting-up-windows)
  * [Konfigurowanie systemu Linux](tutorial/development-environment.md#setting-up-linux)
  * [Wybieranie Edytora](tutorial/development-environment.md#a-good-editor)
* [Tworzenie pierwszej aplikacji](tutorial/first-app.md) 
  * [Instalowanie Electrona](tutorial/first-app.md#installing-electron)
  * [Rozwój Electrona w pigułce](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Uruchamianie Twojej aplikacji](tutorial/first-app.md#running-your-app)
* [Standardowe teksty i CLI](tutorial/boilerplates-and-clis.md) 
  * [Teskt standardowy vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Inne narzędzia i teksty standardowe](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Architektura aplikacji](tutorial/application-architecture.md) 
  * [Proces główny i renderer](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Używanie z API Electrona](tutorial/application-architecture.md#using-electron-apis)
  * [Używanie z API Node.js](tutorial/application-architecture.md#using-node.js-apis)
  * [Używanie Natywnych Modułów Node.js](tutorial/using-native-node-modules.md)
  * [Komunikacja między procesami](tutorial/application-architecture.md#)
* Dodawanie funkcji do aplikacji 
  * [Powiadomienia](tutorial/notifications.md)
  * [Ostatnie dokumenty](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Postęp aplikacji](tutorial/progress-bar.md)
  * [Niestandardowe Menu Docka](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Niestandardowy Pasek Zadań systemu Windows](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Skróty Klawiszowe](tutorial/keyboard-shortcuts.md)
  * [Wykrywanie trybu offline/Online](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Natywne przeciąganie i upuszczanie plików](tutorial/native-file-drag-drop.md)
* [Dostępność](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Włączanie ułatwień dostępu](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugowanie Głównego Wątku](tutorial/debugging-main-process.md)
  * [Używanie Selenium oraz WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testowanie na Systemach Beznagłówkowych (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Rozszerzenie DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Sklep Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Bezpieczeństwo](tutorial/security.md) 
  * [Zgłaszanie Błędów Bezpieczeństwa](tutorial/security.md#reporting-security-issues)
  * [Bezpieczeństwa i uaktualnienia Chrominum](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Ostrzeżenia bezpieczeństwa Electrona](tutorial/security.md#electron-security-warnings)
  * [Lista kontrolna zabezpieczeń](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Wdrażanie aktualizacji serwera](tutorial/updates.md#deploying-an-update-server)
  * [Wdrażanie aktualizacji do twojej aplikacji](tutorial/updates.md#implementing-updates-in-your-app)
  * [Stosowanie aktualizacji](tutorial/updates.md#applying-updates)

## Szczegółowe poradniki

Te poszczególne poradniki rozwijają tematy omówione w przewodniku powyżej.

* [Szczegółowo: Instalowanie Electrona](tutorial/installation.md) 
  * [Globalna a Lokalna instalacja](tutorial/installation.md#global-versus-local-installation)
  * [Proxy](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Rozwiązywanie problemów](tutorial/installation.md#troubleshooting)
* [Szczegółowo: Schemat Wersjonowania Electrona](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilizacja gałęzi](tutorial/electron-versioning.md#stabilization-branches)
  * [Wersje beta i poprawki błędów](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [Szczegółowo: Pakowanie Kodu Źródłowego z asar](tutorial/application-packaging.md) 
  * [Generowanie Archiwów asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Używanie Archiwów asar](tutorial/application-packaging.md#using-asar-archives)
  * [Ograniczenia](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Dodawanie rozpakowanych Plików do Archiwów asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Szczegółowo: Używanie Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Renderowanie Pozaekranowe](tutorial/offscreen-rendering.md)

* * *

* [Słownik Terminów](glossary.md)

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

Zobacz <development/README.md>