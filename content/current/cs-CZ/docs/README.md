# Official Guides

Použijte prosím dokumentaci, která odpovídá vámi používanou verzi Electronu. Číslo verze by mělo být součástí URL. Pokud ne, používáte pravděpodobně dokumentaci vývojové větve, která může obsahovat změny v API, který nemusí být kompatibilní s vaší verzí Electronu. Chcete-li zobrazit starší verze dokumentace, můžete na GitHubu využít možnost [Switch branches/tags](https://github.com/electron/electron/tree/v1.4.0) a tak pomocí značek přepnout na starší verzi.

## Časté dotazy

Existují otázky, které se kladou poměrně často. Před vytvořením problém zkontrolujte:

* [Electron FAQ](faq.md)

## Příručky a Návody

### Rychlý start

* [Průvodce rychlým startem](tutorial/quick-start.md)
  * [Prerequisites](tutorial/quick-start.md#prerequisites)
  * [Vytvořit základní aplikaci](tutorial/quick-start.md#create-a-basic-application)
  * [Spustit aplikaci](tutorial/quick-start.md#run-your-application)
  * [Balík a rozesílat aplikaci](tutorial/quick-start.md#package-and-distribute-the-application)

### Učit se základy

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Hlavní a zobrazovací procesy](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
* Adding Features to Your App
  * [Oznámení](tutorial/notifications.md)
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
  * [Dark Mode](tutorial/dark-mode.md)
  * [Webové vložení do Electronu](tutorial/web-embeds.md)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md)
  * [Plechovka vs. CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [elektronická forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [elektronický stavitel](tutorial/boilerplates-and-clis.md#electron-builder)
  * [elektronická reakční kotle](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Ostatní nástroje a vařiče](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* Application Architecture
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Přístupnost](tutorial/accessibility.md)
  * [Ručně povolit funkce usnadnění přístupu](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Testing and Debugging](tutorial/application-debugging.md)
  * [Ladění hlavního procesu](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
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
* [Testování širokého CDM](tutorial/testing-widevine-cdm.md)

---

* [Slovníček pojmů](glossary.md)

## API Reference

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Environment Variables](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Breaking API Changes](breaking-changes.md)

### Vlastní prvky DOM:

* [`File` Objekt](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Funkce](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

### Moduly pro hlavní proces:

* [appka](api/app.md)
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
* [nativeTheme](api/native-theme.md)
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
* [webFrameMain](api/web-frame-main.md)

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
