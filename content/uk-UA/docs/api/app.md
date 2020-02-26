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

* `launchInfo` unknown *macOS*

Відбувається коли Electron завершує ініціалізацію. На macOS, `launchInfo` тримає `userInfo` `NSUserNotification`, яка використовувалася для відкриття застосунку, якщо він був запущений з Центру Сповіщень. Ви можете викликати `app.isReady()` щоб перевірити чи відбулася дана подія.

### Подія: 'window-all-closed'

Відбувається коли всі вікна зачиняються.

Якщо ви не підписані на цю подію і всі вікна закриваються, поведінкою за замовчуванням є вихід з застосунку; однак, якщо ви підписані, ви можете контролювати чи виходити з застосунку чи ні. Якщо користувач натискає `Cmd + Q`, або розробник викликає `app.quit()`, Electron спочатку намагатиметься закрити всі вікна, а потім виникає подія `will-quit`, і в цьому випадку подія `window-all-closed` не буде виникати.

### Подія: 'before-quit'

Повертає:

* `event` Event

Відбувається перед закриттям вікон. Виклик `event.preventDefault()` запобігає поведінці за замовчуванням: завершенню роботи застосунку.

**Примітка:** Якщо вихід з застосунку був ініційований `autoUpdater.quitAndInstall()`, тоді `before-quit` відбувається *після* події `close` на всіх вікнах і закриває їх.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'will-quit'

Повертає:

* `event` Event

Відбувається коли всі вікна закрилися і застосунок припинить свою роботу. Виклик `event.preventDefault()` запобігає поведінці за замовчуванням: завершенню роботи застосунку.

Дивіться опис події `window-all-closed` для різниці між рлжіями `will-quit` і `window-all-closed`.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'quit'

Повертає:

* `event` Event
* `exitCode` Integer

Відбувається коли застосунок припиняє роботу.

**Примітка:** На Windows, ця подія не буде викликана якщо застосунок закритий через вимкнення/перезавантаження системи чи вилогінювання користувача.

### Подія: 'open-file' *macOS*

Повертає:

* `event` Event
* `path` String

Відбувається коли користувач хоче відкрити файл за допомогою застосунку. Подія `open-file` зазвичай відбувається коли застосунок вже відкритий і ОС хоче повторно повторно використати його для відкриття файлу. `open-file` також відбуваєтсья коли файл закидається на панель, а застосунок ще не запущено. Слухайте подію `open-file` дуже рано при завантаженні застосунку щоб обробляти ці випадки (навіть перед викликом події `ready`).

Слід викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

На Windows, ви маєте витягувати шлях до файлу з `process.argv` (в головному процесі).

### Подія: 'open-url' *macOS*

Повертає:

* `event` Event
* `url` String

Відбувається коли користувач хоче відкрити посилання за допомогою застосунку. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

Слід викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

### Подія: 'activate' *macOS*

Повертає:

* `event` Event
* `hasVisibleWindows` Boolean

Відбувається при активації застосунку. Різні дії можуть викликати цю подію, такі як перший запуск застосунку, спроба перезапустити застосунок коли він працює, чи натискання на панель застосунку чи на піктограму на панель задач.

### Подія: 'continue-activity' *macOS*

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity on another device.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), коли діяльність з іншого пристрою має бути продовжена. Потрібно викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

Діяльність користувача може бути продовжена тільки в застосунку, що має такий самий ідентифікатор групи розробників, як і застосунок-джерело і який підтримує тип діяльності. Підтримувані типу діяльності визначені в `Info.plist` під ключем `NSUserActivityTypes`.

### Подія: 'will-continue-activity' *macOS*

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), перед продовженням діяльності з іншого пристрою. Потрібно викликати `event.preventDefault()`, якщо ви хочете обробляти цю подію.

### Подія: 'continue-activity-error' *macOS*

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Стрічка з локалізованим описом помилки.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), коли діяльність з іншого пристрою не буде продовжена.

### Подія: 'activity-was-continued' *macOS*

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Відбувається під час [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), після того як діяльність з цього пристрою була успішно продовжена на іншому.

### Подія: 'update-activity-state' *macOS*

Повертає:

