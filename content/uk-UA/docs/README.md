# Офіційне керівництво

Будь ласка, переконайтеся, що ви використовуєте документацію, що відповідає вашій версії Electron. Номер версії має бути частиною URL-адреси сторінки. Якщо це не так, можливо ви використовуєте документацію гілки робробки, що може містити API зміни не сумісні з вашою версією Electron. Щоб переглянути старіші версії документації, ви можете [перейти по тегу](https://github.com/electron/electron/tree/v1.4.0) на GitHub, відкривши випадаюче меню "Перемкнути гілку/тег" і вибравши тег, який відповідає вашій версії.

## FAQ

Є питання, які часто задають. Перевірте їх перед створенням нового:

* [FAQ Electron](faq.md)

## Посібники та Підручники

* [Настроювання Середовища Розробки](tutorial/development-environment.md) 
  * [Настроювання macOS](tutorial/development-environment.md#setting-up-macos)
  * [Настроювання Windows](tutorial/development-environment.md#setting-up-windows)
  * [Настроювання Linux](tutorial/development-environment.md#setting-up-linux)
  * [Вибір Редактора](tutorial/development-environment.md#a-good-editor)
* [Створення вашого першого застосунку](tutorial/first-app.md) 
  * [Встановлення Electron](tutorial/first-app.md#installing-electron)
  * [Розробка на Electron в Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Запуск Вашого Застосунку](tutorial/first-app.md#running-your-app)
* [Шаблони Коду та CLI](tutorial/boilerplates-and-clis.md) 
  * [Шаблони Коду vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Інші Інструменти та Шаблони Коду](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Архітектура Застосунків](tutorial/application-architecture.md) 
  * [Головний та Процес Рендерингу](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Використання API Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Використання API Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Використання Нативних Модулів Node.js](tutorial/using-native-node-modules.md)
* Додавання Функцій до Вашого Застосунку 
  * [Сповіщення](tutorial/notifications.md)
  * [Останні Документи](tutorial/desktop-environment-integration.md#recent-documents)
  * [Прогрес Перекладу](tutorial/progress-bar.md)
  * [Налаштовуване Dock Меню](tutorial/macos-dock.md)
  * [Налаштовувана Панель Завдань Windows](tutorial/windows-taskbar.md)
  * [Налаштовувані Linux Дії Робочого Столу](tutorial/linux-desktop-actions.md)
  * [Гарячі Клавіші](tutorial/keyboard-shortcuts.md)
  * [Оффлайн/Онлайн Виявлення](tutorial/online-offline-events.md)
  * [Представлення Файлу для macOS BrowserWindows](tutorial/represented-file.md)
  * [Нативний Drag & Drop Файлу](tutorial/native-file-drag-drop.md)
* [Доступність](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Увімкнення Спеціальних Можливостей](tutorial/accessibility.md#enabling-accessibility)
* [Тестування та відлагодження](tutorial/application-debugging.md) 
  * [Відлагодження Головного Процесу](tutorial/debugging-main-process.md)
  * [Використання Selenium і WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестування на віддалених CI системах (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Розширення DevTools](tutorial/devtools-extension.md)
  * [Автоматичне тестування за допомогою користувацького драйвера](tutorial/automated-testing-with-a-custom-driver.md)
* Пакування 
  * [Підпис коду](tutorial/code-signing.md)
* [Розповсюдження](tutorial/application-distribution.md) 
  * [Підтримка](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Безпека](tutorial/security.md) 
  * [Повідомити про Проблему Безпеки](tutorial/security.md#reporting-security-issues)
  * [Проблеми з Безпекою Chromium та Вдосконалення](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Попередження про Безпеку Electron](tutorial/security.md#electron-security-warnings)
  * [Контрольний Список Безпеки](tutorial/security.md#checklist-security-recommendations)
* [Оновлення](tutorial/updates.md) 
  * [Розгортання на Сервері для Оновлень](tutorial/updates.md#deploying-an-update-server)
  * [Реалізація Оновлення в Вашому Застосунку](tutorial/updates.md#implementing-updates-in-your-app)
  * [Застосування Оновлень](tutorial/updates.md#applying-updates)

## Докладні Підручники

Ці окремі підручники розширюють теми, що обговорюються в Путівнику вище.

* [Детальніше: Встановлення Electron](tutorial/installation.md) 
  * [Проксі](tutorial/installation.md#proxies)
  * [Користувацькі Дзеркала та Кеш](tutorial/installation.md#custom-mirrors-and-caches)
  * [Виправлення Неполадок](tutorial/installation.md#troubleshooting)
* [Детальніше: Схема Версій Electron](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Стабілізація Гілок](tutorial/electron-versioning.md#stabilization-branches)
  * [Бета Релізи і Усування Помилок](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [Детальніше: Пакування Коду Застосунку з asar](tutorial/application-packaging.md) 
  * [Генерація asar Архівів](tutorial/application-packaging.md#generating-asar-archives)
  * [Використання asar Архівів](tutorial/application-packaging.md#using-asar-archives)
  * [Обмеження](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Додавання Нерозпакований Файлів в asar Архів](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Детальніше: Використання Плагіну Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Детальніше: Використання Плагіну Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Закадровий Рендеринг](tutorial/offscreen-rendering.md)

* * *

* [Словник Термінів](glossary.md)

## Довідник API

* [Короткий Огляд](api/synopsis.md)
* [Обробка Об'єктів](api/process.md)
* [Підтримувані Параметри Командного Рядка Chrome](api/chrome-command-line-switches.md)
* [Змінні Середовища](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

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
* [netLog](api/netLog.md)
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

Дивіться <development/README.md>