# app

> Контролира жизнения цикъл със събития на вашето приложение.

Процеса: [Main](../glossary.md#main-process)

Следния пример показва как да излезем от приложението, когато последния прозорец се затвори:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
   app.quit()
})
```

## Събития

Обектът `app` излъчва следните събития:

### Събитие: 'will-finish-launching'

Излъчено, когато приложението е завършило основното си стартиране. На Windows и Linux, събитието `will-finish-launching` е същото като събитието `ready`; на macOS това събитие представлява нотификацията `applicationWillFinishLaunching` на `NSApplication`. Обикновено вие ще слушате тук за събитията `open-file` и `open-url`, както и ще стартирате доклада за проблеми и автоматичното обновяване.

In most cases, you should do everything in the `ready` event handler.

### Събитие: 'ready'

Връща:

* `launchInfo` Object *macOS*

Това събитие бива излъчено, когато Електрон е завършил своята инициализация. На macOS `launchInfo` притежава `userInfo` на `NSUserNotification`, която е било използвано за отваряне на приложението, ако приложението е било стартирано от центъра за уведомяване (Notification Center). Можете да използвате `app.isReady()`, за да проверите дали това събитие вече е било излъчено.

### Събитие: 'window-all-closed'

Излъчено, когато всички прозорци на приложението са се затворили.

Ако не сте абонирани за това събитие и всички прозорци са затворени, поведението по подразбиране е да се изключи приложението; въпреки че, ако сте се абонирани, можете да контролирате дали приложението се изключва или не. Ако потребителят натисне `Cmd + Q`, или разработчика изпълни `app.quit()`, Електрон първо ще се опита да затворите всички прозорци и след това ще излъчви събитието `will-quit`, като в този случай събитието `window-all-closed` няма да се излъчи.

### Събитие: 'before-quit'

Връща:

* `event` Събитие

Излъчва се преди приложението да започне да затваря всички те си прозорци. Изпълнявайки `event.preventDefault()` ще предотврати поведението по подразбиране, което е терминиране на приложението.

**Забележка:** Ако изключването на приложението е било започнато от `autoUpdater.quitAndInstall()` тогава `before-quit` е излъчено *след* излъчването на събитието `close` на всички прозорци и ги затварят.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'will-quit'

Връща:

* `event` Събитие

Излъчено, когато всички прозорци са вече затворени и приложението ще се изключи. Изпълнявайки `event.preventDefault()` ще предотврати поведението по подразбиране, което е терминиране на приложението.

Вижте описанието на събитие `window-all-closed` за разликите между събитията `will-quit` и `window-all-closed`.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'quit'

Връща:

* `event` Събитие
* `exitCode` Integer

Излъчено, когато приложението бива изключено.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'open-file' *macOS*

Връща:

* `event` Събитие
* `path` String

Излъчено, когато потребителят иска да отвори файл с приложението. Събитието `open-file` обикновено се излъчва, когато приложението е вече отворено и операционната система иска повторно отваряне на приложението за да отвари файла. `open-file` също се излъчва, когато даден файл е изпуснат върху док и приложение все още не е отворено. Не забравяйте да слушате за събитието `open-file` много рано в стартирането на приложението, за да се справите с този случай (дори преди събитието `ready` да е излъчено).

Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

На Windows трябва да се анализира `process.argv` (в главния процес), за да получите filepath.

### Събитие: 'open-url' *macOS*

Връща:

* `event` Събитие
* `url` String

Излъчено, когато потребителя желае да отвори URL с приложението. Файлът `Info.plist` на вашето приложение трябва да дефинира URL схемата в ключа `CFBundleURLTypes` и да постави `NSPrincipalClass` в `AtomApplication`.

Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

### Събитие: 'activate' *macOS*

Връща:

* `event` Събитие
* `hasVisibleWindows` Boolean

Излъчено, когато приложението бива активирано. Различни действия могат да предизвикат това събитие, като стартиране на приложението за първи път, опит за стартиране на приложението, когато то е вече стартирано, или натискане върху докът на приложението или иконата в линията на задачите (taskbar).

### Събитие: 'continue-activity' *macOS*

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Съдържа запис на специфичното състояние на приложението като активност на друго устройство.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когато активност на друго устройство иска да се извърши отново. Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

Активност на потребителя може да продължи само в приложение, което има същия Team ID - записан като произход на активността на приложението, което също поддържа типа на активността. Поддържани типове на активност са специализирани в `Info.plist` на приложението, под ключа `NSUserActivityTypes`.

### Събитие: 'will-continue-activity' *macOS*

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), преди активността на друго устройство иска да се извърши отново. Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

### Събитие: 'continue-activity-error' *macOS*

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Локализиран надпис с установената грешка.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когато активност на друго устройство не може да се извърши отново.

### Събитие: 'activity-was-continued' *macOS*

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Съдържа запис на специфичното състояние на приложението като активност.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), след активността на това устройство е извършена отново успешно от друго устройство.

### Събитие: 'update-activity-state' *macOS*

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Съдържа запис на специфичното състояние на приложението като активност.

Излъчено, когато [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) тъкмо ще бъде подновено на друго устройство. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. В противен случай операцията ще се провали и `continue-activity-error` ще бъде излъчено.

### Събитие: 'new-window-for-tab' *macOS*

Връща:

* `event` Събитие

Излъчено, когато потребителя натисне върху роден бутон за нов таб на macOS. Бутонът за нов таб е видим ако сегашния `BrowserWindow` има `tabbingIdentifier`

### Събитие: 'browser-window-blur'

Връща:

* `event` Събитие
* `window` [BrowserWindow](browser-window.md)

Излъчено, когато [browserWindow](browser-window.md) стане замъглен - вече не е на фокус.

### Събитие: 'browser-window-focus'

Връща:

* `event` Събитие
* `window` [BrowserWindow](browser-window.md)

Излъчено, когато [browserWindow](browser-window.md) стане на фокус.

### Събитие: 'browser-window-created'

Връща:

* `event` Събитие
* `window` [BrowserWindow](browser-window.md)

Излъчено, когато е създаден нов [browserWindow](browser-window.md).

### Събитие: 'web-contents-created'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)

Излъчено, когато е създаден нов [webContents](web-contents.md).

### Събитие: 'certificate-error'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Кодът на грешката
* `certificate` [Certificate](structures/certificate.md)
* `callback` Функция 
  * `isTrusted` Boolean - Показва дали може да се вярва на сертификата

Излъчено, когато има проблем с потвърждението на `certificate` за конкретния `url`, за да вярвате на сертификата трябва да прекъснете държанието по подразбиране с `event.preventDefault()` и извикване на `callback(true)`.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
   if (url === 'https://github.com') {
     // Логика за потвърждение.
    event.preventDefault()
     callback(true)
   } else {
     callback(false)
   }
})
```