* `event` Event
* `type` String - Стрічка, що визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Відбувається коли [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) має бути відновлена на іншому пристрої. Якщо вам потрібно оновити статус для передачі, потрібно викликати `event.preventDefault()` негайно, сформувати новий `userInfo` словник та викликати `app.updateCurrentActivity()` в потрібний момент. В іншому випадку операція не виконається і буде викликано `continue-activity-error`.

### Подія: 'new-window-for-tab' *macOS*

Повертає:

* `event` Event

Відбувається коли користувач натискає на нативні macOS кнопки створення нових вкладок. Кнопка створення нової вкладки видима тільки якщо якщо поточне `BrowserWindow` має `tabbingIdentifier`

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
* `authenticationResponseDetails` Object 
  * `url` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String (optional)
  * `password` String (optional)

Відбуваєтся коли `webContents` робить базову автентифікацію.

За замовчуванням скасовує всі автентифікації. Щоб перевизначити це ви маєте скасувати поведінку за замовчуванням за допомогою `event.preventDefault()` і викликати `callback(username, password)` з обліковими даними.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

If `callback` is called without a username or password, the authentication request will be cancelled and the authentication error will be returned to the page.

### Event: 'gpu-info-update'

Emitted whenever there is a GPU info update.

### Подія: 'gpu-process-crashed'

Повертає:

* `event` Event
* `killed` Boolean

Emitted when the GPU process crashes or is killed.

### Подія: 'renderer-process-crashed'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Викликається коли рендер процес `webContents` ламається чи зупиняється примусово.

### Подія: 'accessibility-support-changed' *macOS* *Windows*

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

