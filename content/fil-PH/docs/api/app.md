# ang app

> Kontrolin ang event lifecycle ng iyong aplikasyon.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang sumusunod na halimbawa ay nagpapakita kung paano ihinto ang aplikasyon kapag ang huling window ay isinara na:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Pangyayari

Ang bagay ng `app` ay naglalabas ng mga sumusunod na mga event:

### Ang event: 'will-finish-launching'

Ay lalabas kapag ang aplikasyon ay natapos na karaniwang startup. Sa Windows at Linux, ang event ng `will-finish-launching` ay parehas ng event ng `ready`: sa macOS, ang event na ito ay nagrerepresenta ng `applicationWillFinishLaunching` na notipikasyon ng `NSApplication`. Karaniwan mong ise-set up ang mga tagapakinig para sa mga event ng`open-file` at `open-url` dito, at i-start ang crash repoter at auto updater.

In most cases, you should do everything in the `ready` event handler.

### Mga event: 'ready'

Pagbabalik:

* `launchInfo` Mga bagay *MacOS*

Lalabas kapag ang Electron ay tapos ng mag-initialize. Sa macOS, hawak ng `launchinfo` ang `userinfo` ng `NSUserNotification` na ginamit para buksan ang aplikasyon, kung ito ay ini-launch mula sa Notification Center. Maaari mong tawagin ang `app.isReady()` para suriin kung ang event ay nagsimula na.

### Event: 'window-all-closed'

Lalabas kapag ang lahat ng mga window ay sarado na.

Kung ikaw ay hindi nag-subscribe sa event na ito at ang lahat ng mga window ay sarado na, ang default na aksyon nito ay ang pag hinto ng app; gayunpaman, kung ikaw ay naka-subscribe, maaaring magpasya kung ihihinto ang app o hindi. Kung ang user ay pumindot ng `Cmd + Q`, o ang developer ay tumawag ng `app.quit()`, ang Electron ay unang susubukang isara ang lahat ng mga window at pagkatapos ay maglalabas ng event na `will-quit`, at sa kasong ito ang event na `window-all-closed` ay hindi lalabas.

### Ang event: 'before-quit'

Ibinabalik ang:

* `event` na Kaganapan

Ilalabas bago magsimula ang aplikasyon sa pagsasara ng mga window nito. Ang pagtawag ng `event.preventDefault()` ay pipigilan ang default na aksyon, na kung saan ay ang pag-aalis ng aplikasyon.

**Note:** Kung sinimulan ang paghinto sa aplikasyon ng `autoUpdater.quitAndInstall()` tapos ang `before-quit` ay lumabas *after* ilalabas ang event na `close` sa lahat ng mga window at isasarado sila.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'will-quit'

Ibinabalik ang:

* `event` na Pangyayari

Ilalabas kung ang lahat ng mga window ay isinarado at ang aplikasyon ay ihihinto. Ang pagtawag ng `event.preventDefault()` ay pipigilan ang default na aksyon, na kung saan ay ang pag-alis ng aplikasyon.

Tingnan ang deskripsyon ng event ng `window-all-closed` para sa mga pagkakaiba sa pagitan ng mga event ng `will-quit` at `window-all-closed`.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'quit'

Ibinabalik ang:

* `kaganapan` kaganapan
* `exitCode` Integer

Lalabas kung humihinto ang aplikasyon.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'open-file' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `path` na String

Lalabas kung ang gusto ng user na mag-bukas ng isang file gamit ang aplikasyon. Ang event ng `open-file` ay kadalasang lumalabas kung ang aplikasyon ay bukas na at ang OS ay gustong muling gumamit ng aplikasyon para buksan ang file. Ang `open-file` ay ilalabas din kapag ang file ay ilinaglag sa dock at ang aplikasyon ay hindi pa gumagana. Siguraduhin na pinapakinggan ang event ng `open-file` sa maagang startup ng iyong application para mapamahalaan ang sitwasyon na ito (kahit bago pa ang event ng `ready` ay lumabas).

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

Sa Windows, kailangan mong i-parse ang `process.argv` (sa pangunahing proseso) para makuha ang filepath.

### Event: 'open-url' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali

Lalabas kapag ang user ay gustong buksan ang isang URL kasama ang aplikasyon. Ang `info.plist` file ng iyong aplikasyon ay dapat tukuyin ang url scheme sa loob ng key ng `CFBundleURLTypes`, at i-set ang `NSPrincipalClass` sa `AtomApplication`.

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

### Event: 'activate' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `hasVisibleWindows` Boolean

Lalabas kapag ang aplikasyon ay naka-aktibeyt. Iba't-ibang mga aksyon ang maaaring mag-trigger ng event na ito, tulad ng pagla-launch ng aplikasyon para sa unang pagkakataon, sinusubukang muling i-launch ang aplikasyon kahit ito ay tumatakbo na, o pagpindot sa icon ng dock o taskbar ng aplikasyon.

