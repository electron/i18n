---
title: Electron 7.0.0
author:
  - вежливость
  - ckerr
date: '2019-10-22'
---

Выпущен Electron 7.0.0! It includes upgrades to Chromium 78, V8 7.8, and Node.js 12.8.1. We've added a Window on Arm 64 release, faster IPC methods, a new `nativeTheme` API, and much more!

---

Команда Electron рада сообщить о выпуске новой версии Electron 7.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новыми возможностями. Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

## Значительные изменения
 * Улучшения стеков:

   | Стек    | Версия в Electron 6 | Версия в Electron 7 | Что нового                                                                                                                                                                                                                                                                |
   |:------- |:------------------- |:------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Хромий  | 76.0.3809.146       | **78.0.3905.1**     | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                 | **7.8**             | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0              | **12.8.1**          | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Добавлена версия Windows на Arm (64 бит). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Добавлены `ipcRenderer.invoke()` и `ipcMain.handle()` для асинхронного запроса / response-style IPC. These are strongly recommended over the `remote` module. Более подробную информацию смотрите в модуле "[Электрон " считает вредным](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)блога ". [#18449](https://github.com/electron/electron/pull/18449)
 * Добавлена `родная тема` API для чтения и реагирования на изменения в шаблоне и цветовой схеме ОС. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Переключено на новый TypeScript Definitions [generator](https://github.com/electron/docs-parser). Результирующие определения более точными; так что если сборка TypeScript завершится, то это скорее всего причина. [#18103](https://github.com/electron/electron/pull/18103)

Смотрите [7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) для более длинного списка изменений.

## Критические изменения

Более подробную информацию об этих и будущих изменениях можно найти на странице [Планируемые нарушительные изменения](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * Удаленные устаревшие API:
     * Callback-версии функций, которые используют Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` больше не позволяет фильтровать очищенные записи кэша. [#17970](https://github.com/electron/electron/pull/17970)
 * Нативные интерфейсы в macOS (меню, диалоги и т. д.) теперь автоматически совпадают с настройкой темного режима на машине пользователя. [#19226](https://github.com/electron/electron/pull/19226)
 * Обновлен модуль `electron` для использования `@electron/get`.  Минимальная поддерживаемая версия узла теперь равна 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Файл `electron.asar` больше не существует. Все скрипты упаковки, которые зависят от их существования, должны быть обновлены. [#18577](https://github.com/electron/electron/pull/18577)

## Окончание поддержки 4.x.y

Electron 4.x.y достиг конечной поддержки в соответствии с [политикой поддержки проекта](https://electronjs.org/docs/tutorial/support#supported-versions). Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Программа отзывов

Мы продолжаем использовать нашу [программу обратной связи по приложению](https://electronjs.org/blog/app-feedback-program) для тестирования. Проекты, участвующие в этом тестировании Electron бета-версий в своих приложениях; и в свою очередь, новые ошибки, которые они обнаружили, имеют приоритетное значение для стабильного выпуска. Если вы хотите принять участие или узнать больше, [посмотрите наш пост о программе](https://electronjs.org/blog/app-feedback-program).

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) отображает ключевые даты жизненного цикла Electron 8. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
