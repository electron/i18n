# Official Guides

Použijte prosím dokumentaci, která odpovídá vámi používanou verzi Electronu. Číslo verze by mělo být součástí URL. Pokud ne, používáte pravděpodobně dokumentaci vývojové větve, která může obsahovat změny v API, který nemusí být kompatibilní s vaší verzí Electronu. Chcete-li zobrazit starší verze dokumentace, můžete na GitHubu využít možnost [Switch branches/tags](https://github.com/electron/electron/tree/v1.4.0) a tak pomocí značek přepnout na starší verzi.

## Časté dotazy

Existují otázky, které se kladou poměrně často. Před vytvořením problém zkontrolujte:

* [Electron FAQ](faq.md)

## Příručky a Návody

* [O Electron](tutorial/about.md)
* [Nastavení vývojového prostředí](tutorial/development-environment.md)
  * [Nastavení pro macOS](tutorial/development-environment.md#setting-up-macos)
  * [Nastavení pro Windows](tutorial/development-environment.md#setting-up-windows)
  * [Nastavení pro Linux](tutorial/development-environment.md#setting-up-linux)
  * [Výběr editoru](tutorial/development-environment.md#a-good-editor)
* [Vytvořit tvoji 1. aplikaci](tutorial/first-app.md)
  * [Instalování Electronu](tutorial/first-app.md#installing-electron)
  * [Vývoj pro Electron v kostce](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Spuštění vaší aplikace](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md)
  * [Varo.com.chikitaisaac123@gmail.com](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [elektronová kovárna](tutorial/boilerplates-and-clis.md#electron-forge)
  * [elektronický stavitel](tutorial/boilerplates-and-clis.md#electron-builder)
  * [elektronická reakční kotle](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Ostatní nástroje a vařiče](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md)
  * [Hlavní a zobrazovací procesy](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Použití Node.js API](tutorial/application-architecture.md#using-nodejs-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
* Adding Features to Your App
  * [Notifikace](tutorial/notifications.md)
  * [Nedávné dokumenty](tutorial/recent-documents.md)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/macos-dock.md)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Klávesové zkratky](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Předložený soubor pro macOS BrowserWindows](tutorial/represented-file.md)
  * [Nativní přetažení souborů & Zahodit](tutorial/native-file-drag-drop.md)
  * [Offscreen vykreslování](tutorial/offscreen-rendering.md)
  * [Podpora macOS tmavého módu [Dark Mode]](tutorial/mojave-dark-mode-guide.md)
* [Přístupnost](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Povolení usnadnění přístupu](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md)
  * [Ladění hlavního procesu](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Využití Selenium a WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testování na bezhlavý CI systémů (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [DevTools rozšíření](tutorial/devtools-extension.md)
  * [Automatizované testování s vlastním řidičem](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribuce](tutorial/application-distribution.md)
  * [Podporované platformy](tutorial/support.md#supported-platforms)
  * [Podepsání kódu](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Bezpečnost](tutorial/security.md)
  * [Hlášení bezpečnostních problémů](tutorial/security.md#reporting-security-issues)
  * [Problémy a vylepšení zabezpečení Chromu](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Upozornění na elektronické zabezpečení](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Aktualizace](tutorial/updates.md)
  * [Publikování aktualizačního serveru](tutorial/updates.md#deploying-an-update-server)
  * [Provádění aktualizací ve vaší aplikaci](tutorial/updates.md#implementing-updates-in-your-app)
  * [Aplikování aktualizací](tutorial/updates.md#applying-updates)
* [Getting Support](tutorial/support.md)

## Detailní provodci

These individual tutorials expand on topics discussed in the guide above.

* [Instalování Electronu](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Vlastní zrcátka a keše](tutorial/installation.md#custom-mirrors-and-caches)
  * [Odstranění problémů](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback
  * [Versioning Policy](tutorial/electron-versioning.md)
  * [Release Timelines](tutorial/electron-timelines.md)
  * [App Feedback Program](tutorial/app-feedback-program.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Omezení](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testování širokého CDM](tutorial/testing-widevine-cdm.md)
* [Používání Pepper Flash Pluginu](tutorial/using-pepper-flash-plugin.md)

---

* [Slovníček pojmů](glossary.md)

## API Reference

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Environment Variables](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### Vlastní prvky DOM:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funkce](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Moduly pro hlavní proces:

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
* [Notifikace](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [obrazovka](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Moduly pro proces Renderer (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [schránka](api/clipboard.md)
* [Hlášení pádů](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Vývoj

See [development/README.md](development/README.md)
