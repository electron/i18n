# Opisyal na Gabay

Please make sure that you use the documents that match your Electron version. The version number should be a part of the page URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

## FAQ

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)

## Gabay at Tutorial

### Quickstart

* [Quick Start Guide](tutorial/quick-start.md)
  * [Mga Pangunahing Kailangan](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Run your application](tutorial/quick-start.md#run-your-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)

### Learning the basics

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Pangunahin at Proseso ng Renderer](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
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
  * [Dark Mode](tutorial/dark-mode.md)
  * [Web embeds in Electron](tutorial/web-embeds.md)
* [Boilerplates at CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplates laban sa CLIs](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [pagpipilit ng elektron](tutorial/boilerplates-and-clis.md#electron-forge)
  * [pagbubuo ng elektron](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Ibang mga tools at boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* Arkitektura ng aplikasyon
  * [Paggamit ng katutubong Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Aksesibilidad](tutorial/accessibility.md)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testing and Debugging](tutorial/application-debugging.md)
  * ["Debugging" ang Pangunahing Proseso](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
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
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Pagbubuo ng mga asar na Archive](tutorial/application-packaging.md#generating-asar-archives)
  * [Paggamit ng mga Archives ng asar](tutorial/application-packaging.md#using-asar-archives)
  * [Mga limitasyon](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Pagdaragdag ng mga naka-unpack na mga file sa asar na mga Archive](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)

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

* [ang app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [Kulayan ang kapaligiran](api/browser-view.md)
* [Kulayan ang bintana](api/browser-window.md)
* [pagsubaybay ng nilalaman](api/content-tracing.md)
* [I-display ang native dialogs upang mabuksan ang naka save na files, alerting, at iba pa.](api/dialog.md)
* [putulin ng maikli ang global](api/global-shortcut.md)
* [mamili sa App](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Talaulaman](api/menu.md)
* [Menultem](api/menu-item.md)
* [ang net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
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
* [webFrameMain](api/web-frame-main.md)

### Modulo para sa renderer ng proseso (bahay-alalawa sa pahina):

* [pagkakahuli sa tuktok ng desk](api/desktop-capturer.md)
* [ipcrenderer](api/ipc-renderer.md)
* [kamuntik](api/remote.md)
* [lumikha ng bahay-alalawa](api/web-frame.md)

### Modulo para sa parehong proseso:

* [iipit sa tabla](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [gupitin ng maikli ang mga litrato](api/native-image.md)
* [kabibi](api/shell.md)

## Pag-unlad

Tingnan sa [development/README.md](development/README.md)
