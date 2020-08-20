# app

> Контролюйте життєвий цикл подій вашого застосунку.

Процес: [Main](../glossary.md#main-process)

Наступний приклад показує як вийти з застосунку, коли закривається останнє вікно:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Події (Events)

Об'єкт `app` має наступні події:

### Подія: 'will-finish-launching'

Відбувається коли застосунок закінчує основний запуск. На Windows і Linux, подія `will-finish-launching` те саме що і подія `ready`; на macOS, ця подія представляє `NSApplication` повідомлення `applicationWillFinishLaunching`. Зазвичай ви будете налаштовувати тут слухачі на `open-file` та `open-url` події, запускати репортер збоїв та автооновлювач.

В більшості випадків, ви повинні робити все в хендлері події `ready`.

### Подія: 'ready'

Повертає:

* `launchInfo` Object _macOS_

Відбувається коли Electron завершує ініціалізацію. На macOS, `launchInfo` тримає `userInfo` `NSUserNotification`, яка використовувалася для відкриття застосунку, якщо він був запущений з Центру Сповіщень. Ви можете викликати `app.isReady()` щоб перевірити чи відбулася дана подія.

### Подія: 'window-all-closed'

Відбувається коли всі вікна зачиняються.

Якщо ви не підписані на цю подію і всі вікна закриваються, поведінкою за замовчуванням є вихід з застосунку; однак, якщо ви підписані, ви можете контролювати чи виходити з застосунку чи ні. Якщо користувач натискає `Cmd + Q`, або розробник викликає `app.quit()`, Electron спочатку намагатиметься закрити всі вікна, а потім виникає подія `will-quit`, і в цьому випадку подія `window-all-closed` не буде виникати.

### Подія: 'before-quit'

Повертає:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Примітка:** Якщо вихід з застосунку був ініційований `autoUpdater.quitAndInstall()`, тоді `before-quit` відбувається *після* події `close` на всіх вікнах і закриває їх.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'will-quit'

Повертає:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Дивіться опис події `window-all-closed` для різниці між рлжіями `will-quit` і `window-all-closed`.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'quit'

Повертає:

* `event` Event
* `exitCode` Integer

Відбувається коли застосунок припиняє роботу.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'open-file' _macOS_

Повертає:

* `event` Event
* `path` String

Відбувається коли користувач хоче відкрити файл за допомогою застосунку. Подія `open-file` зазвичай відбувається коли застосунок вже відкритий і ОС хоче повторно повторно використати його для відкриття файлу. `open-file` також відбуваєтсья коли файл закидається на панель, а застосунок ще не запущено. Слухайте подію `open-file` дуже рано при завантаженні застосунку щоб обробляти ці випадки (навіть перед викликом події `ready`).

Слід викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

На Windows, ви маєте витягувати шлях до файлу з `process.argv` (в головному процесі).

### Подія: 'open-url' _macOS_

Повертає:

* `event` Event
* `url` String

Відбувається коли користувач хоче відкрити посилання за допомогою застосунку. Файл `Info.plist` має визначати схеми посилань за допомогою `CFBundleURLTypes` ключа, і встановлювати `NSPrincipalClass` в `AtomApplication`.

Слід викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

### Подія: 'activate' _macOS_

Повертає:

* `event` Event
* `hasVisibleWindows` Boolean

Відбувається при активації застосунку. Різні дії можуть викликати цю подію, такі як перший запуск застосунку, спроба перезапустити застосунок коли він працює, чи натискання на панель застосунку чи на піктограму на панель задач.

### Подія: 'continue-activity' _macOS_

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Містить стан застосунку, збережений діяльністю на іншому пристрої.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), коли діяльність з іншого пристрою має бути продовжена. Потрібно викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

Діяльність користувача може бути продовжена тільки в застосунку, що має такий самий ідентифікатор групи розробників, як і застосунок-джерело і який підтримує тип діяльності. Підтримувані типу діяльності визначені в `Info.plist` під ключем `NSUserActivityTypes`.

