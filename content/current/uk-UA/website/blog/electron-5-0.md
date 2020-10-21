---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Команда Electron з радістю повідомляє про реліз Electron 5.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити tarballs з [наших релізів сторінку](https://github.com/electron/electron/releases/tag/v5.0.0). Реліз упакований разом з оновленнями, виправленнями та новими функціями. Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

---

## Що нового?

Значна частина функціональності Electron надається основними компонентами Chromium, Node.js та V8. Electron оновлює ці проекти, щоб забезпечити наших користувачів новими функціями JavaScript, покращення продуктивності та виправлення безпеки. Кожен з цих пакетів має велику версію бампа Electron 5:

- Chromium `73.0.3683.119`
  - [Нова в 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Новий у 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Нова в 72 році](https://developers.google.com/web/updates/2019/01/nic72)
  - [Новий у 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Блог вузла 12](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Нові JS функції](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 також містить покращення API, специфічного для Electron. Підсумок основних змін нижче; для повного списку змін перегляньте опис релізу [Electron v5.0.0 для випуску](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 продовжує [ініціативу обіцянки](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) перетворити API на callbackbased Electron's для використання Promises. Цей API був перетворений для Electron 5:
* `app.getFileIcon`
* `tracing.getCategories`
* `запис contentTracing.startRecording`
* `запис contentTracing.stopRecording`
* `debugger.sendCommand`
* API кук
* `оболонка openзовнішня`
* `файл webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Доступ до системних кольорів для macOS

Ці функції були змінені або додані до `systemPreferences` для доступу до кольорів macOS систем:
* `колір системних налаштувань.getAccentColor`
* `налаштування системи.getColor`
* `налаштування системи.getSystemКолір`

### Процес інформації про пам'ять

Функція `process.getProcessMemoryInfo` була додана для отримання статистики використання пам'яті про поточний процес.

### Додаткова фільтрація для віддаленого API

Для покращення безпеки в `віддаленому інтерфейсі` , нові події віддаленого доступу були додані, `пульт. etBuiltin`, , `remote. etCurrentWindow`, `remote.getCurrentWebContents` і `<webview>.getWebents` може бути [відфільтрований](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Декілька переглядів у веб-вікні браузера

Тепер BrowserWindow підтримує управління кількома браузерами в межах одного веб-переглядача.

## Важливі Зміни

### За замовчуванням для запакованих додатків

Упаковані додатки будуть тепер поводитись так само, як програма за замовчуванням: меню програми за замовчуванням буде створена, якщо програма не має одну і `закрита всі разом` подія буде автоматично оброблена, якщо програма не обробить цю подію.

### Пісочниці зі змішаними мітками

Режим мішаного пісочниці тепер увімкнено за замовчуванням. Візуалізатори запущені за допомогою `пісочниця: true` тепер буде фактично пісочницею, де раніше вони будуть виконуватися лише в пісочниці, якщо увімкнено режим змішаного пісочниці.

### Поліпшення безпеки
За замовчуванням значення `nodeIntegration` and `webviewTag` тепер `false` для покращення безпеки.

### Перевірка правопису зараз асинхронна

API SpellCheck змінено на надання [асинхронних результатів](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Застарілі

Наступні API є щойно застарілими в Electron 5.0.0 та заплановані для видалення в 6.0.0:

### Бінарні знімки для зброї та броні 64
Нативні бінарні файли mksnapshot для зброї і arm64 є застарілими і будуть видалені в 6. .0. Знімки можуть бути створені для озброєння і броні за допомогою виконуваних файлів x64.

### API ServiceWorker на WebContents
Застарілі API ServiceWorker в WebContents при підготовці до їх віддаленого доступу.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Автоматичні модулі з пісочницею
In order to improve security, the following modules are being deprecated for use directly via `require` and will instead need to be included via `remote.require` in a sandboxed webcontents:
* `електронний екран`
* `процес дочірніх_типу`
* `fs`
* `с`
* `шлях`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` були застарілі на користь `webFrame.setIsolatedWorldInfo`.

### Пісочниці зі змішаними мітками
`enableMixedSandbox` та `--enable-mixed-sandbox` все ще існує для сумісності, але вони застарілі і не мають ефекту.

## Кінець підтримки 2.0.x

За наші [підтримувані версії](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x досягнули кінця життя.

## Програма зворотнього зв’язку

Ми продовжуємо використовувати нашу [Програма зворотного зв’язку](https://electronjs.org/blog/app-feedback-program) для тестування. Проекти, які беруть участь у цій програмі перевіряють бета-версію Electron у своїх додатках; і взамін, нові помилки, які вони виявили, пріоритетні для стабільної релізи. Якщо ви хочете взяти участь або дізнатися більше, [дізнайтеся про наш блог повідомлення про програму](https://electronjs.org/blog/app-feedback-program).

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. [орієнтовний графік 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) відображає ключові дати в життєвому циклі Electron 6. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
