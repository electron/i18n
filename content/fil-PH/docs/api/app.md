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

Sa karamihan, dapat mo lang gawin ang lahat sa mga `ready` handler ng event.

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

### Event: 'will-quit'

Ibinabalik ang:

* `event` na Pangyayari

Ilalabas kung ang lahat ng mga window ay isinarado at ang aplikasyon ay ihihinto. Ang pagtawag ng `event.preventDefault()` ay pipigilan ang default na aksyon, na kung saan ay ang pag-alis ng aplikasyon.

Tingnan ang deskripsyon ng event ng `window-all-closed` para sa mga pagkakaiba sa pagitan ng mga event ng `will-quit` at `window-all-closed`.

### Event: 'quit'

Ibinabalik ang:

* `kaganapan` kaganapan
* `exitCode` Integer

Lalabas kung humihinto ang aplikasyon.

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

Ibabalik:

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
* `callback` Function 
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
* `callback` Function 
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
* `callback` Punsyon 
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

## Mga Paraan

Ang `app` na object ay maroong mga sumusunod na mga method:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

### `app.quit()`

Susubukang isira ang lahat ng mga window. Ang `before-quit` na event ay unang ibrobrodkast. Kung ang lahat ng mga window ay nasara, ang `will-quit` na event ay ibrobrodkast at ang default na application ay ihihinto.

Ang method na ito ay ginagarantiya na ang lahat ng `beforeunload` at `unload` na mga event handler ay saktong isasagawa. Ito ay posible na kakanselahin ng window ang pag-alis sa pamamagitan ng pagbabalik ng `false` sa `beforeunload` ng event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (opsyonal)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Ang lahat ng mga window ay kaagad na magsasara kahit walang pahintulot ng user at ang `before-quit` at `will-quit` na mga event ay hindi na lalabas.

### `app.relaunch([options])`

* `mga opsyon` Na Bagay (opsyonal) 
  * `args` String[] (optional)
  * `execPath` String (opsyonal)

Muling ilulunsad ang app kapag ang kasalukuyang kahilingan ay nawala na.

Sa pamamagitan ng default ang bagong kahilingan ay gagamitin ang kaparehong direktoryo ng gawain at mga argumento ng linya ng command nang kasalukuyang kahilingan. Kapag ang `args` ay tinukoy na, ang `args` ay maaaring ipasa sa halip na ang mga argumento ng linya ng command. Kapag ang `execPath` ay tinukoy na, ang `execPath` ay gagawin para sa muling paglunsad sa halip na ang kasalukuyang app.

Tandaan na ang pamamaraan na ito ay hindi inaalis ang app kapag pinairal, dapat mong tawagin ang `app.quit` o ang `app.exit` matapos tawagin ang `app.relaunch` para ang app ay magsimula muli.

Kapag ang `app.relaunch` ay tinawag ng maraming beses, maraming mga kahilingan ang magsisimula pagkatapos na lumabas ang kasalukuyang kahilingan.

