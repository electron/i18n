# app

> Контролира жизнения цикъл със събития на вашето приложение.

Процеса: [Main](../glossary.md#main-process)

Следния пример показва как да излезем от приложението, когато последния прозорец се затвори:

```javascript
const { app } = require('electron')
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

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

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

Излъчено, когато [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) тъкмо ще бъде подновено на друго устройство. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

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
const { app } = require('electron')

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
const { app } = require('electron')

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

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

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

* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const { app } = require('electron')

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

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Методи

Обектът `app` има следните методи:

**Забележка:** Някои методи са достъпни само в конкретни операционни системи и са етикетирани като такива.

### `app.quit()`

Опитва да затвори всички прозорци. Събитието `before-quit` ще бъде излъчено първо. Ако успешно са затворени всички прозорци, събитието `will-quit` ще се излъчи и по подразбиране ще прекрати приложението.

Този метод гарантира, че всички събития `beforeunload` и `unload` са правилно изпълнени. Възможно е прозорец да откаже да се затвори, като върне `false` в манипулатора на събитието `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (по избор)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `опции` Object (по избор) 
  * `args` String[] (optional)
  * `execPath` String (по избор)

Рестартира приложението, когато сегашната му инстанция се затвори.

By default, the new instance will use the same working directory and command line arguments with current instance. Когато `args` е специфицирано, `args` ще бъдат изпратени като нови командни аргументи. Когато `execPath` е зададен, `execPath` ще бъде изпълнен за подновяването на текущото приложение.

Забележете, че когато се изпълнява, този метод не изключва приложението, трябва да изпълните `app.quit` или `app.exit` след извикването на `app.relaunch`, за да направите рестартиране на приложението.

Когато `app.relaunch` е изпълнено няколко пъти, множество инстанции ще се стартират след изключване на текущата инстанция.

Пример за рестартиране текущата инстанция веднага и добавяне на нов команден аргумент за новата инстанция:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Връща `Boolean` - `true` ако Електрон завърши инициализирането, `false` в противен случай.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

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

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

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
* `обратно повикване` Функция 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Хваща асоциираната икона за съответния път.

На *Windows*, има 2 типа икони:

* Икони асоциирани с конкретни разширения на файлове, като `.mp3`, `.png`, др.
* Икони в самия файл, като `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

**[Deprecated Soon](promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `опции` Object (по избор) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не се поддържа на *macOS*.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Хваща асоциираната икона за съответния път.

На *Windows*, има 2 типа икони:

* Икони асоциирани с конкретни разширения на файлове, като `.mp3`, `.png`, др.
* Икони в самия файл, като `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

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

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавя `path` към списъка на последните документи.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Изчиства списъка на последните документи.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Името на протокола, без `://`. Ако искате вашето приложение да се справят `electron://` връзките, извикайте този метод с `electron` като параметър.
* `path` String (по избор) *Windows* - По подразбиране е `process.execPath`
* `args` String [] (по избор) *Windows* - По подразбиране е празен масив

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Този метод определя текущия изпълнимия файл като манипулатор по подразбиране за протокола (известно още като URI схема). Позволява ви да интегрирате вашето приложение по-дълбоко в операционната система. Веднъж регистрирана, всички връзки с `вашият-протокол://` ще бъдат отворени със сегашния изпълним файл. Цялата връзка, включително и протокола, ще бъде изпратена към вашето приложение, като параметър.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

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
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
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
  { // has no name and no type so `type` is assumed to be "tasks"
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

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Пример за активиране на прозореца на основния екземпляр, когато втори екземпляр бива стартиран:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
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

Създава `NSUserActivity` и го задава като текущата дейност. Дейността е подходяща за [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) към друго устройство след това.

### `app.getCurrentActivityType()` *macOS*

Връща `String` - Видът на текущата изпълняваща се дейност.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Прави не валидна текущата [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) активност на потребителя.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Състояние специфично за приложението, което да бъде използвано от друго приложение.

Текущата дейност се актуализира, ако нейния тип съвпада с `type`, слива записи от `userInfo` в нейния текущ речник `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Променя [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `опции` Object 
  * `certificate` String - Път към файла pkcs12.
  * `password` String - Паролата на сертификата.
* `обратно повикване` Функция 
  * `result` Integer - Резултата на импортирането.

Импортира сертификата в pkcs12 формат в хранилището за сертификати на платформата. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Забранява хардуерно ускорение за текущото приложение.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.disableDomainBlockingFor3DAPIs()`

По подразбиране Chromium забранява 3D API (например WebGL) до рестартиране на база на домейн, ако твърде често GPU процеса прекъсва поради грешка. Тази функция забранява това поведение.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Връща [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Състоянието на функцията графика от `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src.git/+/69.0.3497.106/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:

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

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Записва брояча на текущото приложение. Записване на стойност `0` ще се погрижи за значката.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Връща `Integer` - Текущата стойност, която се показва като брояч в значката.

### `app.isUnityRunning()` *Linux*

Връща `Boolean` - Показва дали текущата среда на работния плот е Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `опции` Object (по избор) 
  * `path` String (по избор) *Windows* - Изпълнимият път, който ще бъде ползван за сравнение. По подразбиране е `process.execPath`.
  * `args` String[] (по избор) *Windows* - Листът с аргументи от командния ред, с който ще се сравнява. По подразбиране е празен масив.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Връща `Object`:

* `openAtLogin` Boolean - `true` ако приложението е настроено да се отвори при вход.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Това показва, че приложението не трябва да отваря никакви прозорци при стартиране. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Това показва, че приложението трябва да възстанови прозорците, които са били отворени при последното затваряне на приложението. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (по избор) - `true` за да отвори приложението след влизане, `false` за да премахне приложението като елемент след влизане. По подразбиране е `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. По подразбиране е `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (по избор) *Windows* - Изпълнимият път, който ще бъде стартиран при влизане. По подразбиране е `process.execPath`.
  * `args` String[] (по избор) *Windows* - Аргументите от командния ред, които ще бъдат изпратени към изпълнимия файл. По подразбиране е празен масив. Имайте в предвид да поставите пътя в кавички.

Вижте настройките на приложението за елементи при влизане.

За да работите с електрон в `autoUpdater` на Windows, който използва [Squirrel](https://github.com/Squirrel/Squirrel.Windows), вие ще трябва да зададете път до Update.exe, и да предадете аргументите, които ще определят името на вашето приложение. Например:

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

Връща `Boolean` - `true` ако разширената достъпност при Chrome е включена, `false` в противен случай. Този API ще върне `true`, ако използването на помощни технологии, като екранни четци, е била открита. Вижте https://www.chromium.org/developers/design-documents/accessibility за повече подробности.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Включено или изключено [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) рендиране

Ръчно позволява на достъпна поддръжка при Chrome, което позволява да се изложи достъпност при превключване на потребители в настройките на приложението. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Изключено по подразбиране.

This API must be called after the `ready` event is emitted.

**Забележка:** Рендирането на accessibility tree може осезаемо да повлияе на работата на вашето приложение. Не трябва да се активира по подразбиране.

### `app.showAboutPanel` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `опции` Object 
  * `applicationName` String (по избор) - Името на приложението.
  * `applicationVersion` String (по избор) - Версията на приложението.
  * `copyright` String (по избор) - Информация за правата при копиране и разпространение.
  * `version` String (optional) - The app's build version number. *macOS*
  * `credits` String (optional) - Credit information. *macOS*
  * `website` String (optional) - The app's website. *Linux*
  * `iconPath` String (optional) - Path to the app's icon. *Linux*

Вижте панелът с опции about. This will override the values defined in the app's `.plist` file on MacOS. Вижте [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) за повече детайли. On Linux, values must be set in order to be shown; there are no defaults.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - Превключвате от командния ред
* `value` String (по избор) - Стойност за дадения превключвател

Добавете превключвател (с `value` по избор) към командния ред на Chromium.

**Забележка:** Това няма да повлияе на `process.argv`, и е основно използвано от разработчици да контролират ниското ниво на държане на Chromium.

### `app.commandLine.appendArgument(value)`

* `value` String - Аргументът, който ще бъде добавен в командния ред

Добави аргумент към командния ред на Chromium. Аргументът ще бъде коректно обграден с кавички.

**Забележка:** Това няма да повлияе на `process.argv`.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - Превключвате от командния ред

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Превключвате от командния ред

Returns `String` - The command-line switch value.

**Note:** When the switch is not present, it returns empty string.

### `app.enableSandbox()` *Experimental* *macOS* *Windows*

Enables full sandbox mode on the app.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Забележка:**Този метод хвърля грешка ако нещо различно от потребителя попречи на местенето. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Съобщението в грешката би трябвало да е информативно и да ви каже точно какво се е случило

### `app.dock.bounce([type])` *macOS*

* `type` String (по избор) - Може да бъде `critical` или `informational`. По подразбиране е `informational`

Когато е изпратено `critical`, иконката на дока ще подскоча докато или приложението не стане активно или заявката не бъде спряна.

Когато е изпратено `informational`, иконката на дока ще подскочи една секунда. Обаче, заявката остава активна докато или приложението не стане активно или заявката не бъде спряна.

Връща `Integer` идентификационен номер, който представлява приложението.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Спира подскачането на `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Подскача Downloads ако е включен filePath в папката за сваляне.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Поставя низ, който да бъде показан в областта на дока.

### `app.dock.getBadge()` *macOS*

Връща `String` - Низът от дока.

### `app.dock.hide()` *macOS*

Скрива иконката на дока.

### `app.dock.show()` *macOS*

Показва иконката на дока.

### `app.dock.isVisible()` *macOS*

Връща `Boolean` - Показва дали иконката на дока е видима. Извикването на `app.dock.show()` е асинхронно, за това този метод може да не върне true веднага след извикване.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Слага `image` асоцииран с тази иконка на дока.

## Свойства

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.