# Oficjalne Poradniki

Upewnij się, że dokumentacja dotyczy twojej wersji Electrona. Numer wersji powinien być zawarty w adresie URL tej strony. Jeżeli nie jest, prawdopodobnie przeglądasz dokumentację gałęzi deweloperskiej, która może zawierać zmiany w API, które nie są kompatybilne z twoją wersją Electrona. Aby przeglądać starsze wersje dokumentacji, możesz [przeglądać tagami](https://github.com/electron/electron/tree/v1.4.0) na GitHubie, rozwijając pole "Zmień gałąź/tagi" oraz wybierając tag, który odpowiada twojej wersji.

## FAQ

To są pytania, które są zadawane dość często. Sprawdź to przed utworzeniem issue:

* [Electron FAQ](faq.md)

## Poradniki i Samouczki

### Szybki start

* [Przewodnik szybkiego startu](tutorial/quick-start.md)
  * [Wymagania](tutorial/quick-start.md#prerequisites)
  * [Utwórz podstawową aplikację](tutorial/quick-start.md#create-a-basic-application)
  * [Uruchom aplikację](tutorial/quick-start.md#run-your-application)
  * [Pakiet i dystrybucja aplikacji](tutorial/quick-start.md#package-and-distribute-the-application)

### Nauka podstaw

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Proces główny i renderer](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Nodej.js API](tutorial/quick-start.md#nodejs-api)
* Dodawanie funkcji do twojej aplikacji
  * [Powiadomienia](tutorial/notifications.md)
  * [Ostatnie dokumenty](tutorial/recent-documents.md)
  * [Postęp aplikacji](tutorial/progress-bar.md)
  * [Niestandardowe Dock Menu](tutorial/macos-dock.md)
  * [Niestandardowy Pasek Zadań systemu Windows](tutorial/windows-taskbar.md)
  * [Niestandardowe akcje pulpitu w systemie Linux](tutorial/linux-desktop-actions.md)
  * [Skróty Klawiszowe](tutorial/keyboard-shortcuts.md)
  * [Wykrywanie trybu offline/online](tutorial/online-offline-events.md)
  * [Reprezentowany plik dla macOS BrowserWindows](tutorial/represented-file.md)
  * [Natywne przeciąganie i upuszczanie plików](tutorial/native-file-drag-drop.md)
  * [Renderowanie Pozaekranowe](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Web osadza się w Electron](tutorial/web-embeds.md)
* [Boilerplates i CLI](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Inne narzędzia i boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Zaawansowane kroki

* Architektura aplikacji
  * [Używanie Natywnych Modułów Node.js](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Dostępność](tutorial/accessibility.md)
  * [Ręczne włączanie funkcji ułatwień dostępu](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testowania i debugowanie](tutorial/application-debugging.md)
  * [Debugowanie Głównego Wątku](tutorial/debugging-main-process.md)
  * [Debugowanie z Visual Studio Code](tutorial/debugging-vscode.md)
  * [Używanie Selenium oraz WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testowanie na Systemach Beznagłówkowych (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Rozszerzenie DevTools](tutorial/devtools-extension.md)
  * [Automatyczne testowania z pomocą niestandardowego sterownika](tutorial/automated-testing-with-a-custom-driver.md)
* [Dystrybucja](tutorial/application-distribution.md)
  * [Wspierane Platformy](tutorial/support.md#supported-platforms)
  * [Podpisywanie kodu](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Sklep Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Aktualizacje](tutorial/updates.md)
  * [Wdrażanie aktualizacji serwera](tutorial/updates.md#deploying-an-update-server)
  * [Wdrażanie aktualizacji do twojej aplikacji](tutorial/updates.md#implementing-updates-in-your-app)
  * [Stosowanie aktualizacji](tutorial/updates.md#applying-updates)
* [Uzyskiwanie wsparcia](tutorial/support.md)

## Szczegółowe poradniki

Te poszczególne poradniki rozwijają tematy omówione w przewodniku powyżej.

* [Instalowanie Electrona](tutorial/installation.md)
  * [Proxy](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Rozwiązywanie problemów](tutorial/installation.md#troubleshooting)
* Wydania Electrona & Developerski Feedback
  * [Polityka Wersjonowania](tutorial/electron-versioning.md)
  * [Oś czasu poszczególnych wydań](tutorial/electron-timelines.md)
* [Szczegółowo: Pakowanie Kodu Źródłowego z asar](tutorial/application-packaging.md)
  * [Generowanie Archiwów asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Używanie Archiwów asar](tutorial/application-packaging.md#using-asar-archives)
  * [Ograniczenia](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Dodawanie rozpakowanych Plików do Archiwów asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testowanie Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Słownik Terminów](glossary.md)

## Referencje API

* [Streszczenie](api/synopsis.md)
* [Process Object](api/process.md)
* [Wspierane Zmienne Konsoli](api/command-line-switches.md)
* [Zmienne Środowiskowe](api/environment-variables.md)
* [Obsługa rozszerzeń Chrome](api/extensions.md)
* [Istotne zmiany w API](breaking-changes.md)

### Własne Elementy DOM:

* [Obiekt `File`](api/file-object.md)
* [Tag `<webview>`](api/webview-tag.md)
* [Funkcja `window.open`](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Moduły Głównego Wątku:

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
* [nativeTheme](api/native-theme.md)
* [Powiadomienie](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Moduły Procesu Renderowania (Strony Internetowej):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Moduły wspólne dla obu procesów:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Rozwój

Zobacz [development/README.md](development/README.md)