Isang halimbawa ng agad na muling pagsisimula ng kasalukuyang kahilingan at pagdaragdag ng isang bagong argumento ng linya ng command sa bagong kahilingan:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` kung ang Electron ay tapos na sa pagsisimula, `false` kung hindi man.

### `app.focus()`

Sa Linux, naka-pokus sa unang makikitang window. Sa macOS, ginagawa ang aplikasyon na aktibong app. Sa Windows, naka-pokus sa unang window ng aplikasyon.

### `app.hide()` *macOS*

Itinatago ang lahat ng mga window ng aplikasyon nang hindi ito pinapaliit.

### `app.show()` *macOS*

Ipinapakita ang mga window ng aplikasyon pagkatapos na sila ay itago. Ay hindi kusang tumutok sa kanila.

### `app.getAppPath()`

Returns`String` - Ang kasalukuyang direktoryo ng aplikasyon.

### `app.getPath(name)`

* `name` String

Returns `String` - Isang landas para sa isang espesyal na direktoryo o file na may kaugnayan sa `name`. Sa kabiguan ang `Error` ay ibinabato.

Maaari mong hilingin ang mga sumusunod na landas sa pamamagitan ng pangalan:

* `home` Ang bahay direktoryo ng gumagamit.
* `appData` Aplikasyon ng direktoryo ng datos ng bawat gumagamit, kung saan sa pamamagitan ng default ay tumuturo sa: 
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
* `mga opsyon` Bagay (opsyonal) 
  * `sukat` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sa *Linux*, 32x32 sa *Windows*, hindi suportado sa *macOS*.
* `callback` Punsyon 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Kukunin ang kaugnay na icon ng isang landas.

Sa *Windows*, may 2 uri ng mga icon:

* Ang mga icon na nauugnay ng ilang mga file extension, tulad ng `.mp3`, `.png`, atbp.
* Mga icon na nasa loob mismo ng file, tulad ng `.exe`, `.dll`, `.ico`.

Sa *Linux* at *macOS*, ang mga icon ay nakadepende sa aplikasyon na may kaugnayan sa mime type na file.

### `app.setPath(name,path)`

* `name` String
* `path` String

Ipawalangbisa ang `path` sa isang espesyal na direktoryo o sa file na may kaugnayan sa `name`. Kung ang path ay nagtutukoy sa isang direktoryo na hindi umiiral, ang direktoryo ay lilikhain sa pamamagitan ng paraan na ito. Ang isang `Error` ay itatapon kapag nabigo.

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

Magbabalik ng `String` - Ang lokal ng kasalukuyang aplikasyon. Ang posibleng mga halaga ng pagbabalik ay dokumentado na sa [here](locales.md).

**Tandaan:** Habang ipinamamahagi ang iyong naka-package na app, dapat mo ring isama ang polder ng `locales`.

**Tandaan:** Sa Windows dapat mo itong tawagin pagkatapos na ang mga event ng `ready` ay mapalabas.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Nagdadagdag ng `path` sa listahan ng mga bagong dokumento.

Ang listahan na ito ay pinamamahalaan ng OS. Sa Windows maaari mong bisitahin ang listahan mula sa task bar, at sa macOSmaaari mong bisitahin mula sa menu ng dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Buburahin ang listahan ng mga bagong dokumento.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`. Kung gusto mo ang iyong app na maghandle ng `electron://` na mga link, tawagin mo ang method na mayroong `electron` bilang parameter.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

Ang paraan na ito ay nagtatakda sa kasalukuyang maipapatupad bilang ang default handler para sa isang protocol (aka pamamaraan ng URI). Ito ay nagpapahintulot sa iyo na isama ang iyong app pailalim patungo sa operating system. Sakaling marehistro, ang lahat ng links na may `your-protocol://` ay mabubuksan ng kasalukuyang pagpapatupad. Ang kabuuang link, kasama ang protocol, ay makakalampas sa iyong aplikasyon bilang isang parameter.

Sa mga Window maaari mong ibigay na opsyonal na landas ng mga parameter, ang landas na iyong maipapatupad, at ang mga argumento, ang kaayusan ng mga argumento na maaaring ipasa sa iyong naipapatupad kapag ito ay nailunsad.

**Note:** Sa macOS, maaari mo lamang irehistro ang mga protocol na naging karagdagan sa iyong mga app `info.plist`, kung saan ay hindi na mababago habang nasa oras ng paggana. Kahit papaano ay maaari mong baguhin ang file sa pamamagitan ng isang simpleng editor ng teksto o script habang nasa oras ng pagbuo. Pakiusap sumangguni sa [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) para sa mga detalye.

Ang API ay ginagamit ang Windows Registry at ang LSSetDefaultHandlerForURLScheme sa loob nito.

### `app.removeAsDefaultProtocolClient(protocol[,path, args])` *macOS* *Windows*

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean` - Kung ang tawag ay naging matagumpay.

Ang mga paraan na ito ay sinusuri kung ang kasalukuyang naipapatupad bilang default handler para sa isang protocol (aka URI scheme), Kung gayon, tatanggalin nito ang app bilang default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows* Context | Request Context

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean`

Ang mga paran na ito ay sinusuri kung ang kasalukuyang naipapatupad ay ang default handler (aka URI scheme), Kung gayon, ito ay babalik na totoo. Knug hindi man, ito ay babalik na mali.

**Note:** Sa macOS, magagamit mo ang pamamaraan na ito para suriin kung ang app ay nakarehistro na bilang default protocol handler para sa isang protocol. Maaari mo rin itong patunayan sa pamamagitan ng pagsusuri sa `-/Library/Preferences/com.apple.LaunchServices.plist` sa makina ng macOS. Pakiusap sumangguni sa [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) para sa mga detalye.

Ang API ay ginagamit ang Windows Registry at LSCopyDefaultHandlerForURLScheme sa loob nito.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Hanay ng `Task` na mga bagay

