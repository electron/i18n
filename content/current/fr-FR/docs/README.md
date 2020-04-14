# Guide officiel

Veuillez vous assurer d'utiliser la documentation qui correspond à votre version d'Electron. Le numéro de version doit être une partie de l'URL de la page. Si ce n'est pas le cas, vous utilisez probablement la documentation d'une branche de développement pouvant contenir des modifications de l'API qui ne sont pas compatibles avec votre version d'Electron. Pour consulter les anciennes versions de la documentation, vous pouvez [Parcourir par tag](https://github.com/electron/electron/tree/v1.4.0) sur GitHub en ouvrant la liste déroulante « Switch branches/tags » et sélectionnez le tag qui correspond à votre version.

## FAQ

There are questions that are asked quite often. Check this out before creating an issue:

* [FAQ Electron](faq.md)

## Guides et tutoriels

* [Mise en place de l'environnement de développement](tutorial/development-environment.md)
  * [Mise en place sur macOS](tutorial/development-environment.md#setting-up-macos)
  * [Mise en place sur Windows](tutorial/development-environment.md#setting-up-windows)
  * [Mise en place sur Linux](tutorial/development-environment.md#setting-up-linux)
  * [Choisir un éditeur](tutorial/development-environment.md#a-good-editor)
* [Créer votre première App](tutorial/first-app.md)
  * [Installer Electron](tutorial/first-app.md#installing-electron)
  * [Le développement avec Electron en résumé](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Lancer votre App](tutorial/first-app.md#running-your-app)
* [Les Boilerplates et CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Autres outils et boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Architecture d'une application](tutorial/application-architecture.md)
  * [Processus Principal et de Rendu](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Utilisation des APIs Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Utilisation des APIs de Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Utilisation des Modules Natifs de Node.js](tutorial/using-native-node-modules.md)
  * [Stratégies de performance](tutorial/performance.md)
* Ajouter des fonctionnalités à votre App
  * [Notifications](tutorial/notifications.md)
  * [Documents récents](tutorial/recent-documents.md)
  * [Progression de l'Application](tutorial/progress-bar.md)
  * [Menu Dock personnalisé](tutorial/macos-dock.md)
  * [Barre des tâches Windows personnalisée](tutorial/windows-taskbar.md)
  * [Actions de bureau Linux personnalisées](tutorial/linux-desktop-actions.md)
  * [Raccourcis clavier](tutorial/keyboard-shortcuts.md)
  * [Détection en ligne/hors ligne](tutorial/online-offline-events.md)
  * [Fichier représenté pour BrowserWindows sur macOS](tutorial/represented-file.md)
  * [Fichier natif Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Rendu hors de l'écran](tutorial/offscreen-rendering.md)
  * [Support du mode sombre sur macOS](tutorial/mojave-dark-mode-guide.md)
  * [Les web embeds dans Electron](tutorial/web-embeds.md)
* [Accessibilité](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Activer l'accessibilité](tutorial/accessibility.md#enabling-accessibility)
* [Test et débogage](tutorial/application-debugging.md)
  * [Débogguer le Main Process](tutorial/debugging-main-process.md)
  * [Débogguer le Main Process avec Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Utilisation de Selenium et WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Tests sur les systèmes CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extension DevTools](tutorial/devtools-extension.md)
  * [Test automatisé avec un driver personnalisé](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribution](tutorial/application-distribution.md)
  * [Plateformes supportées](tutorial/support.md#supported-platforms)
  * [Signature de code](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Sécurité](tutorial/security.md)
  * [Signalement des problèmes de sécurité](tutorial/security.md#reporting-security-issues)
  * [Problèmes de sécurité et mises à jour de Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Avertissements de sécurité d'Electron](tutorial/security.md#electron-security-warnings)
  * [Checklist Sécurité](tutorial/security.md#checklist-security-recommendations)
* [Mises à jour](tutorial/updates.md)
  * [Déploiement d’un serveur de mise à jour](tutorial/updates.md#deploying-an-update-server)
  * [Implémentation des mises à jour dans votre application](tutorial/updates.md#implementing-updates-in-your-app)
  * [Appliquer les mises à jour](tutorial/updates.md#applying-updates)
* [Obtenir de l'aide](tutorial/support.md)

## Tutoriels détaillés

Ces tutoriels individuels développent les sujets abordés dans le guide ci-dessus.

* [Installer Electron](tutorial/installation.md)
  * [Les proxys](tutorial/installation.md#proxies)
  * [Mirroirs et Caches personnalisés](tutorial/installation.md#custom-mirrors-and-caches)
  * [Résolution de problème](tutorial/installation.md#troubleshooting)
* Releases d'Electron & Feedback
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Calendrier de release99](tutorial/electron-timelines.md)
  * [Programme de feedback](tutorial/app-feedback-program.md)
* [Empaqueter le code source de l'App avec asar](tutorial/application-packaging.md)
  * [Génerer des archives asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Lire une archive asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitations](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Ajouter des fichiers non empaquetés dans des archives asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Tester le CDM Widevine](tutorial/testing-widevine-cdm.md)
* [Utilisation du plugin Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [Glossaire des termes](glossary.md)

## Références de l'API

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Commandes Supportées](api/command-line-switches.md)
* [Variables d'environnement](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Modifications importantes de l'API](breaking-changes.md)

### Éléments DOM Personnalisé :

* [Objet `File`](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
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
* [shell](api/shell.md)

## Développement

Voir [development/README.md](development/README.md)
