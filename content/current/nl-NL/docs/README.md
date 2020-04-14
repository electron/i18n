# Officiële Handleidingen

Wees er zeker van dat je de documenten gebruikt die overeenkomen met jouw Electron versie. Het versienummer moet deel uitmaken van de URL van de pagina. Als dit niet zo is, gebruik je mogelijk de documentatie van een ontwikkelingstak die mogelijk API veranderingen bevat die niet compatibel zijn met jouw Electron versie. Om oudere versies van de documentatie te tonen, kun je [op tag bladeren](https://github.com/electron/electron/tree/v1.4.0) op GitHub door de "Switch branches/tags" dropdown te openen en de tag te selecteren die overeenkomt met jouw versie.

## Veelgestelde vragen (FAQ)

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)

## Handleidingen en Tutorials

* [Een Ontwikkelingsomgeving opzetten](tutorial/development-environment.md)
  * [MacOS instellen](tutorial/development-environment.md#setting-up-macos)
  * [Windows instellen](tutorial/development-environment.md#setting-up-windows)
  * [Linux instellen](tutorial/development-environment.md#setting-up-linux)
  * [Een tekstbewerker kiezen](tutorial/development-environment.md#a-good-editor)
* [Maak je eerste App](tutorial/first-app.md)
  * [Electron installeren](tutorial/first-app.md#installing-electron)
  * [Electron Development in een notendop](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Je App starten](tutorial/first-app.md#running-your-app)
* [Boilerplates en CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Andere Tools en Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Applicatie architectuur](tutorial/application-architecture.md)
  * [Hoofd en Renderer Processen](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Het gebruik maken van Electron's API's](tutorial/application-architecture.md#using-electron-apis)
  * [Het gebruik maken van Node.js API's](tutorial/application-architecture.md#using-nodejs-apis)
  * [Het gebruik maken van Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Toevoegen van functionaliteit aan uw App
  * [Notificaties](tutorial/notifications.md)
  * [Recente documenten](tutorial/recent-documents.md)
  * [Voortgang van de applicatie](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taakbalk](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Acties](tutorial/linux-desktop-actions.md)
  * [Toetsencombinaties](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detectie](tutorial/online-offline-events.md)
  * [Representatief bestand voor macOS BrowserWindows](tutorial/represented-file.md)
  * [Drag & Drop Bestanden](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Supporting macOS Dark Mode](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Accessibility](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Toegankelijkheid beschikbaar maken](tutorial/accessibility.md#enabling-accessibility)
* [Testen en Debuggen](tutorial/application-debugging.md)
  * [Debuggen van het hoofd proces](tutorial/debugging-main-process.md)
  * [Debuggen van het hoofdproces met Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Het gebruik maken van Selenium en WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testen op Headless CI systemen (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools extensie](tutorial/devtools-extension.md)
  * [Geautomatiseerd testen met een aangepast stuurprogramma](tutorial/automated-testing-with-a-custom-driver.md)
* [Distributie](tutorial/application-distribution.md)
  * [Ondersteunde platformen](tutorial/support.md#supported-platforms)
  * [Code signeren](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Beveiliging](tutorial/security.md)
  * [Melden van beveiligingsproblemen](tutorial/security.md#reporting-security-issues)
  * [Chromium beveiligingsproblemen en upgrades](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron beveiligingswaarschuwingen](tutorial/security.md#electron-security-warnings)
  * [Beveiligingschecklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md)
  * [Een Update Server implementeren](tutorial/updates.md#deploying-an-update-server)
  * [Updates implementeren in uw App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Updates toepassen](tutorial/updates.md#applying-updates)
* [Ondersteuning verkrijgen](tutorial/support.md)

## Gedetailleerde tutorials

Deze tutorials gaan dieper in op onderwerpen die in de bovenstaande gids worden besproken.

* [Electron installeren](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors en Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Probleemoplossen](tutorial/installation.md#troubleshooting)
* Electron uitgaven & Feedback van de ontwikkelaar
  * [Versiebeleid](tutorial/electron-versioning.md)
  * [Tijdlijn van uitgaves](tutorial/electron-timelines.md)
  * [App Feedback programma](tutorial/app-feedback-program.md)
* [De broncode van de app inpakken met asar](tutorial/application-packaging.md)
  * [Genereren asar archieven](tutorial/application-packaging.md#generating-asar-archives)
  * [Het gebruik maken van asar archieven](tutorial/application-packaging.md#using-asar-archives)
  * [Limitaties](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Voeg uitgepakte bestanden toe aan asar archieven](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM testen](tutorial/testing-widevine-cdm.md)
* [Het gebruik maken van Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)

---

* [Verklarende woordenlijst van termen](glossary.md)

## API verwijzingen

* [Synopsis](api/synopsis.md)
* [Procesobject](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Omgevingsvariabelen](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Belangrijke API wijzigingen](breaking-changes.md)

### Aangepaste DOM-elementen:

* [`Bestand` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Functie](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Modules voor het basisproces:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialoog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocool](api/protocol.md)
* [scherm](api/screen.md)
* [sessie](api/session.md)
* [systeemVoorkeuren](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Modules voor het proces van de Renderer (webpagina):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules voor beide processen:

* [klembord](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Ontwikkeling

Zie [development/README.md](development/README.md)
