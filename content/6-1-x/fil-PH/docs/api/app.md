# ang app

> Kontrolin ang event lifecycle ng iyong aplikasyon.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang sumusunod na halimbawa ay nagpapakita kung paano ihinto ang aplikasyon kapag ang huling window ay isinara na:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Mga event

Ang bagay ng `app` ay naglalabas ng mga sumusunod na mga event:

### Ang event: 'will-finish-launching'

Ay lalabas kapag ang aplikasyon ay natapos na karaniwang startup. Sa Windows at Linux, ang event ng `will-finish-launching` ay parehas ng event ng `ready`: sa macOS, ang event na ito ay nagrerepresenta ng `applicationWillFinishLaunching` na notipikasyon ng `NSApplication`. Karaniwan mong ise-set up ang mga tagapakinig para sa mga event ng`open-file` at `open-url` dito, at i-start ang crash repoter at auto updater.

In most cases, you should do everything in the `ready` event handler.

### Mga event: 'ready'

Pagbabalik:

* `launchInfo` Mga bagay _MacOS_

Lalabas kapag ang Electron ay tapos ng mag-initialize. Sa macOS, hawak ng `launchinfo` ang `userinfo` ng `NSUserNotification` na ginamit para buksan ang aplikasyon, kung ito ay ini-launch mula sa Notification Center. Maaari mong tawagin ang `app.isReady()` para suriin kung ang event ay nagsimula na.

### Event: 'window-all-closed'

Lalabas kapag ang lahat ng mga window ay sarado na.

Kung ikaw ay hindi nag-subscribe sa event na ito at ang lahat ng mga window ay sarado na, ang default na aksyon nito ay ang pag hinto ng app; gayunpaman, kung ikaw ay naka-subscribe, maaaring magpasya kung ihihinto ang app o hindi. Kung ang user ay pumindot ng `Cmd + Q`, o ang developer ay tumawag ng `app.quit()`, ang Electron ay unang susubukang isara ang lahat ng mga window at pagkatapos ay maglalabas ng event na `will-quit`, at sa kasong ito ang event na `window-all-closed` ay hindi lalabas.

### Ang event: 'before-quit'

Ibinabalik ang:

* `event` na Kaganapan

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'will-quit'

Ibinabalik ang:

* `event` na Pangyayari

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Tingnan ang deskripsyon ng event ng `window-all-closed` para sa mga pagkakaiba sa pagitan ng mga event ng `will-quit` at `window-all-closed`.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'quit'

Ibinabalik ang:

* `kaganapan` kaganapan
* `exitCode` Integer

Lalabas kung humihinto ang aplikasyon.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Event: 'open-file' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `path` String

Lalabas kung ang gusto ng user na mag-bukas ng isang file gamit ang aplikasyon. Ang event ng `open-file` ay kadalasang lumalabas kung ang aplikasyon ay bukas na at ang OS ay gustong muling gumamit ng aplikasyon para buksan ang file. Ang `open-file` ay ilalabas din kapag ang file ay ilinaglag sa dock at ang aplikasyon ay hindi pa gumagana. Siguraduhin na pinapakinggan ang event ng `open-file` sa maagang startup ng iyong application para mapamahalaan ang sitwasyon na ito (kahit bago pa ang event ng `ready` ay lumabas).

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

Sa Windows, kailangan mong i-parse ang `process.argv` (sa pangunahing proseso) para makuha ang filepath.

### Event: 'open-url' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali

Lalabas kapag ang user ay gustong buksan ang isang URL kasama ang aplikasyon. Ang `info.plist` file ng iyong aplikasyon ay dapat tukuyin ang url scheme sa loob ng key ng `CFBundleURLTypes`, at i-set ang `NSPrincipalClass` sa `AtomApplication`.

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

### Event: 'activate' _macOS_

Ibinabalik ang:

* `event` Event
* `hasVisibleWindows` Boolean

