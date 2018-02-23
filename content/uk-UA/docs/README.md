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
  * [Використання API Node.js](tutorial/application-architecture.md#using-node.js-apis)
  * [Використання Нативних Модулів Node.js](tutorial/using-native-node-modules.md)
  * [Міжпроцесна Комунікація](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [Notifications](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Гарячі Клавіші](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Application Accessibility](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Enabling Accessibility](tutorial/accessibility.md#enabling-accessibility)
* [Application Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging the Main Process](tutorial/debugging-main-process.md)
  * [Використання Selenium і WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестування на віддалених CI системах (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Розширення DevTools](tutorial/devtools-extension.md)
* [Розповсюдження Програм](tutorial/application-distribution.md) 
  * [Підтримувані Платформи](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Application Security](tutorial/security.md) 
  * [Reporting Security Issues](tutorial/security.md#reporting-security-issues)
  * [Chromium Security Issues and Upgrades](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Application Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Troubleshooting](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilization Branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Обмеження](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Закадровий Рендеринг](tutorial/offscreen-rendering.md)

* * *

* [Словник Термінів](glossary.md)

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
* [Доповнення до Electron](../CONTRIBUTING.md)
* [Проблеми](development/issues.md)
* [Пул Реквести](development/pull-requests.md)
* [Оновлення Chromium](development/upgrading-chromium.md)
* [Розробка Chromium](development/chromium-development.md)
* [Розробка V8](development/v8-development.md)