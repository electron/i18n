# Officiële Handleidingen

Wees er zeker van dat je de documenten gebruikt die overeenkomen met jouw Electron versie. Het versienummer moet deel uitmaken van de URL van de pagina. Als dit niet zo is, gebruik je mogelijk de documentatie van een ontwikkelingstak die mogelijk API veranderingen bevat die niet compatibel zijn met jouw Electron versie. Om oudere versies van de documentatie te tonen, kun je [op tag bladeren](https://github.com/electron/electron/tree/v1.4.0) op GitHub door de "Switch branches/tags" dropdown te openen en de tag te selecteren die overeenkomt met jouw versie.

## Veelgestelde vragen (FAQ)

Er zijn vragen die heel vaak worden gesteld. Bekijk dit voor het maken van een probleem:

* [Electron FAQ](faq.md)

## Handleidingen en Tutorials

### Snelstart

* [Snelle startgids](tutorial/quick-start.md)
  * [Prerequisites](tutorial/quick-start.md#prerequisites)
  * [Basistoepassing aanmaken](tutorial/quick-start.md#create-a-basic-application)
  * [Voer je applicatie uit](tutorial/quick-start.md#run-your-application)
  * [Pakket en verdeel de applicatie](tutorial/quick-start.md#package-and-distribute-the-application)

### Leren van de basis

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Hoofd en Renderer Processen](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
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
  * [Drag & Drop bestand](tutorial/native-file-drag-drop.md)
  * [Offscreen Rendering](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Webembeds in Electron](tutorial/web-embeds.md)
* [Boilerplates en CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Andere Tools en Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* Applicatie architectuur
  * [Het gebruik maken van Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Accessibility](tutorial/accessibility.md)
  * [Toegankelijkheidsfuncties handmatig inschakelen](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testen en Debuggen](tutorial/application-debugging.md)
  * [Debuggen van het hoofdproces](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
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
* [De broncode van de app inpakken met asar](tutorial/application-packaging.md)
  * [Genereren asar archieven](tutorial/application-packaging.md#generating-asar-archives)
  * [Het gebruik maken van asar archieven](tutorial/application-packaging.md#using-asar-archives)
  * [Limitaties](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Voeg uitgepakte bestanden toe aan asar archieven](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Widevine CDM testen](tutorial/testing-widevine-cdm.md)

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
* [nativeTheme](api/native-theme.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocool](api/protocol.md)
* [scherm](api/screen.md)
* [sessie](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

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
