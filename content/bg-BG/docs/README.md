Преди да продължите да четете, уверете се че версията на документа съвпада с версията на Electron от която се интересувате. Версията може да бъде намерена в URL адреса на страницата. Ако не успявате да идентифицирате версията, то най-вероятно четете настоящият документ касаещ версия на продукта която се разработва в момента. Бъдете внимателни защото информацията, която получавате в момента може да не е съвместима с версията на Electron, с която работите в момента. Ако се интересувате от по-стара версия на продукта, ви съветваме да използвате функцията [browse by tag](https://github.com/electron/electron/tree/v1.4.0) в GitHub като отворите менюто "Switch branches/tags" и изберете версията, която ви интересува.

## Често задавани въпроси

При работата си с продукта често ще се натъквате на проблеми, които са тривиални и са представлявали пречка и за други потребители. Разгледайте секцията с често задавани въпроси и проверете дали проблема който ви тревожи не е получил вече, своето решение:

* [често задавани въпроси за Electron](faq.md)

## Ръководства

* [Glossary of Terms](glossary.md)
* [Supported Platforms](tutorial/supported-platforms.md)
* [Security](tutorial/security.md)
* [Electron Versioning](tutorial/electron-versioning.md)
* [Application Distribution](tutorial/application-distribution.md)
* [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md)
* [Windows Store Guide](tutorial/windows-store-guide.md)
* [Application Packaging](tutorial/application-packaging.md)
* [Using Native Node Modules](tutorial/using-native-node-modules.md)
* [Debugging Main Process](tutorial/debugging-main-process.md)
* [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools Extension](tutorial/devtools-extension.md)
* [Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)

## Tutorials

* [Quick Start](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## API References

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### Custom DOM Elements:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Function](api/window-open.md)

### Modules for the Main Process:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
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

### Modules for the Renderer Process (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Разработка

* [Стандарти за писане на код](development/coding-style.md)
* [Как да използваме clang форматиране при работа със C++ код](development/clang-format.md)
* [Структура на проекта](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [Разработка на V8](development/v8-development.md)