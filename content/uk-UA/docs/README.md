Будь ласка, переконайтеся, що ви використовуєте документацію, що відповідає вашій версії Electron. Номер версії має бути частиною URL-адреси сторінки. Якщо це не так, можливо ви використовуєте документацію гілки робробки, що може містити API зміни не сумісні з вашою версією Electron. Щоб переглянути старіші версії документації, ви можете [перейти по тегу](https://github.com/electron/electron/tree/v1.4.0) на GitHub, відкривши випадаюче меню "Перемкнути гілку/тег" і вибравши тег, який відповідає вашій версії.

## FAQ

Є питання, які часто задають. Перевірте їх перед створенням нового:

* [FAQ Electron](faq.md)

## Посібники

* [Словник Термінів](glossary.md)
* [Підтримувані Платформи](tutorial/supported-platforms.md)
* [Безпека](tutorial/security.md)
* [Версії](tutorial/electron-versioning.md)
* [Розповсюдження Програм](tutorial/application-distribution.md)
* [Інструкція Додання в Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Інструкція Додання в Windows Store](tutorial/windows-store-guide.md)
* [Інтрукція Snapcraft](tutorial/snapcraft-guide.md)
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
* [Оновдення Застосунків](tutorial/updates.md)

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
* [Тестування](development/testing.md)
* [Структура Каталогу з Вихідним Кодом](development/source-code-directory-structure.md)
* [Технічні відмінності NW.js (раніше node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Огляд Системи Збірки](development/build-system-overview.md)
* [Інструкція Збірки (macOS)](development/build-instructions-osx.md)
* [Інструкція Збірки (Windows)](development/build-instructions-windows.md)
* [Інструкція Збірки (Linux)](development/build-instructions-linux.md)
* [Інструкція Відлагодження (macOS)](development/debugging-instructions-macos.md)
* [Інструкція Відлагодження (Windows)](development/debug-instructions-windows.md)
* [Налаштування Серверу Символів в Налагоджувачі](development/setting-up-symbol-server.md)
* [Стиль документації](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Оновлення Chromium](development/upgrading-chromium.md)
* [Розробка Chromium](development/chromium-development.md)
* [Розробка V8](development/v8-development.md)