Idinadagdag ng `tasks` sa mga [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) na kategorya ng JumpList sa Windows.

`tasks` ay isang hanay ng [`Task`](structures/task.md) na mga bagay.

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

**Note:** Kung gusto mo pang ipasadya ang Jump List ng higit pa gamitin sa halip ang `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Nagbabalik ng mga `bagay`:

* `minItems` Integer - Ang pinakamaliit na bilang ng mga item na ipapakita sa Jump List (para sa mas detalyadong deskripsyon ng halaga nito tingnan ang [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Isang hanay ng mga bagay sa `JumpListItem` na tumutugma sa mga item na tahasang tinanggal ng gumagamit galing sa ipinasadyang mga kategorya ng Jump List. Ang mga item na ito ay hindi dapat maidagdag na muli sa Jump List sa **next** na tawag sa `app.setJumpList()`, ang Windows ay hindi magpapakita ng kahit anong pasadyang kategorya na maglalaman ng kahit anong natanggal ng mga item.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) o `null` - Ang hanay ng mga bagay sa `JumpListCategory`.

Naglalagay o nagtatanggal ng isang pasadyang Jump List para sa aplikasyon, at ibinabalik ang isa sa mga sumusunod na string:

* `ok` - Walang nangyaring mali.
* `error` - Isa or higit pang pagkakamali ang naganap, paganahin ang runtime logging para malaman ang inaasahang dahilan.
* `invalidSeparatorError` - Isang pagtatangka ang ginawa para magdagdag ng isang separator sa isang pasadyang kategorya sa Jump List. Ang mga separator ay pinapayagan lamang sa mga standard na kategorya ng `Tasks`.
* `fileTypeRegistrationError` - Isang pagtatangka ang ginawa para magdagdag ng file link sa Jump List para sa isang uri ng file na ang app ay hindi rehistrado para hawakan ito.
* `customCategoryAccessDeniedError` - Ang mga pasadyang kategorya ay hindi maaaring idagdag sa Jump List dahil sa privacy ng gumagamit o mga setting ng group policy.

Kung ang `categories` ay `null`, ang dati ng naitakda na pasadyang Jump List (kung mayroon man) ay mapapalitan ng standard na Jump List para sa app (na pinamamahalaan ng Windows).

**Note:** Kung ang `JumpListCategory` ang bagay ay hindi ang `type` o ang `name` itinakda ang katangian pagkatapos ito ay `type` ay ipinapalagay na `tasks`. Kung ang `name` ang katangian ay itinakda ngunit ang `type` ang katangian ay tinanggal pagkatapos ang `type` ay ipinalagay na `custom`.

**Note:** Ang mga user ay maaaring magtanggal ng mga item mula sa mga pasadyang kategorya, at ang Windows ay hindi pinapayagan na ang tinggal na aytem ay ibalik na muli sa pasadyang kategorya hanggang **after**ang susunod na matagumpay na pagtawag sa `app.setJumpList(categories)`. Kahit na anong pagtatangka na muling idagdag ang isang tinanggal na aytem nang mas maaga pa ay magreresulta na ang buong pasadyang kategorya ay tinanggal na mula sa Jump List. Ang listahan ng mga natanggal na aytem ay maaring makuha gamit ang `app.getJumpListSettings()`.

Narito ang isang napakasimpleng halimbawa ng paggawa ng isang pasadyang Jump List:

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

### `app.makeSingleInstance(callback)`

* `callback` Tungkulin 
  * `argv` String[] - Isang hanay ng mga argumento sa linya ng command sa ikalawang pagkakataon
  * `workingDirectory` String - Ang working directory ng ikalawang pagkakataon

Magbabalik ng `Boolean`.

Sa method na ito, ang ang iyong application ay magiging isang Single Instance Application - sa halip na pinapayagan ang maraming mga instance ng iyong app na mag-run, sinisiguro nito na isang instance lang ng iyong app ang mag-rurun, at ang ibang mga instance ay sisignal sa instance na ito at mag-eexit.

Ang `callback` ay tatawagin ng unang instance gamit ang `callback(argv, workingDirectory)` kung ang ikalawang instance ay na-execute na. Ang `argv` ay isang Array ng mga command line argument ng ikalawang instance, at ang `workingDirectory` ay ang kasalukuyang working directory nito. Kadalasan ang mga application ay magrerespond nito sa pamamagitan ng pag-focus pag-non-minimize ng kanilang primary window.

Ang `callback` ay siguradong i-eexecute pagkatapos ibrobrodkast ang `ready` event ng `app`.

Ang method na ito ay magbabalik ng `false` kung ang proseso mo ay ang primary instance ng application at ang iyong app ay dapat nag-concontinue magload. At magbabalik ng `true` kung ang iyong proseso ay nagpadala ng mga parameter nito sa ibang insance, at dapat mong agarang ihinto.

Sa macOS ang system ay awtomatikong pipilitin na mag-single instance kung ang user ay magtatangkang magbukas na ikalawang instance ng iyong app sa Finder, at ang `open-file` at `open-url` na mga event ay ibrobrodkast para doon. Gayunpaman kapag ang mga user ay binuksan ang iyong app sa linya ng command ang isahang instansyang mekanismo ng sistema ay mababalewala at kailangan mong gamitin ang pamamaraang ito para masiguro ang isahang instansya.

Ang isang halimbawa ng pag-aktibeyt ng window ng pangunahing instansya ay kapag nagsimula na ang ikalawang instansya:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // May isang tao na sinubukang paandarin ang ikalawang instansya, kailangan nating i-pokus ang ating window.
  kung ang (myWindow) {
    kung ang (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

kung ang (isSecondInstance) {
  app.quit()
}

// Gumawa ng  myWindow, i-load ang natitira pang mga app, atbp...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Binuksan ang lahat ng mga trangka na ginawa ng `makeSingleInstance`. Pinapayagan nito ang maramihang mga instansya ng mga aplikasyon na gumanang muli ng magkakatabi.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.
* `webpageURL` String (opsyonal) - ay ang webpage sa isang browser na ilo-load kung walang angkop na app ang naka-install sa aparatong nagpasimulang muli. Ang dapat na pamamaraan ay `http` o `https`.

Ay lumilikha ng isang `NSUserActivity` at ito ang nagtatakda bilang kasalukuyang aktibidad. Ang aktibidad ay karapat-dapat para sa [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sa iba pang aparato pagkatapos nito.

### `app.getCurrentActivityType()` *macOS*

Nagbabalik ang `String` - Ang uri ng kasalukuyang aktibidad na tumatakbo.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Kakaibang pagkakilala sa aktibidad. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userinfo` Object - App-tiyak na estado para itago upang magamit ng ibang aparato.

