# Ghiduri oficiale

Te rog asigură-te că folosești documente care se potrivesc cu versiunea ta de Electron. Numărul versiunii ar trebui să fie o parte din URL-ul paginii. Dacă nu este, probabil folosești documentația unei ramuri de dezvoltare care ar putea conține modificări care nu sunt compatibile cu versiunea ta de Electron. Pentru a vedea versiuni mai vechi în documentație, poți [naviga după etichetă](https://github.com/electron/electron/tree/v1.4.0) pe GitHub deschizând lista verticală „Switch branches/tags” și selectând eticheta care se potrivește cu versiunea ta.

## Întrebări frecvente

There are questions that are asked quite often. Check this out before creating an issue:

* [Întrebări și răspunsuri Electron](faq.md)

## Ghiduri și tutoriale

* [Configurarea mediului de dezvoltare](tutorial/development-environment.md)
  * [Configurarea macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurarea Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurarea Linux](tutorial/development-environment.md#setting-up-linux)
  * [Alegerea unui editor](tutorial/development-environment.md#a-good-editor)
* [Crearea primei tale aplicații](tutorial/first-app.md)
  * [Instalarea Electron](tutorial/first-app.md#installing-electron)
  * [Dezvoltarea Electron într-un Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Rularea primei tale aplicații](tutorial/first-app.md#running-your-app)
* [Boilerplates și CLI-uri](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Alte instrumente și Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arhitectură aplicație](tutorial/application-architecture.md)
  * [Procese principale și de redare](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Utilizarea API-ului Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Utilizarea API-ului Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Utilizarea modulelor native Node.js](tutorial/using-native-node-modules.md)
  * [Strategii de Performanță](tutorial/performance.md)
* Adăugarea funcționalităților în aplicația ta
  * [Notificări](tutorial/notifications.md)
  * [Documente recente](tutorial/recent-documents.md)
  * [Progresul aplicației](tutorial/progress-bar.md)
  * [Meniu de andocare personalizat](tutorial/macos-dock.md)
  * [Bară de activități Windows personalizată](tutorial/windows-taskbar.md)
  * [Acțiuni Linux desktop personalizate](tutorial/linux-desktop-actions.md)
  * [Scurtături tastatură](tutorial/keyboard-shortcuts.md)
  * [Detecție offline/online](tutorial/online-offline-events.md)
  * [Fișier reprezentant pentru macOS BrowserWindows](tutorial/represented-file.md)
  * [Fișier nativ drag & drop](tutorial/native-file-drag-drop.md)
  * [Randare în afara ecranului](tutorial/offscreen-rendering.md)
  * [Suportarea modului negru macOS](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Accesibilitate](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Activarea accesibilității](tutorial/accessibility.md#enabling-accessibility)
* [Testare și depanare](tutorial/application-debugging.md)
  * [Depanarea procesului principal](tutorial/debugging-main-process.md)
  * [Debugarea procesului principal cu Visual Studio Code](tutorial/debugging-main-process-vscode.md)
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
* [Securitate](tutorial/security.md)
  * [Raportarea problemelor de securitate](tutorial/security.md#reporting-security-issues)
  * [Probleme de securitate Chromium și actualizări](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Avertismente de securitate Electron](tutorial/security.md#electron-security-warnings)
  * [Lista de verificare a securității](tutorial/security.md#checklist-security-recommendations)
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
  * [Program de FeedBack a Aplicațiilor](tutorial/app-feedback-program.md)
* [Împachetarea Codului Sursă a Aplicațiilor cu asar](tutorial/application-packaging.md)
  * [Generarea arhivelor asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Utilizarea arhivelor asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitări](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adăugarea fișierelor despachetate în arhivele asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testarea Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Utilizarea pluginului Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [Glosar de termeni](glossary.md)

## Referințe API

* [Rezumat](api/synopsis.md)
* [Obiectul procesului](api/process.md)
* [Comutatoare de linie de comandă acceptate](api/command-line-switches.md)
* [Variabile de mediu](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Ruperea modificărilor API](breaking-changes.md)

### Elemente DOM personalizate:

* [Obiectul `File`](api/file-object.md)
* [Eticheta `<webview>`](api/webview-tag.md)
* [Funcția `window.open`](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Module pentru procesul principal:

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

### Module pentru randarea procesului (pagina web):

* [desktopCapturer-capturareaDesktop-ului](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote-de la distanță](api/remote.md)
* [webFrame-cadruWeb](api/web-frame.md)

### Module pentru ambele procese:

* [clipboard-clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage-ImagineNativă](api/native-image.md)
* [shell-coajă](api/shell.md)

## Dezvoltare

Vezi [development/README.md](development/README.md)