Lalabas kapag ang aplikasyon ay naka-aktibeyt. Iba't-ibang mga aksyon ang maaaring mag-trigger ng event na ito, tulad ng pagla-launch ng aplikasyon para sa unang pagkakataon, sinusubukang muling i-launch ang aplikasyon kahit ito ay tumatakbo na, o pagpindot sa icon ng dock o taskbar ng aplikasyon.

### Event: 'continue-activity' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng espesipikong estado ng app na itinago sa pamamagitan ng aktibidad sa ibang aparato.

Lalabas sa panahon ng [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kapag ang isang aktibidad mula sa ibang aparato ay nais na maipagpatuloy. Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

Ang aktibidad ng isang user ay maaari lamang magpatuloy sa isang app na may kaparehong developer Team ID bilang source app ng aktibidad at kung ito ay sumusuporta sa uri ng aktibidad. Ang sinuportahan na mga uri ng aktibidad ay tinukoy sa `Info.plist` ng app sa ilalim ng key ng `NSUserActivityTypes`.

### Event: 'will-continue-activity' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Napalabas habang [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) bago ang aktibidad galing sa ibang device na gustong mapagpatuloy. Dapat mong tawagin ang `event.preventDefault()` kung gusto mong hawakan ang event na ito.

### Event: 'continue-activity-error' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Ang string na may error sa localized na deskripsyon.

Napalabas habang [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kung ang aktibidad galing sa ibang device ay nabigo na mapagpatuloy.

### Event: 'activity-was-continued' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng app-specific na estado na nakaimbak ng aktibidad.

Napalabas kung [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)pagkatapos ang aktibidad galing sa ibang matagumpay na naibalik ang isa pa.

### Event: 'update-activity-state' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `type` String - Isang string na kumikilala sa mga aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng app-specific na estado na nakaimbak ng aktibidad.

Napalabas kung [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ay malapit na ipagpatuloy sa isa pang device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

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

* `event` Ang event
* `webContents` [WebContents](web-contents.md)
* `url` Tali
* `error` String - Ang code ng error
* `certificate` [Certificate](structures/certificate.md)
* `callback` na Function
  * `isTrusted` Boolean - Kung isinasa-alang-alang ang sertipiko bilang mapagkakatiwalaan

Lalabas kapag nabigo ang pag-beripika ng `certificate` para sa `url`, para pagkatiwalaan ang sertipiko dapat mong pigilan ang default na aksyon gamit ang `event.preventDefalt()` at tawagin ang `callback(true)`.

```javascript
const { app } = require('electron')

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
* `callback` na Function
  * `certificate` [Certificate](structures/certificate.md) (opsyonal)

Lalabas kapag ang sertipiko ng kliyente ay hiniling.

Ang `url` na tumutugma sa entry ng nabigasyon na humihiling sa sertipiko ng kliyente at ang `callback` ay maaring tawagin gamit ang entry na pinili galing sa listahan. Ang paggamit ng `event.preventDefault()` ay makakapigil sa aplikasyon na gamitin ang unang sertipiko mula sa Imbakan.

```javascript
const { app } = kailangan('electron')

app.on('select-client-certificate', (mga event, mga webContents, mga url, mga talaan, mga mulingtawag) => {
  event.preventDefault()
  mulingtawag(talaan[0])
})
```

### Event: 'login'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` na String
  * `url` Ang URL
  * `referrer`Ang URL
* `authInfo` Object
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` na Function
  * `username` String
  * `password` String

Lalabas kapag ang `webContents` ay gustong gawin ang basic auth.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

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

### Event: 'renderer-process-crashed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `killed` Ang Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Event: 'accessibility-support-changed' _macOS_ _Windows_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `accessibilitySupportEnabled` Boolean - `true` kapag ang parating na suporta ng Chrome ay pinagana, `false` kung hindi.

Lalabas kapag ang parating na suporta ng Chrome ay nabago. Ang event na ito ay sisimulan kapag ang assistive na teknologhiya, kagaya ng mga screen reader, ay naka-enable o hindi. Tingnan ang https://www.chromium.org/developers/design-documents/accessibility para sa iba pang mga detalye.

### Event: 'session-created'

Ibinabalik ang:

* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Ibinabalik ang:

* `kaganapan`Kaganapan
* `argv` String[] - Isang hanay ng mga argumento sa linya ng command sa ikalawang pagkakataon
* `workingDirectory` String - Ang working directory ng ikalawang pagkakataon

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Kadalasan ang mga application ay magrerespond nito sa pamamagitan ng pag-focus pag-non-minimize ng kanilang primary window.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Mga Pamamaraan

Ang `app` na object ay maroong mga sumusunod na mga method:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

### `app.quit()`

Susubukang isira ang lahat ng mga window. Ang `before-quit` na event ay unang ibrobrodkast. Kung ang lahat ng mga window ay nasara, ang `will-quit` na event ay ibrobrodkast at ang default na application ay ihihinto.

Ang method na ito ay ginagarantiya na ang lahat ng `beforeunload` at `unload` na mga event handler ay saktong isasagawa. Ito ay posible na kakanselahin ng window ang pag-alis sa pamamagitan ng pagbabalik ng `false` sa `beforeunload` ng event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (opsyonal)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (optional)
  * `execPath` String (opsyonal)

Muling ilulunsad ang app kapag ang kasalukuyang kahilingan ay nawala na.

By default, the new instance will use the same working directory and command line arguments with current instance. Kapag ang `args` ay tinukoy na, ang `args` ay maaaring ipasa sa halip na ang mga argumento ng linya ng command. Kapag ang `execPath` ay tinukoy na, ang `execPath` ay gagawin para sa muling paglunsad sa halip na ang kasalukuyang app.

Tandaan na ang pamamaraan na ito ay hindi inaalis ang app kapag pinairal, dapat mong tawagin ang `app.quit` o ang `app.exit` matapos tawagin ang `app.relaunch` para ang app ay magsimula muli.

Kapag ang `app.relaunch` ay tinawag ng maraming beses, maraming mga kahilingan ang magsisimula pagkatapos na lumabas ang kasalukuyang kahilingan.

Isang halimbawa ng agad na muling pagsisimula ng kasalukuyang kahilingan at pagdaragdag ng isang bagong argumento ng linya ng command sa bagong kahilingan:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` kung ang Electron ay tapos na sa pagsisimula, `false` kung hindi man.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Itinatago ang lahat ng mga window ng aplikasyon nang hindi ito pinapaliit.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Returns`String` - Ang kasalukuyang direktoryo ng aplikasyon.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Maaari mong hilingin ang mga sumusunod na landas sa pamamagitan ng pangalan:

* `home` Ang bahay direktoryo ng gumagamit.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` sa Windows
  * `$XDG_CONFIG_HOME` o `~/.config` sa Linux
  * `~/Library/Application Support` sa macOS
* `userData` Ang direktoryo para sa pag-iimbak ng mga configuration file ng iyong app, kung saan sa pamamagitan ng default ito ay ang `appData` direktoryong nakadugtong sa pangalan ng iyong app.
* `temp` Pansamantalang direktoryo.
* `exe` Ang kasalukuyang maipapatupad na file.
* `module` Ang `libchromiumcontent` library.
* `desktop` Ang kasalukuyang direktoryo ng Desktop ng gumagamit.
* `documents` Direktoryo ng "My Documents" para sa gumagamit.
* `downloads` Direktoryo ng download para sa gumagamit.
* `music` Direktoryo ng musika para sa gumagamit.
* `pictures` Direktoryo ng mga larawan para sa gumagamit.
* `videos` Direktoryo ng mga video para sa gumagamit.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` na Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Kukunin ang kaugnay na icon ng isang landas.

On _Windows_, there are 2 kinds of icons:

* Ang mga icon na nauugnay ng ilang mga file extension, tulad ng `.mp3`, `.png`, atbp.
* Mga icon na nasa loob mismo ng file, tulad ng `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Kukunin ang kaugnay na icon ng isang landas.

Sa _Windows_, may 2 uri ng mga icon:

* Ang mga icon na nauugnay ng ilang mga file extension, tulad ng `.mp3`, `.png`, atbp.
* Mga icon na nasa loob mismo ng file, tulad ng `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(name,path)`

* `name` String
* `path` String

Ipawalangbisa ang `path` sa isang espesyal na direktoryo o sa file na may kaugnayan sa `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

Maaari mo lang i-override ang mga landas ng isang `name` na tinukoy sa `app.getPath`.

Sa pamamagitan ng default, ang cookies at caches ng web page ay ii-imbak sa ilalim ng direktoryo ng `userData`. Kung gusto mong baguhin ang lokasyon, kailangan mong i-override ang landas ng `userData` bago ang event ng `ready` sa module ng `app` ay ilalabas.

### `app.getVersion()`

Magbabalik ng `String` - Ang bersyon ng na-load na aplikasyon. Kung walang bersyon ang nakita sa loob ng `package.json` file ng aplikasyon, ang bersyon ng kasalukuyang bundle o executable ay ibabalik.

### `app.getName()`

Magbabalik ng `String` - Ang pangalan ng kasalukuyang aplikasyon, kung saan ito ang pangalan ng `package.json` file ng aplikasyon.

Karaniwang ang `name` field ng `package.json`ay isang maikling naka-lowercase na pangalan, ayon sa mga npm module spec. Dapat mo ring tukuyin ang karaniwang field ng `productName`, kung saan ito ang buong malalaking titik na pangalan ng iyong aplikasyon, at kung saan ay mas gugustuhin na `name` nang Electron.

### `app.setName(pangalan)`

* `name` String

Ino-override ang pangalan ng kasalukuyang aplikasyon.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Tandaan:** Habang ipinamamahagi ang iyong naka-package na app, dapat mo ring isama ang polder ng `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Nagdadagdag ng `path` sa listahan ng mga bagong dokumento.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Buburahin ang listahan ng mga bagong dokumento.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`. Kung gusto mo ang iyong app na maghandle ng `electron://` na mga link, tawagin mo ang method na mayroong `electron` bilang parameter.
* `path` String (opsyonal) _Windows_ - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) _Windows_ - Magdedefault sa isang walang laman na array

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

Ang paraan na ito ay nagtatakda sa kasalukuyang maipapatupad bilang ang default handler para sa isang protocol (aka pamamaraan ng URI). Ito ay nagpapahintulot sa iyo na isama ang iyong app pailalim patungo sa operating system. Sakaling marehistro, ang lahat ng links na may `your-protocol://` ay mabubuksan ng kasalukuyang pagpapatupad. Ang kabuuang link, kasama ang protocol, ay makakalampas sa iyong aplikasyon bilang isang parameter.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** Sa macOS, maaari mo lamang irehistro ang mga protocol na naging karagdagan sa iyong mga app `info.plist`, kung saan ay hindi na mababago habang nasa oras ng paggana. Kahit papaano ay maaari mong baguhin ang file sa pamamagitan ng isang simpleng editor ng teksto o script habang nasa oras ng pagbuo. Pakiusap sumangguni sa [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) para sa mga detalye.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

Ang API ay ginagamit ang Windows Registry at ang LSSetDefaultHandlerForURLScheme sa loob nito.

### `app.removeAsDefaultProtocolClient(protocol[,path, args])` _macOS_ _Windows_

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) _Windows_ - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) _Windows_ - Magdedefault sa isang walang laman na array

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) _Windows_ - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) _Windows_ - Magdedefault sa isang walang laman na array

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** Sa macOS, magagamit mo ang pamamaraan na ito para suriin kung ang app ay nakarehistro na bilang default protocol handler para sa isang protocol. Maaari mo rin itong patunayan sa pamamagitan ng pagsusuri sa `-/Library/Preferences/com.apple.LaunchServices.plist` sa makina ng macOS. Pakiusap sumangguni sa [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) para sa mga detalye.

