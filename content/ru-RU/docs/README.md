Убедитесь, что вы используете документацию, соответствующую вашей версии Electron. Версия должна быть частью URL-адреса страницы. Если это не так, вы, вероятно, используете документацию к главной ветке, которая может содержать изменения API, несовместимые с вашей версией Electron. Чтобы просмотреть более старые версии документации, вы можете использовать [browse by tag](https://github.com/electron/electron/tree/v1.4.0) на GitHub, открыв список «Switch branches/tags» и выбрав тег, соответствующий вашей версии.

## FAQ

Есть вопросы, которые задаются довольно часто. Прочитайте это, прежде чем открывать issue:

* [FAQ по Electron](faq.md)

## Руководства

* [Глоссарий](glossary.md)
* [Поддерживаемые платформы](tutorial/supported-platforms.md)
* [Безопасность](tutorial/security.md)
* [Нумерация версий Electron](tutorial/electron-versioning.md)
* [Распространение приложений](tutorial/application-distribution.md)
* [Руководство по распространению с помощью Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Руководство по распространению с помощью Windows Store](tutorial/windows-store-guide.md)
* [Упаковка приложений](tutorial/application-packaging.md)
* [Использование нативных модулей NodeJS](tutorial/using-native-node-modules.md)
* [Отладка главного процесса](tutorial/debugging-main-process.md)
* [Использование Selenium и WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Расширение DevTools](tutorial/devtools-extension.md)
* [Использование плагина Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Использование плагина Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Тестирование с помощью систем непрерывной интеграции (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Закадровый рендеринг](tutorial/offscreen-rendering.md)
* [Горячие клавиши](tutorial/keyboard-shortcuts.md)

## Инструкции

* [Руководство для начинающих](tutorial/quick-start.md)
* [Интеграция со средами рабочего стола](tutorial/desktop-environment-integration.md)
* [Обнаружение онлайн/офлайн событий](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Нативные уведомления](tutorial/notifications.md)

## Справочник по API

* [Краткий обзор](api/synopsis.md)
* [Объект процесса](api/process.md)
* [Поддерживаемые параметры командной строки Chrome](api/chrome-command-line-switches.md)
* [Переменные окружения](api/environment-variables.md)

### Пользовательские DOM-элементы:

* [Объект `File`](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [Функция `window.open`](api/window-open.md)

### Модули главного процесса:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
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

### Модули для процесса-рендерера (веб-страницы):

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

## Development

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Source Code Directory Structure](development/source-code-directory-structure.md)
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
* [V8 Development](development/v8-development.md)