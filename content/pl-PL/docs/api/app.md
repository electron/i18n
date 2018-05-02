# app

> Kontrola cyklu życia zdarzeń aplikacji.

Proces: [Main](../glossary.md#main-process)

Poniższy przykład pokazuje, jak zamknąć aplikację po zamknięciu ostatniego okna:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Zdarzenia

Obiekt `app` emituje następujące zdarzenia:

### Zdarzenie: 'will-finish-launching'

Emitowane, kiedy aplikacja zakończy podstawowe uruchamianie. W systemach Windows oraz Linux, zdarzenie `will-finish-launching` jest takie samo jak zdarzenie `ready`; w macOS reprezentuje powiadomienie `applicationWillFinishLaunching` z `NSApplication`. Zazwyczaj chcesz skonfigurować nasłuchiwanie na zdarzenie `open-file` lub `open-url`, oraz uruchomić crash reporter i auto updater.

W większości przypadków, należy po prostu zrobić wszystko w obsłudze zdarzenia `ready`.

### Zdarzenie: 'ready'

Zwraca:

* `launchInfo` Obiekt *macOS*

Emitowane, gdy elektron zakończył inicjowanie. W systemie Mac OS `launchInfo` posiada `userInfo` z `NSUserNotification`, który został użyty do otwarcia aplikacji, jeśli został uruchomiony z centrum powiadomień. Można wywołać `app.isReady()` Aby sprawdzić, czy to zdarzenie został już wyemitowane.

### Zdarzenie: 'window-all-closed'

Emitowane, gdy wszystkie okna zostały zamknięte.

Jeśli nie nasłuchujesz tego wydarzenia i wszystkie okna są zamknięte, domyślne zachowanie to zamknięcie aplikacji. Jeśli nasłuchujesz, wtedy możesz kontrolować, czy aplikacja zostanie zamknięta lub nie. Jeśli użytkownik nacisnął klawisz `Cmd + Q`, lub deweloper zawołał metodę `app.quit()`, Electron najpierw spróbuje zamknąć wszystkie okna, a następnie wyemitować zdarzenie `will-quit`, i w tym przypadku zdarzenie `window-all-closed` nie zostanie wyemitowane.

### Zdarzenie: 'before-quit'

Zwraca:

* `event` Event

Emitowane przed tym jak aplikacja zacznie zamykać okna. Wywołanie `event.preventDefault()` uniemożliwi zachowanie domyślne, którym jest zakończenie aplikacji.

**Uwaga:** Jeśli zamykanie zostało zainicjowane przez `autoUpdater.quitAndInstall()`, wtedy `before-quit` jest emitowany *po* emitowaniu `close` na wszystkich oknach oraz ich zamknięcia.

### Zdarzenie: 'will-quit'

Zwraca:

* `event` Event

Emitowane gdy wszystkie okna zostają zamknięte oraz gdy aplikacja się zamyka. Odwołanie do `event.preventDefault()` zapobiegnie domyślnemu zachowaniu, które zamyka aplikacje.

Zobacz opisy `window-all-closed` zdarzeń oraz rózice między zdarzeniami `will-quit` i `window-all-closed`.

### Zdarzenie: 'quit'

Zwraca:

* `event` Event
* `exitCode` Integer

Emitowane kiedy aplikacja jest wyłączana.

### Zdarzenie 'open-file' *macOs*

Zwraca:

* `event` Event
* `path` String

Emitowany kiedy użytkownik chce otworzyć plik za pomocą aplikacji. `open-file` Zdarzenie jest zazwyczaj emitowane gdy aplikacja jest już otwarta i system operacyjny chce użyć jej ponownie do otwarcia pliku. `open-file` również jest emitowane, gdy plik został przerzucony do stacji dokującej, a aplikacja nie jest jeszcze uruchomiona. Upewnij się, że nasłuchujesz się zdarzenia `open-file` we wczesnym stadium uruchamiania aplikacji do obsługi tego przypadku (zdarzenie jest emitowane nawet przed zdarzeniem `ready`).

Powinieneś wywołać `event.preventDefault()` jeśli chcesz obsłużyć zdarzenie.

Na systemie Windows trzeba przeanalizować `process.argv` (w procesie głównym), aby uzyskać ścieżkę pliku.

### Zdarzenie 'open-url' *macOs*

Zwraca:

* `event` Event
* `url` String

Emitowany, gdy użytkownik chce otworzyć adres URL za pomocą aplikacji. Plik `Info.plist` Twojej aplikacji musi zdefiniować schemat adresu url w kluczu `CFBundleURLTypes` oraz ustawić `NSPrincipalClass` na `AtomApplication`.

Powinieneś wywołać `event.preventDefault()` jeśli chcesz obsłużyć zdarzenie.

### Zdarzenie 'activate' *macOS*

Zwraca:

* `event` Event
* `hasVisibleWindows` Boolean

Emitowane, gdy aplikacja jest aktywna. Różne akcje mogą wywołać to zdarzenie, takie jak: włączanie aplikacji po raz pierwszy, próba ponownego otwarcia aplikacji kiedy jest już uruchomiona lub klikanie na aplikacje na Docku czy ikonkę na pasku zadań.

### Zdarzenie 'continue-activity' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - zawiera specyficzny stan przechowywany przez działania na innym urządzeniu.

Emitowane podczas [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), gdy działania z innego urządzenia chcą być wznowione. Jeśli chcesz obsługiwać to zdarzenie, należy wywołać `event.preventDefault()`.

Aktywność użytkownika może być kontynuowana tylko w aplikacji, która ma ten sam identyfikator zespołu developerów jako źródło działania aplikacji oraz wspiera typ działania. Wspierane typy działania są określone w `Info.plist` aplikacji pod kluczem `NSUserActivityTypes`.

### Zdarzenie 'will-continue-activity' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitowane podczas [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), przed działaniami z innego urządzenia które chcą być wznowione. Jeśli chcesz obsługiwać to zdarzenie, należy wywołać `event.preventDefault()`.

### Zdarzenie 'continue-activity-error' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Łańcuch znaków z przetłumaczonym opisem błędu.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.

### Event: 'activity-was-continued' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.

### Event: 'update-activity-state' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' *macOS*

Zwraca:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Event: 'browser-window-blur'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitted when a [browserWindow](browser-window.md) gets blurred.

### Event: 'browser-window-focus'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitted when a [browserWindow](browser-window.md) gets focused.

### Event: 'browser-window-created'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitted when a new [browserWindow](browser-window.md) is created.

### Event: 'web-contents-created'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when a new [webContents](web-contents.md) is created.

### Event: 'certificate-error'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - The error code
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Whether to consider the certificate as trusted

Emitowany gdy nie powiedzie się weryfikacja certyfikatu `certificate` dla `url`, aby certyfikat przeszedł weryfikację powinieneś zapobiec domyślnemu zachowaniu aplikacji przy pomocy `event.preventDefault()` i wywołać `callback(true)`.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Event: 'select-client-certificate'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emitowane, kiedy certyfikat klienta jest wymagany.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Wydarzenie: 'login'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `żądanie` Obiekt 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Obiekt 
  * `isProxy` Boolean
  * `schemat` String
  * `host` String
  * `port` Integer
  * `dziedzina` String
* `callback` Function 
  * `Nazwa użytkownika` String
  * `Hasło` String

Emitowane gdy `webContents` żąda podstawowej autoryzacji.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Zwraca:

* `event` Event
* `killed` Boolean

Emitted when the gpu process crashes or is killed.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Zwraca:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitowany gdy zmieni się obsługa dostępu Chroma. Zdarzenie zostaje wywołane, gdy technologie wspomagające, takie jak czytniki ekranu, są włączone lub wyłączone. See https://www.chromium.org/developers/design-documents/accessibility for more details.

## Metody

The `app` object has the following methods:

**Note:** Some methods are only available on specific operating systems and are labeled as such.

### `app.quit()`

Spróbuj zamknąć wszystkie okna aplikacji. The `before-quit` event will be emitted first. Jeśli wszystkie okna są poprawnie zamknięte, zdarzenie `will-quit` zostanie wywołane i domyślna aplikacja zostanie zakończona.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Wszystkie okna zostaną natychmiast zamknięte bez pytania się użytkownika oraz zdarzenia `before-quit` i `will-quit` nie zostaną wywołane.

### `app.relaunch([options])`

* `options` Obiekt (opcjonalne) 
  * `args` String[] (optional)
  * `execPath` String (opcjonalne)

Relaunches the app when current instance exits.

Domyślnie nowa instancja będzie wykorzystywać ten sam katalog oraz wiersz poleceń z argumentami bieżącej instancji. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

Kiedy `app.relaunch` jest wielokrotnie wywoływana, nowe wielokrotne instancje będą uruchamiane po zakończeniu działania bieżącej instancji.

Przykład natychmiastowego ponownego uruchomienia bieżącej instancji oraz dodanie nowych argumentów do wiersza poleceń:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Ukrywa wszystkie okna aplikacji bez minimalizowania ich.

### `app.show()` *macOS*

Pokazuje okna aplikacji po tym jak były ukryte. Nie ustawia ich automatycznie.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

Możesz poprosić o następujące ścieżki dostępu poprzez nazwę:

* `home` User's home directory.
* `appData` Per-user application data directory, which by default points to: 
  * `%APPDATA%` on Windows
  * `$XDG_CONFIG_HOME` lub `~/.config` na Linuxie
  * `~/Library/Application Support` on macOS
* `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
* `temp` Temporary directory.
* `exe` The current executable file.
* `module` The `libchromiumcontent` library.
* `desktop` The current user's Desktop directory.
* `documents` Directory for a user's "My Documents".
* `downloads` Directory for a user's downloads.
* `music` Directory for a user's music.
* `pictures` Directory for a user's pictures.
* `videos` Directory for a user's videos.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Obiekt (opcjonalne) 
  * `rozmiar` Ciąg tekstu 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Zastępuje `path` ze specjalnego katalogu lub pliku związanego z `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

Domyślnie, ciasteczka cookies i cache będzie przechowywany w katalogu `userData`. Jeśli chcesz zmienić tą lokalizację, musisz zastąpić `userData` ścieżką do wybranego katalogu zanim `ready` zdarzenie `app` zostanie wywołane.

### `app.getVersion()`

Returns `String` - The version of the loaded application. Jeśli nie znaleziono wersji aplikacji w pliku `package.json`, zwracana jest wersja aktualnego pakietu lub pliku wykonywalnego.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` String

Zastępuje aktualną nazwę aplikacji.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Czyści ostatnią listę dokumentów.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

Metoda ustawia domyślny plik wykonywalny jako domyślny program obsługujący protokół (również jako URI). Pozwala na głębsze zintegrowanie aplikacji z systemem. Once registered, all links with `your-protocol://` will be opened with the current executable. Cały adres, włączając w to protokół, będzie przekazany do aplikacji jako parametr.

Na systemie operacyjnym Windows możesz podać opcjonalną ścieżkę parametrów, ścieżkę do pliku wykonywalnego, argumentów, tablicy z argumentami do pliku wykonywalnego po uruchomieniu.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. Plik możesz zmienić za pomocą edytora tekstowego lub skryptu podczas kompilacji. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Wszystko poszło dobrze.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Uwaga:** Jeśli obiekt `JumpListCategory` nie posiada ani zestawu właściwości `type` ani `name`, wtedy zakłada się że jego `type` jest `tasks`. Jeśli właściwość `name` jest ustawiona, ale pominięto `type` to zakłada się że `type` jest ustawiony na `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Każda próba ponownego dodania usuniętego niestandardowego elementu do kategorii, spowoduje, że cała niestandardowa kategoria będzie pominięta na liście szybkiego dostępu. The list of removed items can be obtained using `app.getJumpListSettings()`.

Prosty przykład tworzenia niestandardowej listy szybkiego dostępu:

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

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Returns `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

Metoda zwraca `fałsz` jeśli Twój proces jest głównym procesem aplikacji i aplikacja powinna kontynuować ładowanie. Zwraca `prawda` jeśli Twój proces wysłał parametry do innej instancji, i powinieneś go natychmiast zamknąć.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Ktoś próbował uruchomić drugą instancję, powinniśmy ustawić "focus" na naszym oknie.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Stwórz myWindow oraz załaduj resztę aplikacji...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Uniquely identifies the activity. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Obiekt 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

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

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Obiekt (opcjonalne) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `ustawienia` Obiekt 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Na przykład:

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

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Obiekt 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

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

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

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

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

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

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.