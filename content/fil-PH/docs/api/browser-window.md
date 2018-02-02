# Ang Browser ng Window

> Paglikha at pag-kontrol ng browser windows.

Ang proseso: [Main](../glossary.md#main-process)

```javascript
// Ang pangunahing pag-proseso.
const {BrowserWindow} = require('electron')

// O gamitin ang `remote` galing sa rendere process.
// const {BrowserWindow} = kinakailangan ('electron').remote

let win = bagong BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// Load ng remote ngURL
win.loadURL('https://github.com')

// O mag load sa local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Hindi maayos na window

Upang gumawa ng isang window na walang chrome, o isang transparent window sa hindi tumutunton sa katwiran ng korte, pwedi mong gamitin ang [Frameless Window](frameless-window.md) API.

## Pag-papakita ng magandang bintana

Kapag direktang nagkakarga ng pahina sa bintana, pweding makita ng mga taga-gamit ang pag-kakarga ng pahina nang paunti-unti, na hindi isang magandang karanasan para sa isang katutubong app. Upang gawing ipakita ang window walang visual flash, may dalawang solusyon para sa iba't ibang sitwasyon.

### Gamitin ang `mag-handa na upang ipakita` okasyon

Habang ikinakarga ang pahina, ang `mag-handa na upang ipakita` Ang kaganapan ay ipapalabas kapag ang taga-render Ang tagapag-proseso ay nag-rerender ng pahina sa unang pagkakataon kung ang bintana ay hindi pa ipinapakita. Ipinapakita ang bintana pagkatapos ng okasyon na ito ay walang biswal na flash:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Ang okasyong ito ay karaniwang ibinubuga pagkatapos ng `natapos ba ang pag-kakarga` okasyon, subalit para sa mga pahina na may maraming remote na mapagkukunan, pwedi itong maipakita bago ang `natapos ba ang pag-kakarga` okasyon.

### Ang pag-tatagpo ng `likurang kulay`

Ang isangkumplikado na app, ang `handa na upang ipakita` Ang okasyon ay pweding napalabas nang huli, na ginagawa pakiramdam ang app ay mabagal. Sa kasong ito, ito ay inirerekomenda na ipakita ang window kaagad, at gumamit ng isang `backgroundColor` isarado ang background na mga app:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Tandaan na kahit sa ginamit na app `ihanda upang ipakita` lokasyon, Dito inirerekomenda ang lokasyon `backgroundColor` upang gawing mas likas ang nararamdaman sa app.

## Ang magulang at batang window

Sa pamamagitan ng pag-gamit `ang magulang` opsyon, pwedi kang gumawa ng mga window ng bata:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

Ang `anak` Ang window ay palaging ipapakita sa ibabaw `ibabaw` window.

### Mga windows na Modal

Ang isang modal na window ay isang window ng bata na hindi pinapagana ang window ng magulang, upang gumawa ng modal window, kailangan mong itakda ang mag-katulad `magulang` at `modal` pagpipilian:

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### Ang kakayahan na makita ang pahina

Ang [pahina ng pag-papakita ng API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) ang pag-tatrabaho ng sumusunod:

* Sa lahat ng mga platform, ang kakayahang makakita ng estado ay sumusubaybay kung ang window ay ay itinatago/napaliit o hindi.
* Bukod pa, sa macOS, ang kakayahang makakita ng estado ay sumusubaybay din sa window estado ng occlusion. Kapag ang window ay okado (i.e. ganap na sakop) sa ibang window, ang kakayahang makakita ng estado ay magiging `tago`. Sa iba pang mga platform, ang ang kakayahan ng estado ay `nakatago` kapag ang window lamang ay pinapaliit o tahasang nakatago sa `win.hide()`.
* Kapag ang `BrowserWindow` ay ginagawa ng `ipakita: mali`, ang inisyal na kakahayang maka kita Ang estado ay pweding `visible` sa kabila ng window na talagang nakatago.
* Kapag `backgroundThrottling` ay hindi pinagana, ang kalagayan ng kakayahang makakita ay mananatiling `visible` kahit na ang window ay pinaliit, kasama, o nakatago. Context | Request Context.

Ang Inirerekomenda na i-hinto mo ang mga mahahalagang operasyon kapag ang may kakayahang makita ang estado ay `hidden` upang mabawasan ang pagkonsumo ng kuryente.

### Babala sa plataporma

* Sa macOS na modal windows ay ipinapakita ang bilang ng mga sheet na naka-sama sa window ng magulang.
* Sa macOS ang mga bintana ng anak ay pinapanatili ang kamag-anak na posisyon sa bintana ng magulang kapag ang window ng magulang ay gumagalaw, habang sa Windows at Linux bintana ng bata ay hindi nailipat.
* Sa bintana hindi ito suportado upang baguhin ang panimulang bintana ng magulang.
* Sa Linux ang tipo ng modal windows ay mababago sa `dayalogo`.
* Ang ay Linux maraming mga kapaligiran sa desktop ang hindi suportado sa pagtatago ng modal window.

## Ang Klase: ng BrowserWindow

> Paglikha at pag-kontrol ng browser windows.

Ang proseso: [Main](../glossary.md#main-process)

`BrowserWindow` ay ang [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Ito ay gumagawa ng panibagong `BrowserWindow` na may likas na mga ari-arian na itinakda ng`opsyon`.

### `ang bagong BrowserWindow([pag-pipilian])`

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) -ioffset ang kaliwang Window mula sa screen. Idefault ang window sa sentro.
  * `y` Integer (optional) (**required** Kung ang x ay nagamit) - Ioffset ang windows sa itaas ng screen Ang Default ay nasa sentro ng windows.
  * `useContentSize` Boolean (optional) - The `width` and `height`ay gagamtin bilang web ang sukat ng pahina, ibig sabihin ang aktwal na sukat ng windoz ay kasama ng sukat ng window frame na medyo malaki. Default is `false`.
  * `center` Boolean (optional) - Makikita ang window sa sentro ng screen.
  * `minWidth` Integer (optional) - Ang windows na mayroong maliit ng lapad Default ay ``.
  * `minHeight` Integer (optional) - Ang minimum na height ng windows. Default ay ``.
  * `maxWidth` Integer (optional) - Ang lapad ng windows Default ay hindi limitado.
  * `maxHeight` Integer (opsyonal) - Pinakamalakas na taas ng window. Ang default ay hindi limitado.
  * `resizable` Boolean (opsyonal) - Kung ang window ay pweding baguhin. Ang default ay `true`.
  * `movable` Boolean (opsyonal) - Kung ang window ay nagagalaw. Ito ay hindi inaisakatuparan sa Linux. Ang default ay `true`.
  * `napapaliit` Boolean (opsyonal) - Kung ang window ay napapaliit. Hindi ito maisasakatuparan sa Linux. Ang default ay `true`.
  * `maximizable` Boolean (opsyonal) - Kapag ang window ay napapalaki. Hindi ito maisasakatuparan sa Linux. Ang default ay `true`.
  * `closable` Boolean (opsyonal) - Pwedi ring maging closable ang window. Hindi ito maisasakatuparan sa Linux. Ang default ay `true`.
  * `focusable` Boolean (opsyonal) - Kung ang window ay kayang mag focused. Default ay `true`. Sa Windows setting `katumbukan: mali`nag papahiwatig din ng setting`SkipTasbar: katotohanan`. Sa setting ng Linux `focusable: false </ 0> ay may kakayahang patigilin ang interaksyon sa wm, kaya ang window ay laging manatili na tuktok sa lahat ng lugar ng pinagtatrabahuhan.</li>
<li><code>alwaysOnTop` Boolean (opsyonal) - Kapag ang window ay dapat nalaging manatili sa taas ng iba pang mga window. Ang default ay `false`.
  * `fullscreen`Boolean(opsyonal)- Dapat ipakita ang window sa fullscreen. Kailan explicitly set to ` false </ 0> ang fullscreen na pintdutan ay hindi makikita o hindi pinagana
sa macOS. Default is <code>false`.
  * `fullscreenable` Boolean (optional) -Ang Window ay pwedeng ilagay sa fullscreen mode. Sa macOS, pwede din kung ang maximize/Pag papalaki o pag papaliit na buton ay kailangang maging toggle full screen mode o mas malaking window. Ang Default ay `true`.
  * `skipTaskbar` Boolean (opsyonal) - o kung gustong ipakita ang window sa taskbar. Ang default ay `false`. <0>false</0>.
  * `kiosk` Boolean (optional) - Ang kiosk mode. Ang Default ay `false`.
  * `title` String (opsyonal) - Pamagat ng default na window, Ang default ay `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal) - Ang icon ng window. Sa windos mismo ay nirerekomenda na gamitin ang `ICO` para makakuha ng magandang mga effects ay pwede mong gawin lagyan ito ng guhit sa ilalim nang sa ganun ito ay maeexecute at ang icon ay pwede ng magamit.
  * `show` Boolean (opsyonal) - kapag kinakailangang ipakita ang window kapag ginawa. Ang default ay `true`.
  * `frame` Boolean (opsyonal) - Tukuyin ang `false` para lumikha ng isang [Frameless Window](frameless-window.md). Ang default ay `true`.
  * `parent` BrowserWindow (opsyonal) - Tukuyin ang pinagmulang window. Ang default ay `null`.
  * `modal` Boolean (opsyonal) -kapag ito ay isang modal ng window. tumatakbo lamang ito kapag ang mga window ay isang window ng child. Ang default ay `mali`.
  * `acceptFirstMouse` Boolean (opsyonal) - kapag natanggap ng web view ang nag-iisa. Mouse-down na mangyayari sa sabay na maging-aktibo ang window. Ang default ay `mali`.
  * `disableAutoHideCursor` Boolean (opsyonal) - Kung itinago ang cursor kapag nagta-type. Ang default ay `false`.
  * `autoHideMenuBar` Boolean (opsyonal) - Awtomatikong itago ang bar ng menu maliban kung ang teklado ng `Alt` ay pinindot. Ang default ay `false`.
  * `enableLargerThanScreen` Boolean (opsyonal) - Paganahin ang window na palakihin ng mas malaki kaysa sa iskrin. Ang default ay `false`.
  * `backgroundColor` String (opsyonal) - Ang kulay ng background ng window na may Hexadecimal na halaga, katulad ng `#66CD00` o `#FFF` o `#80FFFFFF` (ang alpha ay suportado). Ang default ay `#FFF` (puti).
  * `hasShadow` Boolean (opsyonal) - Kung ang window ay mayroong anino. Ito ay ipinapatupad lamang sa macOS. Ang default ay `true`.
  * `darkTheme` Boolean (opsyonal) - Puwersahang gumagamit ng madilim na theme para sa window, gumagana lamang sa ilang mga kapaligiran ng GTK+3 desktop. Ang default ay `false`.
  * `transparent` Boolean (opsyonal) - Ginagawa ang window na [transparent](frameless-window.md). Ang default ay `false`.
  * `type` String (opsyonal) - Ang uri ng window, ang default aynormal na window. Tingnan ang mas maraming tungkol dito sa ibaba.
  * `ang titleBarStyle` String (opsyonal) - Ang istilo ng title bar ng window. Ang default ay `default`Ang posibleng mga halaga ay: 
    * `default` - Ang mga resulta sa standard na gray opaque na title bar ng Mac.
    * `hidden` - Ang mga resulta sa isang nakatagong title bar at isang buong sukat na laman ng window, gayon pa man ang title bar ay mayroon ding mga karaniwang mga kontrol ng window (mga ilaw ng trapiko) sa kaliwang itaas.
    * `hidden-inset` - Hindi na ginagamit, sa halip gamitin ang `hiddenInset`.
    * `hiddenInset` - Ang mga resulta sa isang nakatagong title bar na may isang alternatibong hitsura kung saan ang mga pindutan ng ilaw ng trapiko ay bahagyang nakasingit sa gilid ng window.
    * `customButtonsOnHover` Boolean (optional) - Gumuhit ng pasadyang sarado, paliitin, at mga buong screen button sa macOS frameless windows. Ang mga pindutan na ito ay hindi ipapakita maliban kung ang hovered sa itaas sa kaliwang itaas ng window. Ang pasadyang ito Ang mga pindutan ay maiiwasan ang mga problema sa mga pang-yayari ng mouse na nangyayari sa pamantayan Mga kasangkapanng bar sa pindutan ng window. **Note:** Ang opsyon na ito ay kasalukuyang eksperimental.
  * `fullscreenWindowTitle` Boolean (opsyonal) - Ipinapakita ang pamagat sa mga tile bar sa buong iskrin na moda sa macOS para sa lahat ng mga opsyon ng `titleBarStyle`. Ang default ay `false`.
  * `thickFrame` Boolean (opsyonal) - Gamitin ang istilo ng `WS_THICKFRAME` para sa walang kaayusang windows sa Windows, kung saan nagdadagdag ng karaniwang ayos ng window. Ang tagpo nito sa `false`ay tanggalin ang window shadow at animation window. Ng default ay `tama`.
  * `vibrancy` String (opsyonal) - Ang pag-dagdag ng isang tipo ng epekto ng vibrancy sa window, lamang sa Mac Os. Ay maaaring maging `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` o `ultra-dark`.
  * `zoomToPageWidth` Boolean (opsyonal) Ito ay may kakayahang mag control ng behavior ng macOS kapag opsyonal na pag pindot ng berdeng hintong ilaw na buton na makikita sa toolbar o pag pinindot ang Window >Zoom menu item. If `true`, ang window ay lumalaki sa sagad na lapad sa nakabukas na pahina kapag ito ay naka zoomed `false` ay magagamit kapag nais mong palakihin at palaparin ang screen. Ito rin ay makakaapekto sa behavior kung ang tawag `maximize(),/0>diretsyo. Default is <code>false`.
  * `tabbingIdentifier` String (opsyonal) - Pangalan ng grupo ng tab, pinapayagang buksan ang window bilang isang natural na tab sa macOS 10.12+. Ang Windows na may magkatulad na tagakilala ng tabbing ay maaaring pagsama-samahin sa isang grupo. Magdadagdag din ito ng isang natural na bagong pindutan ng tab sa tab bar ng iyong window at pinapayagan ang iyong `app` at window para tanggapin ang kaganapan ng `new-window-for-tab`.
  * `ang webPreferences` Mga bagay (opsyonal) - Ang mga pagtatakda ng mga katangian ng pahina ng web. 
    * `devTools` Boolean (opsyonal) - Kung pinagana ang mga Dev Tool. Kung ito ay itinakda sa `false`, ay hindi maaaring gamitin ang `BrowserWindow.webContents.openDevTools()` para buksan ang mga Dev Tool. Ang Default ay `true`.
    * Ang `nodeIntegration` Boolean (opsyonal) - Kung ang pagsasama ng node ay pinagama na. Ang default ay `true`.
    * Ang `nodeIntegrationInWorker` Boolean (opsyonal) - Kung ang pagsasama ng node ay pinagana na sa mga tagagawa ng web. Default is `false`. Mas maraming tungkol dito ay maaaring matagpuan sa [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. Ang halaga ay ang maaring magiging tungkulin ng path file sa script. Kung naka-patay ang pagsasama ng node, pweding ipakilala ulit ang preload script Ang Node global na sagisag pabalik sa global na sakop. Tignan ang halimbawa [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. Ito ay hindi ang katulad ng ang `nodeIntegration` opsyon at ang mga API na magagamit sa pag-preload ng script ay mas malilimitahan. Basahin ng mabuti ang hingil sa opsyon [here](sandbox-option.md). **Tandaan:** Ang kasalukuyang pagpipilian ng eksperimentong ito at pweding magbago o maging tanggalin sa hinaharap na paglabas ng electron.
    * `session` [Session](session.md#class-session) (opsyonal) - Mag-takda ng mga sesyon kung saan ginagamit ang pahina. Sa halip na direktang ipasa ang layon ng sesyon, pwedi ka rin pumili sa Ang pag-gamit ng `partition` opsyon imbes, na tumatanggap ng string ng partition. Kung kelan Ang parehong `sesyon` and `partition` ay naglalaan para sa, `sesyon` maaring maging ginusto. Ang default ay ang default na sesyon.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Ang default ay ang default na sesyon.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Ang Default ay `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `EkspirementongMgaTampok` Boolean (optional) - Pinapatakbo ang mga na-eksperimentong tampok ng Chromium. Ang default ay `mali`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
    * `disableBlinkFeatures` String (opsyonal) - Ang talaan ng mga tampok ng strings ay pinag-hiwalay ng `,`, katulad ng `CSSVariables,KeyboardEventKey` upang hindi mapagana. Ang kabuoang listahan ng mga sinusuportahang tampok ng strings ay mahahanap sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) sa file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to ``.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (opsyonal) - Kapag sinakal ang mga animation at timers kapag ang pahina ay maging background. Ito ang pweding maging epekto sa \[Page Visibility API\]\[#page-visibility\]. Ang default sa `tama`.
    * `offscreen` Boolean (opsyonall) - Kung papaganahin ang pag-render ng offscreen para sa browser ng window. Ang default na `mali`. Tignan ang [pagtuturo sa pag rerender ng offscreen](../tutorial/offscreen-rendering.md) para sa mas maraming paliwanag.
    * `contextIsolation` Boolean (o[syonal) - Maging ang pagpapatakbo ng Electron APis at Ang pagtukoy `preload` Ang script sa magkakahiwalay na nilalaman ng JavaScript. Defaults to `false`. Ang nilalaman na iyon ang `preload` Ang script ay mayroong kabuuang access upang tumatakbo sa `dokumento` at `window` globals subalit gagamitin nito sarili nitong hilera ng pag-tatag ng JavaScript (`Array`, `Object`, `JSON`, etc.) at pinag-hihiwalay mula sa alinmang mga pagbabagong ginawa sa pandaigdigang kapaligiran sa paraan ng pag-karga ng pahina. Ang Electron API ay maaaring maging pwedi lamang sa `preload` ang script at hindi ang ikinargang pahina. Ang opsyon na ito ay kailangan magamit kapag Ang pagkakarga ng potensyal na hindi mapag-kakatiwalaan na nilalaman ng remote upang masiguro ang nilalaman ng pag-karga ay hindi pweding galawin ang `preload` Ang script at ang alinmang Electron APIs ay kasalukuyang ginagamit. Ang opsyon sa pag-gamit ng mag-katulad na estilo ay ginagamit ng [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Pwedii mong i-access ang nilalamang ito sa mga tool ng dev sa parang pagpili sa Ang ipinasok na 'Electron Isolated Context' sa kombo kaahon sa itaas ng Tab ng Console. **Tandaan:** Ang opsyon na ito ay kasalukuyang pinag i-ekspirementohan at pweding baguhin o tanggalin sa hinaharap na mga pag-labas ng Electron.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`. 
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### Instance Events

Objects created with `new BrowserWindow` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Event: 'page-title-updated'

Magbabalik ng:

* `event` Event
* `title` String

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.

#### Event: 'close'

Magbabalik ng:

* `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. Halimbawa:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false
}
```

#### Event: 'closed'

Ay lalabas kapag ang window ay isinara. Pagkatapos mong matanggap ang kaganapan na ito ay maaari mong tanggalin ang sanggunian sa mga window at iwasan itong gamitin ulit.

#### Kaganapan: 'katapusan ng sesyon' ng *Windows*

Ay lalabas kapag ang sesyon ng window ay hihinto na dahil sa puwersahang pagpatay o pag-restart ng makina o pag-log off ng sesyon.

#### Kaganapan: 'hindi tumutugon'

Ay lalabas kapag ang pahina ng web ay hindi tumutugon.

#### Kaganapan: 'tumutugon'

Ay lalabas kapag ang hindi tumutugon na pahina ng web ay tumutugon ulit.

#### Kaganapan: 'lumabo'

Ay lalabas kapag ang window ay nawawala sa pokus.

#### Kaganapan: 'pokus'

Ay lalabas kapag ang window ay nakakuha ng pokus.

#### Kaganapan: 'ipakita'

Ay lalabas kapag ang window ay ipinakita.

#### Kaganapan: 'itago'

Ay lalabas kapag ang window ay itinago.

#### Kaganapan: 'handa- ng- ipakita'

Ay lalabas kapag ang pahina ng web ay naisalin na (habang hindi pa ipinapakita) at ang window ay maaaring i-displey nang walang isang bisuwal na flash.

#### Kaganapan: 'palakihin'

Ay lalabas kapag ang window ay pinalaki.

#### Kaganapan: 'hindi pinalaki'

Ay lalabas kapag ang window ay lumabas mula sa pinalaking estado.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'resize'

Emitted when the window is being resized.

#### Event: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is just an alias of `moved`.

#### Event: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'app-command' *Windows*

Magbabalik ng:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. Ang karaniwang pinag-uugna ito sa mga keyboard key ng media o browser mga atas, pati na rin ang pindutang "i-balik" na itinatatag sa ilang mga mouse sa Windows.

Ang mga atas ay lowercase, ang mga underscore ay binabago ang mga gitling, at ang `APPCOMMAND_` nakuha ang prefix sa. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Event: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' *macOS*

Magbabalik ng:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Static Methods

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

Ang ekstensyon ay maaalala kaya kinakailangan mo lamang tumawag ng isang beses sa API na ito, ito Ang API ay hindi magagamit sa programming. Kung susubukin mong magdagdag ng ekstensyon na pweding mayroon na Na-ikarga, ang paraan na ito ay hindi mai-babalik at sa halip mag-log ng babala sa console.

Ang pamamaraan ay hindi maaring babalik kung ang manifest ng ekstensyon ay nawawala o hindi kumpleto.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### Humahalimbawa sa bahagi nito

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Ang `WebContents` layunin ng amay-ari ng window na ito. Lahat ng mga koneksyon na pangyayari sa web at ang mga operasyon ay gagawin sa paraan nito.

Tignan ang [`webContents` dokomentasyon](web-contents.md) para sa pamamaraang ito at sa okasyon.

#### `win.id`

Ang `Integer` Ini-rerepresenta ang kakaibang ID ng window na ito.

### Mga pamamaraan ng pagkakataon

Ang mga layunin na gumawa ng `bagong BrowserWindow` magkaroon ng sumusunod na halimbawa ng pamamaraan:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

#### `win.destroy()`

Ang sapilitang pagsarado ng window, ang `unload` at `beforeunload` hindi mapapalabas ang pangyayari para sa pahina ng web, at`close` Hindi rin mapapalabas ang pangyayari para sa window na ito, subalit sinisigurado nito ang `sarado` Ang okasyon ay magiging hayag.

#### `win.close()`

Subukang isarado ang window. Ito ay mayroong kaparehong epekto sa gumagamitng mano-manong pag-pindut. Ang pahina ng web ay pweding kanselahin ang pag-sarado sa pamamagitan. Tingnan the [close event](#event-close).

#### `win.focus()
 `

Mag-focus sa window.

#### `win.blur()`

Alisin ang naka-focus mula sa window.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

#### `win.hide()`

Hides the window.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

Gagawin nitong isang window na mapanatili ang hichura ng ratio. Ang sobrang laki ay nagbibigay ng pahintulot sa isang ang developer ay may puwang, na tinukoy sa mga pixel, hindi kasama sa loob ng aspeto Ang ratio kalkulasyon. Ang sinasabi ng API na ito ang pagkakaiba sa pagitan ng isang laki ng window at laki ng nilalaman nito.

Ang pag-sasa alang alang ng normal na window na may HD bidyo player at mga nauugnay na kontrol. Siguro ay mayroong 15 pixels ng mga kontrol sa kaliwang gilid, 25 pixels ng mga kontrol sa kanang gilid at 50 pixels ng mga kontrol sa ilalim ng player. Sa pamamagitan ng mapanatilihin ang 16:9 ratio ng aspeto (karaniwang aspeto ng ratio para sa HD @ 1920x1080) sa loob ang manlalaro mismo ay tatawagan namin ang tungkulin na ito sa mga argumento ng 16/9 at [40, 50]. Ang pangalawang argumento ay hindi pinapahalagahan kung saan ang dagdag na lawak at taas ay nasa loob ng tanaw ng nilalaman - na umiiral lamang ang mga ito. Basta idagdag ang anumang dinagdag na lapad at mga lugar na taas na mayroon ka sa kabuuang tanaw ng nilalaman.

#### `win.previewFile(path[, displayName])` *macOS*

* `daan` String - Ang ganap na daan sa file upang i-ipakita gamit ang QuickLook. Ang mahalaga nito habang ginagamit ng Quick Look ang pangalan ng file at lawig ng file sa daan upang matukoy ang tipo ng nilalaman ng file upang buksan.
* `Ang pagpakita sa pangalan` String (pag-pipilian) - Ang pangalan ng file na ipapakita sa Quick Look modal na tanaw. Ito ay ang malinis na viswal at hindi nakakaapekto sa nilalaman na uri ng file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()`

Nagbabalik[`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Nagbabalik[`Rectangle`](structures/rectangle.md)

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Sets whether the window can be manually resized by user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Ibalik ang `Boolean` - Kung manu-mano ang pinaliit na window ng taga-gamit

Ang Linux ay palaging bumabalik `tama`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Nagtatakda kung ang window ay pweding manu-manong mapakinabangan ng taga-gamit. Sa Linux ay wala.

#### `win.isMaximizable()` *macOS* *Windows*

Ibalik ang `Boolean` - Kung ang manu-manong window ay pweding manu-mano-paliitin ng taga-gamit.

Ang Linux ay palaging bumabalik `tama`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Nagtatakda kung ang pindutan ng window ng pag-papalaki/zoom ay lumilipat sa fullscreen na anyo o magpapakinabang sa window.

#### `win.isFullScreenable()`

Ang pag-balik `Boolean` - Kung ang pindutan ng Pag-papalaki/zoom window ay i-toggle ang fullscreen na anyo o magpapakinabang sa window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `tumawag muli` Punsyon 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error`, or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Magdagdag ng isang thumbnail toolbar na may tinukoy na hilera ng mga pindutan sa thumbnail na larawan ng isang window sa isang layout ng pindutan ng taskbar. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Bagay 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (opsyonal) - Ang teksto ng tooltip sa pindutan.
  * `flags` String[] (opsyonal) - Kontrolin ang tiyak na mga estado at katangian ng mga pindutan. Sa pamamagitan ng default, ito ay `['enabled']`.

Ang `flags` ay isang kaayusan na maaaring isama ang mga sumusunod `String`:

* `enabled` - Ang pindutan ay aktibo at magagamit ng mga gumagamit.
* `disabled` - Ang pindutan ay hindi pinagana. Ito ay kasalukuyan, subalit ito ay may nakikitang estado na nagsasabing ito ay hindi tutugon sa aksyon ng gumagamit.
* `dismissonclick` - Kapag ang pindutan ay pinindot, ang thumbnail window ay agad-agad na magsasara.
* `nobackground` - Huwag gumawa ng hangganan ng pindutan, gamitin lamang ang larawan.
* `hidden` - Ang pindutan ay hindi ipinapakita sa mga gumagamit.
* `noninteractive` - Ang pindutan ay gumagana ngunit hindi interaktibo; walang pagpindot sa estado ng pindutan ang ginawa. Ang bilang na ito ay inilaan para sa pagkakataon na kung saan ang pindutan ay ginagamit sa isang paalala.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `mga pagpipilian` Bagay 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Kpag ang menu bar ay kasalukuyang makikita, ang pag-tawag `setAutoHideMenuBar(true)` hindi ito kayang itago agad.

#### `win.isMenuBarAutoHide()`

Ang mga pagbalik `Boolean` - kung ito ay awtomatikong itinatago ng menu bar.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

I-takda kung saan ang menu bar ay maaring makita. kapag ang menu bar ay kusang nagtatago sa taga-gamit pwedi pa ring ilabas ang menu bar sa paraan ng solong pagpindut `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore)`

* `ignore` Boolean

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Ang pag-pigil sa mga nilalaman ng window mula sa kumkuha ng iba pang apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Ang mga pagtatakda`peyrent`bilang isang peyrent ng window, na dumadaan sa `null` babalik sa kasalukuyang window sa isang mataas na antas ng window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

Nadagdagan ng isang epekto sa pagkalantad sa window ng browser. Pagpasa `null` o ang isang walang laman na string ay tatangalin ang epekto ng pagkalantad sa window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. Ang paraan na ito lamang ang may epekto sa Ang makina ay merong nahahawakang bar at napapatakbo ito sa macOS 10.12.1+.

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.