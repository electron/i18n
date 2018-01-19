# app

> Ikontrol ang event lifecycle ng iyong application.

Proseso: [Main](../glossary.md#main-process)

Ang susunod na halimbawa ay magpapakita kung papano ihinto ang application kapag ang huling window ay isinara:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Events

Ang `app` na object ay maglalabas ng mga sumusunod na mga event:

### Event: 'will-finish-launching'

Ibrobrodkast kapag ang application ay tapos nang mag basic startup. Sa Windows at Linux, ang `will-finish-launching` na event ay kapareha ng `ready` na event; sa macOS, ang event na ito ay nagrerepresenta ng `applicationWillFinishLaunching` na notipikasyon ng `NSApplication`. Kadalasan, gusto mong mag setup ng mga listener para sa `open-file` at `open-url` na mga events dito, at magsimula ng crash reporter at auto updater.

Sa karamihan, dapat mong gawin ang lahat sa `ready` na event handler.

### Event: 'ready'

Magbabalik ng:

* `launchInfo` na Object *MacOS*

Ibrobrodkast kapag ang Electron ay tapos ng mag-initialize. Sa macOS, ang `launchInfo` ay may hawak ng `userInfo` ng `NSUserNotification` na ginamit para buksan ang application, kung ito ay isinimula galing sa Notification Center. Pwedeng mag tawag ng `app.isReady()` para suriin kung ang event ay isinimula na.

### Event: 'window-all-closed'

Ibrobrodkast kung ang lahat ng mga window ay isinarado.

Kung ikaw ay hindi nagsubscribe sa event na ito at ang lahat ng mga window ay sarado, ang default na aksyon nito ay ang pag hinto ng app; gayunpaman, kung ikaw ay nakasubscribe, pwedeng magpasya kung ihihinto ang app o hindi. Kung ang user ay pumindot ng `Cmd + Q`, o ang developer ay tumawag ng `app.quit()`, ang Electron ay unang susubukang isara ang lahat ng mga window at pagkatapos ay magbrobrodkast ng `will-quit` na event, at sa kasong ito ang `window-all-closed` na event ay hindi ibrobrodkast.

### Event: 'before-quit'

Magbabalik ng:

* `event` Event

Ibrobrodkast bago magsimula ang application sa pagsasara ng mga window nito. Ang pagtawag ng `event.preventDefault()` ay pipigilan ang default na aksyon, na kung saan ay ang pag sara ng application.

**Note:** Kung sinimulan ang paghinto sa application ng `autoUpdater.quitAndInstall()` tapos ang `before-quit` ay ibrinodkast *after* ibinibrodkast ang `close` na event sa lahat ng mga window at isasarado sila.

### Event: 'will-quit'

Magbabalik ng:

* `event` Event

Ibrobrodkast kung ang lahat ng mga window ay isinirado at ang application ay ihihinto. Ang pagtawag ng `event.preventDefault()` ay pipigilan ang default na aksyon, na kung saan ay ang pag wakas ng application.

Tingnan ang deskripsyon ng `window-all-closed` na event para sa mga pagkakaiba sa pagitan ng `will-quit` at `window-all-closed` na mga event.

### Event: 'quit'

Magbabalik ng:

* `event` Event
* `exitCode` Integer

Ibrobrodkast kung humihinto ang application.

### Event: 'open-file' *macOS*

Magbabalik ng:

* `event` Event
* `path` String

Ibrobroadkast kung ang gusto ng user na mag-bukas ng isang file gamit ang application. Ang `open-file` na event ay kadalasang ibrobrodkast kung ang application ay bukas na at ang OS ay gustong gumamit muli ng application para buksan ang file. `open-file` ay ibrobrodkast din kapag ang file ay inihulog sa dock at ang application ay hindi pa gumagana. Siguraduhin na pinapakinggan ang `open-file` na event sa maagang startup ng iyong application para mapamahalaan ang sitwasyon na ito (kahit bago pa ang `ready` na event ay ibrinodkast).

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong e-handol ang event na ito.

Sa Windows, ikaw ay dapat mag-parse `process.argv` (sa main na process) para makuha ang filepath.

### Event: 'open-url' *macOS*

Magbabalik ng:

* `event` Event
* `url` String

Ibrobrodkast kapang ang user ay gustong mag open ng URL gamit ang application. Ang `info.plist` file ng iyong application ay dapat magtukoy ng url scheme sa loob ng `CFBundleURLTypes` key, at e-set ang `NSPrincipalClass` sa `AtomApplication`.

Dapat mong tawagin ang `event.preventDefault()` kung gusto mong e-handol ang event na ito.

### Event: 'activate' *macOS*

Magbabalik ng:

* `event` Event
* `hasVisibleWindows` Boolean

Ibrobrodkast kung ang application na-activate. Ibat-ibang mga action ay makakatrigger ng event, tulad ng paglaunch ng application sa unang pagkakataon, pagtangkang mag relaunch ng application kahit na ito ay gumagana na, o ang pagclick sa dock ng application o taskbar icon.

### Event: 'continue-activity' *macOS*

Magbabalik ng:

* `event` Event
* `type` String - Isang string na nagkikilanlan ng isang aktibidad. Nagmamap sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Naglalaman ng estado na partikular sa app na nilalagay sa aktibidad ng ibang aparato.

Ibrobrodkast habang ang [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kapag ang aktibidad ng isang ibang aparato ay gustong tapusin. Dapat kang tumawag ng `event.preventDefault()` kung gusto mong e-handol ang event na ito.

Ang isang user na aktibidad ay pwede lamang magpatuloy sa isang app na may kaparehong developer Team ID bilang source app ng aktibidad at kung ito ay nagsusuporta ng uri ng aktibidad. Ang sinusuportahan na mga uri ng aktibidad ay tinutukoy sa `Info.plist` ng app sa ilalim ng `NSUserActivityTypes` na key.

### Event: 'new-window-for-tab' *macOS*

Magbabalik ng:

* `event` Event

Ibrobrodkast kapag ang user ay nagclick sa native macOS new tab na pindutan. Ang bagong tab na pindutan ay makikita lamang kung ang kasalukuyang `BrowserWindow` ay may `tabbingIdentifier`

### Event: 'browser-window-blur'

Magbabalik ng:

* `event` Event
* `window` BrowserWindow

Ibrobrodkast kapang a [browserWIndow](browser-window.md) ay magiging malabo.

### Event: 'browser-window-focus'

Magbabalik ng:

* `event` Event
* `window` BrowserWindow

Ibrobrodkast kapag ang [browserWindow](browser-window.md) ay ipopokus.

### Event: 'browser-window-created'

Magbabalik ng:

* `event` Event
* `window` BrowserWindow

Ibrobrodkast kapang ang bagong [browserWindow](browser-window.md) ay nagawa na.

### Event: 'web-contents-created'

Magbabalik ng:

* `event` Event
* `webContents` WebContents

Ibrobrodkast kapang ang bagong [webContents](web-contents.md) ay nagawa na.

### Event: 'certificate-error'

Magbabalik ng:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Ang code ng error
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Kung ituturing ang sertipiko na pinagkakatiwalaan

Ibrobrodkast kapag nabigo ang pag beripika ng `certificate` para sa `url`, para pagkatiwalaan ang sertipiko dapat mong pigilan ang default na aksyon gamit ang `event.preventDefalt()` at tawagin ang `callback(true)`.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Lohika ng pagberipika.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Event: 'select-client-certificate'

Magbabalik ng:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) (opsyonal)

Ibrobrodkast kapang ang sertipiko na client ay hiniling.

Ang `url` na tumutugma sa navigation entry na humihiling sa sertipiko na client at ang `callback` ay maaring tawagin gamit ang entry na pinili galing sa lista. Ang paggamit ng `event.preventDefault()` ay makakapigil sa application na gamitin ang unang sertipiko galing sa store.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Event: 'login'

Magbabalik ng:

* `event` Event
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
* `callback` Function 
  * `username` String
  * `password` String

Ibrobrodkast kapang ang `webContents` ay gustong gawin ang basic auth.

Ang default na aksyon ay ang pagkansela ng lahat ng mga pagpapatunay, dapat mong gamitin ang `event.preventDefault()` at itawag ang `callback(username, password)` gamit ang mga kredensyal para ma-override ito.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Magbabalik ng:

* `event` Event
* `killed` Boolean

Ibrobrodkast kapang ang proseso na gpu ay nasira o pinatay.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Magbabalik ng:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` kapag ang Chrome accessibility support ay pinapagana, `false` kung hindi.

Ibrobrodkast kapang ang accessibility support ng Chrome ay nabago. Ang event na ito ay sisimulan kapag ang assistive na teknologhiya, kagaya ng mga screen reader, ay naka-enable o hindi. Tingnan ang https://www.chromium.org/developers/design-documents/accessibility para sa iba pang mga detalye.

## Mga Method

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

* `mga pagpipilian` Mga bagay (opsyonal) 
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
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `sukat` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sa *Linux*, 32x32 sa *Windows*, hindi suportado sa *macOS*.
* `callback` Function 
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

Ipawalangbisa ang `path` sa isang espesyal na direktoryo o sa file na may kaugnayan sa `name`. Kung ang path ay nagtutukoy sa isang direktoryo na hindi matatagpuan, ang direktoryo ay lilikhain gamit ang paraan na ito. Isang `Error` ay itatapon kung hindi ito gagana.

Pwede mo lang ma-override ang mga path ng isang `name` na dinefine sa `app.getPath`.

Ang cookies at caches ng web page ay iii-store sa ilalim ng `userData` na direktoryo bilang default. Kung gusto mong bagohin ang lokasyon, kailangan mong i-override ang `userData` na path bago ang `ready` na event ng module na `app` ay ibrobrodkast.

### `app.getVersion()`

Magbabalik ng `String` - Ang bersyon ng na-load na application. Kung walang bersyon ang nakita sa loob ng `package.json` file ng application, ang bersyon ng kasalukuyang bundle o executable ay ibabalik.

### `app.getName()`

Magbabalik ng `String` - Ang kasalukuyang pangalan ng application, kung saan matatagapuan ito sa `package.json` file ng application.

Karaniwang maikling lowercased na pangalan ang `name` field ng `package.json`, ayon sa npm modules spec. Kadalasan, dapat mong itukoy ang `productName` field kung saan ito ang full capitalized na pangalan ng application, at kung saan mas prini-prefer ito kaysa sa `name` naayon sa Electron.

### `app.setName(name)`

* `name` String

Ino-override ang kasalukuyang pangalan ng application.

### `app.getLocale()`

Magbabalik ng `String` - Ang kasalakuyang locale ng application. Posible na ibabalik ang mga value na documented [dito](locales.md).

**Tandaan:** Habang dinidistribute ang iyong packaged app, dapat mo ring i-ship ang `locales` na folder.

**Tandaan:** Sa Windows, dapat mo itong tawagin pagkatapos ibrobrodkast ang mga `ready` na mga event.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Nagdadagdag ng `path` sa bagong listahan ng mga dokumento.

Ang lista na ito ay pinamamahalaan ng OS. Sa Windows, pwede mong bisitahin ang lista mula sa task bar, at pwede mong bisitahin mula sa dock menu sa macOS.

### `app.clearRecentDocuments()` *macOS* *Windows*

Aalisin ang lahat ng laman ng kamakailan lang na lista ng mga dokumento.

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

Returns `Boolean` - Kung ang tawag ay nagtagumpay.

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

Ito ay isang napakasimpleng halimbawa ng paggawa ng isang custom na Jump List:

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
 { // mayroon itong pangalan kaya ang `type` ay ituturing na "custom"     
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
 { // walang pangalan at walang type kaya ang `type` ay ituturing na "tasks"
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
  * `argv` String[] - Isang array ng mga command line argument na galing sa ikalawang instance
  * `workingDirectory` String - Ang working directory ng ikalawang instance

Magbabalik ng `Boolean`.

Sa method na ito, ang ang iyong application ay magiging isang Single Instance Application - sa halip na pinapayagan ang maraming mga instance ng iyong app na mag-run, sinisiguro nito na isang instance lang ng iyong app ang mag-rurun, at ang ibang mga instance ay sisignal sa instance na ito at mag-eexit.

Ang `callback` ay tatawagin ng unang instance gamit ang `callback(argv, workingDirectory)` kung ang ikalawang instance ay na-execute na. Ang `argv` ay isang Array ng mga command line argument ng ikalawang instance, at ang `workingDirectory` ay ang kasalukuyang working directory nito. Kadalasan ang mga application ay magrerespond nito sa pamamagitan ng pag-focus pag-non-minimize ng kanilang primary window.

Ang `callback` ay siguradong i-eexecute pagkatapos ibrobrodkast ang `ready` event ng `app`.

Ang method na ito ay magbabalik ng `false` kung ang proseso mo ay ang primary instance ng application at ang iyong app ay dapat nag-concontinue magload. At magbabalik ng `true` kung ang iyong proseso ay nagpadala ng mga parameter nito sa ibang insance, at dapat mong agarang ihinto.

Sa macOS ang system ay awtomatikong pipilitin na mag-single instance kung ang user ay magtatangkang magbukas na ikalawang instance ng iyong app sa Finder, at ang `open-file` at `open-url` na mga event ay ibrobrodkast para doon. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Nagmamap sa [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `mga pagpipilian` Bagay 
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

* `mga pagpipilian` Mga bagay (opsyonal) 
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
```

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAboutPanelOptions(options)` *macOS*

* `mga pagpipilian` Bagay 
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