Ang API ay ginagamit ang Windows Registry at LSCopyDefaultHandlerForURLScheme sa loob nito.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Hanay ng `Task` na mga bagay

Idinadagdag ng `tasks` sa mga [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) na kategorya ng JumpList sa Windows.

`tasks` ay isang hanay ng [`Task`](structures/task.md) na mga bagay.

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

**Note:** Kung gusto mo pang ipasadya ang Jump List ng higit pa gamitin sa halip ang `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Nagbabalik ng mga `bagay`:

* `minItems` Integer - Ang pinakamaliit na bilang ng mga item na ipapakita sa Jump List (para sa mas detalyadong deskripsyon ng halaga nito tingnan ang [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Isang hanay ng mga bagay sa `JumpListItem` na tumutugma sa mga item na tahasang tinanggal ng gumagamit galing sa ipinasadyang mga kategorya ng Jump List. Ang mga item na ito ay hindi dapat maidagdag na muli sa Jump List sa **next** na tawag sa `app.setJumpList()`, ang Windows ay hindi magpapakita ng kahit anong pasadyang kategorya na maglalaman ng kahit anong natanggal ng mga item.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) o `null` - Ang hanay ng mga bagay sa `JumpListCategory`.

Naglalagay o nagtatanggal ng isang pasadyang Jump List para sa aplikasyon, at ibinabalik ang isa sa mga sumusunod na string:

* `ok` - Walang nangyaring mali.
* `error` - Isa or higit pang pagkakamali ang naganap, paganahin ang runtime logging para malaman ang inaasahang dahilan.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Isang pagtatangka ang ginawa para magdagdag ng file link sa Jump List para sa isang uri ng file na ang app ay hindi rehistrado para hawakan ito.
* `customCategoryAccessDeniedError` - Ang mga pasadyang kategorya ay hindi maaaring idagdag sa Jump List dahil sa privacy ng gumagamit o mga setting ng group policy.

Kung ang `categories` ay `null`, ang dati ng naitakda na pasadyang Jump List (kung mayroon man) ay mapapalitan ng standard na Jump List para sa app (na pinamamahalaan ng Windows).

**Note:** Kung ang `JumpListCategory` ang bagay ay hindi ang `type` o ang `name` itinakda ang katangian pagkatapos ito ay `type` ay ipinapalagay na `tasks`. Kung ang `name` ang katangian ay itinakda ngunit ang `type` ang katangian ay tinanggal pagkatapos ang `type` ay ipinalagay na `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Kahit na anong pagtatangka na muling idagdag ang isang tinanggal na aytem nang mas maaga pa ay magreresulta na ang buong pasadyang kategorya ay tinanggal na mula sa Jump List. Ang listahan ng mga natanggal na aytem ay maaring makuha gamit ang `app.getJumpListSettings()`.

