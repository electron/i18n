# Официальное руководство

Убедитесь, что Вы используете документацию, соответствующую вашей версии Electron. Версия должна быть частью URL-адреса страницы. Если это не так, Вы, вероятно, используете документацию к главной ветке, которая может содержать изменения API, несовместимые с вашей версией Electron. Чтобы просмотреть более старые версии документации, Вы можете использовать [browse by tag](https://github.com/electron/electron/tree/v1.4.0) на GitHub, открыв список «Switch branches/tags» и выбрав тег, соответствующий вашей версии.

## FAQ

Есть вопросы, которые задаются довольно часто. Ознакомьтесь с данным документом, прежде чем задать свой вопрос:

* [FAQ по Electron](faq.md)

## Руководство

* [Настройка среды разработки](tutorial/development-environment.md) 
  * [Настройка macOS](tutorial/development-environment.md#setting-up-macos)
  * [Настройка Windows](tutorial/development-environment.md#setting-up-windows)
  * [Настройка Linux](tutorial/development-environment.md#setting-up-linux)
  * [Выбор редактора](tutorial/development-environment.md#a-good-editor)
* [Создание Вашего первого приложения](tutorial/first-app.md) 
  * [Установка Electron](tutorial/first-app.md#installing-electron)
  * [Разработка Electron в двух словах](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Запуск Вашего приложения](tutorial/first-app.md#running-your-app)
* [Макеты и CLI](tutorial/boilerplates-and-clis.md) 
  * [Макеты против CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Другие инструменты и Макеты](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Архитектура приложения](tutorial/application-architecture.md) 
  * [Main и Renderer процессы](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Использование API Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Использование API Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Использование нативных модулей Node.js](tutorial/using-native-node-modules.md)
* Добавление функционала в Ваше приложение 
  * [Уведомления](tutorial/notifications.md)
  * [Недавние документы](tutorial/desktop-environment-integration.md#recent-documents)
  * [Прогресс приложения](tutorial/progress-bar.md)
  * [Пользовательское меню macOS](tutorial/macos-dock.md)
  * [Пользовательские задачи Windows](tutorial/windows-taskbar.md)
  * [Пользовательские действия на Linux](tutorial/linux-desktop-actions.md)
  * [Горячие клавиши](tutorial/keyboard-shortcuts.md)
  * [Онлайн/оффлайн обнаружения](tutorial/online-offline-events.md)
  * [Представленный файл для macOS BrowserWindows](tutorial/represented-file.md)
  * [Нативное перемещение файла](tutorial/native-file-drag-drop.md)
* [Доступность](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Включение доступности](tutorial/accessibility.md#enabling-accessibility)
* [Тестирование и отладка](tutorial/application-debugging.md) 
  * [Отладка главного процесса](tutorial/debugging-main-process.md)
  * [Использование Selenium и WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестирование с помощью систем непрерывной интеграции (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Расширение DevTools](tutorial/devtools-extension.md)
  * [Автоматическое тестирование с помощью специального драйвера](tutorial/automated-testing-with-a-custom-driver.md)
* Упаковка 
  * [Цифровая подпись](tutorial/code-signing.md)
* [Распространение](tutorial/application-distribution.md) 
  * [Поддержка](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Безопасность](tutorial/security.md) 
  * [Отчеты по безопасности](tutorial/security.md#reporting-security-issues)
  * [Вопросы и обновления безопасности Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Предупреждение безопасности Electron](tutorial/security.md#electron-security-warnings)
  * [Контрольный список безопасности](tutorial/security.md#checklist-security-recommendations)
* [Обновления](tutorial/updates.md) 
  * [Развертывание сервера обновлений](tutorial/updates.md#deploying-an-update-server)
  * [Внедрение обновлений в Ваше приложение](tutorial/updates.md#implementing-updates-in-your-app)
  * [Применение обновлений](tutorial/updates.md#applying-updates)

## Подробное руководство

Эти индивидуальные руководства расширят темы, обсуждаемые выше.

* [В деталях: Установка Electron](tutorial/installation.md) 
  * [Прокси](tutorial/installation.md#proxies)
  * [Пользовательские зеркала и кеши](tutorial/installation.md#custom-mirrors-and-caches)
  * [Устранение проблем](tutorial/installation.md#troubleshooting)
* [В деталях: Схема управления версиями Electron](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Стабильные ветки](tutorial/electron-versioning.md#stabilization-branches)
  * [Бета-релизы и исправление багов](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [В деталях: Упаковка исходного кода приложения с помощью asar](tutorial/application-packaging.md) 
  * [Создание архива asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Использование архива asar](tutorial/application-packaging.md#using-asar-archives)
  * [Ограничения](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Добавление распакованных файлов в архив asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [В деталях: Использование плагина Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [В деталях: Использование плагина Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Закадровый рендеринг](tutorial/offscreen-rendering.md)

* * *

* [Глоссарий](glossary.md)

## Справочник по API

* [Краткий обзор](api/synopsis.md)
* [Объект процесса](api/process.md)
* [Поддерживаемые параметры командной строки Chrome](api/chrome-command-line-switches.md)
* [Переменные окружения](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### Пользовательские DOM-элементы:

* [Объект `File`](api/file-object.md)
* [Тег `<webview>`](api/webview-tag.md)
* [Функция `window.open`](api/window-open.md)

### Модули для главного процесса:

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

### Модули для Renderer процесса (веб-страницы):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Модули для обоих процессов:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Разработка

См. <development/README.md>