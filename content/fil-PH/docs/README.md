Pakitiyak na ginagamit mo ang mga dokumento na tumutugma sa iyong bersyon ng Electron. Ang numero ng bersyon ay dapat na isang bahagi ng URL ng pahina. Kung hindi, ikaw ay marahil gumagamit ng dokumentasyon ng sangay sa pag-unlad na maaaring naglalaman ng mga pagbabago ng API na hindi tugma sa iyong bersyon ng Electron. Upang tingnan ang mas matandang mga bersyon ng dokumentasyon, maaari kang [ mag-browse ayon sa tag ](https://github.com/electron/electron/tree/v1.4.0) sa GitHub sa pamamagitan ng pagbukas ng dropdown na mga branch / tag "at pagpili sa tag na tumutugma sa iyong bersyon.

## FAQ

May mga katanungan na madalas na tinatanong. Suriin muna ito bago lumikha ng bagong isyu:

* [Electron FAQ](faq.md)

## Guides and Tutorials

* [Setting up the Development Environment](tutorial/development-environment.md) 
  * [Setting up macOS](tutorial/development-environment.md#setting-up-macos)
  * [Setting up Windows](tutorial/development-environment.md#setting-up-windows)
  * [Setting up Linux](tutorial/development-environment.md#setting-up-linux)
  * [Choosing an Editor](tutorial/development-environment.md#a-good-editor)
* [Creating your First App](tutorial/first-app.md) 
  * [Installing Electron](tutorial/first-app.md#installing-electron)
  * [Electron Development in a Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Running Your App](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [pagpipilit ng elektron](tutorial/boilerplates-and-clis.md#electron-forge)
  * [pagbubuo ng elektron](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [Mga Paalala](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Mga shortcut ng keyboard](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Application Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Paganahin ang aksesibilidad](tutorial/accessibility.md#enabling-accessibility)
* [Application Testing and Debugging](tutorial/application-debugging.md) 
  * ["Debugging" ang Pangunahing Proseso](tutorial/debugging-main-process.md)
  * [Paggamit ng Selenium at WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pagssuri ng sistemang Headless CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Ekstensyon ng DevTools](tutorial/devtools-extension.md)
* [Pamamahagi ng aplikasyon](tutorial/application-distribution.md) 
  * [Mga suportadong plataporma](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Application Security](tutorial/security.md) 
  * [Naguulat sa mga Isyung Panseguridad](tutorial/security.md#reporting-security-issues)
  * [Mga Isyung Panseguridad at Upgrades ng Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Application Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Paghahanap ng ProblemaPaghahanap ng Problema](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Pagpapapanatag ng mga Branch](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases at ang pagsasaayos ng Bug](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Paggamit ng mga Archives ng asar](tutorial/application-packaging.md#using-asar-archives)
  * [Mga limitasyon](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
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
* [sesyon](api/session.md)
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

* [Paraan sa pagkukudigo](development/coding-style.md)
* [Paggamit ng kumakalat na-format C++ Code](development/clang-format.md)
* [Pagsusuri](development/testing.md)
* [Ang Direktoryo ng Istraktura ng "Source Code"](development/source-code-directory-structure.md)
* [Alituntunin ng mga diperensya ng NW.js (dating ukol sa-webkit)](development/atom-shell-vs-node-webkit.md)
* [Pagbuo ng Buod ng Sistema](development/build-system-overview.md)
* [Pagbuo ng mga tagubilin (macOS)](development/build-instructions-osx.md)
* ["Build Instructions" (Windows)](development/build-instructions-windows.md)
* ["Build Instructions (Linux)"](development/build-instructions-linux.md)
* [Mga Tagubilin ng Debug (macOS)](development/debugging-instructions-macos.md)
* [Mga Tagubilin ng Debug (Windows)](development/debug-instructions-windows.md)
* [Pag-se-set up ng Simbolo ng Debugger](development/setting-up-symbol-server.md)
* [Dekumentasyon ng patnubay ng Estilo](styleguide.md)
* [Makadagdag sa elektron](../CONTRIBUTING.md)
* [Isyu](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Pagpapaganda ng Chromium](development/upgrading-chromium.md)
* [Pagpapaunlad ng Chromium](development/chromium-development.md)
* [V8 Pag-unlad](development/v8-development.md)