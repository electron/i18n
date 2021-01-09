---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

The Electron team is excited to announce that the first stable release of Electron 3 is now available from [electronjs.org](https://electronjs.org/) and via `npm install electron@latest`! Він розпакований за допомогою джаму, фіксів і нових функцій, і ми не можемо дочекатися, коли ви з ними будуєте. Нижче детально ознайомлені з цим релізом, і ми вітаємо ваші відгуки як ви досліджуєте.

---

## Процес релізу

Під час розробки ми проводили розробку `v3.0.`- ми прагнули більш емпірично визначити критерії стабільної версії, формуючи прогрес у зворотньому зв'язку для прогресивних бета-релізів. `v3.0.` не було б можливим без нашого [Програма зворотнього зв’язку](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) партнерства, котрі підготували ранні тестування та відгуки під час циклу бета-тестування. Завдяки Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code, та іншим членам програми за свою роботу. Якщо ви хочете взяти участь у майбутніх бета-версіях, будь ласка, напишіть нам за посиланням [info@electronjs.org](mailto:info@electronjs.org).

## Зміни / Нові можливості

Основні частини інструментарію, включаючи Chrome `v66.0.3359.181`, Node `v10.2.0`, V8 `v6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)функція: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)функція: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)функція: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)]: `win.moveTop()` для переміщення об-порядку вікна у верху
* [[#13110](https://github.com/electron/electron/pull/13110)функція ]: TextField і API кнопок
* [[#13068](https://github.com/electron/electron/pull/13068)функція: netLog API для динамічного керування журналом реєстрації
* [[#13539](https://github.com/electron/electron/pull/13539)]: увімкнути `webview` у режимі оточення
* [[#14118](https://github.com/electron/electron/pull/14118)функція: `fs.readSync` тепер працює з масовими файлами
* [[#14031](https://github.com/electron/electron/pull/14031)функція: вузол `fs` обгортки, щоб зробити `fs.realpathSync.native` та `fs.realpath.native` доступні

## Зміни в API

* [[#12362](https://github.com/electron/electron/pull/12362)]: оновлення управління позиціями меню
* [[#13050](https://github.com/electron/electron/pull/13050)</a> ] refactor: видалено застарілі API
  * Докладніше в [документації](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30)
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: Видаліть `did-get-response-details` і `did-get-redirect-request` події
* [[функція #12655](https://github.com/electron/electron/pull/12655)]: за замовчуванням відключення навігації по перетягуванню
* [[#12993](https://github.com/electron/electron/pull/12993)функція: вузол `v4.x` або більший слід використовувати `electron` npm модуль
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)функція: більше не використовувати JSON для відправки результату `ipcRenderer.sendSync`
* [[функція #13039](https://github.com/electron/electron/pull/13039)]: за замовчуванням ігнорувати аргументи командного рядка за URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: перейменуйте `api:Window` до `api:BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)]: візуальне масштабування вимкнено за замовчуванням
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: перейменуйте app-command `media-play_pause` на `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)функція: підтримка сповіщень робочого простору
* [[#12496](https://github.com/electron/electron/pull/12496)функція: `tray.setIgnoreDoubleClickEvents(ignore)` для ігнорування події подвійного натискання на трей.
* [[#12281](https://github.com/electron/electron/pull/12281)]: функція миші вперед на macOS
* [[#12714](https://github.com/electron/electron/pull/12714)]: екран блокування / розблокування подій

### Windows

* [[функція #12879](https://github.com/electron/electron/pull/12879)]: додано DIP в/з орієнтації екранів

**Nota Bene:** Перехід на старішу версію Electron після запуску цієї версії вимагатиме від вас очистити каталог даних користувача, щоб уникнути збою в старіших версіях. Ви можете отримати каталог даних користувача, запустивши `console.log(app.getPath("userData"))` або перегляньте [docs](https://electronjs.org/docs/api/app#appgetpathname) для отримання додаткової інформації.

## Виправлення помилок

* [[#13397](https://github.com/electron/electron/pull/13397)]: проблема з `fs.statSyncNoException` кидає винятки
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] виправлення: аварійне завершення завантаження сайту з jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] виправлення: аварійне завершення роботи `net::ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] виправлення: повідомляти про зміну фокусу прямо зараз, а не наступного кліку

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] виправлення: задача дозволяє пакетам бути вибрана в `<input file="type">` відкривати діалог щодо файлу
* [[#12404](https://github.com/electron/electron/pull/12404)]: при використанні діалогового вікна async
* [[#12043](https://github.com/electron/electron/pull/12043)]: контекстне меню натисніть на зворотний виклик
* [[#12527](https://github.com/electron/electron/pull/12527)]: виток події при повторному використанні елемента touchbar
* [[#12352](https://github.com/electron/electron/pull/12352)] виправлено: лоток заголовку
* [[#12327](https://github.com/electron/electron/pull/12327)] виправити: не перетягувані регіони
* [[#12809](https://github.com/electron/electron/pull/12809)] виправлення: запобігання оновлення меню під час відкриття
* [[#13162](https://github.com/electron/electron/pull/13162)]: виправлення значка в лотку не дозволяйте від"ємним значенням
* [[#13085](https://github.com/electron/electron/pull/13085)] рішення: лоток заголовок не перевертається, якщо виділено
* [[#12196](https://github.com/electron/electron/pull/12196)] виправити: збірка Mac, коли `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)вирішити: додаткові проблеми в бездротових вікнах з вібрацією
* [[#13326](https://github.com/electron/electron/pull/13326)]: встановити mac протокол ні після дзвінка `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)]: неправильне використання приватних API в MAS збірці
* [[#13517](https://github.com/electron/electron/pull/13517)]: `tray.setContextMenu` аварійне завершення роботи
* [[#14205](https://github.com/electron/electron/pull/14205)] виправлення: натиснувши escape-повідомлення зараз закриває його, навіть якщо `defaultId` встановлено

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)що: `BrowserWindow.focus()` для офлайн вікон

## Інші нотатки

* Переглядач PDF в даний час не працює, але над цим працює і незабаром він працюватиме знову
* `Текстове поле` `Кнопка` API є експериментальним і тому вони вимкнені за замовчуванням
  * Вони можуть бути увімкнені за допомогою прапорця збірки `enable_view_api`

# Що далі

Команда Electron продовжує працювати над визначенням наших процесів для швидкіших і плавніших оновлень, як ми прагнемо в кінцевому рахунку підтримувати паритет з основами розробки Chromium, Вулиця і V8.