### Event: 'continue-activity' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng espesipikong estado ng app na itinago sa pamamagitan ng aktibidad sa ibang aparato.

Lalabas sa panahon ng [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kapag ang isang aktibidad mula sa ibang aparato ay nais na maipagpatuloy. Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

Ang aktibidad ng isang user ay maaari lamang magpatuloy sa isang app na may kaparehong developer Team ID bilang source app ng aktibidad at kung ito ay sumusuporta sa uri ng aktibidad. Ang sinuportahan na mga uri ng aktibidad ay tinukoy sa `Info.plist` ng app sa ilalim ng key ng `NSUserActivityTypes`.

### Event: 'will-continue-activity' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Napalabas habang [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) bago ang aktibidad galing sa ibang device na gustong mapagpatuloy. Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

### Event: 'continue-activity-error' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Ang string na may error sa localized na deskripsyon.

Napalabas habang [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kung ang aktibidad galing sa ibang device ay nabigo na mapagpatuloy.

### Event: 'activity-was-continued' *macOS*

Ibinabalik ang:

* `kaganapan` kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng app-specific na estado na nakaimbak ng aktibidad.

Napalabas kung [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)pagkatapos ang aktibidad galing sa ibang matagumpay na naibalik ang isa pa.

### Event: 'update-activity-state' *macOS*

Ibinabalik ang:

* `kaganapan` kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng app-specific na estado na nakaimbak ng aktibidad.

Napalabas kung [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ay malapit na ipagpatuloy sa isa pang device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Kung hindi, ang operasyon ay mabibigo at `continue-activity-error` ay tatawagin.

### Event: 'new-window-for-tab' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan

Lalabas kapag ang user ay nag-klik sa natural na pindutan ng bagong tab sa macOS. Ang bagong tab na pindutan ay makikita lamang kung ang kasalukuyang `BrowserWindow` ay may `tabbingIdentifier`

### Mga event: 'browser-window-blur'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `window` [BrowserWindow](browser-window.md)

Lalabas kapag ang [browserWIndow](browser-window.md) ay nagiging malabo.

### Mga event: 'browser-window-focus'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `window` [BrowserWindow](browser-window.md)

Lalabas kapag ang [browserWindow](browser-window.md) ay ipopokus.

### Event: 'browser-window-created'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `window` [BrowserWindow](browser-window.md)

Lalabas kapag ang bagong [browserWindow](browser-window.md) ay nagawa na.

### Event: 'web-contents-created'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)

Lalabas kapag ang bagong [webContents](web-contents.md) ay nagawa na.

### Mga event: 'certificate-error'

Ibinabalik ang:

* `kaganapan` kaganapan
* `webContents` [WebContents](web-contents.md)
* `url` Tali
* `error` String - Ang code ng error
* `certificate` [Certificate](structures/certificate.md)
* `callback` Punsyon 
  * `isTrusted` Boolean - Kung isinasa-alang-alang ang sertipiko bilang mapagkakatiwalaan

Lalabas kapag nabigo ang pag-beripika ng `certificate` para sa `url`, para pagkatiwalaan ang sertipiko dapat mong pigilan ang default na aksyon gamit ang `event.preventDefalt()` at tawagin ang `callback(true)`.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  kung ang (url === 'https://github.com') {
    // Lohika ng pagberipika.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Event: 'select-client-certificate'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `url` Ang URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Punsyon 
  * `certificate` [Certificate](structures/certificate.md) (opsyonal)

Lalabas kapag ang sertipiko ng kliyente ay hiniling.

Ang `url` na tumutugma sa entry ng nabigasyon na humihiling sa sertipiko ng kliyente at ang `callback` ay maaring tawagin gamit ang entry na pinili galing sa listahan. Ang paggamit ng `event.preventDefault()` ay makakapigil sa aplikasyon na gamitin ang unang sertipiko mula sa Imbakan.

```javascript
const {app} = kailangan('electron')

app.on('select-client-certificate', (mga event, mga webContents, mga url, mga talaan, mga mulingtawag) => {
  event.preventDefault()
  mulingtawag(talaan[0])
})
```

### Event: 'login'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `kahilingan` Bagay 
  * `method` na String
  * `url` Ang URL
  * `referrer`Ang URL
* `ang authInfo` Bagay 
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Lalabas kapag ang `webContents` ay gustong gawin ang basic auth.

Ang default na aksyon ay ang pagkansela ng lahat ng mga pagpapatunay, dapat mong pigilan ang default na aksyon gamit ang `event.preventDefault()` at tawagin ang `callback(username, password)` gamit ang mga kredensyal para ma-override ito.

```javascript
const {app} = require('electron')

app.on('login', (mga event, mga webContents, mga kahilingan, mga authInfo, mga mulingtawag) => {
  event.preventDefault()
  mulingtawag('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `killed` Ang Boolean

Lalabas kapag ang proseso na gpu ay nasira o pinatay.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `accessibilitySupportEnabled` Boolean - `true` kapag ang parating na suporta ng Chrome ay pinagana, `false` kung hindi.

Lalabas kapag ang parating na suporta ng Chrome ay nabago. Ang event na ito ay sisimulan kapag ang assistive na teknologhiya, kagaya ng mga screen reader, ay naka-enable o hindi. Tingnan ang https://www.chromium.org/developers/design-documents/accessibility para sa iba pang mga detalye.

### Event: 'session-created'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const {app} = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Pagbabalik:

* `event` na Kaganapan
* `argv` String[] - An array of the second instance's command line arguments
* `workingDirectory` String - The second instance's working directory

This event will be emitted inside the primary instance of your application when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

## Mga Paraan

The `app` object has the following methods:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking user and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `pagpipilian` Bagay (opsyonal) 
  * `args` String[] (optional)
  * `execPath` String (optional)

Relaunches the app when current instance exits.

By default the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.whenReady()`

Returns `Promise` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Hides all application windows without minimizing them.

### `app.show()` *macOS*

Shows application windows after they were hidden. Does not automatically focus them.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

You can request the following paths by the name:

* `home` User's home directory.
* `appData` Per-user application data directory, which by default points to: 
  * `%APPDATA%` on Windows
  * `$XDG_CONFIG_HOME` or `~/.config` on Linux
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

* `path` na String
* `pagpipilian` Bagay (opsyonal) 
  * `sukat` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
* `callback` Punsyon 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` na String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` String

Overrides the current application's name.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` na String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Clears the recent documents list.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean` - Whether the call succeeded.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

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

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Note:** Kung ang `JumpListCategory` ang bagay ay hindi ang `type` o ang `name` itinakda ang katangian pagkatapos ito ay `type` ay ipinapalagay na `tasks`. Kung ang `name` ang katangian ay itinakda ngunit ang `type` ang katangian ay tinanggal pagkatapos ang `type` ay ipinalagay na `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

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
  { // ay may pangalan kaya `type` ay ipinapalagay na "custom"                                             
     na pangalan: 'Tools',
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
  { // ay walang pangalan at walang tayp kaya `type` ay ipinapalagay na "tasks"
    mga aytem: [
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

Returns `Boolean`

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

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

Returns `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.
* `webpageURL` String (opsyonal) - ay ang webpage sa isang browser na ilo-load kung walang angkop na app ang naka-install sa aparatong nagpasimulang muli. Ang dapat na pamamaraan ay `http` o `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Bagay 
  * `certificate` String - Ang landas para sa mga file ng pkcs12.
  * `password` String - Ang passphrase para sa mga sertipiko.
* `callback` Function 
  * `result` Integer - Ang resulta ng pag-import.

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

* ang `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Na Bagay (opsyonal) 
  * `path` String (opsyonal) *Windows* - Ang maipapatupad na landas na ihahambing laban sa. Mga default sa `process.execPath`.
  * `args` String[] (opsyonal) *Windows* - Ang mga argumento ng command-line na ihahambing laban sa. Mga default sa isang hanay na walang laman.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` kung ang app ay naka-set na bumukas sa pag-login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Nagpapahiwatig ito na ang app ay hindi dapat magbukas ng kahit anong window sa startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Nagpapahiwatig ito na ang app ay dapat i-restore ang windows na bukas sa huling beses na ang app ay isinara. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `mga setting` Bagay 
  * `openAtLogin` Boolean (opsyonal) - `true` para buksan ang app sa pag-login, `false` para tanggalin ang app bilang aytem sa pag-login. Mga default sa `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Mga default sa `false`. Maaaring i-edit ng user ang setting na ito mula sa System Preferences kaya `app.getLoginitemStatus().wasOpenedAsHidden` ay dapat namasuri kapag ang app ay nabuksan para malaman ang kasalukuyang halaga. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (opsyonal) *Windows* - Ang maipapatupad para maglunsad sa login. Ay mga default sa `process.execPath`.
  * `args` String[] (opsyonal) *Windows* - Ang mga argumento ng command-line na ipapasa sa ipinapatupad. Mga default sa isang walang lamang hanay. Alalayan para isama ang mga landas sa mga quote.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Halimbawa:

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
 
Context | Request Context
```

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `mga opsyon` Bagay 
  * `applicationName` String (opsyonal) - Ang pangalan ng app.
  * `applicationVersion` String (opsyonal) - Ang bersyon ng app.
  * `copyright` String (opsyonal) - Ang impormasyon ng copyright.
  * `credits` String (opsyonal) - Ang impormasyon ng credit.
  * `version` String (opsyonal) - Ang build version number ng app.

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

* `switch` String - Ang swits ng command-line
* `value` String (opsyonal) - Ang halaga para sa ibinigay na swits

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - Ang argumento ay ilakip sa linya ng command

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

* `type` String (opsyonal) - ay maaaring `critical` o `informational`. Ang default ay `informational`

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

* `image` [NativeImage](native-image.md) (String)

Sets the `image` associated with this dock icon.

## Mga Katangian

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.