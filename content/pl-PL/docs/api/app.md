# app

> Kontroluj cykl życia swojej aplikacji.

Proces: [Main](../glossary.md#main-process)

Poniższy przykład pokazuje, jak zamknąć aplikację po zamknięciu ostatniego okna:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Zdarzenia

Obiekt `app` emituje następujące zdarzenia:

### Zdarzenie: 'will-finish-launching'

Emitowane, kiedy aplikacja zakończy podstawowe uruchamianie. W systemach Windows oraz Linux, zdarzenie `will-finish-launching` jest takie samo jak zdarzenie `ready`; w systemie macOS reprezentuje powiadomienie `applicationWillFinishLaunching` z `NSApplication`. Zazwyczaj będziesz chciał skonfigurować nasłuchiwanie na zdarzenie `open-file` lub `open-url`, oraz uruchomić crash reporter i auto updater.

W większości przypadków, powinieneś zrobić wszystko w obsłudze zdarzenia `ready`.

### Zdarzenie: 'ready'

Zwraca:

* `launchInfo` unknown *macOS*

Emitowane, gdy elektron zakończył inicjowanie. W systemie Mac OS `launchInfo` posiada `userInfo` z `NSUserNotification`, który został użyty do otwarcia aplikacji, jeśli został uruchomiony z centrum powiadomień. Można wywołać `app.isReady()` Aby sprawdzić, czy to zdarzenie został już wyemitowane.

### Zdarzenie: 'window-all-closed'

Emitowane, gdy wszystkie okna zostały zamknięte.

Jeśli nie nasłuchujesz tego wydarzenia i wszystkie okna są zamknięte, domyślne zachowanie to zamknięcie aplikacji. Jeśli nasłuchujesz, wtedy możesz kontrolować, czy aplikacja zostanie zamknięta lub nie. Jeśli użytkownik nacisnął klawisz `Cmd + Q`, lub deweloper zawołał metodę `app.quit()`, Electron najpierw spróbuje zamknąć wszystkie okna, a następnie wyemitować zdarzenie `will-quit`, i w tym przypadku zdarzenie `window-all-closed` nie zostanie wyemitowane.

### Zdarzenie: 'before-quit'

Zwraca:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Uwaga:** W systemie Windows to zdarzenie nie zostanie wyemitowane, jeśli aplikacja zostanie zamknięta z powodu wyłączenia / ponownego uruchomienia systemu lub wylogowania użytkownika.

### Zdarzenie: 'will-quit'

Zwraca:

* `event` Event

Emitowane gdy wszystkie okna zostają zamknięte oraz gdy aplikacja się zamyka. Odwołanie do `event.preventDefault()` zapobiegnie domyślnemu zachowaniu, które zamyka aplikacje.

Zobacz opisy `window-all-closed` zdarzeń oraz rózice między zdarzeniami `will-quit` i `window-all-closed`.

**Uwaga:** W systemie Windows to zdarzenie nie zostanie wyemitowane, jeśli aplikacja zostanie zamknięta z powodu wyłączenia / ponownego uruchomienia systemu lub wylogowania użytkownika.

### Zdarzenie: 'quit'

Zwraca:

* `event` Event
* `exitCode` Integer

Emitowane kiedy aplikacja jest wyłączana.

**Uwaga:** W systemie Windows to zdarzenie nie zostanie wyemitowane, jeśli aplikacja zostanie zamknięta z powodu wyłączenia / ponownego uruchomienia systemu lub wylogowania użytkownika.

### Zdarzenie 'open-file' *macOS*

Zwraca:

* `event` Event
* `path` String

Emitowany kiedy użytkownik chce otworzyć plik za pomocą aplikacji. `open-file` Zdarzenie jest zazwyczaj emitowane gdy aplikacja jest już otwarta i system operacyjny chce użyć jej ponownie do otwarcia pliku. `open-file` również jest emitowane, gdy plik został przerzucony dock'u, a aplikacja nie jest jeszcze uruchomiona. Upewnij się, że nasłuchujesz zdarzenia `open-file` we wczesnym stadium uruchamiania aplikacji do obsługi tego przypadku (zdarzenie jest emitowane nawet przed zdarzeniem `ready`).

Powinieneś wywołać `event.preventDefault()` jeśli chcesz obsłużyć zdarzenie.

Na systemie Windows trzeba przeanalizować `process.argv` (w procesie głównym), aby uzyskać ścieżkę pliku.

### Zdarzenie 'open-url' *macOS*

Zwraca:

* `event` Event
* `url` String

Emitowany, gdy użytkownik chce otworzyć adres URL za pomocą aplikacji. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

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
* `userInfo` unknown - Contains app-specific state stored by the activity on another device.

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

Emitowane podczas [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), gdy aktywność z innego urządzenia nie zostanie wznowiona.

### Zdarzenie 'activity-was-continued' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Wyemitowane podczas [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) po tym, jak działanie z tego urządzenia zostało pomyślnie wznowione na innym.

### Zdarzenie 'update-activity-state' *macOS*

Zwraca:

* `event` Event
* `type` String - Ciąg identyfikujący działania. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Zdarzenie: 'new-window-for-tab' *macOS*

Zwraca:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Zdarzenie: 'browser-window-blur'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitted when a [browserWindow](browser-window.md) gets blurred.

### Zdarzenie: 'browser-window-focus'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitted when a [browserWindow](browser-window.md) gets focused.

### Zdarzenie: 'browser-window-created'

Zwraca:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitowane, gdy tworzony jest nowy [browserWindow](browser-window.md).

### Zdarzenie: 'web-contents-created'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitowane, gdy tworzony jest nowy [webContents](web-contents.md).

### Zdarzenie: 'certificate-error'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - The error code
* `certificate` [Certificate](structures/certificate.md)
* `callback` Funkcja 
  * `isTrusted` Boolean - Whether to consider the certificate as trusted

Emitowany gdy nie powiedzie się weryfikacja certyfikatu `certificate` dla `url`, aby certyfikat przeszedł weryfikację powinieneś zapobiec domyślnemu zachowaniu aplikacji przy pomocy `event.preventDefault()` i wywołać `callback(true)`.

```javascript
const { app } = require('electron')

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

### Zdarzenie: 'select-client-certificate'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Funkcja 
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emitowane, kiedy certyfikat klienta jest wymagany.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Zdarzenie: 'login'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `authenticationResponseDetails` Object 
  * `url` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `schemat` String
  * `host` String
  * `port` Integer
  * `dziedzina` String
* `callback` Funkcja 
  * `Nazwa użytkownika` String
  * `Hasło` String

Emitowane gdy `webContents` żąda podstawowej autoryzacji.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-info-update'

Emitted whenever there is a GPU info update.

### Zdarzenie: 'gpu-process-crashed'

Zwraca:

* `event` Event
* `killed` Boolean

Emitted when the GPU process crashes or is killed.

### Event: 'renderer-process-crashed'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Zdarzenie: 'accessibility-support-changed' *macOS* *Windows*

Zwraca:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitowany gdy zmieni się obsługa dostępu Chroma. Zdarzenie zostaje wywołane, gdy technologie wspomagające, takie jak czytniki ekranu, są włączone lub wyłączone. Zobacz https://www.chromium.org/developers/design-documents/accessibility, aby uzyskać więcej informacji.

### Zdarzenie: 'session-created'

Zwraca:

* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Zwraca:

* `event` Event
* `argv` String[] - An array of the second instance's command line arguments
* `workingDirectory` String - The second instance's working directory

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Zwraca:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Metody

The `app` object has the following methods:

**Note:** Some methods are only available on specific operating systems and are labeled as such.

### `app.quit()`

Spróbuj zamknąć wszystkie okna aplikacji. Zdarzenie `before-quit` zostanie wyemitowane jako pierwsze. Jeśli wszystkie okna są poprawnie zamknięte, zdarzenie `will-quit` zostanie wywołane i domyślna aplikacja zostanie zakończona.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (opcjonalne)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Obiekt (opcjonalne) 
  * `args` String[] (opcjonalne)
  * `execPath` String (opcjonalne)

Powoduje ponowne uruchomienie aplikacji po wyjściu bieżącej instancji.

By default, the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

Kiedy `app.relaunch` jest wielokrotnie wywoływana, nowe wielokrotne instancje będą uruchamiane po zakończeniu działania bieżącej instancji.

Przykład natychmiastowego ponownego uruchomienia bieżącej instancji oraz dodanie nowych argumentów do wiersza poleceń:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

W systemie Linux koncentruje się na pierwszym widocznym oknie. W systemie macOS czyni aplikację aktywną. W systemie Windows koncentruje się na pierwszym oknie aplikacji.

### `app.hide()` *macOS*

Ukrywa wszystkie okna aplikacji bez minimalizowania ich.

### `app.show()` *macOS*

Pokazuje okna aplikacji po tym jak były ukryte. Nie ustawia ich automatycznie.

### `app.setAppLogsPath([path])`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on *macOS*, and inside the `userData` directory on *Linux* and *Windows*.

### `app.getAppPath()`

Zwraca `String` - Aktualny katalog aplikacji.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name: 
  * `home` Katalog domowy użytkownika.
  * `appData` Katalog danych aplikacji dla użytkownika, który domyślnie wskazuje na: 
    * `%APPDATA%` na Windowsie
    * `$XDG_CONFIG_HOME` lub `~/.config` na Linuxie
    * `~/Library/Application Support` na macOS
  * `userData` Katalog do przechowywania plików konfiguracyjnych aplikacji, domyślnie jest to katalog `appData` dołączony do nazwy aplikacji.
  * `cache`
  * `temp` Katalog tymczasowy.
  * `exe` Bieżący plik wykonywalny.
  * `module` Biblioteka `libchromiumcontent`.
  * `desktop` Katalog pulpitu bieżącego użytkownika.
  * `documents` Katalog dla "Moje dokumenty" użytkownika.
  * `downloads` Katalog "Pobrane" użytkownika.
  * `music` Katalog z muzyką użytkownika.
  * `pictures` Katalog ze zdjęciami użytkownika.
  * `videos` Katalog z filmami użytkownika.
  * `logs` Katalog folderu dziennika aplikacji.
  * `pepperFlashSystemPlugin` Pełna ścieżka do wersji systemu wtyczki Pepper Flash.

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Obiekt (opcjonalne) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, brak wsparcia dla *macOS*.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Pobiera ikonę powiązaną z ścieżką.

W *Windows* są 2 rodzaje ikon:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Zastępuje `path` ze specjalnego katalogu lub pliku związanego z `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

You can only override paths of a `name` defined in `app.getPath`.

Domyślnie, ciasteczka cookies i cache będzie przechowywany w katalogu `userData`. Jeśli chcesz zmienić tą lokalizację, musisz zastąpić `userData` ścieżką do wybranego katalogu zanim `ready` zdarzenie `app` zostanie wywołane.

### `app.getVersion()`

Returns `String` - The version of the loaded application. Jeśli nie znaleziono wersji aplikacji w pliku `package.json`, zwracana jest wersja aktualnego pakietu lub pliku wykonywalnego.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

**[Deprecated](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String

Zastępuje aktualną nazwę aplikacji.

**[Deprecated](modernization/property-updates.md)**

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Czyści ostatnią listę dokumentów.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

Metoda ustawia domyślny plik wykonywalny jako domyślny program obsługujący protokół (również jako URI). Pozwala na głębsze zintegrowanie aplikacji z systemem. Once registered, all links with `your-protocol://` will be opened with the current executable. Cały adres, włączając w to protokół, będzie przekazany do aplikacji jako parametr.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. Plik możesz zmienić za pomocą edytora tekstowego lub skryptu podczas kompilacji. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Zwraca `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the Jump List on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Zwraca `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Wszystko poszło dobrze.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Uwaga:** Jeśli obiekt `JumpListCategory` nie posiada ani zestawu właściwości `type`, ani `name`, wtedy zakłada się że jego `type` jest równy `tasks`. Jeśli właściwość `name` jest ustawiona, ale pominięto `type` to zakłada się że `type` jest ustawiony na `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Każda próba ponownego dodania usuniętego niestandardowego elementu do kategorii, spowoduje, że cała niestandardowa kategoria będzie pominięta na liście szybkiego dostępu. The list of removed items can be obtained using `app.getJumpListSettings()`.

Prosty przykład tworzenia niestandardowej listy szybkiego dostępu:

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

Zwraca `Boolean`

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

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

Zwraca `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.resignCurrentActivity()` *macOS*

Marks the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. Mapuje do [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *Linux*

* `options` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Funkcja 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

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

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

**[Deprecated](modernization/property-updates.md)**

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

**[Deprecated](modernization/property-updates.md)**

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Obiekt (opcjonalne) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Zwraca `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `ustawienia` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
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

**[Deprecated](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated](modernization/property-updates.md)**

### `app.showAboutPanel()` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Object 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `version` String (optional) *macOS* - The app's build version number.
  * `credits` String (optional) *macOS* - Credit information.
  * `authors` String[] (optional) *Linux* - List of app authors.
  * `website` String (optional) *Linux* - The app's website.
  * `iconPath` String (optional) *Linux* - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio.

Set the about panel options. This will override the values defined in the app's `.plist` file on MacOS. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details. On Linux, values must be set in order to be shown; there are no defaults.

### `app.isEmojiPanelSupported()`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel()` *macOS* *Windows*

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *mas*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.enableSandbox()` *Eksperymentalne*

Enables full sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` *macOS*

* `options` Obiekt (opcjonalne) 
  * `conflictHandler` Funkcja<boolean> (optional) - A handler for potential conflict in move failure. 
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong.

By default, if an app of the same name as the one being moved exists in the Applications directory and is *not* running, the existing app will be trashed and the active app moved into its place. If it *is* running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Na przykład:

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

## Właściwości

### `app.accessibilitySupportEnabled` *macOS* *Windows*

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` *Linux* *macOS*

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.commandLine` *Readonly*

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` *macOS* *Readonly*

A [`Dock`](./dock.md) object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` *Readonly*

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation. The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed. This property impacts which native modules you can use in the renderer process. For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).