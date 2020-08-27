# Oficjalne Poradniki

Upewnij się, że dokumentacja dotyczy twojej wersji Electrona. Numer wersji powinien być zawarty w adresie URL tej strony. Jeżeli nie jest, prawdopodobnie przeglądasz dokumentację gałęzi deweloperskiej, która może zawierać zmiany w API, które nie są kompatybilne z twoją wersją Electrona. Aby przeglądać starsze wersje dokumentacji, możesz [przeglądać tagami](https://github.com/electron/electron/tree/v1.4.0) na GitHubie, rozwijając pole "Zmień gałąź/tagi" oraz wybierając tag, który odpowiada twojej wersji.

## FAQ

To są pytania, które są zadawane dość często. Sprawdź to przed utworzeniem issue:

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
* [Boilerplates i CLI](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Inne narzędzia i boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Architektura aplikacji](tutorial/application-architecture.md)
  * [Proces główny i renderer](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Używanie API Electrona](tutorial/application-architecture.md#using-electron-apis)
  * [Używanie API Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Używanie Natywnych Modułów Node.js](tutorial/using-native-node-modules.md)
  * [Strategie skuteczności](tutorial/performance.md)
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
  * [Wsparcie dla Ciemnego Motywu w macOS](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Dostępność](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Włączanie ułatwień dostępu](tutorial/accessibility.md#enabling-accessibility)
* [Testowania i debugowanie](tutorial/application-debugging.md)
  * [Debugowanie Głównego Wątku](tutorial/debugging-main-process.md)
  * [Debugowanie Głównego Wątku przy użyciu Visual Studio Code](tutorial/debugging-main-process-vscode.md)
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
* [Bezpieczeństwo](tutorial/security.md)
  * [Zgłaszanie Problemów z Bezpieczeństwem](tutorial/security.md#reporting-security-issues)
  * [Problemy z Bezpieczeństwem i Aktualizacje Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Ostrzeżenia bezpieczeństwa Electrona](tutorial/security.md#electron-security-warnings)
  * [Lista kontrolna zabezpieczeń](tutorial/security.md#checklist-security-recommendations)
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
* [Używanie Pluginu Pepper Flash](tutorial/using-pepper-flash-plugin.md)

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
