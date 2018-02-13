Veuillez vous assurer d'utiliser la documentation qui correspond à votre version d'Electron. Le numéro de version doit être une partie de l'URL de la page. Si ce n'est pas le cas, vous utilisez probablement la documentation d'une branche de développement pouvant contenir des modifications de l'API qui ne sont pas compatibles avec votre version d'Electron. Pour consulter les anciennes versions de la documentation, vous pouvez [Parcourir par tag](https://github.com/electron/electron/tree/v1.4.0) sur GitHub en ouvrant la liste déroulante « Switch branches/tags » et sélectionnez le tag qui correspond à votre version.

## FAQ

Avant de créer un ticket, vérifiez que votre problème n'a pas déjà sa réponse dans la FAQ:

* [FAQ Electron](faq.md)

## Guides

* [Glossaire des termes](glossary.md)
* [Plateformes supportées](tutorial/supported-platforms.md)
* [Sécurité](tutorial/security.md)
* [Versioning](tutorial/electron-versioning.md)
* [Distribution de l'Application](tutorial/application-distribution.md)
* [Guide de Soumission Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Guide Windows Store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Créer une archive](tutorial/application-packaging.md)
* [Utiliser des Modules Natifs de Node](tutorial/using-native-node-modules.md)
* [Debugger Processus Principal](tutorial/debugging-main-process.md)
* [Utilisation de Selenium et WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Extension DevTools](tutorial/devtools-extension.md)
* [Utilisation du plugin Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Utilisation du plugin Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Tests sur les systèmes CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Rendu hors de l'écran](tutorial/offscreen-rendering.md)
* [Raccourcis clavier](tutorial/keyboard-shortcuts.md)
* [Mettre à jour des applications](tutorial/updates.md)

## Tutoriels

* [Démarrage Rapide](tutorial/quick-start.md)
* [Intégration de l’environnement de bureau](tutorial/desktop-environment-integration.md)
* [Détection des événements en ligne/hors ligne](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Notifications natives](tutorial/notifications.md)

## Références de l'API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Commandes Chromes Supportées](api/chrome-command-line-switches.md)
* [Variables d'environnement](api/environment-variables.md)

### Éléments DOM Personnalisé :

* [Objet `File`](api/file-object.md)
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
* [Achat inApp](api/in-app-purchase.md)
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
* [Utilisation du clang-format sur du code C++](development/clang-format.md)
* [Test](development/testing.md)
* [Structure du répertoire du Code Source](development/source-code-directory-structure.md)
* [Différences Techniques de NW.js (anciennement node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Aperçu du Système de compilation](development/build-system-overview.md)
* [Instructions de Build (macOS)](development/build-instructions-osx.md)
* [Instructions de Build (Windows)](development/build-instructions-windows.md)
* [Instructions de Build (Linux)](development/build-instructions-linux.md)
* [Instructions de Debug (macOS)](development/debugging-instructions-macos.md)
* [Instructions de Debug (Windows)](development/debug-instructions-windows.md)
* [Installer un Serveur de Symbol dans le debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Mettre à jour Chromium](development/upgrading-chromium.md)
* [Développement Chromium](development/chromium-development.md)
* [Développement V8](development/v8-development.md)