### Събитие: 'select-client-certificate'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Функция 
  * `certificate` [Certificate](structures/certificate.md) (по избор)

Излъчено, когато е поискан клиентски сертификат.

`url` съответства на използваната навигация, която изисква клиентския сертификат, а `callback` може да бъде извикан със стойност, филтрирана от списъка. Използването на `event.preventDefault()` предотвратява използването на първия запазен сертификат от приложението.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
   event.preventDefault()
   callback(list[0])
})
```

### Събитие: 'login'

Връща:

* `event` Събитие
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
* `обратно повикване` Function 
  * `username` String
  * `password` String

Излъчено, когато `webContents` иска да направи базово удостоверяване.

Поведението по подразбиране е да отмените всички удостоверявания, за да промените това трябва да предотвратите поведението по подразбиране с `event.preventDefault()` и извикване на `callback(username, password)` с идентификационните данни.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
   event.preventDefault()
   callback('username', 'secret')
})
```

### Събитие: 'gpu-process-crashed'

Връща:

* `event` Събитие
* `killed` Boolean

Излъчено, когато GPU процес е спрян или убит.

### Събитие: 'accessibility-support-changed' *macOS* *Windows*

Връща:

* `event` Събитие
* `accessibilitySupportEnabled` Boolean - Когато допълнителната поддръжка на Chrome е включена, стойността на тази променлива е `true`, в противен случай е `false`.

