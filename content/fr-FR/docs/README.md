Veuillez vous assurer d'utiliser la documentation qui correspond à votre version d'Electron. Le numéro de version doit être une partie de l'URL de la page. Si ce n'est pas le cas, vous utilisez probablement la documentation d'une branche de développement pouvant contenir des modifications de l'API qui ne sont pas compatibles avec votre version d'Electron. Pour consulter les anciennes versions de la documentation, vous pouvez [Parcourir par tag](https://github.com/electron/electron/tree/v1.4.0) sur GitHub en ouvrant la liste déroulante « Switch branches/tags » et sélectionnez le tag qui correspond à votre version.

## FAQ

Avant de créer un ticket, vérifiez que votre problème n'a pas déjà sa réponse dans la FAQ:

* [FAQ Electron](faq.md)

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
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Other Tools and Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [Notifications](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Raccourcis clavier](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Application Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Activer l'accessibilité](tutorial/accessibility.md#enabling-accessibility)
* [Application Testing and Debugging](tutorial/application-debugging.md) 
  * [Débogguer le Main Process](tutorial/debugging-main-process.md)
  * [Utilisation de Selenium et WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extension DevTools](tutorial/devtools-extension.md)
* [Distribution de l'Application](tutorial/application-distribution.md) 
  * [Plateformes supportées](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Application Security](tutorial/security.md) 
  * [Signalement des problèmes de sécurité](tutorial/security.md#reporting-security-issues)
  * [Problèmes de sécurité et mises à jour de Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Avertissements de sécurité d'Electron](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Application Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Les proxys](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Résolution de problème](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Branches de stabilisation](tutorial/electron-versioning.md#stabilization-branches)
  * [Versions bêta et corrections de bugs](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitations](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Rendu Offscreen](tutorial/offscreen-rendering.md)

* * *

* [Glossary of Terms](glossary.md)

## Références de l'API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Commandes Chromes Supportées](api/chrome-command-line-switches.md)
* [Variables d'environnement](api/environment-variables.md)

### Éléments DOM Personnalisé :

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### Modules pour le processus principal :

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
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Modules pour le processus de rendu (Page Web) :

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules pour les deux processus :

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Développement

* [Style de Codage](development/coding-style.md)
* [Utilisation du clang-format pour du code C++](development/clang-format.md)
* [Test](development/testing.md)
* [Hiérarchie du Code Source](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Aperçu du Système de Build](development/build-system-overview.md)
* [Instructions de Build (macOS)](development/build-instructions-osx.md)
* [Instructions de Build (Windows)](development/build-instructions-windows.md)
* [Instructions de compilation (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Mettre à jour Chromium](development/upgrading-chromium.md)
* [Développement Chromium](development/chromium-development.md)
* [Développement V8](development/v8-development.md)