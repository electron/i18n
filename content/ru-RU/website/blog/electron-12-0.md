---
title: Electron 12.0.0
author:
  - VerteDinde
  - млауренцин
  - вежливость
date: '2021-03-02'
---

Electron 12.0.0 вышел! Она включает в себя модернизацию `89`, V8 `8.9` и узла.js `14.16`. Мы добавили изменения в удаленный модуль, новые значения по умолчанию для contextIsolation, новый API webFrameMain и общие улучшения. Читайте ниже для более подробной информации!

---

Команда Electron рада объявить о выпуске Electron 12.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения

### Изменения стека

* Хром `89`
    * [Новое в Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Новое в Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Узел.js `14.16`
    * [Узел 14.16.0 блога](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Узел 14.0.0 блога](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 блога](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 блога](https://v8.dev/blog/v8-release-89)

### Выделить возможности

* Метод ContextBridge `exposeInMainWorld` теперь может разоблачать API без объектов. [#26834](https://github.com/electron/electron/pull/26834)
* Обновлен с узла 12 до узла 14. [#23249](https://github.com/electron/electron/pull/25249)
* Добавлен новый `webFrameMain` API для доступа к подрамкам одного из `WebContents` например из основного процесса. [#25464](https://github.com/electron/electron/pull/25464)
* Значения по умолчанию `contextIsolation` и `worldSafeExecuteJavaScript` теперь `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

Для получения [новых функций и изменений можно](https://github.com/electron/electron/releases/tag/v12.0.0) примечания к выпуску 12.0.0.

## Критические изменения

* Deprecated `remote` модуля. Он заменяется [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * Если вы в настоящее время `remote` модуль, мы написали [для миграции в `@electron/remote` здесь.](https://github.com/electron/remote#migrating-from-remote)
* Изменено значение значения по умолчанию `contextIsolation` на `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Изменено значение значения по умолчанию `worldSafeExecuteJavaScript` на `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Изменился дефолт `crashReporter.start({ compress })` с `false` на `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Удаленная поддержка Flash: Chromium удалил поддержку Flash, которая также была удалена в Electron 12. Более подробную [смотрите в flash roadmap](https://www.chromium.org/flash-roadmap) Chromium.
* Требуется SSE3 для Chrome на x86: Chromium снял поддержку для [старых процессоров x86, которые не отвечают как минимум SSE3 (Streaming SIMD Extensions 3) поддержки](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). Эта поддержка была также удалена в Electron 12.

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Изменения API

* Добавлено `webFrameMain` API: модуль `webFrameMain` может быть использован для выглядеть кадры через существующие [`WebContents`](/docs/api/web-contents.md) экземпляры. Это основной эквивалент процесса существующего API webFrame. Более подробную информацию об этом новом API можно найти [здесь](https://github.com/electron/electron/pull/25464), и в нашей [документации](https://www.electronjs.org/docs/api/web-frame-main).
* `` изменения API приложения:
    * Добавлены не локализованные `serviceName` `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Добавлено новое `app.runningUnderRosettaTranslation` для обнаружения при запуске под rosetta на кремнии Apple. [#26444](https://github.com/electron/electron/pull/26444)
    * Добавлены `exitCode` к `render-process-gone` (приложение & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `Обозреватель` Изменения API в браузере:
    * Добавлено `BrowserWindow.isTabletMode()` API. [#25209](https://github.com/electron/electron/pull/25209)
    * Добавлены `resized` (Windows/macOS) и `moved` (Windows) к `BrowserWindow`. [#26216](https://github.com/electron/electron/pull/26216)
    * Добавлены новые `system-context-menu` , позволяющие предотвращать и переопределять меню контекстов системы. [#25795](https://github.com/electron/electron/pull/25795)
    * Добавлены `win.setTopBrowserView()` , так `BrowserView`можно было бы получить. [#27713](https://github.com/electron/electron/pull/27713)
    * Добавлены `webPreferences.preferredSizeMode` , позволяющие размерировать представления в соответствии с минимальным размером документа. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` API:
    * Разрешено ContextBridge `exposeInMainWorld` метод для разоблачения неамператных API. [#26834](https://github.com/electron/electron/pull/26834)
* `display` API:
    * Добавлено `displayFrequency` в `Display` , чтобы получить информацию о скорости обновления на Windows. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` API:
    * Добавлена поддержка некоторых `chrome.management` API. [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` API:
    * Добавлена поддержка для отображения меню macOS share. [#25629](https://github.com/electron/electron/pull/25629)
* `net` API:
    * Добавлен новый `credentials` для `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Добавлено `net.online` обнаружения, есть ли в настоящее время подключение к Интернету. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` API:
    * Добавлено `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Добавлено быстрое событие переключения пользователя в powerMonitor на macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `сессия` изменения API:
    * Добавлен `allowFileAccess` опция `ses.loadExtension()` API. [#27702](https://github.com/electron/electron/pull/27702)
    * Добавлен `display-capture` API для `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Добавлена `disabledCipherSuites` опция `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Добавлены `extension-loaded`, `extension-unloaded`и `extension-ready` события `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Добавлены `session.setSSLConfig()` , позволяющие настроить SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Добавлена поддержка явно указывающих режимов `direct`, `auto_detect` или `system` в `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Добавлена [поддержка](https://web.dev/serial/) API. [#25237](https://github.com/electron/electron/pull/25237)
    * Добавлены API для включения/отключения проверки орфографии. [#26276](https://github.com/electron/electron/pull/26276)
* `оболочка` изменения API:
    * Добавлен новый асинхронный `shell.trashItem()` API, заменяющий синхронный `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `веб-содержимое` изменения API API:
    * Добавлен небольшой консольный подсказка для консоли, чтобы помочь отладить сбой рендерера. [#25317](https://github.com/electron/electron/pull/25317)
    * Добавлены `frame` и `webContents` свойства к объекту деталей в обработчиках webRequest. [#27334](https://github.com/electron/electron/pull/27334)
    * Добавлено `webContents.forcefullyCrashRenderer()` , чтобы принудительно прекратить процесс рендеринга, чтобы помочь с восстановлением зависший рендер. [#25580](https://github.com/electron/electron/pull/25580)
    * Добавлен `setWindowOpenHandler` API для созданных рендерером детских окон и `new-window` события. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API:
    * Добавлен API проверки орфографии для рендерера. [#25060](https://github.com/electron/electron/pull/25060)

### Удалены/обмежены изменения

Следующие API были удалены или теперь удалены:

* Deprecated `remote` модуля. Он заменяется [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Удалены `crashReporter` API. [#26709](https://github.com/electron/electron/pull/26709)
* Удалены ссылки на веб-сайт Electron из меню «Помощь» по умолчанию в упакованных приложениях. [#25831](https://github.com/electron/electron/pull/25831)

## Конец поддержки для 9.x.y

Electron 9.x.y достиг конца поддержки в соответствии с политикой поддержки [в](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. В [графике 13.0.0](https://electronjs.org/docs/tutorial/electron-timelines) карты ключевых дат жизненного цикла разработки Electron 13.0. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