app.on('session-created', (session) => {
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

Виконується коли викликається `desktopCapturer.getSources()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` примусить повернути пусті джерела.

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

Виконується коли викликається `remote.getCurrentWindow()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню об'єкта. Користувацьке значення може бути повернене встановленням `event.returnValue`.

### Подія: 'remote-get-current-web-contents'

Повертає:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Виконується коли викликається `remote.getCurrentWebContents()` в процесі рендерингу `webContents`. Виклик `event.preventDefault()` запобігає поверненню об'єкта. Користувацьке значення може бути повернене за допомогою встановлення `event.returnValue`.

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

Негайно виходить з `exitCode`. `exitCode` за замовчуванням 0.

Всі вікна будуть закриті негайно без перепитування користувача, всі події `before-quit` та `will-quit` не будуть викликатися.

### `app.relaunch([options])`

* `options` Object (опціонально) 
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

На Linux, фокусується на першому видимому вікні. На macOS, робить застосунок активним. На Windows, фокусується на пешому вікні застосунку.

### `app.hide()` *macOS*

Ховає всі вікна застосунку без згортання їх.

### `app.show()` *macOS*

Показує всі вікна застосунку після того як вони були сховані. Не фокусується на них автоматично.

### `app.setAppLogsPath([path])`

* `path` String (shared) - Користувацький шлях для ваших логів. Мусить бути абсолютним.

Встановлює чи створює папку ваших логів, якою в подальшому можна маніпулювати за допомогою `app.getPath()` чи `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on *macOS*, and inside the `userData` directory on *Linux* and *Windows*.

### `app.getAppPath()`

Повертає `String` - Поточна директорія застосунку.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name: 
  * `home` Домашня директорія користувача.
  * `appData` Директорія даних застосунку, яка за замовчуванням вказує на: 
    * `%APPDATA%` на Windows
    * `$XDG_CONFIG_HOME` чи `~/.config` на Linux
    * `~/Library/Application Support` на macOS
  * `userData` Директорія для збереження конфігураційних фалів вашого застосунку, яка за замовчуванням є директорією `appData` та назвою вашого застосунку.
  * `кеш`
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

Повертає `String` - Шлях до спеціальної директорії чи файлу, що відповідає `name`. При невдачі викидається `Error`.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (опціонально) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не підтримується на *macOS*.

Повертає `Promise<NativeImage>` - заповнюється піктограмою застосунку, яка є [NativeImage](native-image.md).

Витягує піктограму, що відповідає шляху.

На *Windows*, є 2 види піктограм:

* Піктограми, що відповідають певним розширенням файлів, такими як `.mp3`, `.png`, тощо.
* Піктограми всередині самих файлів, таких як `.exe`, `.dll`, `.ico`.

На *Linux* та *macOS*, піктограми залежать від застосунку, що відповідає mime типу файлу.

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

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Вам також зазвичай доведеться визначати поле `productName`, яке є назвою вашого додатку у верхньому регістрі і якому буде Electron надавати перевагу перед `name`.

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String

Перевизнає поточну назву застосунку.

**Note:** This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.getLocale()`

Повертає `String` - Поточна локаль застосунку. Можливі значення задокументовані [тут](locales.md).

Щоб встановити локаль, вам потрібно використати перемикач в командному рядку при старті застосунку, який можна знайти [тут](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Примітка:** При пощиренні пакету застосунку, ви повинні також надати папку `locales`.

**Примітка:** На Windows ви маєте викликати його після виконання подій `ready`.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Примітка:** Коли неможливо визначити код локалі, повертається пуста стрічка.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Додає `path` до списку недавніх документів.

Цей список керується ОС. На Windows ви можете перглянути список з панелі завдань, а на macOS ви можете переглянути його з dock меню.

### `app.clearRecentDocuments()` *macOS* *Windows*

Очищує список останніх документів.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Назва вашого протоколу, без `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - The path to the Electron executable. Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Arguments passed to the executable. Defaults to an empty array

Повертає `Boolean` - Чи виклик закінчився успішно.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge](https://www.electronforge.io/), [Electron Packager](https://github.com/electron/electron-packager), or by editing `info.plist` with a text editor. Перегляньте [документацію Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) для деталей.

**Примітка:** В Windows Store середовищі (коли запаковано як `appx`) цей API поверне `true` для всіх викликів, але ключ регістру, який він встановлює не буде доступний іншим застосункам. Для реєстрації вашого Windows Store застосунку як обробника протоколу за замовчуванням, ви маєте [оголосити протокол у вашому маніфесті](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - Назва вашого протоколу, без `://`.
* `path` String (опціонально) *Windows* - За замовчуванням `process.execPath`
* `args` String[] (опціонально) *Windows* - За замовчуванням пустий масив

Повертає `Boolean` - Чи виклик закінчився успішно.

Цей метод перевіряє чи поточний виконуваний файл є обробником для протоколу (він же URI схема). Якщо так, він видалить застосунок як обробник за замовчуванням.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Назва вашого протоколу, без `://`.
* `path` String (опціонально) *Windows* - За замовчуванням `process.execPath`
* `args` String[] (опціонально) *Windows* - За замовчуванням пустий масив

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Примітка:** На macOS, ви можете використовувати цей метод для перевірки чи застосунок зареєструвався як обробник за замовчуванням для протоколу. Це також можна перевірити, переглянувши `~/Library/Preferences/com.apple.LaunchServices.plist` на macOS. Перегляньте [документацію Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) для деталей.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Масив об'єктів `Task`

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the Jump List on Windows.

`tasks` це масив об'єктів [`Task`](structures/task.md).

Повертає `Boolean` - Чи виклик закінчився успішно.

**Примітка:** Якщо ви хочете налаштувати Jump List ще сильшіне, використовуйте `app.setJumpList(categories)` натомість.

### `app.getJumpListSettings()` *Windows*

Повертає `Object`:

* `minItems` Integer - Мінімальна кількість елементів, які будуть показані в Jump List (для детальнішої інформації про це значення перегляньте [документацію MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Ці елементи не повинні повторно додаватисядо Jump List при **наступному** виклику `app.setJumpList()`, Windows не покаже ніякої налаштовуваної категорії, яка будь-який видалений елемент.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Встановлює чи видаляє налаштовуваний Jump List для застосунку, і повертає одну з наступних стрічок:

* `ok` - Все пройшло добре.
* `error` - Сталася одна чи більше помилка, ввімкніть логування, щоб встановити причину.
* `invalidSeparatorError` - Була зроблена спроба додати розділювач до налаштовуваних категорій в Jump List. Розділювач дозволений тільки в стандартних категорії `Tasks`.
* `fileTypeRegistrationError` - Була зроблена спроба додати посилання на файл до Jump List для типу файлів, що не обробляються застосунком.
* `customCategoryAccessDeniedError` - Налаштовувані категорії не можуть бути додані до Jump List через приватність користувача чи політику налаштування груп.

Якщо `categories` є `null` попередньо встановлений Jump List (якщо був) буде замінено стандартним Jump List для застосунку (керується Windows).

**Примітка:** Якщо `JumpListCategory` об'єкт не має ні `type` ні `name` властивостей, то його `type` вважаєтсья `tasks`. Якщо встановлена властивість `name` але властивість `type` пропущено, то `type` вважається `custom`.

**Примітка:** Користувачі можуть видаляти елементи з налаштовуваних категорій, і Windows не дозволить видаленим елементам додатися назад в категорії **до** наступного успішного виклику `app.setJumpList(categories)`. Буль-яка спроба повторно додати видалений елемент до налаштовуваних категорій буде ігноруватися Jump List. Список видалених елементів може бути отриманий за допомогою `app.getJumpListSettings()`.

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

Повернене значення цього методу вказує на те, чи цей екземпляр вашої програми успішно отримав блокування. Якщо не вдалося отримати блокування, ви можете припустити, що інший екземпляр вашої програми вже працює з блокуванням і негайно завершується.

Тобто. Цей метод повертає `true` якщо ваш процес є основним екземпляром вашої програми, і ваш додаток має продовжувати завантаження. Він повертає `false`, якщо ваш процес слід негайно припинити, оскільки він надіслав свої параметри іншому екземпляру, який вже отримав блокування.

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

Цей метод повертає чи поточний екземпляр вашого застосунку заблоковано як єдиний. Ви можете застосувати блокування за допомогою `app.requestSingleInstanceLock()` та зняти за допомогою `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Знімає всі блокування, які були створені за допомогою `requestSingleInstanceLock`. Це дозволить знову створювати багато еземплярів вашого застосунку.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Унікально визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (опціонально) - Веб-сторінка для завантаження у вашому браузері, якщо не встановлено відповідного застосунку на пристрої. Схема має бути `http` чи `https`.

Створює `NSUserActivity` і встановлює її як поточну діяльність. Діяльність має право на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) на інший пристрій.

### `app.getCurrentActivityType()` *macOS*

Повертає `String` - Тип поточної діяльності.

### `app.invalidateCurrentActivity()` *macOS*

Розриває поточну [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) діяльність користувача.

### `app.resignCurrentActivity()` *macOS*

Marks the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Унікально визначає діяльність. Відповідає [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.

Оновлює потточну діяльність якщо її тип збігається з `type`, об'єднує записи з `userInfo` в поточний `userInfo` словник.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Змінює [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` *Linux*

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

За замовчуванням, Chromium вимикає 3D APIs (наприклад WebGL) до презавантаження на основі домену, якщо GPU процеси ламаються занадто часто. Ця функція вимикає цю поведінку.

Цей метод може викликатися лише до готовності застосунку.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Повертає [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Статус функції графіки з `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

* `infoType` String - Can be `basic` or `complete`.

Returns `Promise<unknown>`

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

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Повертає `Boolean` - Чи виклик закінчився успішно.

Встановлює бейдж лічильника для поточного застосунку. Встановлення count в `0` приховає бейдж.

На macOS показує на піктограмі в панелі задач. На Linux працює тільки для Unity.

**Примітка:** Unity вимагає існування файлу `.desktop` для роботи, для детальнішої інформації прочитайте [Інтеграція в Середовище Робочого Столу](../tutorial/desktop-environment-integration.md#unity-launcher).

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.getBadgeCount()` *Linux* *macOS*

Повертає `Integer` - Поточне значення, відображене на бейджі лічильника.

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.isUnityRunning()` *Linux*

Повертає `Boolean` - Чи поточне середовище робочого столу є Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (опціонально) 
  * `path` String (опціонально) *Windows* - Виконуваний шлях для порівняння. За замовчуванням `process.execPath`.
  * `args` String[] (optional) *Windows* - Аргументи командного рядка для порівняння. За замовчуванням пустий масив.

Якщо ви передали параметри `path` та `args` в `app.setLoginItemSettings`, тоді вам потрібно надати такі самі параметри сюди, щоб `openAtLogin` встановились коректно.

Повертає `Object`:

* `openAtLogin` Boolean - `true` якщо застосунок налаштовано на відкиття при вході в систему.
* `openAsHidden` Boolean *macOS* - `true` якщо застосунок буде відкритий як прихований при логіні. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` якщо застосунок був відкритий автоматично при логіні. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` якщо застосунок було відкрито приховано при вході в систему. Це показує, що застосунок не має відкривати ніяких вікон під час запуску. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` якщо було відкрито при вході в систему, як такий що має відновити стан з минулої сесії. Це показує, що застосунок має відновити ті вікна, які були відкриті минулого разу. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (опціонально) - `true` щоб відкрити застосунок при вході в систему, `false` для видалення його з автозавантаження. За замовчуванням `false`.
  * `openAsHidden` Boolean (опціонально) *macOS* - `true` щоб відкрити застосунок як прихований. За замовчуванням `false`. Користувач може редагувати це значення з Налаштувань Системи, тому `app.getLoginItemSettings().wasOpenedAsHidden` має перевірятися коли застосунок відкрито, щоб знати поточне значення. Це налаштування не доступне на [MAS збірках](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (опціонально) *Windows* - Виконуваний файл для запуску при вході в систему. За замовчуванням `process.execPath`.
  * `args` String[] (опціонально) *Windows* - Аргументи командного рядка, для запуску виконуваного файлу. За замовчуванням пустий масив. Оберніть шляхи в лапки.

Встановлює налаштування застосунку при вході в систему.

Для роботи з `autoUpdater` Electron'у на Windows, який використовує [Squirrel](https://github.com/Squirrel/Squirrel.Windows), ви маєте встановити шлаях до Update.exe, та передати аргументи, що визначають назву вашого застосунку. Наприклад:

```javascript
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

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Повертає `Boolean` - `true` якщо спеціальні можливості Chrome увімкнені, `false` в іншому випадку. Це API поверне `true` якщо було виялено використання спеціальних можливостей, наприклад, читач екрану. Дивись https://www.chromium.org/developers/design-documents/accessibility для детвльної інформації.

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Вмикає чи вимикає рендеринг [дерева спеціальних можливостей](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Вручну вмикає підтримку спеціальних можливостей Chrome, дозволяє відобразити перемикач спеціальних можливостей користувачу в налаштуваннях застосунку. Дивись [Спеціальні можливості Chromium](https://www.chromium.org/developers/design-documents/accessibility) для деталей. Стандартно вимкнено.

Цей API має викликатися після виклику події `ready`.

**Примітка:** Рендеринг дерева спеціальних можливостей може суттєво вплинути на швидкодію застосунку. Варто його вимикати за замовчуванням.

**[Припиняється підтримка](modernization/property-updates.md)**

### `app.showAboutPanel()`

Показує опції панелі застосунку. Ці опції можуть бути перевизначені за допомогою `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object 
  * `applicationName` String (опціонально) - Назва застосунку.
  * `applicationVersion` String (опціонально) - Версія застосунку.
  * `copyright` String (опціонально) - Інформація про авторські права.
  * `version` String (optional) *macOS* - The app's build version number.
  * `credits` String (optional) *macOS* *Windows* - Credit information.
  * `authors` String[] (optional) *Linux* - List of app authors.
  * `website` String (optional) *Linux* - The app's website.
  * `iconPath` String (optional) *Linux* *Windows* - Path to the app's icon. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Встановлює інформацію про застосунок. This will override the values defined in the app's `.plist` file on MacOS. Дивіться [документацію Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) для деталей. На Linux, значення мають бути встановлені, щоб їх показувати; значення за замовчуванням відсутні.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported()`

Повертає `Boolean` - чи поточна версія ОС підтримує нативні селектори емоджі.

### `app.showEmojiPanel()` *macOS* *Windows*

Показує нативні селектори емоджі платформи.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *mas*

* `bookmarkData` String - Декодована в форматі base64 захищеній bookmark data що повернена методами `dialog.showOpenDialog` або `dialog.showSaveDialog`.

Повертає `Function` ця функція **обов'язково** має бути викликана як тільки ви закінчили роботу із захищеним файлом. Якщо ви забули закрити доступ до bookmark, [ресурси ядра будуть витрачатися](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) і ваш застосунок цілком втратить можливість доступу поза sandbox, до того часу як він не буде перезавантажений.

```js
//Отримати доступ до файлу.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. За допомогою цієї функції застосунки Electron, що зроблені для Mac App Store, можуть отримувати доступ поза їх пісочницею для доступу до файлів обраних користувачем. Дивіться [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) для опису того як ця система працює.

### `app.enableSandbox()` *Експериментальний*

Вмикає повний режим пісочниці для app.

Цей метод може викликатися лише до готовності застосунку.

### `app.isInApplicationsFolder()` *macOS*

Повертає `Boolean` - Показує чи застосунок запущено з системної директої Застосунки. Використовуйте в крмбінації з `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` *macOS*

* `options` Object (опціонально) 
  * `conflictHandler` Function<boolean> (optional) - A handler for potential conflict in move failure. 
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Повертає `Boolean` - Показує чи переміщення було успішним. Буль ласка, майте на увазі, що якщо переміщення було успішним, ваш застосунок зупиниться та перезапуститься.

За замовчуванням, діалогу пітвердження не буде показано. Якщо ви хочете дозволити користувачу підтверджувати операцію, потрібно буде використати [`dialog`](dialog.md) API.

**Примітка:** Цей метод викидає помилку, якщо щось окрім користувача спричиняє невдачу переміщення. Якщо користувач скасовує переміщення, метод поверне false. Якщо нам не вдалося копіювання, тоді метод викине помилку. Повідомлення в помилці має бути інформативним і точно пояснити, що пішло не так.

By default, if an app of the same name as the one being moved exists in the Applications directory and is *not* running, the existing app will be trashed and the active app moved into its place. If it *is* running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Наприклад:

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.

## Властивості (Properties)

### `app.accessibilitySupportEnabled` *macOS* *Windows*

Властивість типу `Boolean`, яка є `true` якщо увімкнено спеціальні можливості Chrome, `false` в іншому випадку. Ця властивість буде `true` якщо виявлено використання спеціальних можливостей, наприклад, читач екрану. Встановлення цієї властивості в `true` вручну увімкне спеціальні можливості Chrome, дозволяючи розробникам показати перемикачі спеціальних можливостей в налаштуваннях застосунку.

Дивись [спеціальні можливості Chromium](https://www.chromium.org/developers/design-documents/accessibility) для деталей. Вимкнено за замовчуванням.

Цей API має викликатися після виклику події `ready`.

**Примітка:** Рендеринг дерева спеціальних можливостей може суттєво вплинути на швидкодію застосунку. Варто його вимикати за замовчуванням.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` *Linux* *macOS*

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Примітка:** Unity вимагає існування файлу `.desktop` для роботи, для детальнішої інформації прочитайте [Інтеграція в Середовище Робочого Столу](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.commandLine` *Readonly*

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` *macOS* *Readonly*

A [`Dock`](./dock.md) object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` *Readonly*

`Boolean` властивість повертає `true` якщо застосунок запаковано, та `false` в іншому випадку. Для багатьох застосунків ця властивість може бути використана щоб відрізняти середовище розробки від виробничого.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Вам також зазвичай доведеться визначати поле `productName`, яке є назвою вашого додатку у верхньому регістрі і якому буде Electron надавати перевагу перед `name`.

### `app.userAgentFallback`

`String`, яка містить агент користувача, який Electron буде використовувати за замовчуванням.

Цей агент користувача буде використовуватися, якщо інший не встановлено на рівні `webContents` чи `session`. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

`Boolean` значення, яке при встановленні в `true` унеможливлює перевизначення, які має Electron, щоб впевнитися що рендер процес перезапускається при кожному переході. Поточним значенням за замовчуванням є `false`.

Призначення цих перевизначень бути вимкненими за замовчуванням і в подальшому ця властивість буде усунута. Ця властивість визначає, які нативні модулі ви можете використовувати в рендер процесі. Для детальнішої інформації куди рухається Electron з перезавантаженням рендер процесу та використанням нативних модулів у рендер процесі, буль ласка, перегляньте це [відстежуване питання](https://github.com/electron/electron/issues/18397).