Ini-update ang kasalukuyang aktibidad kung tumutugma ito`type`, pinagsamasama ang mga entry mula sa `userInfo` sa kasalukuyan nitong diksyonaryo ng `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Ay binabago ang [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) tungo sa `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Bagay 
  * `certificate` String - Ang landas para sa mga file ng pkcs12.
  * `password` String - Ang passphrase para sa mga sertipiko.
* `callback` Punsyon 
  * `result` Integer - Ang resulta ng pag-import.

Ini-import ang mga sertipiko mula sa pormat ng pkcs12 patungo sa taguan ng plataporma ng sertipiko. Ang `callback` ay tinatawag na kasama ng `result` ng operasyon ng pag-import, ang halaga ng `` ay nagpapahiwatig ng tagumpay samantalang ang iba pang mga halaga ay nagpapahiwatig ng kabiguan ayon sa [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) ng chromium.

### `ang app.disableHardwareAcceleration()`

Hindi pinagana ang akselerasyon ng hardware para sa kasalukuyang app.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `app.disableDomainBlockingFor3DAPIs()`

Sa pamamagitan ng default, hindi pinagana ng Chromium ang mga 3D API (hal.WebGL) hanggang sa muling pagbukas sa bawat domain na basehan kung ang mga proseso ng GPU ay masyadong madalas bumagsak. Ang punsyon na ito ay hindi pinapagana ang ganoong katangian.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `ang app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `ang app.getGPUFeatureStatus()`

Nagbabalik ang [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Ang mga Tampok na Katayuan ng mga Grapiko mula sa `chrome://gpu/`.

### `app.setBadgeCount(bilangin)` *Linux* *macOS*

* ang `count` Integer

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

Ang badge na tagabilang ay nai-set para sa kasalukuyang app. Itinatago ang badge kapag ang itinatakdang bilang ay ``.

Sa macOS ipinapakita ito sa dock icon. Sa Linux ito ay gumagalaw lamang para sa tagapaglunsad ng Unity,