Излъчено, при промяна на допълнителната поддръжка на Chrome. Това събитие е излъчено, когато помощни технологии, като екранни четци, са разрешени или забранени. Вижте https://www.chromium.org/developers/design-documents/accessibility за повече подробности.

### Event: 'session-created'

Връща:

* `event` Събитие
* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const {app} = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Връща:

* `event` Събитие
* `argv` String [] - Масив от аргументи на командния ред на втората инстанция
* `workingDirectory` String - Работната директория на втората инстанция

This event will be emitted inside the primary instance of your application when a second instance has been executed. `argv` е масив от аргументи на командния ред на втората инстанция, а `workingDirectory` е неговата текущата работна директория. Обикновено приложенията отговарят на това чрез фокусирането на своя първичен прозорец, който не е минимизиран.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

## Методи

Обектът `app` има следните методи:

**Забележка:** Някои методи са достъпни само в конкретни операционни системи и са етикетирани като такива.

### `app.quit()`

Опитва да затвори всички прозорци. Събитието `before-quit` ще бъде излъчено първо. Ако успешно са затворени всички прозорци, събитието `will-quit` ще се излъчи и по подразбиране ще прекрати приложението.

Този метод гарантира, че всички събития `beforeunload` и `unload` са правилно изпълнени. Възможно е прозорец да откаже да се затвори, като върне `false` в манипулатора на събитието `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (по избор)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Всички прозорци ще бъдат затворени веднага без да бъде питан потребителя, като събитията `before-quit` и `will-quit` няма да бъдат излъчени.

### `app.relaunch([options])`

* `опции` Object (по избор) 
  * `args` String[] (optional)
  * `execPath` String (по избор)

Рестартира приложението, когато сегашната му инстанция се затвори.

По подразбиране, новата инстанция на приложението ще използва същата работна папка и командни аргументи също като сегашната инстанция. Когато `args` е специфицирано, `args` ще бъдат изпратени като нови командни аргументи. Когато `execPath` е зададен, `execPath` ще бъде изпълнен за подновяването на текущото приложение.

Забележете, че когато се изпълнява, този метод не изключва приложението, трябва да изпълните `app.quit` или `app.exit` след извикването на `app.relaunch`, за да направите рестартиране на приложението.

Когато `app.relaunch` е изпълнено няколко пъти, множество инстанции ще се стартират след изключване на текущата инстанция.

Пример за рестартиране текущата инстанция веднага и добавяне на нов команден аргумент за новата инстанция:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Връща `Boolean` - `true` ако Електрон завърши инициализирането, `false` в противен случай.

### `app.whenReady()`

Returns `Promise` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

На Linux се фокусира върху първия видим прозорец. На macOS прави приложението активно приложение. На Windows се фокусира върху първия прозорец на приложението.

### `app.hide()` *macOS*

Скрива всички прозорци на приложението без да ги минимизира.

### `app.show()` *macOS*

Показва прозорците на приложението, след като те са били скрити. Не се фокусира върху тях автоматично.

### `app.getAppPath()`

Връща `String` - Текущата папка на приложението.

### `app.getPath(name)`

* `name` String - Име

Връща `String` - Път към специална папка или файл, асоцииран с `name`. При грешка бива хвърлен `Error`.

Може да заявите следните пътища по име:

* `home` Потребителската начална/home папка.
* `appData` Папката на приложението за всеки потребител, която по подразбиране сочи към: 
  * `%APPDATA%` на Windows
  * `$XDG_CONFIG_HOME` или `~/.config` на Linux
  * `~/Library/Application Support` на macOS
* `userData` Папката, която пази конфигурационните файлове на вашето приложение, която по подразбиране е папката `appData`, допълнена с името на вашето приложение.
* `temp` Временна папка.
* `exe` Текущата изпълнима папка.
* `module` Библиотеката `libchromiumcontent`.
* `desktop` Текущата настолна папка на потребителя.
* `documents` Папката на потребителя за "My Documents".
* `downloads` Папка за свалянията на потребителя.
* `music` Папка за музиката на потребителя.
* `pictures` Папка за снимките на потребителя.
* `videos` Папка за видеота на потребителя.
* `logs` Папка за логовете на вашето приложение.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `опции` Object (по избор) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не се поддържа на *macOS*.
* `callback` Функция 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Хваща асоциираната икона за съответния път.

На *Windows*, има 2 типа икони:

* Икони асоциирани с конкретни разширения на файлове, като `.mp3`, `.png`, др.
* Икони в самия файл, като `.exe`, `.dll`, `.ico`.

На *Linux* и *macOS*, иконите зависят от асоциацията им с конкретния mime тип на файла.

### `app.setPath(name, path)`

* `name` String - Име
* `path` String

Презаписва стойността на `path` към специална папка или файл свързан с `name`. Ако пътят определя директория, която не съществува, директорията ще бъде създаден от този метод. При неуспех `Error` е хвърлена.

Можете само да презапишете пътищата на `name`, дефинирани в `app.getPath`.

По подразбиране бисквитките и кеша на уеб страниците ще бъдат съхранени в `userData` директорията. Ако искате да промените това местоположение, трябва да презапишете пътя `userData` преди събитието `ready` на `app` модула да се излъчи.

### `app.getVersion()`

Връща `String` - Версията на зареденото приложение. Ако няма намерена версия в `package.json` файла на приложението, връща се версията на текущия пакет или изпълнител.

### `app.getName()`

Връща `String` - Името на текущото приложение, което е името във файла `package.json` на приложението.

Обикновено полето `name` на `package.json` е кратко наименование с малки букви според npm спецификацията за модулите. Обикновено трябва също така да укажете полето `productName`, което е пълното име на вашето приложение, само в главни букви. То ще бъде предпочетено пред `name` от Електрон.

### `app.setName(name)`

* `name` String - Име

Замества името на текущото приложение.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Забележка:** Когато се разпространявате пакетираното приложение, трябва също така да изпратите и `locales` папката.

**Забележка:** На Windows трябва да го извикате след като събитието `ready` бива излъчено.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавя `path` към списъка на последните документи.

Този списък се управлява от операционната система. В Windows можете да посетите списъка от лентата на задачите, а на macOS можете да го посетите от док менюто.

### `app.clearRecentDocuments()` *macOS* *Windows*

Изчиства списъка на последните документи.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Името на протокола, без `://`. Ако искате вашето приложение да се справят `electron://` връзките, извикайте този метод с `electron` като параметър.
* `path` String (по избор) *Windows* - По подразбиране е `process.execPath`
* `args` String [] (по избор) *Windows* - По подразбиране е празен масив

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Този метод определя текущия изпълнимия файл като манипулатор по подразбиране за протокола (известно още като URI схема). Позволява ви да интегрирате вашето приложение по-дълбоко в операционната система. Веднъж регистрирана, всички връзки с `вашият-протокол://` ще бъдат отворени със сегашния изпълним файл. Цялата връзка, включително и протокола, ще бъде изпратена към вашето приложение, като параметър.

