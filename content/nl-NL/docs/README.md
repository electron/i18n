# Officiële Handleidingen

Wees er zeker van dat je de documenten gebruikt die overeenkomen met jouw Electron versie. Het versienummer moet deel uitmaken van de URL van de pagina. Als dit niet zo is, gebruik je mogelijk de documentatie van een ontwikkelingstak die mogelijk API veranderingen bevat die niet compatibel zijn met jouw Electron versie. Om oudere versies van de documentatie te tonen, kun je [op tag bladeren](https://github.com/electron/electron/tree/v1.4.0) op GitHub door de "Switch branches/tags" dropdown te openen en de tag te selecteren die overeenkomt met jouw versie.

## Veelgestelde vragen (FAQ)

Er zijn vragen die vaak gesteld worden. Kijk hier voor je een nieuw probleem invoert:

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
* Toevoegen van functionaliteit aan uw App 
  * [Notificaties](tutorial/notifications.md)
  * [Recente documenten](tutorial/desktop-environment-integration.md#recent-documents)
  * [Voortgang van de applicatie](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taakbalk](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Acties](tutorial/linux-desktop-actions.md)
  * [Toetsencombinaties](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detectie](tutorial/online-offline-events.md)
  * [Representatief bestand voor macOS BrowserWindows](tutorial/represented-file.md)
  * [Drag & Drop Bestanden](tutorial/native-file-drag-drop.md)
* [Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Toegankelijkheid beschikbaar maken](tutorial/accessibility.md#enabling-accessibility)
* [Testen en Debuggen](tutorial/application-debugging.md) 
  * [Debuggen van het hoofd proces](tutorial/debugging-main-process.md)
  * [Het gebruik maken van Selenium en WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testen op Headless CI systemen (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools extensie](tutorial/devtools-extension.md)
  * [Geautomatiseerd testen met een aangepast stuurprogramma](tutorial/automated-testing-with-a-custom-driver.md)
* Inpakken 
  * [Code signeren](tutorial/code-signing.md)
* [Distributie](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
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

## Gedetailleerde tutorials

Deze tutorials gaan dieper in op onderwerpen die in de bovenstaande gids worden besproken.

* [In detail: Electron installeren](tutorial/installation.md) 
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors en Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Probleemoplossen](tutorial/installation.md#troubleshooting)
* [In detail: Versie schema van Electron](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilisatie branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases en Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In detail: Inpakken App broncode met asar](tutorial/application-packaging.md) 
  * [Genereren asar archieven](tutorial/application-packaging.md#generating-asar-archives)
  * [Het gebruik maken van asar archieven](tutorial/application-packaging.md#using-asar-archives)
  * [Limitaties](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Voeg uitgepakte bestanden toe aan asar archieven](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [In detail: Het gebruik maken van Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)

* * *

* [Verklarende woordenlijst van termen](glossary.md)

## API verwijzingen

* [Synopsis](api/synopsis.md)
* [Procesobject](api/process.md)
* [Ondersteunde Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Omgevingsvariabelen](api/environment-variables.md)
* [Belangrijke API wijzigingen](api/breaking-changes.md)

### Aangepaste DOM-elementen:

* [`Bestand` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Functie](api/window-open.md)

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
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocool](api/protocol.md)
* [sessie](api/session.md)
* [systeemVoorkeuren](api/system-preferences.md)
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
* [scherm](api/screen.md)
* [shell](api/shell.md)

## Ontwikkeling

Zie <development/README.md>