**Note:** Ang tagalunsad ng Unity ay nangangailangan ng pagkakaroon ng isang file na `.desktop` para gumana, para sa karagdagan impormasyon mangyaring basahin ang [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Nagbabalik ang `Integer` - Ang kasalukuyang halaga ay ipinapakita sa mga tagabilang ng badge.

### `app.isUnityRunning()` *Linux*

Nagbabalik ang `Boolean` - Kung ang kasalukuyang kapaligiran ay tagalunsad ng Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `mga opsyon` Na Bagay (opsyonal) 
  * `path` String (opsyonal) *Windows* - Ang maipapatupad na landas na ihahambing laban sa. Mga default sa `process.execPath`.
  * `args` String[] (opsyonal) *Windows* - Ang mga argumento ng command-line na ihahambing laban sa. Mga default sa isang hanay na walang laman.

Kung ibinigay mo ang mga opsyon ng mga `path` at mga `args` sa `app.setLoginItemSettings` kung gayon dapat mong ipasa ang mga parehong argumento dito para mai-set ng tama ang `openAtLogin`.

Nagbabalik ng mga `bagay`:

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

I-set ang mga login aytem setting ng app.

Makipagtulungan sa `autoUpdater` ng Electron sa Windows,kung saan gumagamit ng [Squirrel](https://github.com/Squirrel/Squirrel.Windows),gusto mong i-set ang landas ng pag-launch patungo sa Update.exe, at ipasa ang mga argumento na nagsasaad ng pangalan ng iyong aplikasyon. Halimbawa:

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

Returns `Boolean` - `true` kung ang parating na supota ng Chrome ay pinagana, `false` kung hindi naman. Ang API na ito ay babalik sa `true` kung ang paggamit ng nakatutulong na teknolohiya, tulad ng mga screen reader, ay nakita. Tingnan ang https://www.chrmium.org/developers/design-documents/accessibility para sa iba pang mga detalye.

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

I-set ang mga pagpipilian tungkol sa panel. Ipinapawang-bisa nito ang halaga ng ipinaliwanag na `.plist` na file ng app. Tingnan ang [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para sa iba pang mga detalye.

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

Ilapit ang swits (na may opsyonal `value`) sa linya ng command ng Chromium.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`, at ito ay pangunahing ginagamit ng mga developer para kontrolin ang ilang mabababang mga katangian ng Chromium.

### `app.commandLine.appendArgument(halaga)`

* `value` String - Ang argumento ay ilakip sa linya ng command

Ilakip ang isang argumento sa linya ng command ng Chromium Ang argumento ay iko-qoute ng tama.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Ang pinaghalong paraan ng sandbox sa app ay pinagana.

Ang pamamaraang ito ay maaari lamang matawag bago ang app ay handa na.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (opsyonal) - ay maaaring `critical` o `informational`. Ang default ay `informational`

Kapag ang `critical` ay lumipas, ang icon ng dock ay tatalon hanggang alinman sa mga aplikasyon ay naging aktibo o ang kahilingan ay kinansela.

Kapag ang `informational` ay lumipas na, ang icon ng dock ay tatalon ng isang segundo. Gayunpaman, ang kahilingan ay nananatiling aktibo hanggang alinman sa mga aplikasyon ay nagiging aktibo o ang kahilingan ay kinansela.

Nagbabalik ang `integer` ang isang ID na kumakatawan sa mga kahilingan.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Kanselahin ang pagtalon ng `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Pinatatalon ang mga istak ng Download kung ang filePath ay nasa loob ng folder ng mga Download.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Ise-set ang string upang maipakita sa badging area ng dock.

### `app.dock.getBadge()` *macOS*

Nagbabalik ang `String` - Ang string ng badge ng dock.

### `app.dock.hide()` *macOS*

Itinatago ang icon ng dock.

### `app.dock.show()` *macOS*

Ipinapakita ang icon ng dock.

### `app.dock.isVisible()` *macOS*

Nagbabalik ang `Boolean` - Kung ang mga icon sa dock ay nakikita. Ang tawag ng `app.dock.show()` ay asynchronous kaya ang pamamaraan na ito ay hindi babalik na totoo agad-agad matapos ang tawag na iyon.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

I-set ang [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103) ng aplikasyon.

### `app.dock.setIcon(image)` *macOS*

* `image` [NativeImage](native-image.md) (String)

I-set ang `image` na may kaugnayan sa dock icon na ito.