### Подія: 'will-continue-activity' _macOS_

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), перед продовженням діяльності з іншого пристрою. Потрібно викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

### Подія: 'continue-activity-error' _macOS_

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Стрічка з локалізованим описом помилки.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), коли діяльність з іншого пристрою не буде продовжена.

### Подія: 'activity-was-continued' _macOS_

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Містить стан застосунку, збережений діяльністю.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), після того як діяльність з цього пристрою була успішно продовжена на іншому.

### Подія: 'update-activity-state' _macOS_

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Містить стан застосунку, збережений діяльністю.

Відбувається коли [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) має бути відновлена на іншому пристрої. Якщо вам потрібно оновити статус для передачі, потрібно викликати `event.preventDefault()` негайно, сформувати новий `userInfo` словник та викликати `app.updateCurrentActivity()` в потрібний момент. В іншому випадку операція не виконається і буде викликано `continue-activity-error`.

### Подія: 'new-window-for-tab' _macOS_

Повертає:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Подія: 'browser-window-blur'

Повертає:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Відбувається коли [browserWindow](browser-window.md) втрачає фокус.

### Подія: 'browser-window-focus'

Повертає:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Відбувається коли [browserWindow](browser-window.md) отримує фокус.

### Подія: 'browser-window-created'

Повертає:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Відбувається коли створено [browserWindow](browser-window.md).

### Подія: 'web-contents-created'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Відбувається коли створено [webContents](web-contents.md).

### Подія: 'certificate-error'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Код помилки
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Враховувати сетрифікат як надійний

Відбуваєтся коли не вдалося перевірити `certificate` для `url`, щоб довіряти сертифікату потрібно запобігти поведінці за замовчуванням за допомогою `event.preventDefault()` та викликати `callback(true)`.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Логіка перевірки.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Подія: 'select-client-certificate'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) (опціонально)

Відбувається коли запитується сертифікат клієнта.

`url` відповідає запису навігації, що запитує сертифікат клієнта і `callback` може викликатися з записом, що відфільтрований зі списку. Використання `event.preventDefault()` запобігає використання першого сертифікату з сховища.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Подія: 'login'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Відбуваєтся коли `webContents` робить базову автентифікацію.

За замовчуванням скасовує всі автентифікації. Щоб перевизначити це ви маєте скасувати поведінку за замовчуванням за допомогою `event.preventDefault()` і викликати `callback(username, password)` з обліковими даними.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Подія: 'gpu-process-crashed'

Повертає:

* `event` Event
* `killed` Boolean

Відбувається коли процес gpu ламається або припиняється примусово.

### Подія: 'renderer-process-crashed'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Викликається коли рендер процес `webContents` ламається чи зупиняється примусово.

### Подія: 'accessibility-support-changed' _macOS_ _Windows_

Повертає:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` коли ввімкнуто підтримку спеціальних можливостей Chrome, `false` в іншому випадку.

Відбуваєтсья коли змінюється підтримка спеціальних можливостей Chrome. Ця подія викликається коли допоміжні технології, такі як читач екрану, вмикаються або вимикаються. Дивись https://www.chromium.org/developers/design-documents/accessibility для більш детедбної інформації.

### Подія: 'session-created'

Повертає:

* `session` [Session](session.md)

Викликаєтсья коли Electron створив нову `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Подія: 'second-instance'

Повертає:

* `event` Event
* `argv` String[] - Масив параметрів командного рядка другого екземпляру
* `workingDirectory` String - Робоча директорія другого екземпляру

Ця подія буде викликана всередині головного інстансу вашого застосунку коли другорядний інстанс працює і викликає `app.requestSingleInstanceLock()`.

`argv` це Array аргументів командного рядка другорядного інстансу, `workingDirectory` його поточна робоча директорія. Зазвичай застосунок відповідає на це, розгортаючи головне вікно на перводячи на нього фокус.

