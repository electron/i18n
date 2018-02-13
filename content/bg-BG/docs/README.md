Преди да продължите да четете, уверете се че версията на документа съвпада с версията на Electron от която се интересувате. Версията може да бъде намерена в URL адреса на страницата. Ако не успявате да идентифицирате версията, то най-вероятно четете настоящият документ касаещ версия на продукта която се разработва в момента. Бъдете внимателни защото информацията, която получавате в момента може да не е съвместима с версията на Electron, с която работите в момента. Ако се интересувате от по-стара версия на продукта, ви съветваме да използвате функцията [browse by tag](https://github.com/electron/electron/tree/v1.4.0) в GitHub като отворите менюто "Switch branches/tags" и изберете версията, която ви интересува.

## Често задавани въпроси

При работата си с продукта често ще се натъквате на проблеми, които са тривиални и са представлявали пречка и за други потребители. Разгледайте секцията с често задавани въпроси и проверете дали проблема който ви тревожи не е получил вече, своето решение:

* [често задавани въпроси за Electron](faq.md)

## Ръководства

* [Речник на термините](glossary.md)
* [Поддържани платформи](tutorial/supported-platforms.md)
* [Сигурност](tutorial/security.md)
* [Версии](tutorial/electron-versioning.md)
* [Разпространяване на разработените приложения](tutorial/application-distribution.md)
* [Публикуване на приложение в Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Публикуване на приложение в Windows store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [Пакетиране на приложението](tutorial/application-packaging.md)
* [Употреба на Node модули](tutorial/using-native-node-modules.md)
* [Намиране на грешки в главния процес](tutorial/debugging-main-process.md)
* [Използване на Selenium и Web Driver](tutorial/using-selenium-and-webdriver.md)
* [Разширения за работа с инструменти за писане на програмен код](tutorial/devtools-extension.md)
* [Използване на Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Използване на Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Тестване и употреба на Системи за непрекъсната интеграция (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Клавишни комбинации](tutorial/keyboard-shortcuts.md)
* [Обновяване на приложенията](tutorial/updates.md)

## Уроци

* [Първи стъпки](tutorial/quick-start.md)
* [Интеграция на настолна среда](tutorial/desktop-environment-integration.md)
* [Засичане на събития](tutorial/online-offline-events.md)
* [Интерактивна среда за разработка на приложения](tutorial/repl.md)
* [Native известия](tutorial/notifications.md)

## Функционална документация

* [Обзор](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Променливи на средата](api/environment-variables.md)

### Персонални DOM елементи:

* [Обект `File`](api/file-object.md)
* [`<webview>`Етикет](api/webview-tag.md)
* [Функция `window.open`](api/window-open.md)

### Модули за основния процес:

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

### Модули за визуализиращи процеси (Web страници):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Общи модули:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Разработка

* [Стандарти за писане на код](development/coding-style.md)
* [Как да използваме clang форматиране при работа със C++ код](development/clang-format.md)
* [Тестване](development/testing.md)
* [Структура на проекта](development/source-code-directory-structure.md)
* [Технически разлики с NW.js (познато преди като node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Обзор на системата за изграждане](development/build-system-overview.md)
* [Инструкции за изграждане (macOS)](development/build-instructions-osx.md)
* [Инструкции за изграждане (Windows)](development/build-instructions-windows.md)
* [Инструкции за изграждане (Linux)](development/build-instructions-linux.md)
* [Инструкции за намиране на грешки (macOS)](development/debugging-instructions-macos.md)
* [Инструкции за намиране на грешки (Windows)](development/debug-instructions-windows.md)
* [Настройване на Symbol сървър при търсене на грешки](development/setting-up-symbol-server.md)
* [Стилове за писане на Electron документацията](styleguide.md)
* [Обновяване на Chromium](development/upgrading-chromium.md)
* [Разработка с Chromium](development/chromium-development.md)
* [Разработка с V8](development/v8-development.md)