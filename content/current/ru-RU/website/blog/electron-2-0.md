---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

После более чем четырех месяцев разработки, 8 бета-релизов и по всему миру тестирование на основе бесплатных откатов многих приложений, релиз Electron 2. .0 теперь доступен с [electronjs.org](https://electronjs.org/).

---

## Выпуск процесса

Начиная с 2.0.0, выпуски Electron будут следовать [семантическим версиям](https://electronjs.org/blog/electron-2-semantic-boogaloo). Это означает, что основная версия будет чаще загружать и, как правило, будет основным обновлением Chromium. Релизы патча должны быть более стабильными, так как в них будут содержаться только исправления с высоким приоритетом.

Electron 2.0.0 также представляет собой усовершенствование того, как Electron стабилизируется до выпуска нового выпуска. Несколько больших приложений Electron включили бета-версии 2.0.0 в staged rollouts, обеспечивая лучший цикл обратной связи Electron для серии бета-версий.

## Изменения / Новые возможности

 * Основные хиты нескольких важных частей цепочки инструментов Electron, включая Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 на Linux, обновлённый контроллер орфографии и Squirrel.
 * [Приложения покупки](https://electronjs.org/blog/in-app-purchases) теперь поддерживаются на MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Новый API для загрузки файлов. [#11565](https://github.com/electron/electron/pull/11565)
 * Новый API для включения/отключения окна. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Добавлена поддержка записи в журнал сообщений IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Новые события меню. [#11754](https://github.com/electron/electron/pull/11754)
 * Добавить `завершение` события в powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Добавьте опцию `сходства` для сбора нескольких браузеров в один процесс. [#11501](https://github.com/electron/electron/pull/11501)
 * Добавить возможность сохранения диалога в список доступных расширений. [#11873](https://github.com/electron/electron/pull/11873)
 * Поддержка дополнительных действий по уведомлению [#11647](https://github.com/electron/electron/pull/11647)
 * Возможность задавать название кнопки закрытия уведомлений macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Добавить условие для menu.popup(окно, обратный вызов)
 * Улучшение памяти в сенсорной панели. [#12527](https://github.com/electron/electron/pull/12527)
 * Улучшен список рекомендаций по безопасности.
 * Добавить закладки, помеченные как защищённые приложениями. [#11711](https://github.com/electron/electron/pull/11711)
 * Добавлена возможность задавать произвольные аргументы в процессе рендерера. [#11850](https://github.com/electron/electron/pull/11850)
 * Добавить представление аксессуаров для выбора формата. [#11873](https://github.com/electron/electron/pull/11873)
 * Фиксированное состояние делегата сети для гонки. [#12053](https://github.com/electron/electron/pull/12053)
 * Поддержка `mips64el` арки в Linux. Electron requires the C++14 toolchain, which was not available for that arch at the time of the release. Мы надеемся на новую поддержку в будущем.

## Делать изменения API

 * Удалено [устаревших API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), включая:
   * Изменена подпись `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Удален устаревший `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Удален устаревший `webContents.setZoomLevelLimits` и `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Удалены устаревшие методы `буфера обмена`. [#11973](https://github.com/electron/electron/pull/11973)
   * Удалена поддержка логических параметров для `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Исправления ошибок

 * Изменено, чтобы убедиться, что `webContents.isOffscreen()` всегда доступен. [#12531](https://github.com/electron/electron/pull/12531)
 * Исправлено `BrowserWindow.getFocusedWindow()` , когда DevTools распаковывается и фокусируется. [#12554](https://github.com/electron/electron/pull/12554)
 * Исправлена предварительная нагрузка, не загружаемая в песочнице, если путь предварительной загрузки содержит специальные символы. [#12643](https://github.com/electron/electron/pull/12643)
 * Исправить значение по умолчанию allowRunningInsecureContent как в документах. [#12629](https://github.com/electron/electron/pull/12629)
 * Исправлена прозрачность на nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Исправлена проблема с `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Подтверждены опции menu.popup: объекты. [#12330](https://github.com/electron/electron/pull/12330)
 * Удалено условие гонки между созданием нового процесса и контекстным выпуском. [#12361](https://github.com/electron/electron/pull/12361)
 * Обновлять перетаскиваемые регионы при изменении режима просмотра браузера. [#12370](https://github.com/electron/electron/pull/12370)
 * Фиксированное определение клавиш alt при фокусе. [#12235](https://github.com/electron/electron/pull/12235)
 * Исправлены некорректные предупреждения в веб-просмотрах. [#12236](https://github.com/electron/electron/pull/12236)
 * Исправлено наследование опции 'show' из родительского окна. [#122444](https://github.com/electron/electron/pull/122444)
 * Убедитесь, что `getLastCrashReport()` является последним отчетом о сбое. [#12255](https://github.com/electron/electron/pull/12255)
 * Исправлена необходимость в пути совместного сетевого доступа. [#12287](https://github.com/electron/electron/pull/12287)
 * Исправлено нажатие на вызов. [#12170](https://github.com/electron/electron/pull/12170)
 * Фиксированное положение всплывающего меню. [#12181](https://github.com/electron/electron/pull/12181)
 * Улучшена очистка libuv циклов. [#11465](https://github.com/electron/electron/pull/11465)
 * Исправлено `hexColorDWORDToRGBA` для прозрачных цветов. [#11557](https://github.com/electron/electron/pull/11557)
 * Исправлена дессылка указателя null с API getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Исправлена циклическая ссылка в делегате меню. [#11967](https://github.com/electron/electron/pull/11967)
 * Исправлена фильтрация протокола net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits теперь устанавливает ограничения масштаба агентов [#12510](https://github.com/electron/electron/pull/12510)
 * Установить подходящие значения по умолчанию для параметров веб-просмотра. [#12292](https://github.com/electron/electron/pull/12292)
 * Улучшена поддержка вибрации. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Исправлена проблема с таймингом на фиксации синглтона.
 * Исправлен неработающий кэш в NotifierSupportsActions()
 * Сделал роли MenuItem совместимые с camelCase. [#11532](https://github.com/electron/electron/pull/11532)
 * Улучшены обновления панели касаний. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Дополнительные разделители меню удалены. [#11827](https://github.com/electron/electron/pull/11827)
 * Исправлена ошибка выбора Bluetooth. Закрывает [#11399](https://github.com/electron/electron/pull/11399).
 * Исправлены макросы Полноэкранный переключатель пункта меню. [#11633](https://github.com/electron/electron/pull/11633)
 * Улучшено скрытие подсказки при отключении окна. [#11644](https://github.com/electron/electron/pull/11644)
 * Перенести устаревший метод веб-просмотра. [#11798](https://github.com/electron/electron/pull/11798)
 * Исправлено закрытие окна, открытого из браузера. [#11799](https://github.com/electron/electron/pull/11799)
 * Исправлена ошибка выбора Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Добавлен планировщик задач для app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Изменено на событие `console-message` даже при отображении offscreen. [#11921](https://github.com/electron/electron/pull/11921)
 * Исправлена загрузка с пользовательских протоколов с помощью `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Исправлена потеря прозрачности во время отладки devtools. [#11956](https://github.com/electron/electron/pull/11956)
 * Исправлено отмена перезапуска приложений Electron или выключение. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Исправлена утечка событий при повторном использовании сенсорной панели. [#12624](https://github.com/electron/electron/pull/12624)
 * Исправлена подсветка трея в темноте. [#12398](https://github.com/electron/electron/pull/12398)
 * Исправлено блокирование основного процесса асинхронного диалога. [#12407](https://github.com/electron/electron/pull/12407)
 * Исправлена ошибка в трее `setTitle`. [#12356](https://github.com/electron/electron/pull/12356)
 * Исправлен сбой при установке меню док-станции. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Лучшие уведомления для рабочего стола Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Лучшая поддержка тем GTK+ для меню. [#12331](https://github.com/electron/electron/pull/12331)
 * Выход изящно на linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Используйте имя приложения в качестве стандартной подсказки для иконки в трее. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Добавлена поддержка Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * Исправлена передача исключения в обработчик сбоев системы. [#12259](https://github.com/electron/electron/pull/12259)
 * Исправлена подсказка для скрытия из свернутого окна. [#11644](https://github.com/electron/electron/pull/11644)
 * Исправлен `настольный захват` для захвата правильного экрана. [#11664](https://github.com/electron/electron/pull/11664)
 * Исправлено `отключение оборудования` с прозрачностью. [#11704](https://github.com/electron/electron/pull/11704)

# Что дальше

Команда Electron упорно работает над поддержкой новых версий Chromium, Node и v8. Скоро ожидается 3.0.0-beta.1!