Ця подія гарантовано викличеться після події `ready` модуля `app`.

**Примітка:** Додаткові аргументи командного рядку можуть бути додані Chromium, такі як `--original-process-start-time`.

### Подія: 'desktop-capturer-get-sources'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Подія: 'remote-require'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Виконується коли викликається `remote.require()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню модуля. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

### Подія: 'remote-get-global'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Виконується коли викликається `remote.getGlobal()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню глобального значення. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

### Подія: 'remote-get-builtin'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Виконується коли викликаєтсья `remote.getBuiltin()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню модуля. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

### Подія: 'remote-get-current-window'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Виконується коли викликається `remote.getCurrentWindow()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню об'єкта. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

### Подія: 'remote-get-current-web-contents'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Виконується коли викликається `remote.getCurrentWebContents()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню об'єкта. Користувацьке значення може бути повернене встановленням `event.returnValue`.

### Подія: 'remote-get-guest-web-contents'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Виконується коли викликається `<webview>.getWebContents()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню об'єкта. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

## Методи

Об'єкт `app` має наступні методи:

**Примітка:** Деякі методи доступні тільки на певних операціїних системах і позначені як такі.

### `app.quit()`

Намагається закрити всі вікна. Перщою викличеться подія `before-quit`. Якщо всі вікна успішно закриються, викличеться подія `will-quit` і за замовчуванням застосунок припинить свою роботу.

Цей метод гарантує, що всі обробники події `beforeunload` та `unload` виконаються коректно. Можливо, що вікно скасує закриття, повернувши `false` в обробнику події `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (опціонально)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Всі вікна будуть закриті негайно без перепитування користувача, всі події `before-quit` та `will-quit` не будуть викликатися.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (опціонально)
  * `execPath` String (опціонально)

Перезавантажує застосуонк, якщо поточний екземпляр існує.

За замовчуванням новий екземпляр буде використовувати ті самі робочу директорію і аргументи командного рядку. Якщо визначені `args`, вони будуть передані як аргументи командного рядку замість поточних. Якщо визначений `execPath`, він буде використаний для запуску застосунку.

Зауважте, даний метод не зупиняє застосунок, потрібно викликати `app.quit` чи `app.exit` після виклику `app.relaunch`, щоб застосунок перезапустився.

Якщо `app.relaunch` викликається декілька разів, така кількість екземплярів буде запущена після закриття поточного.

Приклад негайного перезапуску поточного екземпляру і додання нового аргументу командного рядка в новий екземпляр:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Повертає `Boolean` - `true` якщо Electron завершив ініціалізацію, `false` в іншому випадку.

### `app.whenReady()`

Повертає `Promise<void>` - заповнюється, коли Electron ініціалізовано. Може бути використана як зручна альтернатива для перевірки `app.isReady()` і підписки на подію `ready`, якщо застосунок ще не готовий.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Ховає всі вікна застосунку без згортання їх.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Встановлює чи створює папку ваших логів, якою в подальшому можна маніпулювати за допомогою `app.getPath()` чи `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Повертає `String` - Поточна директорія застосунку.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Ви можете запитувати наступні шляхи по name:

