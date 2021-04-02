---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

Electron 11.0.0 вышел! Он включает обновления Chromium `87`, V8 `8.7` и Node.js `12.18.3`. Мы добавили поддержку кремния Apple, и общие улучшения. Читайте ниже для более подробной информации!

---

Команда Electron рада объявить о выпуске Electron 11.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новой поддержкой оборудования Apple M1.

Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения

### Изменения стека

* Chromium `87.0.4280.47`
    * [Новое в Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Новое в Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Узел 12.18.3 блога](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Узел 12.7.0 блога](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 блога](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 блога](https://v8.dev/blog/v8-release-87)

### Выделить возможности

* Поддержка Apple M1: 10 ноября Apple объявила о [чипов M1, которые будут включены в их предстоящих аппаратных](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Начиная с Electron 11, Electron будет поставлять отдельные версии Electron для Intel Macs (x64) и предстоящего оборудования M1 от Apple (arm64). Вы можете узнать больше о том, как получить ваше приложение Electron [работает на оборудовании M1 от Apple здесь.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Добавлено сообщение о крушении V8 и информация о местоположении к параметрам crashReport. [#24771](https://github.com/electron/electron/pull/24771)
* Улучшена производительность отправки широких объектов по контексту моста. [#24671](https://github.com/electron/electron/pull/24671)

Для получения полного [новых функций и изменений можно](https://github.com/electron/electron/releases/tag/v11.0.0) примечания к выпуску 11.0.0.

## Критические изменения

* Удалены экспериментальные API: `BrowserView.{fromId, fromWebContents, getAllViews}` и `id` имущество `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Изменения API

* Добавлен `app.getApplicationInfoForProtocol()` API, который возвращает подробную информацию о приложении, которое обрабатывает определенный протокол. [#24112](https://github.com/electron/electron/pull/24112)
* Добавлен `app.createThumbnailFromPath()` API, который возвращает предварительное изображение файла, учитывая его путь файла и максимальный размер эскиза. [#24802](https://github.com/electron/electron/pull/24802)
* Добавлено `webContents.forcefullyCrashRenderer()` , чтобы принудительно прекратить процесс рендеринга, чтобы помочь с восстановлением зависший рендер. [#25756](https://github.com/electron/electron/pull/25756)

## Конец поддержки для 8.x.y

Electron 8.x.y достиг конца поддержки в соответствии с политикой поддержки [в](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны, чтобы не давать обещания о датах релиза, наш план состоит в том, чтобы выпустить новые основные версии Electron с новыми версиями этих компонентов примерно ежеквартально. В [графике 12.0.0](https://electronjs.org/docs/tutorial/electron-timelines) карты ключевых дат жизненного цикла разработки Electron 12.0. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Продолжение работы по амортизации `remote` модуля
Мы начали работу по удалению `remote` модуля [Electron 9](https://www.electronjs.org/blog/electron-9-0). Мы планируем удалить сам `remote` в Electron 14.

Читайте и следуйте [этому вопросу](https://github.com/electron/electron/issues/21408) полные планы и подробную информацию для амортизации.

### Заключительный шаг для требования модулей коренных узлах, чтобы быть контекст осведомлены или N-API (в Electron 12)
С Electron 6 и далее, мы закладываем основу, чтобы требовать [родных модулей узла](https://nodejs.org/api/addons.html) загруженных в процессе рендерера, чтобы быть либо [N-API](https://nodejs.org/api/n-api.html) или [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Обеспечение этого изменения обеспечивает более сильную безопасность, более быструю производительность и снижение рабочей нагрузки на техническое обслуживание. Заключительным шагом этого плана является удаление возможности отключения повторного использования процесса рендеров в Electron 12.

Прочитайте и следуйте [этому вопросу](https://github.com/electron/electron/issues/18397) для получения подробной информации, включая предлагаемые сроки.
