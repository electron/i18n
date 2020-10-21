---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 вышел! Он включает обновления до Chromium `83`, V8 `8.3`, и Node.js `12.14`. Мы добавили несколько новых интеграций API для нашей функции проверки орфографии, включенного просмотрщика PDF и многое другое!

---

Команда Electron рада объявить о выпуске Electron 9.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новыми возможностями. Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения

### Изменения стека

* Хромий `83.0.4103.64`
    * [Новое в Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 пропущен](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Новое в Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [12.14.1 запись в блоге](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 запись в блоге](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 запись в блоге](https://v8.dev/blog/v8-release-83)

### Выделить возможности

* Множество улучшений функции проверки орфографии. См. подробности в [#22128](https://github.com/electron/electron/pull/22128) и [#22368](https://github.com/electron/electron/pull/22368).
* Улучшена эффективность работы обработчиков окон на Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Включить просмотрщик PDF. [#22131](https://github.com/electron/electron/pull/22131).

Смотрите [версии 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) для получения полного списка новых возможностей и изменений.

## Критические изменения

* Предупреждение об отмене при использовании `удаленного` без `включить RemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Это первый шаг в наших планах по прекращению работы `удаленного модуля` и переносу его на пользовательский. Вы можете прочитать и следовать за [этой проблемой,](https://github.com/electron/electron/issues/21408) , которая подробно описывает наши причины и включает в себя предлагаемые сроки для устаревания.
* Установите `app.enableRendererProcessReuse` в true по умолчанию. [#22336](https://github.com/electron/electron/pull/22336)
    * Это продолжение работы для будущего требования о том, чтобы родные модули узлов, загруженные в процессе визуализации, были либо [N-API](https://nodejs.org/api/n-api.html) либо [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Полная информация и предлагаемые сроки подробно описаны в [этом выпуске](https://github.com/electron/electron/issues/18397).
* Отправка не-JavaScript объектов поверх IPC теперь выдаёт исключение. [#21560](https://github.com/electron/electron/pull/21560)
    * Это поведение было изношено в Electron 8.0. В Electron 9.0 удалён старый алгоритм сериализации, и отправка таких несериализуемых объектов теперь вызовет ошибку "объект не может быть клонирован".

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Изменения API

* `оболочка` изменения API:
   * API `shell.openItem` был заменен асинхронным `shell.openPath API`. [предложение](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `сессия`изменения API:
   * Добавлен `session.listWordsFromSpellCheckerDictionary` API для списка пользовательских слов в словаре. [#22128](https://github.com/electron/electron/pull/22128)
   * Добавлен `session.removeWordFromSpellCheckerDictionary` API для удаления пользовательских слов в словаре. [#22368](https://github.com/electron/electron/pull/22368)
   * Добавлен `session.serviceWorkerContext` API для доступа к базовой информации сервисного работника и получения логов консоли от работников сервиса. [#22313](https://github.com/electron/electron/pull/22313)
* `` изменения API приложения:
   * Добавлен новый параметр силы в `app.focus()` в macOS, чтобы приложения могли настойчиво фокусироваться. [#23447](https://github.com/electron/electron/pull/23447)
* `Обозреватель` Изменения API в браузере:
   * Добавлена поддержка доступа к свойствам некоторых пар getter/setter в `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### Устаревшие API

Следующие API устарели или удалены:

* `shell.openItem` API обесценен и заменен асинхронным `shell.openPath API`.
* `<webview>.getWebContents`, который был устарел в Electron 8.0, теперь удален.
* `webFrame.setLayoutZoomLevelLimits`, устаревший в Electron 8.0, теперь удален.

## Конец поддержки 6.x.y

Electron 6.x.y достиг конца поддержки в соответствии с [политикой поддержки проекта](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) отображает ключевые даты жизненного цикла Electron 10.0. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Изменить значение по умолчанию на `contextIsolation` с `false` на `true` (Начиная с Electron 10)

Без контекстного Изоляции любой код, работающий в процессе рендерера, может легко добраться до внутренностей Electron или скрипта предварительной загрузки приложения. Этот код может выполнять привилегии, которые Electron хочет сохранить ограничения.

Изменение этого значения по умолчанию улучшает безопасность приложений Electron, так что приложениям необходимо сознательно выбрать небезопасное поведение. Electron обесценит текущее значение по умолчанию `contextIsolation` в Electron 10. и измените на новое значение по умолчанию (`true`) в Electron 12.0.

Для получения дополнительной информации о `contextIsolation`, как его легко включить и преимущества, связанные с безопасностью, пожалуйста, посмотрите наш специальный [Контекстный документ изоляции](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
