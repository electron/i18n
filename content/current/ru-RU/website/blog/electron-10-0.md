---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 вышел! Он включает обновления до Chromium `85`, V8 `8.5`, и Node.js `12.16`. Мы добавили несколько новых интеграций API и улучшений. Читайте ниже для более подробной информации!

---

Команда Electron рада объявить о выпуске Electron 10.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новыми возможностями.

В выпуске Electron 10 мы также внесли изменения в наши примечания к выпуску. Чтобы облегчить рассказать что нового в Electron 10 и что может измениться между релизами Electron 10 и прошлыми версиями, теперь также включают изменения, внесенные в Electron 10, но перенесенные в предыдущие релизы. Мы надеемся, что это упрощает приложениям поиск новых возможностей и исправлений ошибок при обновлении Electron.

Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения

### Изменения стека

* Chromium `85.0.4183.84`
    * [Новое в Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Новое в Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Точка 12.16.3 запись в блоге](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 пост в блоге](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 пост в блоге](https://v8.dev/blog/v8-release-85)

### Выделить возможности

* Добавлен свойство `contents.getBackgroundThrottling()` и `contents.backgroundThrottling`. [#21036]
* Выложил модуль `desktopCapturer` в главном процессе. [#23548](https://github.com/electron/electron/pull/23548)
* Теперь можно проверить, является ли данная `сессия` постоянной, вызвав `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Устранять проблемы с сетью, которая не позволяла подключаться к RTC из-за изменения IP адреса сети и ICE. (Chromium issue 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Смотрите [10.0.0 замечания к релизу](https://github.com/electron/electron/releases/tag/v10.0.0) для получения полного списка новых возможностей и изменений.

## Критические изменения

* Значение по умолчанию `enableRemoteModule` изменено на `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Это часть наших планов по уничтожению `удаленного` модуля и переносу его на пользовательский язык. Вы можете прочитать и следовать за [этой проблемой,](https://github.com/electron/electron/issues/21408) , которая подробно описывает наши причины и включает в себя предлагаемые сроки для устаревания.
* Значение по умолчанию для `app.allowRendererProcessReuse` изменено на `true`. [#22336](https://github.com/electron/electron/pull/22336) (также в [Electron 9](https://github.com/electron/electron/pull/22401))
   * Это предотвратит загрузку неконтекстных родных модулей в процессах визуализации.
   * Вы можете прочитать и следовать за [этой проблемой,](https://github.com/electron/electron/issues/18397) , которая подробно описывает наши причины и включает в себя предлагаемые сроки для устаревания.
* Исправлено позиционирование окон кнопок в macOS, когда локаль ОС установлена на RTL язык (например, арабский или иврит). Безграничные оконные приложения могут быть вынуждены учитывать это изменение во время стилизации окон. [#22016](https://github.com/electron/electron/pull/22016)

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Изменения API

* Сессия: Теперь можно проверить, является ли данная `сессия` постоянной, вызвав `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Contents: Добавлено свойство `contents.getBackgroundThrottling()` и `contents.backgroundThrottling`. [#21036](https://github.com/electron/electron/pull/21036)

### Устаревшие API

Следующие API устарели или удалены:

* Удалено свойство `currentlyLoggingPath` из `netLog`. Кроме того, `netLog.stopLogging` больше не возвращает путь к записанному журналу. [#22732](https://github.com/electron/electron/pull/22732)
* Устаревшие несжатые выгрузки при `сбое`. [#23598](https://github.com/electron/electron/pull/23598)

## Конец поддержки 7.x.y

Electron 7.x.y достиг конца поддержки в соответствии с [политикой поддержки проекта](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) отображает ключевые даты жизненного цикла Electron 11.0. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Продолжение работы по устареванию `удаленного модуля` (в Electron 11)
Мы начали работу по удалению удаленного модуля в [Electron 9](https://www.electronjs.org/blog/electron-9-0) , и мы продолжаем собираться удалить `удаленный` модуль. В Electron 11 мы планируем продолжить работу по рефакторингу для реализации [WeakRef](https://v8.dev/features/weak-references) , как это было сделано в Electron 10. Пожалуйста, прочитайте и следуйте за [этой проблемой](https://github.com/electron/electron/issues/21408) за полными планами и деталями по поводу устаревания.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
