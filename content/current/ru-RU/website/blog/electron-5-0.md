---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Команда Electron рада сообщить о выпуске версии Electron 5.0.0! Вы можете установить его с помощью npm через `npm install electron@latest` или загрузить tarballs с [страницы релизов](https://github.com/electron/electron/releases/tag/v5.0.0). Релиз упакован с обновлениями, исправлениями и новыми возможностями. Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

---

## Что нового?

Большая часть функциональности Electron обеспечивается основными компонентами Chromium, Node.js и V8. Electron поддерживает эти проекты, чтобы предоставить нашим пользователям новые возможности, улучшения производительности и исправления безопасности. Каждый из этих пакетов имеет основную версию в Electron 5:

- Хромий `73.0.3683.119`
  - [Новое в 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Новое в 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Новое в 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Новое в 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Запись блога № 12](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Новые функции JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 также включает улучшения в API для конкретных Electron. Ниже приводится краткая информация об основных изменениях; для полного списка изменений ознакомьтесь с примечаниями к выпуску [Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification / Промисификация

Electron 5 продолжает инициативу [Promisification initiative](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) для преобразования API на основе обратного вызова Electron для использования Promises. Эти API были преобразованы для Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentTracing.startЗапись`
* `contentTracing.stopRecording`
* `debugger.sendCommand`
* Cookies API
* `shell.openExternal`
* `webContents.loadФайл`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Доступ к системным цветам для macOS

Эти функции были изменены или добавлены в `системные настройки` для доступа к цветам macOS систем:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### Обработка информации о памяти

Добавлена функция `process.getProcessMemoryInfo` для получения статистики использования памяти о текущем процессе.

### Дополнительная фильтрация для удаленных API

Для повышения безопасности в `удаленном` API были добавлены новые удалённые события для удаленности `etBuiltin`, `remote. etТекущее Окно`, `remote.getCurrentWebContents` и `<webview>.getWebContents` может быть [фильтровано](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Несколько просмотров браузера в браузере

BrowserWindow теперь поддерживает управление множеством браузеров в одном браузереWindow.

## Критические изменения

### По умолчанию для упакованных приложений

Упакованные приложения теперь будут вести себя так же, как приложение по умолчанию: будет создано меню приложений по умолчанию, если приложение не имеет одно и `оконно полностью закрытое` событие будет автоматически обработано, если приложение не будет обрабатывать событие.

### Смешанная песочница

Смешанный режим "песочница" теперь включен по умолчанию. Рендеры, запущенные с `песочницей: true` теперь будут фактически в песочнице, где ранее они были бы только в песочнице, если бы также был включен режим "песочница".

### Улучшение безопасности
Значения по умолчанию для `nodeIntegration` и `webviewTag` теперь `false` для повышения безопасности.

### Проверка правописания асинхронная

API SpellCheck был изменен, чтобы предоставить [асинхронные результаты](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Упреки

Следующие API устарели в Electron 5.0.0 и планируется удалить в 6.0.0:

### Бинарные файлы Mksnapshot для arm и arm64
Родные файлы mksnapshot для arm и arm64 устарели и будут удалены в 6. .0. Снимки могут быть созданы для arm и arm64 с помощью двоичных файлов x64.

### ServiceWorker API на веб-контенте
Устаревшие API ServiceWorker на WebContents при подготовке к их удалению.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Автоматические модули с песочницевым содержимым
Для повышения безопасности следующие модули являются устаревшими для использования непосредственно через `требовать` и вместо этого должны быть включены через `удален. equire` в папке "песочница":
* `электронный.экран`
* `child_process`
* `fs`
* `os`
* `путь`

## API webFrame изолированных миров
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` устарел в пользу `webFrame.setIsolatedWorldInfo`.

### Смешанная песочница
`включить MixedSandbox` и `--enable-mixed-sandbox` по-прежнему существуют для совместимости, но они устарели и не имеют никакого эффекта.

## Конец поддержки 2.0.x

За нашу [политику поддерживаемых версий](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x достигла конца жизни.

## Программа отзывов

Мы продолжаем использовать нашу [программу обратной связи с приложением](https://electronjs.org/blog/app-feedback-program) для тестирования. Проекты, участвующие в этой программе, тестируют бета-версии Electron на своих приложениях; и в свою очередь, новые ошибки, которые они обнаруживают, имеют приоритетное значение для стабильного выпуска. Если вы хотите принять участие или узнать больше, [смотрите наш пост о программе](https://electronjs.org/blog/app-feedback-program).

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) отображает ключевые даты жизненного цикла Electron 6. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
