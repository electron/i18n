---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Команда Electron з радістю повідомляє, що стабільна версія Electron 4 наразі доступна! Ви можете встановити це з [electronjs.org](https://electronjs.org/) або з npm через `npm встановити electron@latest`. Цей реліз набитий оновленнями, фіксами і новими функціями, і ми не можемо дочекатися, щоб побачити, що ви з ними будуєте. Детальніше про цей реліз, і будь ласка, поділіться з ними всіма, що ви досліджуєте!

---

## Що нового?

Велика частина функціональності Electron надається Chromium, Node.js і V8, основними компонентами, які складають Electron. Таким чином, ключовою метою для команди Electron є залишити зміни до цих проектів максимально надання розробникам, які створюють доступ до застосунків Electron до нових веб та JavaScript функцій. У цьому кінці Electron 4 містить великі версії для кожного з цих компонентів; Electron v4.0.0 включає Chromium `69. .3497.106`, Вузол `10.11.0`, і V8 `6.9.427.24`.

На додачу, Electron 4 включає зміни до API. Ви можете знайти короткий огляд основних змін в Electron 4 нижче; для повного списку змін перегляньте [Electron v4. .0 замітки до випуску](https://github.com/electron/electron/releases/tag/v4.0.0).

### Вимкнення модуля `віддаленого`

Тепер ви можете вимкнути `віддалений` модуль з міркувань безпеки. Модуль можна вимкнути для `BrowserWindow`s та для `тегів webview`:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Дивіться [BrowserWindow](https://electronjs.org/docs/api/browser-window) та [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) документації для отримання додаткової інформації.

### Фільтрація `remote.require()` / `remote.getGlobal()` Запити

Ця функція корисна, якщо ви не хочете повністю вимкнути `віддалений` модуль в процесі рендерингу або `webview` , але щоб додатковий контроль, за які модулі можна використовувати в `remote. екв.`.

Якщо модуль потрібний за допомогою `remote. викликати` в процесі рендерингу, для дистанційного захисту `потрібна` подія піднята на модуль [`<code>`](https://electronjs.org/docs/api/app). Ви можете викликати `event.preventDefault()` на події (перший аргумент), щоб запобігти завантаженню модуля. Веб-контент [`` екземпляр](https://electronjs.org/docs/api/web-contents) , при запиті вказаного аргументу передано як другий аргумент, а назва модуля передається у третій аргумент. Ця ж подія також викликається в `WebContents` , наприклад але в цьому випадку єдиними аргументами є подія і назва модуля. В обох випадках ви можете повернути довільне значення, встановивши значення `event.returnValue`.

```javascript
// Контроль `remote.require` з усіх WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Контроль `remote.require` з конкретного екземпляру WebContents:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

In a similar fashion, when `remote.getGlobal(name)` is called, a `remote-get-global` event is raised. Це працює так само, як `remote-require` event: виклик `preventDefault()` , щоб запобігти поверненню світу, та видав подію `. eturnValue` для повернення користувацьких значень.

```javascript
// Контролюйте `remote.getGlobal` з усіх WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
//
})

// Контроль `remote.getGlobal` з конкретного екземпляру WebContents:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Для отримання додаткової інформації дивіться наступну документацію:

* [`потрібно видалити`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`Зміст`](https://electronjs.org/docs/api/web-contents)

### Доступ до розширених налаштувань JavaScript

На macOS, тепер ви можете викликати `додаток. howAboutPanel()` для програми показати панель "Доповня", як і натискання на пункт меню, створеного через `{role: 'about'}`. Перегляньте [`showAboutPanel` документацію](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) для отримання додаткової інформації

### Управління `WebContents` фоновим згортанням

`WebContents` екземпляри мають метод `setBackgroundThrottling(дозволений` для увімкнення або вимкнення обмеження таймерів та анімацій, коли сторінка знаходиться на фоновому режимі.

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Перегляньте [ `setBackgroundThrottling` документацію](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) для отримання додаткової інформації.

## Важливі Зміни

### Більше macOS 10.9 підтримки

Chromium більше не підтримує macOS 10.9 (OS X Mavericks), і, як результат [Electron 4.0 та за його межами не підтримує ні](https://github.com/electron/electron/pull/15357).

### Блокування в один екземпляр

Раніше ви можете зробити додаток одиночним Інстансом (забезпечення того, що в будь-який час працює лише один екземпляр вашого додатку), ви можете використовувати `додаток. akeSingleInstance()` метод. Починаючи з Electron 4.0, ви повинні використовувати `app.requestSingleInstanceLock()`. Значення методу повернення вказує, чи буде цей екземпляр Вашої заявки успішно отриманий для замку. Якщо не вдалося отримати замок, ви можете припустити, що інший екземпляр вашої програми вже запущено після блокування та виходу негайно.

Для прикладу використання `запиту SingleInstanceLock()` та інформації про нюансову поведінку на різних платформах, [перегляньте документацію для `додатку. equestSingleInstanceLock()` та відповідні методи](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) та [ `другий екземпляр` подію](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

При створенні власних модулів для вікон, `win_delay_load_hook` у змінній модуля `binding.gyp` повинен бути true (тобто за замовчуванням). Якщо цей хук відсутній, то рідний модуль не зможе завантажити на Windows, з повідомленням про помилку, таким як `Неможливо знайти модуль`. [Дивіться посібник з природного модуля](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) для отримання додаткової інформації.

## Застарілі

Наступні зміни заплановані для Electron 5.0, і тому застарілі для Electron 4.0.

### Інтеграція з Node.js вимкнена для `nativeWindowOpen`-ed Windows

Починаючи з Electron 5.0, дочірні вікна, що відкриваються опцією `nativeWindowOpen` завжди будуть мати відключену інтеграцію з Node.js.

### `webPreferences` Типові значення

Під час створення нового `BrowserWindow` з параметром `webPreferences` , встановлено параметр параметр `webPreferences` за замовчуванням застаріли на користь нових значень:

<div class="table table-ruled table-full-width">

| Property | Deprecated Default | New Default |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | value of `nodeIntegration` if set, otherwise `true` | `false` |

</div>

Зверніть увагу: в даний час [відома помилка (#9736)](https://github.com/electron/electron/issues/9736) що запобігає тегу `webview` працювати над тим, якщо `contextIsolation` ввімкнено. Слідкуйте за проблемою GitHub для актуальної інформації!

Дізнайтеся більше про ізоляцію контексту, інтеграцію вузла і тег `webview` в [документі безпеки Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 все ще використовуватиме поточні значення за замовчуванням, але якщо ви не передасте явне значення для них, то ви побачите попередження про застаріле. Для підготовки вашої програми до Electron 5.0, використовуйте чіткі значення для цих варіантів. [Перегляньте `документацію` BrowserWindow](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) для деталей щодо кожного з цих параметрів.

### `webContents.findInPage(text[, параметри])`

`medialCapitalAsWordStart` і `wordStart` конфігурації були застарілі, оскільки вони були видалені upstream.

## Програма зворотнього зв’язку

Програма [Зворотній зв'язок](https://electronjs.org/blog/app-feedback-program) яку ми встановили під час розробки Electron 3. була успішною, тому ми її продовжували і під час розробки 4.0. Ми хотіли б продовжити масове подяку Atlassian, Discord, MS Teams, OpenFin, Slack, Симфонія, WhatsApp, а також інші члени програми за їх причетність до 4. бета цикл. Щоб дізнатися більше про програму "Програма зворотнього зв’язку" та прийняти участь у майбутніх бета-версіях, [Перегляньте наші блог записи про програму](https://electronjs.org/blog/app-feedback-program).

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. [Дивіться наш Візуальний Документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