На Windows, можете да добавите допълнителни параметри по избор, пътят към вашия изпълним файл и args - масив от аргументи, които да бъдат използвани от вашето приложение при стартирането му.

**Забележка:** На macOS можете да регистрирате само протоколи, които са били добавени към `info.plist` на вашето приложение. Тези стойности не могат да бъдат променени по време на изпълнение на приложението. Можете обаче да промените файла с обикновен текстов редактор или скрипт по време на изграждане на рпиложението. Моля обърнете се към [документацията на Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) за подробности.

API използва системния регистър на Windows и LSSetDefaultHandlerForURLScheme вътрешно.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - Името на протокола, без `://`.
* `path` String (по избор) *Windows* - По подразбиране е `process.execPath`
* `args` String [] (по избор) *Windows* - По подразбиране е празен масив

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Този метод проверява дали текущия изпълнимия файл като манипулатор по подразбиране за протокола (известен също нато URI схема). Ако е така, той ще премахне приложението като манипулатор по подразбиране.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Името на протокола, без `://`.
* `path` String (по избор) *Windows* - По подразбиране е `process.execPath`
* `args` String [] (по избор) *Windows* - По подразбиране е празен масив

Връща `Boolean`

Този метод проверява дали текущия изпълнимия файл е манипулатор по подразбиране за протокола (известен също нато URI схема). Ако е така, методът ще върне true, в противен случай false.