Narito ang isang napakasimpleng halimbawa ng paggawa ng isang pasadyang Jump List:

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

Returns `Boolean`

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Ang isang halimbawa ng pag-aktibeyt ng window ng pangunahing instansya ay kapag nagsimula na ang ikalawang instansya:

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

Returns `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Ay lumilikha ng isang `NSUserActivity` at ito ang nagtatakda bilang kasalukuyang aktibidad. Ang aktibidad ay karapat-dapat para sa [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sa iba pang aparato pagkatapos nito.

### `app.getCurrentActivityType()` _macOS_

Nagbabalik ang `String` - Ang uri ng kasalukuyang aktibidad na tumatakbo.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.

Ini-update ang kasalukuyang aktibidad kung tumutugma ito`type`, pinagsamasama ang mga entry mula sa `userInfo` sa kasalukuyan nitong diksyonaryo ng `userInfo`.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Ay binabago ang [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) tungo sa `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Ang landas para sa mga file ng pkcs12.
  * `password` String - Ang passphrase para sa mga sertipiko.
* `callback` na Function
  * `result` Integer - Ang resulta ng pag-import.

Ini-import ang mga sertipiko mula sa pormat ng pkcs12 patungo sa taguan ng plataporma ng sertipiko. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `ang app.disableHardwareAcceleration()`

