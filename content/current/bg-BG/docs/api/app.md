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

* `launchInfo` unknown _macOS_

Това събитие бива излъчено, когато Електрон е завършил своята инициализация. На macOS `launchInfo` притежава `userInfo` на `NSUserNotification`, която е било използвано за отваряне на приложението, ако приложението е било стартирано от центъра за уведомяване (Notification Center). Можете да използвате `app.isReady()`, за да проверите дали това събитие вече е било излъчено.

### Събитие: 'window-all-closed'

Излъчено, когато всички прозорци на приложението са се затворили.

Ако не сте абонирани за това събитие и всички прозорци са затворени, поведението по подразбиране е да се изключи приложението; въпреки че, ако сте се абонирани, можете да контролирате дали приложението се изключва или не. Ако потребителят натисне `Cmd + Q`, или разработчика изпълни `app.quit()`, Електрон първо ще се опита да затворите всички прозорци и след това ще излъчви събитието `will-quit`, като в този случай събитието `window-all-closed` няма да се излъчи.

### Събитие: 'before-quit'

Връща:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'will-quit'

Връща:

* `event` Събитие

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Вижте описанието на събитие `window-all-closed` за разликите между събитията `will-quit` и `window-all-closed`.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'quit'

Връща:

* `event` Събитие
* `exitCode` Integer

Излъчено, когато приложението бива изключено.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Събитие: 'open-file' _macOS_

Връща:

* `event` Събитие
* `path` String

Излъчено, когато потребителят иска да отвори файл с приложението. Събитието `open-file` обикновено се излъчва, когато приложението е вече отворено и операционната система иска повторно отваряне на приложението за да отвари файла. `open-file` също се излъчва, когато даден файл е изпуснат върху док и приложение все още не е отворено. Не забравяйте да слушате за събитието `open-file` много рано в стартирането на приложението, за да се справите с този случай (дори преди събитието `ready` да е излъчено).

Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

На Windows трябва да се анализира `process.argv` (в главния процес), за да получите filepath.

### Събитие: 'open-url' _macOS_

Връща:

* `event` Събитие
* `url` String

Излъчено, когато потребителя желае да отвори URL с приложението. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

### Събитие: 'activate' _macOS_

Връща:

* `event` Събитие
* `hasVisibleWindows` Boolean

Излъчено, когато приложението бива активирано. Различни действия могат да предизвикат това събитие, като стартиране на приложението за първи път, опит за стартиране на приложението, когато то е вече стартирано, или натискане върху докът на приложението или иконата в линията на задачите (taskbar).

### Събитие: 'continue-activity' _macOS_

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity on another device.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когато активност на друго устройство иска да се извърши отново. Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

Активност на потребителя може да продължи само в приложение, което има същия Team ID - записан като произход на активността на приложението, което също поддържа типа на активността. Поддържани типове на активност са специализирани в `Info.plist` на приложението, под ключа `NSUserActivityTypes`.

### Събитие: 'will-continue-activity' _macOS_

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), преди активността на друго устройство иска да се извърши отново. Трябва да извикате `event.preventDefault()` ако желаете да се справите с това събитие.

### Събитие: 'continue-activity-error' _macOS_

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Локализиран надпис с установената грешка.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когато активност на друго устройство не може да се извърши отново.

### Събитие: 'activity-was-continued' _macOS_

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Излъчено по време на [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), след активността на това устройство е извършена отново успешно от друго устройство.

### Събитие: 'update-activity-state' _macOS_

Връща:

* `event` Събитие
* `type` String - Надпис, идентифициращ активността. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Излъчено, когато [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) тъкмо ще бъде подновено на друго устройство. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Събитие: 'new-window-for-tab' _macOS_

Връща:

* `event` Събитие

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

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
* `callback` Function
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
* `callback` Function
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

Излъчено, когато `webContents` иска да направи базово удостоверяване.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

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

### Събитие: 'gpu-process-crashed'

Връща:

* `event` Събитие
* `killed` Boolean

Emitted when the GPU process crashes or is killed.

### Event: 'renderer-process-crashed'

Връща:

* `event` Събитие
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Събитие: 'accessibility-support-changed' _macOS_ _Windows_

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