**Забележка:** На macOS можете да използвате този метод, за да проверите дали приложението е регистрирана като манипулатор по подразбиране за протоколa. Можете също така да проверите това чрез проверка на `~/Library/Preferences/com.apple.LaunchServices.plist` на macOS машина. Моля обърнете се към [документацията на Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) за подробности.

API използва системния регистър на Windows и LSCopyDefaultHandlerForURLScheme вътрешно.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Масив от `Task` обекти

Добавя `tasks` към категорията [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) на преход/JumpList на Windows.

`tasks` е масив от [`Task`](structures/task.md) обекти.

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

**Забележка:** Ако искате да персонализирате още повече скок списък (Jump List) използвайте `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Връща `Object`:

* `minItems` Integer - Минималният брой на елементите, които ще бъдат показани в списъка за прескачане (Jump List) (за по-подробно описание на тази стойност вижте [MSDN документацията](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [[JumpListItem]](structures/jump-list-item.md) - Масив от `JumpListItem` обекти, които съответстват на елементите, които потребителят изрично е премахнал от категории в списъка за прескачане. Тези елементи не трябва да бъде отново добавя към списъка за прескачане в **следващото** извикване на `app.setJumpList()`, Windows няма да показва никакви потребителски категории, който съдържат някои от отстранените елементи.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory []](structures/jump-list-category.md) или `null` - Масив от `JumpListCategory` обекти.

Задава или премахва потребителски списък за прескачане на приложението, като връща един от следните низове:

* `ok` - Нищо не се е объркало.
* `error` - Възникнаха една или повече грешки, разрешете регистрирането по време на работа, за да разберете вероятната причина.
* `invalidSeparatorError` - Направен е опит за добавяне на разделител към потребителска категория в списъка за прескачане. Разделителите са позволени само в категорията на стандартни `Tasks`.
* `fileTypeRegistrationError` - Направен е опит за да добавите на връзка към файл към списъка за прескачане за файл от тип, който не е регистриран за обработване от приложението.
* `customCategoryAccessDeniedError` - Потребителски категории не могат да бъдат добавени към списъка за прескачане поради личните или груповите настройки за политики.

Ако `categories` е `null` предварително зададени потребителски списък за прескачане (ако има такъв) ще се замени със стандартен списък за прескачане за приложението (управлявано от Windows).

**Забележка:** Ако обекта `JumpListCategory` няма нито `type`, нито `name` свойство, тогава неговия `type` се приема за `tasks`. Ако свойството на `name` е зададено, но `type` е пропуснато, тогава `type` се приема да бъде `custom`.

**Забележка:** Потребителите могат да премахнете елементи от потребителски категории, и Windows няма да позволи на вече премахнат елемент, да бъде добавен обратно в потребителските категория до **след** следващото успешно извикване на `app.setJumpList(categories)`. Всеки опит да повторно добавяне на премахнат елемент към потребителска категория по-рано от това ще доведе до пропускане на цялата потребителска категория от списъка за прескачане. Списъкът на отстранени елементи може да бъде получен с помощта на `app.getJumpListSettings()`.

Ето един много прост пример за създаване на потребителски списък за прескачане:

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // има име, така че `type` ще бъде "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // няма нито име, нито тип, така че `type` ще бъде "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Връща `Boolean`

Този метод прави вашето приложение - приложение в един екземпляр - вместо да позволява множество копия на вашето приложение да вървят едновременно, това ще гарантира, че се изпълнява само един екземпляр на вашето приложение, като други екземпляри ще сигнализират на този екземпляр и след това ще излязат.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

На macOS системата автоматично налага един екземпляр, когато потребителите се опитват да отворят второ копие на приложението ви в Finder събитията `open-file` и `open-url` ще бъдат излъчени. Обаче когато потребителите стартират приложението ви в командния ред, еднократният механизъм на системата ще бъде избегнат, тогава ще трябва да използвате този метод, за да гарантирате единичен екземпляр.

Пример за активиране на прозореца на основния екземпляр, когато втори екземпляр бива стартиран:

```javascript
const {app} = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Връща `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Състояние специфично за приложението, което да бъде използвано от друго приложение.
* `webpageURL` String (по избор) - Уеб страницата, която да се зареди в браузъра, ако не е инсталирано подходящо приложение на устройство за възобновяване. Схемата трябва да бъде `http` или `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Състояние специфично за приложението, което да бъде използвано от друго приложение.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `опции` Object 
  * `certificate` String - Път към файла pkcs12.
  * `password` String - Паролата на сертификата.
