Будь ласка, переконайтеся, що ви використовуєте документацію, що відповідає вашій версії Electron. Номер версії має бути частиною URL-адреси сторінки. Якщо це не так, можливо ви використовуєте документацію гілки робробки, що може містити API зміни не сумісні з вашою версією Electron. Щоб переглянути старіші версії документації, ви можете [перейти по тегу](https://github.com/electron/electron/tree/v1.4.0) на GitHub, відкривши випадаюче меню "Перемкнути гілку/тег" і вибравши тег, який відповідає вашій версії.

## FAQ

Є питання, які часто задають. Перевірте їх перед створенням нового:

* [FAQ Electron](faq.md)

## Посібники

* [Словник Термінів](glossary.md)
* [Підтримувані Платформи](tutorial/supported-platforms.md)
* [Безпека](tutorial/security.md)
* [Версії Electron](tutorial/electron-versioning.md)
* [Розповсюдження Програм](tutorial/application-distribution.md)
* [Інструкція Додання в Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Інструкція Додання в Windows Store](tutorial/windows-store-guide.md)
* [Пакування Застосунків](tutorial/application-packaging.md)
* [Використання Нативних Модулів Node.js](tutorial/using-native-node-modules.md)
* [Налагодження Основного Процесу](tutorial/debugging-main-process.md)
* [Використання Selenium і WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Розширення DevTools](tutorial/devtools-extension.md)
* [Використання Плагіну Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Використання Плагіну Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Тестування на віддалених CI системах (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Закадровий Рендеринг](tutorial/offscreen-rendering.md)
* [Гарячі Клавіші](tutorial/keyboard-shortcuts.md)

## Уроки

* [Швидкий Старт](tutorial/quick-start.md)
* [Інтеграція з Середовищами Робочого Столу](tutorial/desktop-environment-integration.md)
* [Виявлення Онлайн/Офлайн Подій](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Нативні Сповіщення](tutorial/notifications.md)

## Довідник API

* [Короткий Огляд](api/synopsis.md)
* [Обробка Об'єктів](api/process.md)
* [Підтримувані Параметри Командного Рядка Chrome](api/chrome-command-line-switches.md)
* [Змінні Середовища](api/environment-variables.md)

### Користувацькі DOM Елементи:

* [Об'єкт `File`](api/file-object.md)
* [Тег `<webview>`](api/webview-tag.md)
* [Функція `window.open`](api/window-open.md)

### Модулі для Головного Процесу:

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

### Модулі для Процесу Рендерера (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Модулі для Обох Процесів:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Розробка

* [Стиль Коду](development/coding-style.md)
* [Використання clang-format в C++ Коді](development/clang-format.md)
* [Структура Каталогу з Вихідним Кодом](development/source-code-directory-structure.md)
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