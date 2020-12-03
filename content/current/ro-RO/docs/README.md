# Ghiduri oficiale

Te rog asigură-te că folosești documente care se potrivesc cu versiunea ta de Electron. Numărul versiunii ar trebui să fie o parte din URL-ul paginii. Dacă nu este, probabil folosești documentația unei ramuri de dezvoltare care ar putea conține modificări care nu sunt compatibile cu versiunea ta de Electron. Pentru a vedea versiuni mai vechi în documentație, poți [naviga după etichetă](https://github.com/electron/electron/tree/v1.4.0) pe GitHub deschizând lista verticală „Switch branches/tags” și selectând eticheta care se potrivește cu versiunea ta.

## Întrebări frecvente

Există întrebări care sunt puse destul de des. Verifică asta înainte de a crea o problemă:

* [Întrebări și răspunsuri Electron](faq.md)

## Ghiduri și tutoriale

### Quickstart

* [Ghid de pornire rapidă](tutorial/quick-start.md)
  * [Cerințe preliminare](tutorial/quick-start.md#prerequisites)
  * [Creați o aplicație de bază](tutorial/quick-start.md#create-a-basic-application)
  * [Rulează cererea](tutorial/quick-start.md#run-your-application)
  * [Pachet și distribuire cerere](tutorial/quick-start.md#package-and-distribute-the-application)

### Învățarea elementelor de bază

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Procese principale și de redare](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
* Adăugarea funcționalităților în aplicația ta
  * [Notificări](tutorial/notifications.md)
  * [Documente recente](tutorial/recent-documents.md)
  * [Progresul aplicației](tutorial/progress-bar.md)
  * [Meniu de andocare personalizat](tutorial/macos-dock.md)
  * [Bară de activități Windows personalizată](tutorial/windows-taskbar.md)
  * [Acțiuni Linux desktop personalizate](tutorial/linux-desktop-actions.md)
  * [Scurtături tastatură](tutorial/keyboard-shortcuts.md)
  * [Detecție offline/online](tutorial/online-offline-events.md)
  * [Fișier reprezentat pentru macOS BrowserWindows](tutorial/represented-file.md)
  * [Fișier nativ Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Randare în afara ecranului](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Încorporări web în Electron](tutorial/web-embeds.md)
* [Boilerplates și CLI-uri](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Alte instrumente și Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* Arhitectură aplicație
  * [Utilizarea modulelor native Node.js](tutorial/using-native-node-modules.md)
  * [Strategii de Performanță](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Accesibilitate](tutorial/accessibility.md)
  * [Activare manuală caracteristici de accesibilitate](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testare și depanare](tutorial/application-debugging.md)
  * [Depanarea procesului principal](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
  * [Utilizarea Selenium și WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testarea pe sistemele Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensia DevTools](tutorial/devtools-extension.md)
  * [Testare automată cu un driver personalizat](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribuţie](tutorial/application-distribution.md)
  * [Platforme Suportate](tutorial/support.md#supported-platforms)
  * [Semnarea codului](tutorial/code-signing.md)
  * [Magazin de aplicații Mac](tutorial/mac-app-store-submission-guide.md)
  * [Magazin Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Actualizări](tutorial/updates.md)
  * [Implementarea unui server de actualizare](tutorial/updates.md#deploying-an-update-server)
  * [Implementarea actualizărilor în aplicația ta](tutorial/updates.md#implementing-updates-in-your-app)
  * [Aplicarea actualizărilor](tutorial/updates.md#applying-updates)
* [Primirea suportului](tutorial/support.md)

## Tutoriale detaliate

Aceste tutoriale individuale se extind asupra subiectelor discutate în ghidul de mai sus.

* [Instalarea Electron](tutorial/installation.md)
  * [Proxiuri](tutorial/installation.md#proxies)
  * [Oglinzi și cacheuri personalizate](tutorial/installation.md#custom-mirrors-and-caches)
  * [Depanare](tutorial/installation.md#troubleshooting)
* Eliberări Electron & FeedBack Dezvoltător
  * [Poliță de Versiuni](tutorial/electron-versioning.md)
  * [Elliberări de cronologii](tutorial/electron-timelines.md)
* [Testarea Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Glosar de termeni](glossary.md)

## Referințe API

* [Rezumat](api/synopsis.md)
* [Obiectul procesului](api/process.md)
* [Comutatoare de linie de comandă acceptate](api/command-line-switches.md)
* [Variabile de mediu](api/environment-variables.md)
* [Suport Extensii Chrome](api/extensions.md)
* [Ruperea modificărilor API](breaking-changes.md)

### Elemente DOM personalizate:

* [Obiectul `File`](api/file-object.md)
* [Eticheta `<webview>`](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)
* [Obiect`BrowserWindowProxy`](api/browser-window-proxy.md)

### Module pentru procesul principal:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow - FereastraBrowser-ului](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Meniu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Notificare](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [BaraDeAtingere](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Module pentru randarea procesului (pagina web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Module pentru ambele procese:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Dezvoltare

Vezi [development/README.md](development/README.md)
