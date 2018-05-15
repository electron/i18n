# Opisyal na Gabay

Pakitiyak na ginagamit mo ang mga dokumento na tumutugma sa iyong bersyon ng Electron. Ang numero ng bersyon ay dapat na isang bahagi ng URL ng pahina. Kung hindi, ikaw ay marahil gumagamit ng dokumentasyon ng sangay sa pag-unlad na maaaring naglalaman ng mga pagbabago ng API na hindi tugma sa iyong bersyon ng Electron. Upang tingnan ang mas matandang mga bersyon ng dokumentasyon, maaari kang [ mag-browse ayon sa tag ](https://github.com/electron/electron/tree/v1.4.0) sa GitHub sa pamamagitan ng pagbukas ng dropdown na mga branch / tag "at pagpili sa tag na tumutugma sa iyong bersyon.

## FAQ

May mga katanungan na madalas na tinatanong. Suriin muna ito bago lumikha ng bagong isyu:

* [Electron FAQ](faq.md)

## Gabay at Tutorial

* [Setup para sa Development Environment](tutorial/development-environment.md) 
  * [Pagsetup ng macOS](tutorial/development-environment.md#setting-up-macos)
  * [Pagsetuo ng Windows](tutorial/development-environment.md#setting-up-windows)
  * [Pagsetup ng Linux](tutorial/development-environment.md#setting-up-linux)
  * [Pagpili ng Editor](tutorial/development-environment.md#a-good-editor)
* [Pag gawa ng una mong aplikasyon](tutorial/first-app.md) 
  * [Paginstall ng Electron](tutorial/first-app.md#installing-electron)
  * [Development ng Electron sa Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Pagpapaandar ng yong aplikasyon](tutorial/first-app.md#running-your-app)
* [Boilerplates at CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplates laban sa CLIs](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [pagpipilit ng elektron](tutorial/boilerplates-and-clis.md#electron-forge)
  * [pagbubuo ng elektron](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Ibang mga tools at boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arkitektura ng aplikasyon](tutorial/application-architecture.md) 
  * [Pangunahin at Proseso ng Renderer](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Paggamit ng Electron APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Paggamit ng Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Paggamit ng katutubong Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Komunikasyon](tutorial/application-architecture.md#)
* Pagdagdag ng features sa iyong aplikasyon 
  * [Mga Paalala](tutorial/notifications.md)
  * [Kasalukuyang dokumento](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Kaunlaran sa Aplikasyon](tutorial/progress-bar.md)
  * [Pasadyang Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Pasadyang Windows Taskbar](tutorial/windows-taskbar.md)
  * [Pasadyang Linux Desktop na mga Aksyon](tutorial/linux-desktop-actions.md)
  * [Mga shortcut ng keyboard](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Deteksyon](tutorial/online-offline-events.md)
  * [File na nagrerepresenta sa macOS BrowserWindows](tutorial/represented-file.md)
  * [Katutubong File Drag& Drop](tutorial/native-file-drag-drop.md)
* [Aksesibilidad](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [DevtronDevtron](tutorial/accessibility.md#devtron)
  * [Paganahin ang aksesibilidad](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * ["Debugging" ang Pangunahing Proseso](tutorial/debugging-main-process.md)
  * [Paggamit ng Selenium at WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pagssuri ng sistemang Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Ekstensyon ng DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [App Store ng Mac](tutorial/mac-app-store-submission-guide.md)
  * [Tindahan ng Windows](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Seguridad](tutorial/security.md) 
  * [Naguulat sa mga Isyung Panseguridad](tutorial/security.md#reporting-security-issues)
  * [Mga Isyung Panseguridad at Upgrades ng Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Babala sa seguridad ng Electron](tutorial/security.md#electron-security-warnings)
  * [Listahan ng Seguridad](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Pagde-deploy ng isang Update na Server](tutorial/updates.md#deploying-an-update-server)
  * [Pagpapatupad ng mga Update sa iyong App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Pag-aaplay sa mga Update](tutorial/updates.md#applying-updates)

## Detalyadong Tutorials

Mga indibidwal na tutorial patungkol sa mga naulat na gabay sa itaas.

* [Detalyadong pag install ng Electron](tutorial/installation.md) 
  * [Global laban sa local na installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Paghahanap ng ProblemaPaghahanap ng Problema](tutorial/installation.md#troubleshooting)
* [Detalyadong eskema sa versioning sa Electron](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Pagpapapanatag ng mga Branch](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases at ang pagsasaayos ng Bug](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [Detalyadong pagimpake ng App Source Code gamit ang asar](tutorial/application-packaging.md) 
  * [Pagbubuo ng mga asar na Archive](tutorial/application-packaging.md#generating-asar-archives)
  * [Paggamit ng mga Archives ng asar](tutorial/application-packaging.md#using-asar-archives)
  * [Mga limitasyon](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Pagdaragdag ng mga naka-unpack na mga file sa asar na mga Archive](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Detalyadong paggamit ng Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Detalyadong paggamit ng Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Labas sa iskrin na pagproseso](tutorial/offscreen-rendering.md)

* * *

* [Glosaryo ng mga termino](glossary.md)

## Sangguniang API

* [Sinopsis](api/synopsis.md)
* [Mga pangprocessong bagay](api/process.md)
* [Suportadong mga Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Nagbabago sa kapaligiran](api/environment-variables.md)

### Pagtangkilik sa kalakaran ng DOM:

* [`Kikil ` Bagay](api/file-object.md)
* [`<webview>` Pananda](api/webview-tag.md)
* [` bintana. buksan ` Tungkulin](api/window-open.md)

### Mga modyul para sa pangunahing proseso:

* [app](api/app.md)
* [awtoUpdeyter](api/auto-updater.md)
* [Kulayan ang kapaligiran](api/browser-view.md)
* [Ang Browser ng Window](api/browser-window.md)
* [pagsubaybay ng nilalaman](api/content-tracing.md)
* [I-display ang native dialogs upang mabuksan ang naka save na files, alerting, at iba pa.](api/dialog.md)
* [putulin ng maikli ang global](api/global-shortcut.md)
* [mamili sa App](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Talaulaman](api/menu.md)
* [Menultem](api/menu-item.md)
* [ang net](api/net.md)
* [ang powerMonitor](api/power-monitor.md)
* [ang powerSaveBlocker](api/power-save-blocker.md)
* [ang protokol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Modulo para sa renderer ng proseso (bahay-alalawa sa pahina):

* [pagkakahuli sa tuktok ng desk](api/desktop-capturer.md)
* [ipcrenderer](api/ipc-renderer.md)
* [kamuntik](api/remote.md)
* [lumikha ng bahay-alalawa](api/web-frame.md)

### Modulo para sa parehong proseso:

* [iipit sa tabla](api/clipboard.md)
* [kalabog ng tagapagbalita](api/crash-reporter.md)
* [gupitin ng maikli ang mga litrato](api/native-image.md)
* [magtabi](api/screen.md)
* [kabibi](api/shell.md)

## Pag-unlad

Tingnan sa <development/README.md>