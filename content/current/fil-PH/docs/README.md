# Opisyal na Gabay

Please make sure that you use the documents that match your Electron version. The version number should be a part of the page URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

## FAQ

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)

## Gabay at Tutorial

* [Setup para sa Development Environment](tutorial/development-environment.md)
  * [Setting ng macOS](tutorial/development-environment.md#setting-up-macos)
  * [Setting ng Windows](tutorial/development-environment.md#setting-up-windows)
  * [Setting ng Linux](tutorial/development-environment.md#setting-up-linux)
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
  * [Paggamit ng Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [Paggamit ng katutubong Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Pagdagdag ng features sa iyong aplikasyon
  * [Mga Paalala](tutorial/notifications.md)
  * [Kasalukuyang dokumento](tutorial/recent-documents.md)
  * [Kaunlaran sa Aplikasyon](tutorial/progress-bar.md)
  * [Pasadyang Dock Menu](tutorial/macos-dock.md)
  * [Pasadyang Windows Taskbar](tutorial/windows-taskbar.md)
  * [Pasadyang Linux Desktop na mga Aksyon](tutorial/linux-desktop-actions.md)
  * [Mga shortcut ng keyboard](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Deteksyon](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Labas sa iskrin na pagproseso](tutorial/offscreen-rendering.md)
  * [Supporting macOS Dark Mode](tutorial/mojave-dark-mode-guide.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Aksesibilidad](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [DevtronDevtron](tutorial/accessibility.md#devtron)
  * [Paganahin ang aksesibilidad](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md)
  * ["Debugging" ang Pangunahing Proseso](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Ang Paggamit ng Selenium at WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pagssuri ng sistemang Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Ekstensyon ng DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribution](tutorial/application-distribution.md)
  * [Mga suportadong plataporma](tutorial/support.md#supported-platforms)
  * [Code Signing](tutorial/code-signing.md)
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
  * [Pagimplementa ng update sa iyong applikasyon](tutorial/updates.md#implementing-updates-in-your-app)
  * [Pag-aaplay sa mga Update](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## Detalyadong Tutorials

Mga indibidwal na tutorial patungkol sa mga naulat na gabay sa itaas.

* [Paginstall ng Electron](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Paghahanap ng ProblemaPaghahanap ng Problema](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
  * [App Feedback Program](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Pagbubuo ng mga asar na Archive](tutorial/application-packaging.md#generating-asar-archives)
  * [Paggamit ng mga Archives ng asar](tutorial/application-packaging.md#using-asar-archives)
  * [Mga limitasyon](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Pagdaragdag ng mga naka-unpack na mga file sa asar na mga Archive](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Paggamit ng ekstensyong Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [Glosaryo ng mga termino](glossary.md)

## Sangguniang API

* [Sinopsis](api/synopsis.md)
* [Mga pangprocessong bagay](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Nagbabago sa kapaligiran](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Breaking API Changes](breaking-changes.md)

### Pagtangkilik sa kalakaran ng DOM:

* [`Kikil ` Bagay](api/file-object.md)
* [`<webview>` Pananda](api/webview-tag.md)
* [` bintana. buksan ` Tungkulin](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [Ang paunawa](api/notification.md)
* [ang powerMonitor](api/power-monitor.md)
* [ang powerSaveBlocker](api/power-save-blocker.md)
* [ang protokol](api/protocol.md)
* [magtabi](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
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
* [kabibi](api/shell.md)

## Pag-unlad

Tingnan sa [development/README.md](development/README.md)
