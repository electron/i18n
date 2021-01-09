---
title: Electron 9.0.0
author:
  - софіангі
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 було випущено! Він включає оновлення до Chromium `83`, V8 `8.3`і Node.js `12.14`. Ми додали декілька нових інтеграцій API для нашої функції перевірки орфографії, включили переглядач PDF і багато іншого!

---

Команда Electron з радістю повідомляє про реліз Electron 9.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити з нашого [релізів веб-сайт](https://electronjs.org/releases/stable). Реліз упакований разом з оновленнями, виправленнями та новими функціями. Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

## Важливі зміни

### Зміни стека

* Chromium `83.0.4103.64`
    * [Нова в Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Пропущено Chrome 82](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Нова в Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Допис у блозі 12.14.1](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 запис у блозі](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 запис у блозі](https://v8.dev/blog/v8-release-83)

### Підсвітка функцій

* Декілька удосконалень у функції перевірки правопису. Детальніше в [#22128](https://github.com/electron/electron/pull/22128) і [#22368](https://github.com/electron/electron/pull/22368).
* Вдосконалений коефіцієнт обробки подій на Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Увімкнути переглядач PDF. [#22131](https://github.com/electron/electron/pull/22131).

Дивіться [9.0.0 примітки до випуску](https://github.com/electron/electron/releases/tag/v9.0.0) на повний список нових функцій і змін.

## Важливі Зміни

* Застереження про амортизацію при використанні `пульта` без `enableRemoteModu: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Це перший крок у наших планах подовження модуля `пульт` і переміщення його до бази користувачів. Ви можете прочитати й ознайомитися з [цією проблемою](https://github.com/electron/electron/issues/21408) , що детально оформила наші причини для цього, і включити запропоновану часову шкалу для розгортання.
* За замовчуванням встановити значення `app.enableRenderProcessReuse`. [#22336](https://github.com/electron/electron/pull/22336)
    * Це продовження роботи для майбутньої необхідності, тому що вбудовані модулі вузлів, завантажені в процес рендеринга, будуть або [N-API](https://nodejs.org/api/n-api.html) або [контексті Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Повна інформація і запропонована лінія часу детальна в [це питання](https://github.com/electron/electron/issues/18397).
* Надсилання неJavaScript об'єктів через IPC тепер викликає виключення. [#21560](https://github.com/electron/electron/pull/21560)
    * Ця поведінка знецінена в Electron 8.0. В Electron 9.0, старий алгоритм серіалізації був видалений, і надсилання таких несеріалізованих об'єктів тепер буде кидати помилку "об'єкт не може бути клонувано".

Більше інформації про ці та майбутні зміни можна знайти на сторінці [Заплановані порушення](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Зміни API

* `оболонка` API зміни:
   * `shell.openItem` API замінено на асинхронний `shell.openPath API`. [пропозиція](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `сеанс`змін API:
   * Додано `session.listWordsFromSpellCheckerDictionary` API для перегляду списку користувацьких слів у словнику. [#22128](https://github.com/electron/electron/pull/22128)
   * Додано `session.removeWordFromSpellCheckerDictionary` API для видалення користувацьких слів у словнику. [#22368](https://github.com/electron/electron/pull/22368)
   * Додано `session.serviceWorkerContext` API для доступу до базової службової інформації та отримання логів консолі від сервісних workers. [#22313](https://github.com/electron/electron/pull/22313)
* `додаток` змінити API:
   * Додано новий параметр сили для `app.focus()` на macOS щоб дозволити програмам примусово взяти фокус. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` Зміни API:
   * Додано підтримку доступу властивості до деяких пар getter/setter на `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### Застарілий API

Зараз наступні API застарілі або видалені:

* `shell.openItem` API тепер знецінено і замінено на асинхронний `shell.openPath API`.
* `<webview>.getWebContents`, який було застаріло в Electron 8.0, тепер видалено.
* `webFrame.setLayoutZoomLevelLimits`, який був застарілий в Electron 8.0, тепер видалений.

## Кінець підтримки 6.x.y

Electron 6.x.y досяг останньої підтримки, оскільки згідно з політикою підтримки проекту [](https://electronjs.org/docs/tutorial/support#supported-versions). Розробники та додатки заохочують оновитися до новішої версії Electron.

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. Значення [орієнтовне 10.0.0 розкладу](https://electronjs.org/docs/tutorial/electron-timelines) відображає ключові дати в життєвому циклі розробки Electron 10.0. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Змініть за замовчуванням `contextIsolation` з `false` на `true` (Починаючи з Electron 10)

Без contextIsolation будь-який код, що запускається в рендеринговому процесі, може легко потрапити до скрипта Electron з перевантаження програмки. Цей код може виконувати привілейовані дії, які Electron хоче зберегти обмежені.

Зміна цього за замовчуванням покращує безпеку додатків за замовчуванням, так що додаткам потрібно буде навмисно обрати незахищену поведінку. Electron знецінить поточне значення за замовчуванням `contextIsolation` з Electron 10. , і змінити на новий за замовчуванням (`true`) в Electron 12.0.

Для отримання додаткової інформації про `contextolation`, як ввімкнути його легко і приступити до надійності, будь ласка, ознайомтеся з нашими присвяченими [документацією контексту](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
