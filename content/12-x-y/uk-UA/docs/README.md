# Офіційне керівництво

Будь ласка, переконайтеся, що ви використовуєте документацію, що відповідає вашій версії Electron. Номер версії має бути частиною URL-адреси сторінки. Якщо це не так, можливо ви використовуєте документацію гілки робробки, що може містити API зміни не сумісні з вашою версією Electron. Щоб переглянути старіші версії документації, ви можете [перейти по тегу](https://github.com/electron/electron/tree/v1.4.0) на GitHub, відкривши випадаюче меню "Перемкнути гілку/тег" і вибравши тег, який відповідає вашій версії.

## FAQ

Ось питання, які задають найчастіше. Перегляньте їх перед створенням проблеми:

* [FAQ Electron](faq.md)

## Посібники та Підручники

### Швидкий старт

* [Короткий посібник користувача](tutorial/quick-start.md)
  * [Системні вимоги](tutorial/quick-start.md#prerequisites)
  * [Створення базової програми](tutorial/quick-start.md#create-a-basic-application)
  * [Запустити програму](tutorial/quick-start.md#run-your-application)
  * [Пакунок та розповсюдження додатка](tutorial/quick-start.md#package-and-distribute-the-application)

### Вивчення основ

* [Electron's Process Model](tutorial/quick-start.md#application-architecture)
  * [Головний та Рендерний процеси](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
* Додавання Функцій до Вашого Застосунку
  * [Сповіщення](tutorial/notifications.md)
  * [Останні Документи](tutorial/recent-documents.md)
  * [Прогрес Перекладу](tutorial/progress-bar.md)
  * [Налаштовуване Dock Меню](tutorial/macos-dock.md)
  * [Налаштовувана Панель Завдань Windows](tutorial/windows-taskbar.md)
  * [Налаштовувані Linux Дії Робочого Столу](tutorial/linux-desktop-actions.md)
  * [Гарячі Клавіші](tutorial/keyboard-shortcuts.md)
  * [Оффлайн/Онлайн Виявлення](tutorial/online-offline-events.md)
  * [Представлення Файлу для macOS BrowserWindows](tutorial/represented-file.md)
  * [Нативний Drag & Видалити файл](tutorial/native-file-drag-drop.md)
  * [Закадровий Рендеринг](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Веб-вкладення з Electron](tutorial/web-embeds.md)
* [Шаблони Коду vs CLI](tutorial/boilerplates-and-clis.md)
  * [Шаблони Коду vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Інші Інструменти та Шаблони Коду](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced steps

* Архітектура Застосунків
  * [Використання Нативних Модулів Node.js](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Security Strategies](tutorial/security.md)
* [Доступність](tutorial/accessibility.md)
  * [Вручну Увімкнення функцій спеціальних можливостей](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Тестування та відлагодження](tutorial/application-debugging.md)
  * [Відлагодження Головного Процесу](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
  * [Використання Selenium і WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестування на віддалених CI системах (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Розширення DevTools](tutorial/devtools-extension.md)
  * [Автоматичне тестування за допомогою користувацького драйвера](tutorial/automated-testing-with-a-custom-driver.md)
* [Розповсюдження](tutorial/application-distribution.md)
  * [Підтримувані Платформи](tutorial/support.md#supported-platforms)
  * [Підпис коду](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Оновлення](tutorial/updates.md)
  * [Розгортання на Сервері для Оновлень](tutorial/updates.md#deploying-an-update-server)
  * [Реалізація Оновлення в Вашому Застосунку](tutorial/updates.md#implementing-updates-in-your-app)
  * [Застосування Оновлень](tutorial/updates.md#applying-updates)
* [Підтримка](tutorial/support.md)

## Докладні Підручники

Ці окремі підручники розширюють теми, що обговорюються в Путівнику вище.

* [Встановлення Electron](tutorial/installation.md)
  * [Проксі](tutorial/installation.md#proxies)
  * [Користувацькі Дзеркала та Кеш](tutorial/installation.md#custom-mirrors-and-caches)
  * [Виправлення Неполадок](tutorial/installation.md#troubleshooting)
* Випуски Electron & відгуки розробників
  * [Політика версійності](tutorial/electron-versioning.md)
  * [Історія та план версій](tutorial/electron-timelines.md)
* [Пакування Коду Застосунку з asar](tutorial/application-packaging.md)
  * [Генерація asar Архівів](tutorial/application-packaging.md#generating-asar-archives)
  * [Використання asar Архівів](tutorial/application-packaging.md#using-asar-archives)
  * [Обмеження](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Додавання Нерозпакованих Файлів в asar Архів](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Тестування Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Словник Термінів](glossary.md)

## Довідник API

* [Короткий огляд](api/synopsis.md)
* [Обробка Об'єктів](api/process.md)
* [Supported Command Line Switches](api/command-line-switches.md)
* [Змінні Середовища](api/environment-variables.md)
* [Підтримка розширень Chrome](api/extensions.md)
* [Останні важливі зміни в API](breaking-changes.md)

### Користувацькі DOM Елементи:

* [Об'єкт `File`](api/file-object.md)
* [Тег `<webview>`](api/webview-tag.md)
* [Функція `window.open`](api/window-open.md)
* [Об’єкт `BrowserWindowProxy`](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Нагадування](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Модулі для Процесу Рендерера (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Модулі для Обох Процесів:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Розробка

Дивіться [development/README.md](development/README.md)
