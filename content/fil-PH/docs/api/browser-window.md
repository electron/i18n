# Kulayan ang bintana

> Paglikha at pag-kontrol ng browser windows.

Proseso:[Pangunahi](../glossary.md#main-process)

```javascript
// Sa mga pangunahing proseso.
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

Proseso:[Pangunahi](../glossary.md#main-process)

`BrowserWindow` ay ang [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Ito ay gumagawa ng panibagong `BrowserWindow` na may likas na mga ari-arian na itinakda ng`opsyon`.

### `ang bagong BrowserWindow([pag-pipilian])`

* `mga opsyon` Na Bagay (opsyonal) 
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) -ioffset ang kaliwang Window mula sa screen. Idefault ang window sa sentro.
  * `y` Integer (optional) (**required** Kung ang x ay nagamit) - Ioffset ang windows sa itaas ng screen Ang Default ay nasa sentro ng windows.
  * `useContentSize` Boolean (optional) - The `width` and `height`ay gagamtin bilang web ang sukat ng pahina, ibig sabihin ang aktwal na sukat ng windoz ay kasama ng sukat ng window frame na medyo malaki. Ang default ay `false`.
  * `center` Boolean (optional) - Makikita ang window sa sentro ng screen.
  * `minWidth` Integer (optional) - Ang windows na mayroong maliit ng lapad Default ay `0`.
  * `minHeight` Integer (optional) - Ang minimum na height ng windows. Default ay `0`.
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
sa macOS. Ang default ay <code>false`.
  * `fullscreenable` Boolean (optional) -Ang Window ay pwedeng ilagay sa fullscreen mode. Sa macOS, pwede din kung ang maximize/Pag papalaki o pag papaliit na buton ay kailangang maging toggle full screen mode o mas malaking window. Ng default ay `tama`.
  * `simpleFullscreen` Boolean (optional) - Gamitin ang pre-Lion fullscreen sa macOS. Ang default ay `false`.
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
  * `backgroundColor` String (optional) - Ang kulay ng Window's Background ay nasa hexadecimal na balyu, tulas ng `#66CD00` or `#FFF` or `#80FFFFFF` (ang alpha ay supportado). Ang default ay `#FFF` (puti).
  * `hasShadow` Boolean (opsyonal) - Kung ang window ay mayroong anino. Ito ay ipinapatupad lamang sa macOS. Ang default ay `true`.
  * `opacity` Number (opsyonal) - Itakda ang paunang opacity sa bintana, sa gitna ng 0.0 (fully transparent) and 1.0 (fully opaque). Ito ay pinatutupad lamang sa Windows at macOS.
  * `darkTheme` Boolean (opsyonal) - Puwersahang gumagamit ng madilim na theme para sa window, gumagana lamang sa ilang mga kapaligiran ng GTK+3 desktop. Ang default ay `false`.
  * `transparent` Boolean (opsyonal) - Ginagawa ang window na [transparent](frameless-window.md). Ang default ay `false`.
  * `type` String (opsyonal) - Ang uri ng window, ang default aynormal na window. Tingnan ang mas maraming tungkol dito sa ibaba.
  * `ang titleBarStyle` String (opsyonal) - Ang istilo ng title bar ng window. Ang default ay `default`Ang posibleng mga halaga ay: 
    * `default` - Ang mga resulta sa standard na gray opaque na title bar ng Mac.
    * `hidden` - Ang mga resulta sa isang nakatagong title bar at isang buong sukat na laman ng window, gayon pa man ang title bar ay mayroon ding mga karaniwang mga kontrol ng window (mga ilaw ng trapiko) sa kaliwang itaas.
    * `hiddenInset` - Ang mga resulta sa isang nakatagong title bar na may isang alternatibong hitsura kung saan ang mga pindutan ng ilaw ng trapiko ay bahagyang nakasingit sa gilid ng window.
    * `customButtonsOnHover` Boolean (optional) - Gumuhit ng pasadyang sarado, paliitin, at mga buong screen button sa macOS frameless windows. Ang mga pindutan na ito ay hindi ipapakita maliban kung ang hovered sa itaas sa kaliwang itaas ng window. Ang pasadyang ito Ang mga pindutan ay maiiwasan ang mga problema sa mga pang-yayari ng mouse na nangyayari sa pamantayan Mga kasangkapanng bar sa pindutan ng window. **Note:** Ang opsyon na ito ay kasalukuyang eksperimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (opsyonal) - Gamitin ang istilo ng `WS_THICKFRAME` para sa walang kaayusang windows sa Windows, kung saan nagdadagdag ng karaniwang ayos ng window. Ang tagpo nito sa `false`ay tanggalin ang window shadow at animation window. Ang Default ay `true`.
  * `vibrancy` String (opsyonal) - Ang pag-dagdag ng isang tipo ng epekto ng vibrancy sa window, lamang sa Mac Os. Ay maaaring maging `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` o `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (opsyonal) Ito ay may kakayahang mag control ng behavior ng macOS kapag opsyonal na pag pindot ng berdeng hintong ilaw na buton na makikita sa toolbar o pag pinindot ang Window >Zoom menu item. If `true`, ang window ay lumalaki sa sagad na lapad sa nakabukas na pahina kapag ito ay naka zoomed `false` ay magagamit kapag nais mong palakihin at palaparin ang screen. Ito rin ay makakaapekto sa behavior kung ang tawag `maximize(),/0>diretsyo. Ang default ay <code>false`.
  * `tabbingIdentifier` String (opsyonal) - Pangalan ng grupo ng tab, pinapayagang buksan ang window bilang isang natural na tab sa macOS 10.12+. Ang Windows na may magkatulad na tagakilala ng tabbing ay maaaring pagsama-samahin sa isang grupo. Magdadagdag din ito ng isang natural na bagong pindutan ng tab sa tab bar ng iyong window at pinapayagan ang iyong `app` at window para tanggapin ang kaganapan ng `new-window-for-tab`.
  * `ang webPreferences` Mga bagay (opsyonal) - Ang mga pagtatakda ng mga katangian ng pahina ng web. 
    * `devTools` Boolean (opsyonal) - Kung pinagana ang mga Dev Tool. Kung ito ay itinakda sa `false`, ay hindi maaaring gamitin ang `BrowserWindow.webContents.openDevTools()` para buksan ang mga Dev Tool. Ng default ay `tama`.
    * Ang `nodeIntegration` Boolean (opsyonal) - Kung ang pagsasama ng node ay pinagama na. Ang default ay `true`.
    * Ang `nodeIntegrationInWorker` Boolean (opsyonal) - Kung ang pagsasama ng node ay pinagana na sa mga tagagawa ng web. Ang default ay `false`. Mas maraming tungkol dito ay maaaring matagpuan sa [Multithreading](../tutorial/multithreading.md).
    * `preload` String (opsyonal) - Tinutukoy ang isang iskrip na ikakarga bago ang ibang mga iskrip ay dumaan sa mga pahina. Ang iskrip na ito ay laging mayroong access sa mga API ng node hindi mahalaga kung ang pagsasama ng node ay binuksan o isinara. Ang halaga ay ang maaring magiging tungkulin ng path file sa script. Kung naka-patay ang pagsasama ng node, pweding ipakilala ulit ang preload script Ang Node global na sagisag pabalik sa global na sakop. Tignan ang halimbawa [here](process.md#event-loaded).
    * `sandbox` Boolean (opsyonal) - Kung itinakda, ito ay isa-sandbox ang tagasalin na may kaugnayan sa window, gagawin itong katugma sa antas ng sandbox ng Chromium OS at pahihintuin ang makina ng Node.js. Ito ay hindi ang katulad ng ang `nodeIntegration` opsyon at ang mga API na magagamit sa pag-preload ng script ay mas malilimitahan. Basahin ng mabuti ang hingil sa opsyon [here](sandbox-option.md). **Tandaan:** Ang kasalukuyang pagpipilian ng eksperimentong ito at pweding magbago o maging tanggalin sa hinaharap na paglabas ng electron.
    * `session` [Session](session.md#class-session) (opsyonal) - Mag-takda ng mga sesyon kung saan ginagamit ang pahina. Sa halip na direktang ipasa ang layon ng sesyon, pwedi ka rin pumili sa Ang pag-gamit ng `partition` opsyon imbes, na tumatanggap ng string ng partition. Kung kelan Ang parehong `sesyon` and `partition` ay naglalaan para sa, `sesyon` maaring maging ginusto. Ang default ay ang default na sesyon.
    * `partition` String (opsyonal) - Itinatakda ang sesyon na ginagamit ng mga pahina ng ayon sa mga string na partisyon ng mga sesyon. Kung ang `partition` ay nagsisimula na may `persist`, ang pahina ay gagamit ng isang paulit-ulit na sesyon na magagamit sa lahat ng mga pahina sa mga app na may kaparehas na `partition`. Kung wala ang unlaping `persist`, ang pahina ay gagamit ng isang nasa memoryang sesyon. Sa pag-aatas ng kaparehong `partition`, maramihang mga pahina ang maaaring magsalo-salo sa magkaparehong sesyon. Ang default ay ang default na sesyon.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
    * Ang `zoomFactor` Numero (opsyonal) - Ang default na sanhi ng zoom ng mga pahina, `3.0` ay kumakatawan sa `300%`. Ang default ay `1.0`.
    * Ang `javascript` Boolean (opsyonal) - Pinapagana ang suporta ng JavaScript. Ang default ay `true`.
    * Ang `webSecurity` Boolean (opsyonal) - Kapag `false`, ihihinto nito ang patakaran ng parehong pinagmulan (kadalasan ay ang ginagamit ang mga sinubok na website ng mga tao), at itinakda ang `allowRunningInsecureContent` sa `true` kung ang opsyon na ito ay hindi itinakda ng gumagamit. Ang Default ay `true`.
    * Ang `allowRunningInsecureContent` Boolean (opsyonal) - Pinapayagan ang isang pahina ng https na paganahin ang JavaScript, CSS o mga plugin mula sa mga URL ng http. Ang default ay `false`.
    * Ang `images` Boolean (opsyonal) - Pinapagana ang suporta sa imahe. Ang default ay `true`.
    * Ang `textAreasAreResizable` Boolean (opsyonal) - Palakihin ang sukat ng mga elemento ng TextArea. Ang default ay `true`.
    * Ang `webgl` Boolean (opsyonal) - Pinapagana ang suporta sa WebGL. Ang default ay `true`.
    * Ang `webaudio` Boolean (opsyonal) - Pinapagana ang suporta sa WebAudio. Ang default ay `true`.
    * Ang `plugins` Boolean (opsyonal) - Kung ang mga plugin ay dapat na pinagana. Ang default ay `false`.
    * `EkspirementongMgaTampok` Boolean (optional) - Pinapatakbo ang mga na-eksperimentong tampok ng Chromium. Ang default ay `mali`.
    * Ang `experimentalCanvasFeatures` Boolean (opsyonal) - Pinapagana ang in-eksperimentong kanbas na mga katangian ng Chromium. Ang default ay `false`.
    * Ang `scrollBounce` Boolean (opsyonal) - Pinapagana ang pag-scroll bouce (pagra-rubber band) na epekto sa macOS. Ang default ay `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (opsyonal) - Ang talaan ng mga tampok ng strings ay pinag-hiwalay ng `,`, katulad ng `CSSVariables,KeyboardEventKey` upang hindi mapagana. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `ang defaultFontFamily` Bagay (opsyonal) - Itinatakda ang default na font para sa pamilya ng font. 
      * Ang `standard` String (opsyonal) - Ang mga default para sa `Times New Roman`.
      * Ang `serif` String (opsyonal) - Ang mga default para sa `Times New Roman`.
      * Ang `sansSerif` String (opsyonal) - Ang mga default para sa `Arial`.
      * Ang `monospace` String (opsyonal) - Ang mga default para sa `Courier New`.
      * Ang `cursive` String (opsyonal) - Ang mga default para sa `Script`.
      * Ang `fantasy` String (opsyonal) - Angmga default para sa `Impact`.
    * Ang `defaultFontSize` Integer (opsyonal) - Ang mga default para sa `16`.
    * Ang `defaultMonospaceFontSize` Integer (opsyonal) - Ang mga default para sa `13`.
    * Ang `minimumFontSize` Integer (opsyonal) - Ang mga default para sa `0`.
    * Ang `defaultEncoding` String (opsyonal) - Ang mga default para sa `ISO-8859-1`.
    * `backgroundThrottling` Boolean (opsyonal) - Kapag sinakal ang mga animation at timers kapag ang pahina ay maging background. Ito ay maaring makaapekto sa [Page Visibility API](#page-visibility). Ang default sa `tama`.
    * `offscreen` Boolean (opsyonall) - Kung papaganahin ang pag-render ng offscreen para sa browser ng window. Ang default na `mali`. Tignan ang [pagtuturo sa pag rerender ng offscreen](../tutorial/offscreen-rendering.md) para sa mas maraming paliwanag.
    * `contextIsolation` Boolean (o[syonal) - Maging ang pagpapatakbo ng Electron APis at Ang pagtukoy `preload` Ang script sa magkakahiwalay na nilalaman ng JavaScript. Ang mga default para sa `false`. Ang nilalaman na iyon ang `preload` Ang script ay mayroong kabuuang access upang tumatakbo sa `dokumento` at `window` globals subalit gagamitin nito sarili nitong hilera ng pag-tatag ng JavaScript (`Array`, `Object`, `JSON`, etc.) at pinag-hihiwalay mula sa alinmang mga pagbabagong ginawa sa pandaigdigang kapaligiran sa paraan ng pag-karga ng pahina. Ang Electron API ay maaaring maging pwedi lamang sa `preload` ang script at hindi ang ikinargang pahina. Ang opsyon na ito ay kailangan magamit kapag Ang pagkakarga ng potensyal na hindi mapag-kakatiwalaan na nilalaman ng remote upang masiguro ang nilalaman ng pag-karga ay hindi pweding galawin ang `preload` Ang script at ang alinmang Electron APIs ay kasalukuyang ginagamit. Ang opsyon sa pag-gamit ng mag-katulad na estilo ay ginagamit ng [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Pwedii mong i-access ang nilalamang ito sa mga tool ng dev sa parang pagpili sa Ang ipinasok na 'Electron Isolated Context' sa kombo kaahon sa itaas ng Tab ng Console. **Tandaan:** Ang opsyon na ito ay kasalukuyang pinag i-ekspirementohan at pweding baguhin o tanggalin sa hinaharap na mga pag-labas ng Electron.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * Ang `webviewTag` Boolean (opsyonal) - Kung pagaganahin ang [`<webview>` tag](webview-tag.md). Ang mga default sa mgahalaga ng mga opsyon ng `nodeIntegration`. **Note:** Ang iskrip ng `preload` ay isinaayos para ang `<webview>` ay may pagsasama-sama ng node na pinagana kapag ito ay naisakatuparan kaya dapat mong siguraduhin na ang malayo/hindi mapagkakatiwalaang nilalaman ay hindi makakagawa ng isang tag`<webview>` na may isang posibleng malisyosong iskrip `preload`. Maaari mong gamitin ang kaganapan ng `will-attach-webview` sa [webContents](web-contents.md) para tanggalin ang iskrip ng `preload` at patunayan o pasubalian ang inisyal na mga pagtatakda sa `<webview>`.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

Kapag nagtatakda ng minimum o maximum na laki ng window `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, pinipigilan lamang nito ang mga gumagamit. Hindi nito mapipigilan ka pagpasa ng isang sukat na hindi sumusunod sa mga hadlang sa laki `setBounds`/`setSize` o sa tagapagbuo ng `BrowserWindow`.

Ang mga posibleng halaga at pag-uugali ng pagpipiliang `type` ay nakasalalay sa platform. Ang mga posibleng halaga ay:

* Sa Linux, posibleng mga uri `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* Sa macOS, posibleng mga uri `desktop`, `textured`. 
  * Ang `textured` uri ay nagdaragdag ng gradient na anyo ng metal (`NSTexturedBackgroundWindowMask`).
  * Ang `desktop` uri ay naglalagay ng window sa antas ng desktop background ng desktop (`kCGDesktopWindowLevel - 1`). Tandaan na hindi tatanggap ang desktop window focus, keyboard o mouse event, ngunit maaari mong gamitin ang `globalShortcut` upang makatanggap mas mahaba ang input.
* Sa Windows, ang posibleng uri ay `toolbar`.

### Halimbawa ng mga Event

Nilikha ang mga bagay with `new BrowserWindow` naglalabas ng mga sumusunod na pangyayari:

**Note:** Ang ilang mga event ay magagamit lamang sapartikular na mga operating system at ay tinatakan tulad nito.

#### Event: 'page-title-updated'

Ibinabalik ang:

* `kaganapan` kaganapan
* `title` String

Napalabas kapag binago ng dokumento ang pamagat nito, na nagtawag sa `event.preventDefault()` ay maiiwasan ang pamagat ng katutubong window sa pagbabago.

#### Event: 'isara'

Ibinabalik ang:

* `kaganapan` Kaganapan

Napalabas kapag ang window ay sarado. Ito ay pinalabas bago ang `beforeunload` at `mag-alis ng buo` kaganapan ng DOM. Pagtawag `event.preventDefault()` kanselahin ang malapit.

Kadalasan ay nais mong gamitin ang `beforeunload` handler upang magpasiya kung ang dapat sarado ang window, na kung saan ay tinatawag ding kapag ang window ay Na-reload. Sa Electron, ibabalik ang anumang halaga maliban sa `undefined` malapit na. Halimbawa:

```javascript
window.onbeforeunload = (e) => {
  console.log('Hindi ko gustong maisarado')
// Hindi katulad nang karaniwang browsers na ang kahon ng mensahe ay i-promot sa mga gumagamit, binabalik
// ang hindi-void na balyu ay tahimik na kakanselahin ang pag sirado.
  // Inerekomenda na gumamit ng dialog API upang hayaan ang gumagamit na kompirmahin ang pagsirado
// aplikasyon.
  e.returnValue = false // equivalent to `return false` pero hindi inerekomenda
}
```

***Tandaan**: Merong banayad na pagkakaiba sa pagitan ng pag-uugali ng `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of just returning a value, as the former works more consistently within Electron.*

#### Kaganapan: 'i-minimize'

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

#### Event: 'ipakita'

Ay lalabas kapag ang window ay ipinakita.

#### Kaganapan: 'itago'

Ay lalabas kapag ang window ay itinago.

#### Kaganapan: 'handa- ng- ipakita'

Ay lalabas kapag ang pahina ng web ay naisalin na (habang hindi pa ipinapakita) at ang window ay maaaring i-displey nang walang isang bisuwal na flash.

#### Kaganapan: 'palakihin'

Ay lalabas kapag ang window ay pinalaki.

#### Kaganapan: 'hindi pinalaki'

Ay lalabas kapag ang window ay lumabas mula sa pinalaking estado.

#### Kaganapan: 'i-minimize'

Ay lalabas kapag ang window ay pinaliit.

#### Kaganapan: 'ibalik'

Ay lalabas kung ang window ay binalik galing sa pinaliit na estado.

#### Kaganapan: 'baguhin ang laki'

Ay lalabas kung ang window ay binago ang laki.

#### Kaganapan: 'ilipat'

Ay lalabas kung ang window ay inilipat sa bagong posisyon.

**Note**: On macOS this event is just an alias of `moved`.

#### Kaganapan: 'inilipat' * macOS *

Ay lalabas kapag ang window ay inilipat sa bagong posisyon.

#### Kaganapan: 'enter-full-screen'

Ay lalabas kung ang window ay pumasok sa full-screen na estado.

#### Kaganapan: 'leave-full-screen'

Ay lalabas kung ang window a aalis na sa full-screen na estado.

#### Event: 'enter-html-full-screen'

Ay lalabas kapag pumasok ang window ng isang full-screen na estado ayy na-trigger ng HTML API.

#### Event: 'leave-html-full-screen'

Ay lalabas kung ang window ay aalis na sa full-screen na estado ay na-trigger ng HTML API.

#### Kaganapan: 'app-command' * Windows *

Ibinabalik ang:

* `event` Event
* `command` String

Ay lalabas kung ang [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) ay nananawagan. Ang karaniwang pinag-uugna ito sa mga keyboard key ng media o browser mga atas, pati na rin ang pindutang "i-balik" na itinatatag sa ilang mga mouse sa Windows.

Ang mga atas ay lowercase, ang mga underscore ay binabago ang mga gitling, at ang `APPCOMMAND_` nakuha ang prefix sa. e.g. `APPCOMMAND_BROWSER_BACKWARD`ay lalabas bilang `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Mag-navigate sa window pabalik kapag pinindot ng gumagamit ang kanilang pindutan ng back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Kaganapan: 'scroll-touch-begin' * macOS *

Ay lalabas kung ang scroll wheel na bahagi ng kaganapan ay magsimula.

#### Kaganapan: 'scroll-touch-end' * macOS *

Ay lalabas kung ang scroll wheel na bahagi ng kaganapan ay natapos na.

#### Kaganapan: 'scroll-touch-edge' *macOS*

Ay lalabas kung ang scroll event na bahagi ng kaganapan sa pag-abot sa gilid ng elemento.

#### Kaganapan: 'swipe' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `direction` String

Pinapalabas sa 3-finger swipe. Ang mga posibleng direksyon ay ` up `, ` kanan `, ` pababa `, ` kaliwa `.

#### Kaganapan: 'sheet-begin' *macOS*

Napalabas kapag nagbukas ang window ng sheet.

#### Kaganapan: 'sheet-end' *macOS*

Ay lalabas kapag nakasara ang isang sheet ng window.

#### Event: 'new-window-for-tab' *macOS*

Ay lalabas kung ang native ng pindutan ng bagong tab ay na-click.

### Static na pamamaraan

Ang `BrowserWindow`: klas na ito ay mayroong sumusunod na static na pamamaraan:

#### `BrowserWindow.getAllWindows()`

Binabalik ang ` BrowserWindow [] ` - Ang array ng lahat ng windows na browser na binuksan.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Ibinabalik `BrowserWindow` - Ang window na nagmamay-ari ng ibinigay na `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Binabalik ang `BrowserWindow | null` - Ang window na nagmamay-ari ng ibinigay na `browserView`. Kung ang ibinigay na tanawin ay hindi nakakabit sa alinmang window, binabalik ang `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Ibinabalik `BrowserWindow` - Ang window na may ibinigay na `id`.

#### `BrowserWindow.addExtension(landas)`

* `path` String

Nagdadagdag ng extension ng Chrome na matatagpuan sa `path`, at nagbalik ng pangalan ng extension.

Ang pamamaraan ay hindi maaring babalik kung ang manifest ng ekstensyon ay nawawala o hindi kumpleto.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeExtension(pangalan)`

* `name` String

Alisin ang pangalan ng extension ng Chrome.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getExtensions()`

Babalik `Object` - Ang mga key ay ang mga pangalan ng extension at bawat halaga isang Bagay na naglalaman ng mga katangian ng `name` at `version`ari-arian.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.addDevToolsExtension(landas)`

* `path` String

Nagdaragdag ng extension ng DevTools na matatagpuan sa `path`, at nagbalik ng pangalan ng extension.

Ang ekstensyon ay maaalala kaya kinakailangan mo lamang tumawag ng isang beses sa API na ito, ito Ang API ay hindi magagamit sa programming. Kung susubukin mong magdagdag ng ekstensyon na pweding mayroon na Na-ikarga, ang paraan na ito ay hindi mai-babalik at sa halip mag-log ng babala sa console.

Ang pamamaraan ay hindi maaring babalik kung ang manifest ng ekstensyon ay nawawala o hindi kumpleto.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeDevToolsExtension(pangalan)`

* `name` String

Alisin ang isang extension ng DevTools ayon sa pangalan.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getDevToolsExtensions()`

Babalik `Object` - Ang mga key ay ang mga pangalan ng extension at bawat halaga isang Bagay na naglalaman ng mga katangian ng `name` at `version`ari-arian.

Upang masuri kung naka-install ang extension ng DevTools maaari mong patakbuhin ang sumusunod:

```javascript
const {BrowserWindow} = require('electron')

Hayaan ma install ang = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

### Mga Katangian ng Instance

Ang mga bagay na nilikha gamit ang `new BrowserWindow` ay may mga sumusunod na katangian:

```javascript
const {BrowserWindow} = kinakailangan('electron')
// Sa halimbawa na ito `panalo` ay ating halimbawa
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Ang `WebContents` layunin ng amay-ari ng window na ito. Lahat ng mga koneksyon na pangyayari sa web at ang mga operasyon ay gagawin sa paraan nito.

Tignan ang [`webContents` dokomentasyon](web-contents.md) para sa pamamaraang ito at sa okasyon.

#### `win.id`

Ang `Integer` Ini-rerepresenta ang kakaibang ID ng window na ito.

### Mga Pamamaraan ng Instance

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

Bumalik `Boolean` - Kung nakatutok ang window.

#### `win.isDestroyed()`

Ibinabalik `Boolean` - Kung ang window ay nawasak.

#### `win.show()`

Nagpapakita at nagbibigay ng focus sa window.

#### `win.showInactive()`

Nagpapakita ng window ngunit hindi tumutuon dito.

#### `win.hide()`

Itinatago ang bintana.

#### `win.isVisible()`

Nagbabalik `Boolean` - Kung ang window ay nakikita sa user.

#### `win.isModal()`

Bumalik `Boolean` - Kung ang kasalukuyang window ay isang modal window.

#### `win.maximize()`

Pinapalaki ang window. Ipapakita rin nito (buti not focus) sa window kung ito ay hindi na ipinapakita.

#### `win.unmaximize()`

Pag-unmaximize sa windows.

#### `win.isMaximized()`

Binabalik ang `Boolean` - Kung ang window ay naka maximized.

#### `win.minimize()`

Binabawasan ang window. Sa ilang mga platform ang minimize na window ay ipapakita sa isang Dock.

#### `win.restore()`

Binabalik ang window galing sa pinaliit na estado sa nakaraan na estado.

#### `win.isMinimized()`

Binabalik ang `Boolean` - Kung saan ang window ay naka maximized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Itinatakda kung ang window ay dapat na sa fullscreen na mode.

#### `win.isFullScreen()`

Binabalik ang `Boolean` - Kung ang window ay nasa fullscreen na mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Pagpasok o pag-alis sa simpleng fullscreen na mode.

Ang simpleng fullscreen mode ay nagpapalabas ng katutubong pag-uugali ng fullscreen na natagpuan sa mga bersyon ng Mac OS X bago ang Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Binabalik ang `Boolean` - Kung saan ang window ay nasa simpleng(pre-Lion) na fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* ` aspectRatio ` Float - Ang aspect ratio upang mapanatili para sa ilang bahagi ng nilalaman ng view.
* ` extraSize ` [ Size ](structures/size.md) - Ang sobrang laki na hindi dapat isama habang pagpapanatili ng aspect ratio.

Gagawin nitong isang window na mapanatili ang hichura ng ratio. Ang sobrang laki ay nagbibigay ng pahintulot sa isang ang developer ay may puwang, na tinukoy sa mga pixel, hindi kasama sa loob ng aspeto Ang ratio kalkulasyon. Ang sinasabi ng API na ito ang pagkakaiba sa pagitan ng isang laki ng window at laki ng nilalaman nito.

Ang pag-sasa alang alang ng normal na window na may HD bidyo player at mga nauugnay na kontrol. Siguro ay mayroong 15 pixels ng mga kontrol sa kaliwang gilid, 25 pixels ng mga kontrol sa kanang gilid at 50 pixels ng mga kontrol sa ilalim ng player. Sa pamamagitan ng mapanatilihin ang 16:9 ratio ng aspeto (karaniwang aspeto ng ratio para sa HD @ 1920x1080) sa loob ang manlalaro mismo ay tatawagan namin ang tungkulin na ito sa mga argumento ng 16/9 at [40, 50]. Ang pangalawang argumento ay hindi pinapahalagahan kung saan ang dagdag na lawak at taas ay nasa loob ng tanaw ng nilalaman - na umiiral lamang ang mga ito. Just sum any extra width and height areas you have within the overall content view.

#### `win.previewFile(path[, displayName])` *macOS*

* `daan` String - Ang ganap na daan sa file upang i-ipakita gamit ang QuickLook. Ang mahalaga nito habang ginagamit ng Quick Look ang pangalan ng file at lawig ng file sa daan upang matukoy ang tipo ng nilalaman ng file upang buksan.
* `Ang pagpakita sa pangalan` String (pag-pipilian) - Ang pangalan ng file na ipapakita sa Quick Look modal na tanaw. Ito ay ang malinis na viswal at hindi nakakaapekto sa nilalaman na uri ng file. Defaults sa `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opsyonal) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()`

Nagbabalik[`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opsyonal) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Nagbabalik[`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (opsyonal) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(lapad, taas[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (opsyonal) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(lapad, taas)`

* `lapad` Integer
* `taas` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(lapad, taas)`

* `lapad` Integer
* `taas` Integer

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

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (opsyonal) *macOS* -Mga balyu na kasali `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). Ang pag-default ay `floating`. Tignan ang [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) para sa maraming mga detalye.
* `relativeLevel` Integer (optional) *macOS* - Ang dami ng suson ay mataas sa set itong window ay may kaugnayan sa ibinibigay `level`. Ang kawalan ay `0`. Tanda ng ansanas hinihikayat ang antas ng setting na mas mataas sa 1 na itataas `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opsyonal) *macOS*

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

* `offsetY` Lumutang
* `offsetX` Lumutang (optiona)

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

* `laktawan` Boolean

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

* `mensahe` Integer
* `baliktawag` ginagawa

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `mensahe` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `mensahe` Integer

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

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Para ma-makuha ang bounds
* `callback` Punsyon 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` Tali
* `mga opsyon` Na Bagay (opsyonal) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String(opsyonal) - Ang ahente na gumagamit ng pinagmumulan ng kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String(opsyonal) - Basi nag url (may tagapahiwalay sa landas ng separator) para sa mga dokumento na kakargahin sa pamamagitan ng datos ng url. Ito ay kinakailangan lamang kung ang tinutukoy na `url` ay isang url ng data at kailangang mag-load ng iba pang mga file.

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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Doble
* `mga opsyon` Na Bagay (opsyonal) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - Ang deskripsyon na dapat maibigay pasa sa Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - sa gitna ng 0.0 (fully transparent) at 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

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

* `pagpipilian` Bagay 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
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

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `huwag pansinin` Boolean
* `pagpipilian` Bagay (opsyonal) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.