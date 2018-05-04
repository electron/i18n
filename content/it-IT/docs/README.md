# Guide Ufficiali

Si prega di assicurarsi di usare la documentazione corrispondente alla propria versione in uso di Electron. Il numero della versione dovrebbe essere una parte dell'URL della pagina. Se non lo è, probabilmente si sta utilizzando la documentazione di un ramo di sviluppo che può contenere modifiche alle API che non sono compatibili con la versione di Electron in uso. Per visualizzare le versioni precedenti della documentazione, è possibile [navigare per tag](https://github.com/electron/electron/tree/v1.4.0) su GitHub aprendo il menu a tendina "Switch branches/tags" e selezionando il tag che corrisponde alla versione in uso.

## FAQ (Domande frequenti)

Ci sono domande che vengono poste molto spesso. Prova a vedere qui prima di proporne una nuova:

* [Domande frequenti su Electron](faq.md)

## Guide e tutorial

* [Impostazione dell'ambiente di sviluppo](tutorial/development-environment.md) 
  * [Configurazione su macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurazione su Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurazione su Linux](tutorial/development-environment.md#setting-up-linux)
  * [Scegliere un Editor](tutorial/development-environment.md#a-good-editor)
* [Creazione della tua prima applicazione](tutorial/first-app.md) 
  * [Installare Electron](tutorial/first-app.md#installing-electron)
  * [Sviluppo Electron in breve](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Esecuzione della tua App](tutorial/first-app.md#running-your-app)
* [Boilerplate e CLI](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate contro CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forgia](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Altri strumenti e Boilerplate](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Architettura Applicazione](tutorial/application-architecture.md) 
  * [Processi di Rendering e Principali](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Usare API di Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Usare API Node.js](tutorial/application-architecture.md#using-node.js-apis)
  * [Usare Moduli Nativi Node.js](tutorial/using-native-node-modules.md)
  * [Comunicazione Interprocessuale](tutorial/application-architecture.md#)
* Aggiungere Funzioni Alla Tua App 
  * [Notifiche](tutorial/notifications.md)
  * [Documenti Recenti](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Progresso Applicazione](tutorial/progress-bar.md)
  * [Menu Personalizzati Dock](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Barra Mansioni Windows Personalizzata](tutorial/windows-taskbar.md)
  * [Azioni Desktop Linux Personalizzate](tutorial/linux-desktop-actions.md)
  * [Scorciatoie da tastiera](tutorial/keyboard-shortcuts.md)
  * [Detezione Offline/Online](tutorial/online-offline-events.md)
  * [File Rappresentato per le FinestreBrowser macOS](tutorial/represented-file.md)
  * [Trascina & Rilascia File Nativo](tutorial/native-file-drag-drop.md)
* [Accessibilità](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Attivazione dell'accessibilità](tutorial/accessibility.md#enabling-accessibility)
* [Test e Debugging](tutorial/application-debugging.md) 
  * [Debuggare il Processo Principale](tutorial/debugging-main-process.md)
  * [Uso di Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Test su sistemi Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Estensione DevTools](tutorial/devtools-extension.md)
  * [Test Automatico con un Driver Personalizzato](tutorial/automated-testing-with-a-custom-driver.md)
* Impacchettamento 
  * [Firma Codice](tutorial/code-signing.md)
* [Distribuzione](tutorial/application-distribution.md) 
  * [Supporto](tutorial/support.md)
  * [Negozio App Mac](tutorial/mac-app-store-submission-guide.md)
  * [Negozio Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Sicurezza](tutorial/security.md) 
  * [Segnalazione Problemi Sicurezza](tutorial/security.md#reporting-security-issues)
  * [Aggiornamenti e Problemi di Sicurezza di Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Avvisi Sicurezza Electron](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Tutorial dettagliati

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxy](tutorial/installation.md#proxies)
  * [Personalizza Specchi e Cache](tutorial/installation.md#custom-mirrors-and-caches)
  * [Risoluzione dei problemi](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilization Branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitazioni](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Rendering Offscreen](tutorial/offscreen-rendering.md)

* * *

* [Glossario dei termini](glossary.md)

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
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [Monitorapotenza](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocollo](api/protocol.md)
* [sessione](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [contenutiWeb](api/web-contents.md)

### Moduli del processo Renderer (pagina Web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remoto](api/remote.md)
* [webFrame](api/web-frame.md)

### Moduli di entrambi i processi:

* [appunti](api/clipboard.md)
* [riportatorecrash](api/crash-reporter.md)
* [immagineNativa](api/native-image.md)
* [schermo](api/screen.md)
* [shell](api/shell.md)

## Sviluppo

See <development/README.md>