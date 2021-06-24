# Официальное руководство

Убедитесь, что Вы используете документацию, соответствующую вашей версии Electron. Версия должна быть частью URL-адреса страницы. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. Чтобы просмотреть более старые версии документации, Вы можете использовать [browse by tag](https://github.com/electron/electron/tree/v1.4.0) на GitHub, открыв список «Switch branches/tags» и выбрав тег, соответствующий вашей версии.

## FAQ

Есть вопросы, которые довольно часто задаваются. Проверьте это перед созданием задачи:

* [FAQ по Electron](faq.md)

## Руководство

### Начало работы

* [Введение](tutorial/introduction.md)
* [Руководство для начинающих](tutorial/quick-start.md)
* [Process Model](tutorial/process-model.md)

### Изучение основ

* Добавление функционала в Ваше приложение
  * [Notification (Оповещения)](tutorial/notifications.md)
  * [Recent Documents](tutorial/recent-documents.md)
  * [Прогресс приложения](tutorial/progress-bar.md)
  * [Пользовательское меню macOS](tutorial/macos-dock.md)
  * [Пользовательские задачи Windows](tutorial/windows-taskbar.md)
  * [Пользовательские действия на Linux](tutorial/linux-desktop-actions.md)
  * [Горячие клавиши](tutorial/keyboard-shortcuts.md)
  * [Оффлайн/Онлайн обнаружение](tutorial/online-offline-events.md)
  * [Представленный файл для macOS BrowserWindows](tutorial/represented-file.md)
  * [Нативное перетаскивание файла](tutorial/native-file-drag-drop.md)
  * [Закадровый рендеринг](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Встраивание веб в Electron](tutorial/web-embeds.md)
* [Макеты и CLI](tutorial/boilerplates-and-clis.md)
  * [Макеты против CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Другие инструменты и макеты](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Advanced topics

* Архитектура приложения
  * [Использование нативных модулей Node.js](tutorial/using-native-node-modules.md)
  * [Performance Strategies](tutorial/performance.md)
  * [Стратегии безопасности](tutorial/security.md)
  * [Process Sandboxing](tutorial/sandbox.md)
* [Доступность](tutorial/accessibility.md)
  * [Включение функций специальных возможностей вручную](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Тестирование и отладка](tutorial/application-debugging.md)
  * [Отладка главного процесса](tutorial/debugging-main-process.md)
  * [Отладка с кодом Visual Studio](tutorial/debugging-vscode.md)
  * [Использование Selenium и WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Тестирование с помощью систем непрерывной интеграции (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Расширение DevTools](tutorial/devtools-extension.md)
  * [Автоматическое тестирование с помощью собственного драйвера](tutorial/automated-testing-with-a-custom-driver.md)
  * [REPL](tutorial/repl.md)
* [Распространение](tutorial/application-distribution.md)
  * [Поддерживаемые платформы](tutorial/support.md#supported-platforms)
  * [Цифровая подпись](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Обновления](tutorial/updates.md)
  * [Развертывание сервера обновлений](tutorial/updates.md#deploying-an-update-server)
  * [Внедрение обновлений в Ваше приложение](tutorial/updates.md#implementing-updates-in-your-app)
  * [Применение обновлений](tutorial/updates.md#applying-updates)
* [Получение поддержки](tutorial/support.md)

## Подробное руководство

Эти индивидуальные руководства расширят темы, обсуждаемые выше.

* [Установка Electron](tutorial/installation.md)
  * [Полномочия](tutorial/installation.md#proxies)
  * [Пользовательские зеркала и кэши](tutorial/installation.md#custom-mirrors-and-caches)
  * [Устранение проблем](tutorial/installation.md#troubleshooting)
* Отзыв разработчика Electron Releases &
  * [Политика контроля версиями](tutorial/electron-versioning.md)
  * [Графики выпуска](tutorial/electron-timelines.md)
* [Тестирование Widevine CDM](tutorial/testing-widevine-cdm.md)

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
* [диалоговые окна](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [MessageChannelMain](api/message-channel-main.md)
* [MessagePortMain](api/message-port-main.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme (Родная тема)](api/native-theme.md)
* [Notification (Оповещения)](api/notification.md)
* [powerMonitor (Мониторинг питания)](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [системные настройки](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Модули для процесса-рендерера (веб-страницы):

* [contextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### Модули для обоих процессов:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Разработка

См. [development/README.md](development/README.md)