app.on('session-created', (session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Връща:

* `event` Събитие
* `argv` String [] - Масив от аргументи на командния ред на втората инстанция
* `workingDirectory` String - Работната директория на втората инстанция

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Обикновено приложенията отговарят на това чрез фокусирането на своя първичен прозорец, който не е минимизиран.

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

* `options` Object (optional)
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

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Скрива всички прозорци на приложението без да ги минимизира.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath([path])`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Връща `String` - Текущата папка на приложението.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name:
  * `home` Потребителската начална/home папка.
  * `appData` Per-user application data directory, which by default points to:
    * `%APPDATA%` на Windows
    * `$XDG_CONFIG_HOME` или `~/.config` на Linux
    * `~/Library/Application Support` на macOS
  * `userData` Папката, която пази конфигурационните файлове на вашето приложение, която по подразбиране е папката `appData`, допълнена с името на вашето приложение.
  * `cache`
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

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Хваща асоциираната икона за съответния път.

На _Windows_, има 2 типа икони:

* Икони асоциирани с конкретни разширения на файлове, като `.mp3`, `.png`, др.
* Икони в самия файл, като `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String - Име
* `path` String

Презаписва стойността на `path` към специална папка или файл свързан с `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

Можете само да презапишете пътищата на `name`, дефинирани в `app.getPath`.

По подразбиране бисквитките и кеша на уеб страниците ще бъдат съхранени в `userData` директорията. Ако искате да промените това местоположение, трябва да презапишете пътя `userData` преди събитието `ready` на `app` модула да се излъчи.

### `app.getVersion()`

Връща `String` - Версията на зареденото приложение. Ако няма намерена версия в `package.json` файла на приложението, връща се версията на текущия пакет или изпълнител.

### `app.getName()`

Връща `String` - Името на текущото приложение, което е името във файла `package.json` на приложението.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Обикновено трябва също така да укажете полето `productName`, което е пълното име на вашето приложение, само в главни букви. То ще бъде предпочетено пред `name` от Електрон.

**[Deprecated](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String - Име

Замества името на текущото приложение.

**Note:** This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

**[Deprecated](modernization/property-updates.md)**

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Забележка:** Когато се разпространявате пакетираното приложение, трябва също така да изпратите и `locales` папката.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Добавя `path` към списъка на последните документи.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Изчиства списъка на последните документи.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Името на протокола, без `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - The path to the Electron executable. Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Arguments passed to the executable. Defaults to an empty array

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge](https://www.electronforge.io/), [Electron Packager](https://github.com/electron/electron-packager), or by editing `info.plist` with a text editor. Моля обърнете се към [документацията на Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) за подробности.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - Името на протокола, без `://`.
* `path` String (по избор) _Windows_ - По подразбиране е `process.execPath`
* `args` String [] (по избор) _Windows_ - По подразбиране е празен масив

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Името на протокола, без `://`.
* `path` String (по избор) _Windows_ - По подразбиране е `process.execPath`
* `args` String [] (по избор) _Windows_ - По подразбиране е празен масив

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Забележка:** На macOS можете да използвате този метод, за да проверите дали приложението е регистрирана като манипулатор по подразбиране за протоколa. Можете също така да проверите това чрез проверка на `~/Library/Preferences/com.apple.LaunchServices.plist` на macOS машина. Моля обърнете се към [документацията на Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) за подробности.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Масив от `Task` обекти

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the Jump List on Windows.

`tasks` е масив от [`Task`](structures/task.md) обекти.

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

**Забележка:** Ако искате да персонализирате още повече скок списък (Jump List) използвайте `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Връща `Object`:

* `minItems` Integer - Минималният брой на елементите, които ще бъдат показани в списъка за прескачане (Jump List) (за по-подробно описание на тази стойност вижте [MSDN документацията](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Тези елементи не трябва да бъде отново добавя към списъка за прескачане в **следващото** извикване на `app.setJumpList()`, Windows няма да показва никакви потребителски категории, който съдържат някои от отстранените елементи.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Задава или премахва потребителски списък за прескачане на приложението, като връща един от следните низове:

* `ok` - Нищо не се е объркало.
* `error` - Възникнаха една или повече грешки, разрешете регистрирането по време на работа, за да разберете вероятната причина.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Направен е опит за да добавите на връзка към файл към списъка за прескачане за файл от тип, който не е регистриран за обработване от приложението.
* `customCategoryAccessDeniedError` - Потребителски категории не могат да бъдат добавени към списъка за прескачане поради личните или груповите настройки за политики.

Ако `categories` е `null` предварително зададени потребителски списък за прескачане (ако има такъв) ще се замени със стандартен списък за прескачане за приложението (управлявано от Windows).

**Забележка:** Ако обекта `JumpListCategory` няма нито `type`, нито `name` свойство, тогава неговия `type` се приема за `tasks`. Ако свойството на `name` е зададено, но `type` е пропуснато, тогава `type` се приема да бъде `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Всеки опит да повторно добавяне на премахнат елемент към потребителска категория по-рано от това ще доведе до пропускане на цялата потребителска категория от списъка за прескачане. Списъкът на отстранени елементи може да бъде получен с помощта на `app.getJumpListSettings()`.

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

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

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

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Създава `NSUserActivity` и го задава като текущата дейност. Дейността е подходяща за [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) към друго устройство след това.

### `app.getCurrentActivityType()` _macOS_

Връща `String` - Видът на текущата изпълняваща се дейност.

### `app.invalidateCurrentActivity()` _macOS_

Прави не валидна текущата [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) активност на потребителя.

### `app.resignCurrentActivity()` _macOS_

Marks the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Идентифицира активността уникално. Бива едно от [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.

Текущата дейност се актуализира, ако нейния тип съвпада с `type`, слива записи от `userInfo` в нейния текущ речник `userInfo`.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Променя [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `certificate` String - Път към файла pkcs12.
  * `password` String - Паролата на сертификата.
* `callback` Function
  * `result` Integer - Резултата на импортирането.

Импортира сертификата в pkcs12 формат в хранилището за сертификати на платформата. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Забранява хардуерно ускорение за текущото приложение.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Връща [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Състоянието на функцията графика от `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

* `infoType` String - Can be `basic` or `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

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

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

Връща `Boolean` - Показва дали извикването на функцията е завършило с успех.

Записва брояча на текущото приложение. Записване на стойност `0` ще се погрижи за значката.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Забележка:** Unity launcher изисква съществуването на файл `.desktop` да работи, за повече информация моля прочетете [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

**[Deprecated](modernization/property-updates.md)**

### `app.getBadgeCount()` _Linux_ _macOS_

Връща `Integer` - Текущата стойност, която се показва като брояч в значката.

**[Deprecated](modernization/property-updates.md)**

### `app.isUnityRunning()` _Linux_

Връща `Boolean` - Показва дали текущата среда на работния плот е Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Връща `Object`:

* `openAtLogin` Boolean - `true` ако приложението е настроено да се отвори при вход.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Това показва, че приложението не трябва да отваря никакви прозорци при стартиране. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Това показва, че приложението трябва да възстанови прозорците, които са били отворени при последното затваряне на приложението. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. По подразбиране е `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Вижте настройките на приложението за елементи при влизане.

За да работите с електрон в `autoUpdater` на Windows, който използва [Squirrel](https://github.com/Squirrel/Squirrel.Windows), вие ще трябва да зададете път до Update.exe, и да предадете аргументите, които ще определят името на вашето приложение. Например:

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

Връща `Boolean` - `true` ако разширената достъпност при Chrome е включена, `false` в противен случай. Този API ще върне `true`, ако използването на помощни технологии, като екранни четци, е била открита. Вижте https://www.chromium.org/developers/design-documents/accessibility за повече подробности.

**[Deprecated](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Включено или изключено [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) рендиране

Ръчно позволява на достъпна поддръжка при Chrome, което позволява да се изложи достъпност при превключване на потребители в настройките на приложението. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Изключено по подразбиране.

This API must be called after the `ready` event is emitted.

**Забележка:** Рендирането на accessibility tree може осезаемо да повлияе на работата на вашето приложение. Не трябва да се активира по подразбиране.

**[Deprecated](modernization/property-updates.md)**

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `applicationName` String (по избор) - Името на приложението.
  * `applicationVersion` String (по избор) - Версията на приложението.
  * `copyright` String (по избор) - Информация за правата при копиране и разпространение.
  * `version` String (optional) _macOS_ - The app's build version number.
  * `credits` String (optional) _macOS_ _Windows_ - Credit information.
  * `authors` String[] (optional) _Linux_ - List of app authors.
  * `website` String (optional) _Linux_ - The app's website.
  * `iconPath` String (optional) _Linux_ _Windows_ - Path to the app's icon. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Вижте панелът с опции about. This will override the values defined in the app's `.plist` file on MacOS. Вижте [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) за повече детайли. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported()`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel()` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Този метод може да бъде извикван само преди приложението да е готово.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (optional)
  * `conflictHandler` Function<Boolean> (optional) - A handler for potential conflict in move failure.
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Забележка:**Този метод хвърля грешка ако нещо различно от потребителя попречи на местенето. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Съобщението в грешката би трябвало да е информативно и да ви каже точно какво се е случило.

By default, if an app of the same name as the one being moved exists in the Applications directory and is _not_ running, the existing app will be trashed and the active app moved into its place. If it _is_ running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior.  i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Например:

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

## Свойства

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Изключено по подразбиране.

This API must be called after the `ready` event is emitted.

**Забележка:** Рендирането на accessibility tree може осезаемо да повлияе на работата на вашето приложение. Не трябва да се активира по подразбиране.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Забележка:** Unity launcher изисква съществуването на файл `.desktop` да работи, за повече информация моля прочетете [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.commandLine` _Readonly_

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` _macOS_ _Readonly_

A [`Dock`](./dock.md) object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` _Readonly_

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Обикновено трябва също така да укажете полето `productName`, което е пълното име на вашето приложение, само в главни букви. То ще бъде предпочетено пред `name` от Електрон.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  It is useful for ensuring that your entire app has the same user agent.  Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
