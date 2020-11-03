# Guide Ufficiali

Assicuratevi di usare la documentazione corrispondente alla versione in uso di Electron. Il numero di versione deve essere parte dell'URL della pagina. Se non lo è, probabilmente state utilizzando la documentazione di un ramo di sviluppo che può contenere modifiche alle API che non sono compatibili con la versione di Electron in uso. Per visualizzare le versioni precedenti della documentazione, è possibile [navigare per tag](https://github.com/electron/electron/tree/v1.4.0) su GitHub aprendo il menu a tendina "Switch branches/tags" e selezionando il tag che corrisponde alla versione in uso.

## FAQ (Domande frequenti)

Ci sono domande che vengono poste abbastanza spesso. Check this out before creating an issue:

* [Domande frequenti su Electron](faq.md)

## Guide e tutorial

* [Impostazione dell'ambiente di sviluppo](tutorial/development-environment.md)
  * [Configurazione su macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurazione su Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurazione su Linux](tutorial/development-environment.md#setting-up-linux)
  * [Scegliere un Editor](tutorial/development-environment.md#a-good-editor)
* [Creazione della tua prima applicazione](tutorial/quick-start.md)
  * [Prerequisiti](tutorial/quick-start.md#prerequisites)
  * [Crea un'applicazione di base](tutorial/quick-start.md#create-a-basic-application)
  * [Pacchetto e distribuzione dell'applicazione](tutorial/quick-start.md#package-and-distribute-the-application)
* [Boilerplate e CLI](tutorial/boilerplates-and-clis.md)
  * [Boilerplate contro CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forgia](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Altri strumenti e Boilerplate](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Architettura Applicazione](tutorial/quick-start.md#application-architecture)
  * [Processi di Rendering e Principali](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [Usare Moduli Nativi Node.js](tutorial/using-native-node-modules.md)
  * [Strategie di prestazione](tutorial/performance.md)
* Aggiungere Funzioni Alla Tua App
  * [Notifiche](tutorial/notifications.md)
  * [Documenti Recenti](tutorial/recent-documents.md)
  * [Progresso Applicazione](tutorial/progress-bar.md)
  * [Menu Personalizzati Dock](tutorial/macos-dock.md)
  * [Barra Mansioni Windows Personalizzata](tutorial/windows-taskbar.md)
  * [Azioni Desktop Linux Personalizzate](tutorial/linux-desktop-actions.md)
  * [Scorciatoie da tastiera](tutorial/keyboard-shortcuts.md)
  * [Detezione Offline/Online](tutorial/online-offline-events.md)
  * [File Rappresentato per le FinestreBrowser macOS](tutorial/represented-file.md)
  * [Trascina & Rilascia File Nativo](tutorial/native-file-drag-drop.md)
  * [Rendering Offscreen](tutorial/offscreen-rendering.md)
  * [Modalità Scura](tutorial/dark-mode.md)
  * [Incorporamenti web in Electron](tutorial/web-embeds.md)
* [Accessibilità](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Abilitare Manualmente Le Caratteristiche Di Accessibilità](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Test e Debugging](tutorial/application-debugging.md)
  * [Debuggare il Processo Principale](tutorial/debugging-main-process.md)
  * [Debug del Processo Principale con Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Uso di Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Test su sistemi Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Estensione DevTools](tutorial/devtools-extension.md)
  * [Test Automatico con un Driver Personalizzato](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribuzione](tutorial/application-distribution.md)
  * [Piattaforme supportate](tutorial/support.md#supported-platforms)
  * [Firma Codice](tutorial/code-signing.md)
  * [Negozio App Mac](tutorial/mac-app-store-submission-guide.md)
  * [Negozio Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Sicurezza](tutorial/security.md)
  * [Segnalazione Problemi Sicurezza](tutorial/security.md#reporting-security-issues)
  * [Aggiornamenti e Problemi di Sicurezza di Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Avvisi Sicurezza Electron](tutorial/security.md#electron-security-warnings)
  * [Lista di Controllo Sicurezza](tutorial/security.md#checklist-security-recommendations)
* [Aggiornamenti](tutorial/updates.md)
  * [Implementare un Server Aggiornamento](tutorial/updates.md#deploying-an-update-server)
  * [Implementando gli Aggiornamenti nella Tua App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applicando Aggiornamenti](tutorial/updates.md#applying-updates)
* [Ottenere Supporto](tutorial/support.md)

## Tutorial di approfondimento

I tutorial seguenti approfondiscono temi discussi nelle guide sopra elencate.

* [Installare Electron](tutorial/installation.md)
  * [Proxy](tutorial/installation.md#proxies)
  * [Personalizza Specchi e Cache](tutorial/installation.md#custom-mirrors-and-caches)
  * [Risoluzione dei problemi](tutorial/installation.md#troubleshooting)
* Release di Electron & Feedback Sviluppatore
  * [Gestione delle versioni](tutorial/electron-versioning.md)
  * [Timeline di Rilascio](tutorial/electron-timelines.md)
* [Impacchettamento Codice Risorsa App con asar](tutorial/application-packaging.md)
  * [Generare Archivi asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Usare Archivi asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitazioni](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Aggiungere File Scompattati agli Archivi asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Test del Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Glossario dei termini](glossary.md)

## Riferimenti API

* [Sinossi](api/synopsis.md)
* [Oggetto Process](api/process.md)
* [Opzioni della linea di comando supportate](api/command-line-switches.md)
* [Variabili di ambiente](api/environment-variables.md)
* [Supporto Estensioni Chrome](api/extensions.md)
* [Ultime modifiche API](breaking-changes.md)

### Elementi DOM personalizzati:

* [Oggetto `File`](api/file-object.md)
* [Tag `<webview>`](api/webview-tag.md)
* [Funzione `Window. Open`](api/window-open.md)
* [Oggetto `BrowserWindowsProxy`](api/browser-window-proxy.md)

### Moduli del processo principale:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [VistaBrowser](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [tracciacontenuto](api/content-tracing.md)
* [dialogo](api/dialog.md)
* [Shortcutglobale](api/global-shortcut.md)
* [SpeseinApp](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [ElementoMenu](api/menu-item.md)
* [rete](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Notifica](api/notification.md)
* [Monitorapotenza](api/power-monitor.md)
* [BloccaSalvaPotenza](api/power-save-blocker.md)
* [protocollo](api/protocol.md)
* [schermo](api/screen.md)
* [sessione](api/session.md)
* [Preferenzesistema](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Moduli del processo Renderer (pagina Web):

* [Catturadesktop](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remoto](api/remote.md)
* [webFrame](api/web-frame.md)

### Moduli di entrambi i processi:

* [appunti](api/clipboard.md)
* [riportatorecrash](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [guscio](api/shell.md)

## Sviluppo

Vedi [sviluppo/LEGGIMI.md](development/README.md)
