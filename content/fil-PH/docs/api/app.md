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

### Event: 'new-window-for-tab' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan

Lalabas kapag ang user ay nag-klik sa natural na pindutan ng bagong tab sa macOS. Ang bagong tab na pindutan ay makikita lamang kung ang kasalukuyang `BrowserWindow` ay may `tabbingIdentifier`

### Mga event: 'browser-window-blur'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `window` BrowserWindow

Lalabas kapag ang [browserWIndow](browser-window.md) ay nagiging malabo.

### Mga event: 'browser-window-focus'

Ibinabalik ang:

* `kaganapan` kaganapan
* `window` BrowserWindow

Lalabas kapag ang [browserWindow](browser-window.md) ay ipopokus.

### Event: 'browser-window-created'

Ibinabalik ang:

* `kaganapan` kaganapan
* `window` BrowserWindow

Lalabas kapag ang bagong [browserWindow](browser-window.md) ay nagawa na.

### Event: 'web-contents-created'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` WebContents

Lalabas kapag ang bagong [webContents](web-contents.md) ay nagawa na.

### Mga event: 'certificate-error'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webContents` [WebContents](web-contents.md)
* `url` String
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
* `ganting-tawag` Function 
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
  * `method` String
  * `url` URL
  * `referrer`Ang URL
* `ang authInfo` Bagay 
  * `isProxy` Ang Boolean
  * `scheme` Ang string
  * `host` String
  * `port` Integer
  * `realm` String
* `mulingtawag` Function 
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

* `kaganapan` kaganapan
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

Kaagad na lumalabas pag may `exitCode`.`exitCode` mga default sa 0.

Ang lahat ng mga window ay kaagad na magsasara kahit walang pahintulot ng user at ang `before-quit` at `will-quit` na mga event ay hindi na lalabas.

### `app.relaunch([options])`

* `mga opsyon` Bagay (opsyonal) 
  * `args` String[] - (opsyonal)
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
* `pepperFlashSystemPlugin` Buong landas sa bersyon ng sistema sa plugin ng Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Na Bagay (opsyonal) 
  * `sukat` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sa *Linux*, 32x32 sa *Windows*, hindi suportado sa *macOS*.
* `tumawag muli` Punsyon 
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

### `app.setAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - Ang pangalan ng iyong protocol, walang `://`. Kung gusto mo ang iyong app na maghandle ng `electron://` na mga link, tawagin mo ang method na mayroong `electron` bilang parameter.
* `path` String (opsyonal) *Windows* - Magdedefault sa `process.execPath`
* `args` String[] (opsyonal) *Windows* - Magdedefault sa isang walang laman na array

Returns `Boolean` - Kung ang tawag ay naging matagumpay.

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

Idinadagdag ng `tasks` sa mga [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) na kategorya ng JumpList sa Windows.

`tasks` ay isang hanay ng [`Task`](structures/task.md) na mga bagay.

Returns `Boolean` - Kung ang tawag ay naging matagumpay.

**Note:** Kung gusto mo pang ipasadya ang Jump List ng higit pa gamitin sa halip ang `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Returns `Object`:

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

**Note:** Kung ang isang bagay sa `JumpListCategory` ay wala ang `type` ni ang `name` itinakdang property pagkatapos nito `type` ay ipinapalagay na `tasks`. Kung ang property ng `name` ay naitakda ngunit ang property ng `type` ay tinanggal pagkatapos ang `type` ay ipinapalagay na `custom`.

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

* `callback` Function 
  * `argv` String[] - Isang hanay ng mga argumento sa linya ng command sa ikalawang pagkakataon
  * `workingDirectory` String - Ang working directory ng ikalawang pagkakataon

Magbabalik ng `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

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

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Mag-map sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `pagpipilian` Bagay 
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

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGpuFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Kung ang tawag ay naging matagumpay.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `pagpipilian` Bagay (opsyonal) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Bagay 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. For example:

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

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAboutPanelOptions(options)` *macOS*

* `pagpipilian` Bagay 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

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

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` na Integer

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

* `image` [NativeImage](native-image.md) (String)

Sets the `image` associated with this dock icon.