* `обратно повикване` Функция 
  * `result` Integer - Резултата на импортирането.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `опции` Object (по избор) 
  * `path` String (по избор) *Windows* - Изпълнимият път, който ще бъде ползван за сравнение. По подразбиране е `process.execPath`.
  * `args` String[] (по избор) *Windows* - Листът с аргументи от командния ред, с който ще се сравнява. По подразбиране е празен масив.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Връща `Object`:

* `openAtLogin` Boolean - `true` ако приложението е настроено да се отвори при вход.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Това показва, че приложението не трябва да отваря никакви прозорци при стартиране. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Това показва, че приложението трябва да възстанови прозорците, които са били отворени при последното затваряне на приложението. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (по избор) - `true` за да отвори приложението след влизане, `false` за да премахне приложението като елемент след влизане. По подразбиране е `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. По подразбиране е `false`. Потребителят може да редактира тази настройка от системните настройки, така че `app.getLoginItemStatus().wasOpenedAsHidden` трябва да се провери, когато приложението се отваря, за да се знае текущата стойност. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (по избор) *Windows* - Изпълнимият път, който ще бъде стартиран при влизане. По подразбиране е `process.execPath`.
  * `args` String[] (по избор) *Windows* - Аргументите от командния ред, които ще бъдат изпратени към изпълнимия файл. По подразбиране е празен масив. Имайте в предвид да поставите пътя в кавички.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Например:

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

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Включено или изключено [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) рендиране

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `опции` Object 
  * `applicationName` String (по избор) - Името на приложението.
  * `applicationVersion` String (по избор) - Версията на приложението.
  * `copyright` String (по избор) - Информация за правата при копиране и разпространение.
  * `credits` String (по избор) - Информация за авторите.
  * `version` String (по избор) - Номерът на изграждане на приложението.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - Превключвате от командния ред
* `value` String (по избор) - Стойност за дадения превключвател

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - Аргументът, който ще бъде добавен в командния ред

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (по избор) - Може да бъде `critical` или `informational`. По подразбиране е `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Hides the dock icon.

### `app.dock.show()` *macOS*

Shows the dock icon.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.

## Свойства

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.