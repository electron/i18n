# Официальное руководство

Убедитесь, что Вы используете документацию, соответствующую вашей версии Electron. Версия должна быть частью URL-адреса страницы. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. Чтобы просмотреть более старые версии документации, Вы можете использовать [browse by tag](https://github.com/electron/electron/tree/v1.4.0) на GitHub, открыв список «Switch branches/tags» и выбрав тег, соответствующий вашей версии.

## FAQ

There are questions that are asked quite often. Check this out before creating an issue:

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
  * [Другие инструменты и макеты](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Архитектура приложения](tutorial/application-architecture.md)
  * [Основной( Main ) и графический( Renderer ) процессы](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Использование API Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Использование API Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Использование нативных модулей Node.js](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
* Добавление функционала в Ваше приложение
  * [Уведомления](tutorial/notifications.md)
  * [Недавние документы](tutorial/recent-documents.md)
  * [Прогресс приложения](tutorial/progress-bar.md)
  * [Пользовательское меню macOS](tutorial/macos-dock.md)
  * [Пользовательские задачи Windows](tutorial/windows-taskbar.md)
  * [Пользовательские действия на Linux](tutorial/linux-desktop-actions.md)
  * [Горячие клавиши](tutorial/keyboard-shortcuts.md)
  * [Оффлайн/Онлайн обнаружение](tutorial/online-offline-events.md)
  * [Представленный файл для macOS BrowserWindows](tutorial/represented-file.md)
  * [Нативное перемещение файла](tutorial/native-file-drag-drop.md)
  * [Закадровый рендеринг](tutorial/offscreen-rendering.md)
  * [Поддержка Темного режима macOS](tutorial/mojave-dark-mode-guide.md)
  * [Встраивание веб в Electron](tutorial/web-embeds.md)
* [Доступность](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Включение доступности](tutorial/accessibility.md#enabling-accessibility)
* [Тестирование и отладка](tutorial/application-debugging.md)
  * [Отладка основного( main ) процесса](tutorial/debugging-main-process.md)
  * [Отладка главного процесса с кодом Visual Studio](tutorial/debugging-main-process-vscode.md)
  * [Использование Selenium и WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестирование с помощью систем непрерывной интеграции (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Расширение DevTools](tutorial/devtools-extension.md)
  * [Автоматическое тестирование с помощью собственного драйвера](tutorial/automated-testing-with-a-custom-driver.md)
* [Распространение](tutorial/application-distribution.md)
  * [Поддерживаемые платформы](tutorial/support.md#supported-platforms)
  * [Цифровая подпись](tutorial/code-signing.md)
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
* [Получение поддержки](tutorial/support.md)

## Подробное руководство

Эти индивидуальные руководства расширят темы, обсуждаемые выше.

* [Установка Electron](tutorial/installation.md)
  * [Прокси](tutorial/installation.md#proxies)
  * [Пользовательские зеркала и кеши](tutorial/installation.md#custom-mirrors-and-caches)
  * [Устранение проблем](tutorial/installation.md#troubleshooting)
* Отзыв разработчика Electron Releases &
  * [Политика контроля версиями](tutorial/electron-versioning.md)
  * [Графики выпуска](tutorial/electron-timelines.md)
  * [Программа отзывов](tutorial/app-feedback-program.md)
* [Упаковка исходников приложения с помощью asar](tutorial/application-packaging.md)
  * [Создание архива asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Использование архива asar](tutorial/application-packaging.md#using-asar-archives)
  * [Ограничения](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Добавление распакованных файлов в архив asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testing Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Использование плагина Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [Глоссарий](glossary.md)

## Справочник по API

* [Краткий обзор](api/synopsis.md)
* [Объект процесса](api/process.md)
* [Поддерживаемые параметры командной строки](api/command-line-switches.md)
* [Переменные окружения](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
* [Критические изменения в API](breaking-changes.md)

### Пользовательские DOM-элементы:

* [Объект `File`](api/file-object.md)
* [Тег `<webview>`](api/webview-tag.md)
* [Функция `window.open`](api/window-open.md)
* [Объект `BrowserWindowProxy`](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [Notification (Оповещения)](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Модули для процесса-рендерера (веб-страницы):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Модули для обоих процессов:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Разработка

См. [development/README.md](development/README.md)