Hindi pinagana ang akselerasyon ng hardware para sa kasalukuyang app.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `ang app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `ang app.getGPUFeatureStatus()`

Nagbabalik ang [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Ang mga Tampok na Katayuan ng mga Grapiko mula sa `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

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

* ang `count` Integer

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

Ang badge na tagabilang ay nai-set para sa kasalukuyang app. Itinatago ang badge kapag ang itinatakdang bilang ay `0`.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Nagbabalik ang `Integer` - Ang kasalukuyang halaga ay ipinapakita sa mga tagabilang ng badge.

### `app.isUnityRunning()` _Linux_

Nagbabalik ang `Boolean` - Kung ang kasalukuyang kapaligiran ay tagalunsad ng Unity.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` kung ang app ay naka-set na bumukas sa pag-login.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Nagpapahiwatig ito na ang app ay hindi dapat magbukas ng kahit anong window sa startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Nagpapahiwatig ito na ang app ay dapat i-restore ang windows na bukas sa huling beses na ang app ay isinara. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Ang default na `mali`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Mga default sa `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

I-set ang mga login aytem setting ng app.

Makipagtulungan sa `autoUpdater` ng Electron sa Windows,kung saan gumagamit ng [Squirrel](https://github.com/Squirrel/Squirrel.Windows),gusto mong i-set ang landas ng pag-launch patungo sa Update.exe, at ipasa ang mga argumento na nagsasaad ng pangalan ng iyong aplikasyon. Halimbawa:

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
 
Context | Request Context
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Returns `Boolean` - `true` kung ang parating na supota ng Chrome ay pinagana, `false` kung hindi naman. Ang API na ito ay babalik sa `true` kung ang paggamit ng nakatutulong na teknolohiya, tulad ng mga screen reader, ay nakita. Tingnan ang https://www.chrmium.org/developers/design-documents/accessibility para sa iba pang mga detalye.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (opsyonal) - Ang pangalan ng app.
  * `applicationVersion` String (opsyonal) - Ang bersyon ng app.
  * `copyright` String (opsyonal) - Ang impormasyon ng copyright.
  * `version` String (opsyonal) - Ang build version number ng app. _macOS_
  * `credits` String (opsyonal) - Ang impormasyon ng credit. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

I-set ang mga pagpipilian tungkol sa panel. This will override the values defined in the app's `.plist` file on MacOS. Tingnan ang [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para sa iba pang mga detalye. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

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

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (opsyonal) - Ang halaga para sa ibinigay na swits

Ilapit ang swits (na may opsyonal `value`) sa linya ng command ng Chromium.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(halaga)`

* `value` String - Ang argumento ay ilakip sa linya ng command

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - Ang swits ng command-line

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Ang swits ng command-line

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Nagbabalik ang `integer` ang isang ID na kumakatawan sa mga kahilingan.

Kapag ang `critical` ay lumipas, ang icon ng dock ay tatalon hanggang alinman sa mga aplikasyon ay naging aktibo o ang kahilingan ay kinansela.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

Kanselahin ang pagtalon ng `id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Pinatatalon ang mga istak ng Download kung ang filePath ay nasa loob ng folder ng mga Download.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Ise-set ang string upang maipakita sa badging area ng dock.

### `app.dock.getBadge()` _macOS_

Nagbabalik ang `String` - Ang string ng badge ng dock.

### `app.dock.hide()` _macOS_

Itinatago ang icon ng dock.

### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` [NativeImage](native-image.md) (String)

I-set ang `image` na may kaugnayan sa dock icon na ito.

## Mga Katangian

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