* `home` Домашня директорія користувача.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` на Windows
  * `$XDG_CONFIG_HOME` чи `~/.config` на Linux
  * `~/Library/Application Support` на macOS
* `userData` Директорія для збереження конфігураційних фалів вашого застосунку, яка за замовчуванням є директорією `appData` та назвою вашого застосунку.
* `temp` Тимчасова директорія.
* `exe` Поточний виконуваний файл.
* `module` Бібліотека `libchromiumcontent`.
* `desktop` Директорія робочого столу поточного користувача.
* `documents` Директорія "My Documents" користувача.
* `downloads` Директорія для завантажень користувача.
* `music` Дректорія для музики користувача.
* `pictures` Директорія для зображень користувача.
* `videos` Директорія для відео користувача.
* `logs` Директорія для логів вашого застосунку.
* `pepperFlashSystemPlugin` Повний шлях до системної версії плагіну Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Витягує піктограму, що відповідає шляху.

На _Windows_, є 2 види піктограм:

* Піктограми, що відповідають певним розширенням файлів, такими як `.mp3`, `.png`, тощо.
* Піктограми всередині самих файлів, таких як `.exe`, `.dll`, `.ico`.

На _Linux_ та _macOS_, піктограми залежать від застосунку, що відповідає mime типу файлу.

**[Незабаром застаріє](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Повертає `Promise<NativeImage>` - заповнюється піктограмою застосунку, яка є [NativeImage](native-image.md).

Витягує піктограму, що відповідає шляху.

На _Windows_, є 2 види піктограм:

* Піктограми, що відповідають певним розширенням файлів, такими як `.mp3`, `.png`, тощо.
* Піктограми всередині самих файлів, таких як `.exe`, `.dll`, `.ico`.

На _Linux_ та _macOS_, піктограми залежать від застосунку, що відповідає mime типу файлу.

### `app.setPath(name, path)`

* `name` String
* `path` String

Перевизначає `path` до спеціальної директорії чи файлу, що відповідає `name`. Якщо шлях визначає директорію, якої не існує, викинеться `Error`. В такому випадку, директорію потрібно створити за допомогою `fs.mkdirSync` чи аналогічним чином.

Ви можете перевизначати шляхи `name` визначені в `app.getPath`.

За замовчуванням, кукі веб-сторінки та кеші будуть збережені під директорією `userData`. Якщо ви хочете змінити це місце, ви маєте перевизначити шлях `userData` перед тим як модуль `app` викличе подію `ready`.

### `app.getVersion()`

Повертає `String` - Версія запущеного застосунку. Якщо версії не знайдено в файлі `package.json`, повертається версія поточного пакету чи виконуваного файлу.

### `app.getName()`

Повертає `String` - Назва поточного застосунку, що є назвою в файлі `package.json`.

Зазвичай поле `name` `package.json` є короткою назвою в нижньому регістрі, відповідно до специфікації модулів npm. Вам також зазвичай доведеться визначати поле `productName`, яке є назвою вашого додатку у верхньому регістрі і якому буде Electron надавати перевагу перед `name`.

### `app.setName(name)`

* `name` String

Перевизнає поточну назву застосунку.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

Щоб встановити локаль, вам потрібно використати перемикач в командному рядку при старті застосунку, який можна знайти [тут](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Примітка:** При пощиренні пакету застосунку, ви повинні також надати папку `locales`.

**Примітка:** На Windows ви маєте викликати його після виконання подій `ready`.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Примітка:** Коли неможливо визначити код локалі, повертається пуста стрічка.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Додає `path` до списку недавніх документів.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Очищує список останніх документів.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Назва вашого протоколу, без `://`. Якщо ви хочете, щоб ваш застосунок обробляв посилання `electron://`, викличте цей метод з параметром `electron`.
* `path` String (опціонально) _Windows_ - За замовчуванням `process.execPath`
* `args` String[] (опціонально) _Windows_ - За замовчуванням пустий масив

Повертає `Boolean` - Чи виклик закінчився успішно.

Цей метод встановлює поточний виконуваний файл як обробник за замовчуванням для протоколу (він же URI схема). Це дозволяє глибше інтегрувати ваш застосунок в операційну систему. Після реєстрації, всі посилання з `your-protocol://` будуть відкриватися поточним виконуваним файлом. Повне посилання, включаючи протокол, буде передаватися до вашого застосунку як параметр.

На Windows ви можете надати опціональні параметри `path`, шлях до вашого виконуваного файлу, та `args`, масив аргументів для передачі при запуску виконуваного файлу.

