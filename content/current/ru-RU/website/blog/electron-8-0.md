---
title: Electron 8.0.0
author:
  - jkleinsc
  - вежливость
date: '2020-02-04'
---

Electron 8.0.0 вышел! Он включает обновления Chromium `80`, V8 `8.0` и Node.js `12.13.0`. Мы добавили встроенную в Chrome проверку орфографии и многое другое!

---

Команда Electron рада объявить о выпуске Electron 8.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новыми возможностями. Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения

### Изменения стека
* Хромий `80.0.3987.86`
    * [Новое в Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Новое в Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Точка 12.13.0 запись в блоге](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7,9 пост в блоге](https://v8.dev/blog/v8-release-79)
    * [Запись в блоге V8 8.0](https://v8.dev/blog/v8-release-80)

### Выделить возможности
* Добавлено использование встроенной функции проверки правописания в Chrome. Подробнее см. в [#20692](https://github.com/electron/electron/pull/20692) и [#21266](https://github.com/electron/electron/pull/21266).
* IPC коммуникация теперь использует структурированный алгоритм клонирования v8. Это быстрее, более функциональное и менее удивительное, чем существующая логика, и приносит 2x увеличение производительности больших буферов и сложных объектов. Задержка для небольших сообщений не сильно затронута. Подробнее читайте в [#20214](https://github.com/electron/electron/pull/20214).

Смотрите [8.0.0 версии](https://github.com/electron/electron/releases/tag/v8.0.0) для получения полного списка новых возможностей и изменений.

## Критические изменения

* Показывать имя модуля в предупреждении об ошибке для контекстных модулей. [#21952](https://github.com/electron/electron/pull/21952)
    * Это продолжение работы для будущего требования о том, чтобы родные модули узлов, загруженные в процессе визуализации, были либо [N-API](https://nodejs.org/api/n-api.html) либо [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Полная информация и предлагаемые сроки подробно описаны в [этом выпуске](https://github.com/electron/electron/issues/18397).
* Значения, отправленные по IPC, теперь сериализированы с помощью Structured Clone Algorithm.  [#20214](https://github.com/electron/electron/pull/20214)
* Офф-экранная рендеринг в настоящее время отключена из-за отсутствия сопровождающего для работы с этой функцией.  Он сломался во время обновления Chromium и был впоследствии отключен. [#20772](https://github.com/electron/electron/issues/20772)

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Изменения API
* `` изменения API приложения:
    * Добавлено `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Добавлена поддержка `app.showAboutPanel()` и `app.setAboutPanelOptions(options)` в Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `Обозреватель` Изменения API в браузере:
    * Обновлена документация, чтобы заметить, что настройки BrowserWindow `hasShadow` доступны на всех платформах [#20038](https://github.com/electron/electron/pull/20038)
    * Добавлена опция `trafficLightPosition` в настройках BrowserWindow для настройки расположения кнопок светофора. [#21781](https://github.com/electron/electron/pull/21781)
    * Добавлена опция `accessibleTitle` в BrowserWindow для установки доступного заголовка окна [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` теперь может возвращать null [#19983](https://github.com/electron/electron/pull/19983)
    * Добавлен `BrowserWindow.getMediaSourceId()` и `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Добавлена поддержка события `will-move` в macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Документированный ранее недокументированный `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `диалог` изменения API API:
    * Added `dontAddToRecent` property to `dialog.showOpenDialog` and `dialog.showOpenDialogSync` to prevent documents from being added to recent documents on Windows in open dialogs. [#19669](https://github.com/electron/electron/pull/19669)
    * Добавлена настройка свойств `диалога.showSaveDialog` и `диалог.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Уведомление` изменения API:
    * Добавлена опция `timeoutType` , позволяющая пользователям Linux/Windows устанавливать тип тайм-аута уведомлений. [#20153](https://github.com/electron/electron/pull/20153)
    * Добавлена опция `срочности`  для установки срочности уведомлений Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `сессия` изменения API:
    * Обновлена документация о `session.setProxy(config)` и `session.setCertificateVerifyProc(proc)` для заметки дополнительных параметров. [#19604](https://github.com/electron/electron/pull/19604)
    * Добавлен `session.downloadURL(url)` для запуска загрузок без BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Добавлена поддержка подсказок ресурса preconnect HTTP через `session.preconnect(options)` и событие `preconnect`. [#18671](http://github.com/electron/electron/pull/18671)
    * Добавлена сессия `session.addWordToSpellCheckerDictionary` для разрешения пользовательских слов в словаре [#21297](http://github.com/electron/electron/pull/21297)
* Добавлена опция `shell.moveItemToTrash(fullPath[, deleteOnFail])` в macOS для указания что происходит при сбое moveItemToTrash. [#19700](https://github.com/electron/electron/pull/19700)
* `Системные настройки` Изменения API в версии:
    * Обновлена `systemPreferences.getColor(цвет)` документация для macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Добавлен `экран` типа медиа в `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Добавлен `nativeTheme.themeSource` для того, чтобы приложения могли переопределить Chromium и выбор темы ОС. [#19960](https://github.com/electron/electron/pull/19960)
* Изменения в TouchBar API:
    * Добавлено свойство `accessibilityLabel` к `TouchBarButton` и `TouchBarLabel` для улучшения доступности TouchBarButton/TouchBarLabel . [#20454](https://github.com/electron/electron/pull/20454)
    * Обновлена документация TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `трей` изменения API:
    * Добавлены новые опции `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` и `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Добавлено уведомление tray.removeBalloon(), которое удаляет уже отображаемое уведомление. [#19547](https://github.com/electron/electron/pull/19547)
    * Добавлен tray.focus(), который возвращает фокус в панель уведомлений на панели задач. feat: добавить tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `веб-содержимое` изменения API API:
    * Добавлен `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` чтобы раскрыть исполняемый JavaScriptInIsolatedWorld на webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Добавлены способы захвата скрытого веб-содержимого. [#21679](https://github.com/electron/electron/pull/21679)
    * Добавлены опции `webContents.print([options], [callback])` , чтобы включить настройку заголовков и колонтитулов страниц печати. [#19688](https://github.com/electron/electron/pull/19688)
    * Добавлена возможность инспектировать конкретные рабочие через `webContents.getAllSharedWorkers()` и `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Добавлена поддержка опций `fitToPageEnabled` и `scaleFactor` в WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Обновлена документация `webview.printToPDF` для указания типа возврата теперь Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Устаревшие API
Следующие API устарели:
* Нефункциональная опция `visibleOnFullScreen` в `BrowserWindow.setVisibleOnAllWorkspace` до ее удаления в следующей основной версии. [#21732](https://github.com/electron/electron/pull/21732)
* Устаревший `альтернативный выделенный управляющий текст` на `systemPreferences.getColor(цвет)` для macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Устарел `setLayoutZoomLevelLimits` на `веб-содержимое`, `веб-рамки`, и `<webview> Тег` потому что Chromium удалил эту возможность. [#21296](https://github.com/electron/electron/pull/21296)
* Значение по умолчанию `false` для `app.allowRendererProcessReuse` является устаревшим. [#21287](https://github.com/electron/electron/pull/21287)
* Устарел `<webview>.getWebContents()` в зависимости от удаленного модуля. [#20726](https://github.com/electron/electron/pull/20726)

## Конец поддержки 5.x.y

Electron 5.x.y достиг конечной поддержки в соответствии с [политикой поддержки проекта](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Программа отзывов

Мы продолжаем использовать нашу [программу обратной связи с приложением](https://electronjs.org/blog/app-feedback-program) для тестирования. Проекты, участвующие в этой программе, тестируют бета-версии Electron на своих приложениях; и в свою очередь, новые ошибки, которые они обнаруживают, имеют приоритетное значение для стабильного выпуска. Если вы хотите принять участие или узнать больше, [смотрите наш пост о программе](https://electronjs.org/blog/app-feedback-program).

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) отображает ключевые даты жизненного цикла Electron 9. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Устаревание `удаленного` модуля (начиная с Electron 9)
Из-за серьезных обязательств в области безопасности, мы начинаем продлять срок действия [`удаленного модуля`](https://www.electronjs.org/docs/api/remote) , начинающегося в Electron 9. Вы можете прочитать и следовать за [этой проблемой,](https://github.com/electron/electron/issues/21408) , которая подробно описывает наши причины и включает в себя предлагаемые сроки для устаревания.
