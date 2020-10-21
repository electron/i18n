---
title: Electron 7.0.0
author:
  - софіангі
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 було випущено! Він включає оновлення до Chromium 78, V8 7.8 та Node.js 12.8.1. Ми додали вікно на випуску Arm 64, швидший метод IPC, новий `рольову тему` API і багато іншого!

---

Команда Electron з радістю повідомляє про реліз Electron 7.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити з нашого [релізів веб-сайт](https://electronjs.org/releases/stable). Реліз упакований разом з оновленнями, виправленнями та новими функціями. Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

## Важливі зміни
 * Оновлення стеку:

   | Стек    | Версія Electron 6 | Версія Electron 7 | Що нового                                                                                                                                                                                                                                                                 |
   |:------- |:----------------- |:----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Хром    | 76.0.3809.146     | **78.0.3905.1**   | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6               | **7.8**           | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0            | **12.8.1**        | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Додано Windows на Arm (64-бітний реліз). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Додано `ipcRenderer.invoke()` and `ipcMain.handle()` для asynchronous request/response-style IPC. Наполегливо рекомендується використовувати модуль `віддалений`. Дивіться цей "[Electron’s ‘remote’ модуль вважається шкідливим](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)дописом у блозі для отримання додаткової інформації. [#18449](https://github.com/electron/electron/pull/18449)
 * Додано `рідна тема` API для читання та відповіді на зміни в ОС теми і колірній схемі. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Перейшов на нові визначення TypeScript [генератор](https://github.com/electron/docs-parser). Отримані визначення є більш точними; отож якщо ваш TypeScript вийшов з ладу, то це була ймовірна причина. [#18103](https://github.com/electron/electron/pull/18103)

Перегляньте [7.0.0 нотатки щодо випуску](https://github.com/electron/electron/releases/tag/v7.0.0) для більш довгих змін.

## Важливі Зміни

Більше інформації про ці та майбутні зміни можна знайти на сторінці [Заплановані порушення](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)

 * Видалені застарілі API:
     * Версія функцій, що підтримуються на зворотному зв'язку, яка використовує Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` більше не дозволяє фільтрувати очищені записи кешу. [#17970](https://github.com/electron/electron/pull/17970)
 * Рідні інтерфейси на macOS (меню, діалоги та інше) тепер автоматично відповідають встановленню темного режиму на машині користувача. [#19226](https://github.com/electron/electron/pull/19226)
 * Модуль `електронний` оновлено для використання `@electron/get`.  Мінімальна версія підтримуваного вузла тепер Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Файл `electron.asar` більше не існує. Будь-які скрипти пакету, які залежать від його наявності, слід оновити. [#18577](https://github.com/electron/electron/pull/18577)

## Кінець підтримки 4.x.y

Electron 4.x.y досяг кінцевої підтримки, оскільки політика підтримки проекту [](https://electronjs.org/docs/tutorial/support#supported-versions). Розробники та додатки заохочують оновитися до новішої версії Electron.

## Програма зворотнього зв’язку

Ми продовжуємо використовувати нашу [Програма зворотного зв’язку](https://electronjs.org/blog/app-feedback-program) для тестування. Проекти, які беруть участь у цій програмі тестувати бета-версію Electron в своїх додатках; і взамін, нові помилки, які вони виявили, пріоритетні для стабільної релізи. Якщо ви хочете взяти участь або дізнатися більше, [перегляньте наш блог пост про програму](https://electronjs.org/blog/app-feedback-program).

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. [орієнтовний 8.0.0 графік](https://electronjs.org/docs/tutorial/electron-timelines) відображає ключові дати в життєвому циклі Electron 8. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