**Примітка:** На macOS, ви можете зареєструвати тільки ті протоколи, які додані до вашого `info.plist`, який не може модифікуватися під час роботи застосунку. Однак, ви можете міняти файл за допомогою звичайного текстового редактора чи скрипта під час збирання. Перегляньте [документацію Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) для деталей.

**Примітка:** В Windows Store середовищі (коли запаковано як `appx`) цей API поверне `true` для всіх викликів, але ключ регістру, який він встановлює не буде доступний іншим застосункам.  Для реєстрації вашого Windows Store застосунку як обробника протоколу за замовчуванням, ви маєте [оголосити протокол у вашому маніфесті](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

API всередині використовує реєстр Windows та LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - Назва вашого протоколу, без `://`.
* `path` String (опціонально) _Windows_ - За замовчуванням `process.execPath`
* `args` String[] (опціонально) _Windows_ - За замовчуванням пустий масив

Повертає `Boolean` - Чи виклик закінчився успішно.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Назва вашого протоколу, без `://`.
* `path` String (опціонально) _Windows_ - За замовчуванням `process.execPath`
* `args` String[] (опціонально) _Windows_ - За замовчуванням пустий масив

Повертає `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Примітка:** На macOS, ви можете використовувати цей метод для перевірки чи застосунок зареєструвався як обробник за замовчуванням для протоколу. Це також можна перевірити, переглянувши `~/Library/Preferences/com.apple.LaunchServices.plist` на macOS. Перегляньте [документацію Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) для деталей.

API всередині використовує реєстр Windows та LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Масив об'єктів `Task`

Додай `tasks` до категорії таск [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) JumpList на Windows.

`tasks` це масив об'єктів [`Task`](structures/task.md).

Повертає `Boolean` - Чи виклик закінчився успішно.

**Примітка:** Якщо ви хочете налаштувати Jump List ще сильшіне, використовуйте `app.setJumpList(categories)` натомість.

### `app.getJumpListSettings()` _Windows_

Повертає `Object`:

* `minItems` Integer - Мінімальна кількість елементів, які будуть показані в Jump List (для детальнішої інформації про це значення перегляньте [документацію MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Масив об'єктів `JumpListItem`, які відповідають елементам, які користувач явно видалив з настроюваних категорій в Jump List. Ці елементи не повинні повторно додаватисядо Jump List при **наступному** виклику `app.setJumpList()`, Windows не покаже ніякої налаштовуваної категорії, яка будь-який видалений елемент.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) чи `null` - Масив об'єктів `JumpListCategory`.

Встановлює чи видаляє налаштовуваний Jump List для застосунку, і повертає одну з наступних стрічок:

* `ok` - Все пройшло добре.
* `error` - Сталася одна чи більше помилка, ввімкніть логування, щоб встановити причину.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Була зроблена спроба додати посилання на файл до Jump List для типу файлів, що не обробляються застосунком.
* `customCategoryAccessDeniedError` - Налаштовувані категорії не можуть бути додані до Jump List через приватність користувача чи політику налаштування груп.

Якщо `categories` є `null` попередньо встановлений Jump List (якщо був) буде замінено стандартним Jump List для застосунку (керується Windows).

**Примітка:** Якщо `JumpListCategory` об'єкт не має ні `type` ні `name` властивостей, то його `type` вважаєтсья `tasks`. Якщо встановлена властивість `name` але властивість `type` пропущено, то `type` вважається `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Буль-яка спроба повторно додати видалений елемент до налаштовуваних категорій буде ігноруватися Jump List. Список видалених елементів може бути отриманий за допомогою `app.getJumpListSettings()`.

Ось дуже простий приклад створення налаштовуваного Jump List:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Останні проекти',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // має name тому `type` має бути "custom"
    name: 'Інструменти',
    items: [
      {
        type: 'task',
        title: 'Інструмент A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запускає Інструмент A'
      },
      {
        type: 'task',
        title: 'Інструмент B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запускає інструмент B'
      }
    ]
  },
  { type: 'frequent' },
  { // не має ні name ні type тому `type` має бути "tasks"
    items: [
      {
        type: 'task',
        title: 'Новий Проект',
        program: process.execPath,
        args: '--new-project',
        description: 'Створити новий проект.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Відновити проект',
        program: process.execPath,
        args: '--recover-project',
        description: 'Відновити проект'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Повертає `Boolean`

Повернене значення цього методу вказує на те, чи цей екземпляр вашої програми успішно отримав блокування.  Якщо не вдалося отримати блокування, ви можете припустити, що інший екземпляр вашої програми вже працює з блокуванням і негайно завершується.

Тобто. Цей метод повертає `true` якщо ваш процес є основним екземпляром вашої програми, і ваш додаток має продовжувати завантаження.  Він повертає `false`, якщо ваш процес слід негайно припинити, оскільки він надіслав свої параметри іншому екземпляру, який вже отримав блокування.

На macOS система застосовує єдиний екземпляр автоматично, коли користувач намагається відкрити інший екземпляр вашого застосунку в Finder, і події `open-file` та `open-url` викличуться для цього. Однак коли користувач запускає ваш застосунок з командного рядка система уникне механізму єдиного екземпляру і вам доведеться використовувати цей метод для його забезпечення.

Приклад активації вікна головного екземпляру коли стартує другий:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    //Хтось намагався запустити другий екземпляр, нам слід надати фокус нашому вікну.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Створіть myWindow, завантажте решту додатку тощо...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Повертає `Boolean`

Цей метод повертає чи поточний екземпляр вашого застосунку заблоковано як єдиний.  Ви можете застосувати блокування за допомогою `app.requestSingleInstanceLock()` та зняти за допомогою `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Унікально визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Стан застосунку, збережений для використання іншим пристроєм.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Створює `NSUserActivity` і встановлює її як поточну діяльність. Діяльність має право на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) на інший пристрій.

### `app.getCurrentActivityType()` _macOS_

Повертає `String` - Тип поточної діяльності.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Унікально визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Розриває поточну [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) діяльність користувача.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Унікально визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Стан застосунку, збережений для використання іншим пристроєм.

Оновлює потточну діяльність якщо її тип збігається з `type`, об'єднує записи з `userInfo` в поточний `userInfo` словник.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Змінює [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Шлях до файлу pkcs12.
  * `password` String - Пароль для сертифікату.
* `callback` Function
  * `result` Integer - Результат імпорту.

Імпортує сертифікат у форматі pkcs12 сховище сертифікатів платформи. `callback` викликається з `result` операції імпорту, значення `0` показує успіх, тоді як будь-яке інше позначає невдачу згідно Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Вимикає апаратне прискорення для поточної програми.

Цей метод може викликатися лише до готовності застосунку.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Цей метод може викликатися лише до готовності застосунку.

### `app.getAppMetrics()`

Повертає [`ProcessMetric[]`](structures/process-metric.md): масив об'єктів `ProcessMetric`, який відповідає статистиці використання пам'яті та ресурсів центрального процесора всіма процесами застосунку.

### `app.getGPUFeatureStatus()`

Повертає [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Статус функції графіки з `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Значення можуть бути як `basic` для основної інформації чи `complete` для повної інформації.

Повертає `Promise`

Для `infoType` що дорівнює `complete`: Promise заповнюється `Object`, який містить всю GPU Інформацію у вигляді [об'єкту chromium GPUInfo](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Він включає версію та інформацію про драйвера, які показуються на сторінці `chrome://gpu`.

Для `infoType` що дорівнює `basic`: Promise заповнюється `Object`, який містить менше атрибутів ніж виклик з `complete`. Ось приклад базової відповіді:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
`basic` використовується коли потрібна базова інформація, така як `vendorId` чи `driverId`.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

Повертає `Boolean` - Чи виклик закінчився успішно.

Встановлює бейдж лічильника для поточного застосунку. Встановлення count в `0` приховає бейдж.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Повертає `Integer` - Поточне значення, відображене на бейджі лічильника.

### `app.isUnityRunning()` _Linux_

Повертає `Boolean` - Чи поточне середовище робочого столу є Unity.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

Якщо ви передали параметри `path` та `args` в `app.setLoginItemSettings`, тоді вам потрібно надати такі самі параметри сюди, щоб `openAtLogin` встановились коректно.

Повертає `Object`:

* `openAtLogin` Boolean - `true` якщо застосунок налаштовано на відкиття при вході в систему.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Це показує, що застосунок не має відкривати ніяких вікон під час запуску. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Це показує, що застосунок має відновити ті вікна, які були відкриті минулого разу. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. За замовчуванням `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. За замовчуванням `false`. Користувач може редагувати це значення з Налаштувань Системи, тому `app.getLoginItemSettings().wasOpenedAsHidden` має перевірятися коли застосунок відкрито, щоб знати поточне значення. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Встановлює налаштування застосунку при вході в систему.

Для роботи з `autoUpdater` Electron'у на Windows, який використовує [Squirrel](https://github.com/Squirrel/Squirrel.Windows), ви маєте встановити шлаях до Update.exe, та передати аргументи, що визначають назву вашого застосунку. Наприклад:

``` javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Повертає `Boolean` - `true` якщо спеціальні можливості Chrome увімкнені, `false` в іншому випадку. Це API поверне `true` якщо було виялено використання спеціальних можливостей, наприклад, читач екрану. Дивись https://www.chromium.org/developers/design-documents/accessibility для детвльної інформації.

**[Незабаром застаріє](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Вмикає чи вимикає рендеринг [дерева спеціальних можливостей](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Вручну вмикає підтримку спеціальних можливостей Chrome, дозволяє відобразити перемикач спеціальних можливостей користувачу в налаштуваннях застосунку. Дивись [Спеціальні можливості Chromium](https://www.chromium.org/developers/design-documents/accessibility) для деталей. Стандартно вимкнено.

Цей API має викликатися після виклику події `ready`.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Незабаром застаріє](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (опціонально) - Назва застосунку.
  * `applicationVersion` String (опціонально) - Версія застосунку.
  * `copyright` String (опціонально) - Інформація про авторські права.
  * `version` String (опціонально) - Версія збірки застосунку. _macOS_
  * `credits` String (опціонально) - Інформація про оплату. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Встановлює інформацію про застосунок. This will override the values defined in the app's `.plist` file on MacOS. Дивіться [документацію Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) для деталей. На Linux, значення мають бути встановлені, щоб їх показувати; значення за замовчуванням відсутні.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Повертає `Boolean` - чи поточна версія ОС підтримує нативні селектори емоджі.

### `app.showEmojiPanel` _macOS_ _Windows_

Показує нативні селектори емоджі платформи.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - Декодована в форматі base64 захищеній bookmark data що повернена методами `dialog.showOpenDialog` або `dialog.showSaveDialog`.

Повертає `Function` ця функція **обов'язково** має бути викликана як тільки ви закінчили роботу із захищеним файлом. Якщо ви забули закрити доступ до bookmark, [ресурси ядра будуть витрачатися](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) і ваш застосунок цілком втратить можливість доступу поза sandbox, до того часу як він не буде перезавантажений.

```js
//Отримати доступ до файлу.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. За допомогою цієї функції застосунки Electron, що зроблені для Mac App Store, можуть отримувати доступ поза їх пісочницею для доступу до файлів обраних користувачем. Дивіться [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) для опису того як ця система працює.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - Перемикач командного рядка, без переходу `--`
* `value` String (опціонально) - Значення для перемикача

Додає перемикач (з опціональним `value`) до командного рядка Chromium.

**Примітка:** Це не впливає на `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(value)`

* `value` String - Аргумент для додання до командного рядку

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

Якщо ви додаєте аргумент у вигляді `--switch=value`, розгляньте натомість використання `appendSwitch('switch', 'value')`.

**Примітка:** Це не впливає на `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - Перемикач командного рядка

Повертає `Boolean` - Показує чи присутній перемикач командного рядка.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Перемикач командного рядка

Повертає `String` - значення перемикача командного рядка.

**Примітка:** Якщо перемикач не присутній або не має значення, він поверне пусту стрічку.

### `app.enableSandbox()` _Експериментальний_

Вмикає повний режим пісочниці для app.

Цей метод може викликатися лише до готовності застосунку.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Примітка:** Цей метод викидає помилку, якщо щось окрім користувача спричиняє невдачу переміщення. Якщо користувач скасовує переміщення, метод поверне false. Якщо нам не вдалося копіювання, тоді метод викине помилку. Повідомлення в помилці має бути інформативним і точно пояснити, що пішло не так

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Повертає `Integer` ID представлення запиту.

Коли передано `critical`, піктограма в панелі завдань буде стрибати поки застосунок не стане активним чи поки запит не скасується.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

Скасувати стрибання `id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Примусити стрибати піктограму Downloads якщо filePath всередині директорії Downloads.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Встановлює для показу в зоні бейжда піктограми на панелі завдань.

### `app.dock.getBadge()` _macOS_

Повертає `String` - Стрічка з бейджа піктограми на панелі завдань.

### `app.dock.hide()` _macOS_

Ховає піктограму з панелі задач.

### `app.dock.show()` _macOS_

Повертає `Promise<void>` - Виконується коли показується піктограма на панелі задач.

### `app.dock.isVisible()` _macOS_

Повертає `Boolean` - Чи видима піктограма на панелі задач.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Встановлює [dock меню](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) застосунку.

### `app.dock.getMenu()` _macOS_

Повертає `Menu | null` - [Меню панелі задач](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) застосунку.

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Встановлює `image`, що відповідає панелі задач.

## Властивості (Properties)

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Властивість типу `Boolean`, яка є `true` якщо увімкнено спеціальні можливості Chrome, `false` в іншому випадку. Ця властивість буде `true` якщо виявлено використання спеціальних можливостей, наприклад, читач екрану. Встановлення цієї властивості в `true` вручну увімкне спеціальні можливості Chrome, дозволяючи розробникам показати перемикачі спеціальних можливостей в налаштуваннях застосунку.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Стандартно вимкнено.

Цей API має викликатися після виклику події `ready`.

**Примітка:** Рендеринг дерева спеціальних можливостей може суттєво вплинути на швидкодію застосунку. Варто його вимикати за замовчуванням.

### `app.userAgentFallback`

`String`, яка містить агент користувача, який Electron буде використовувати за замовчуванням.

Цей агент користувача буде використовуватися, якщо інший не встановлено на рівні `webContents` чи `session`.  Корисно для впевнення, що весь ваш застосунок має однаковий агент користувача.  Встановіть в користувацьке значення як тільки можливо у ініціалізації вашого застосунку, щоб впевнитись що ваше перевизначене значення використовується.

### `app.isPackaged`

`Boolean` властивість повертає  `true` якщо застосунок запаковано, та `false` в іншому випадку. Для багатьох застосунків ця властивість може бути використана щоб відрізняти середовище розробки від виробничого.

### `app.allowRendererProcessReuse`

`Boolean` значення, яке при встановленні в `true` унеможливлює перевизначення, які має Electron, щоб впевнитися що рендер процес перезапускається при кожному переході.  Поточним значенням за замовчуванням є `false`.

Призначення цих перевизначень бути вимкненими за замовчуванням і в подальшому ця властивість буде усунута.  Ця властивість визначає, які нативні модулі ви можете використовувати в рендер процесі.  Для детальнішої інформації куди рухається Electron з перезавантаженням рендер процесу та використанням нативних модулів у рендер процесі, буль ласка, перегляньте це [відстежуване питання](https://github.com/electron/electron/issues/18397).
