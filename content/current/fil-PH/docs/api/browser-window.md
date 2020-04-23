# Ang Browser ng Window

> Paglikha at pag-kontrol ng browser windows.

Proseso:[Pangunahi](../glossary.md#main-process)

```javascript
// Sa mga pangunahing proseso.
const { BrowserWindow } = require('electron')

// O gamitin ang `remote` galing sa rendere process.
// const { BrowserWindow } = kinakailangan ('electron').remote

let win = bagong BrowserWindow({ width: 800, height: 600 })
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

## Gamitin ang `mag-handa na upang ipakita` okasyon

Habang ikinakarga ang pahina, ang `mag-handa na upang ipakita` Ang kaganapan ay ipapalabas kapag ang taga-render Ang tagapag-proseso ay nag-rerender ng pahina sa unang pagkakataon kung ang bintana ay hindi pa ipinapakita. Ipinapakita ang bintana pagkatapos ng okasyon na ito ay walang biswal na flash:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Ang okasyong ito ay karaniwang ibinubuga pagkatapos ng `natapos ba ang pag-kakarga` okasyon, subalit para sa mga pahina na may maraming remote na mapagkukunan, pwedi itong maipakita bago ang `natapos ba ang pag-kakarga` okasyon.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

## Ang pag-tatagpo ng `likurang kulay`

Ang isangkumplikado na app, ang `handa na upang ipakita` Ang okasyon ay pweding napalabas nang huli, na ginagawa pakiramdam ang app ay mabagal. Sa kasong ito, ito ay inirerekomenda na ipakita ang window kaagad, at gumamit ng isang `backgroundColor` isarado ang background na mga app:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Tandaan na kahit sa ginamit na app `ihanda upang ipakita` lokasyon, Dito inirerekomenda ang lokasyon `backgroundColor` upang gawing mas likas ang nararamdaman sa app.

## Ang magulang at batang window

Sa pamamagitan ng pag-gamit `ang magulang` opsyon, pwedi kang gumawa ng mga window ng bata:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Ang `anak` Ang window ay palaging ipapakita sa ibabaw `ibabaw` window.

## Mga windows na Modal

Ang isang modal na window ay isang window ng bata na hindi pinapagana ang window ng magulang, upang gumawa ng modal window, kailangan mong itakda ang mag-katulad `magulang` at `modal` pagpipilian:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Ang kakayahan na makita ang pahina

Ang [pahina ng pag-papakita ng API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) ang pag-tatrabaho ng sumusunod:

* Sa lahat ng mga platform, ang kakayahang makakita ng estado ay sumusubaybay kung ang window ay ay itinatago/napaliit o hindi.
* Bukod pa, sa macOS, ang kakayahang makakita ng estado ay sumusubaybay din sa window estado ng occlusion. Kapag ang window ay okado (i.e. ganap na sakop) sa ibang window, ang kakayahang makakita ng estado ay magiging `tago`. Sa iba pang mga platform, ang ang kakayahan ng estado ay `nakatago` kapag ang window lamang ay pinapaliit o tahasang nakatago sa `win.hide()`.
* Kapag ang `BrowserWindow` ay ginagawa ng `ipakita: mali`, ang inisyal na kakahayang maka kita Ang estado ay pweding `visible` sa kabila ng window na talagang nakatago.
* Kapag `backgroundThrottling` ay hindi pinagana, ang kalagayan ng kakayahang makakita ay mananatiling `visible` kahit na ang window ay pinaliit, kasama, o nakatago. Context | Request Context.

Ang Inirerekomenda na i-hinto mo ang mga mahahalagang operasyon kapag ang may kakayahang makita ang estado ay `hidden` upang mabawasan ang pagkonsumo ng kuryente.

## Babala sa plataporma

* Sa macOS na modal windows ay ipinapakita ang bilang ng mga sheet na naka-sama sa window ng magulang.
* Sa macOS ang mga bintana ng anak ay pinapanatili ang kamag-anak na posisyon sa bintana ng magulang kapag ang window ng magulang ay gumagalaw, habang sa Windows at Linux bintana ng bata ay hindi nailipat.
* Sa Linux ang tipo ng modal windows ay mababago sa `dayalogo`.
* Ang ay Linux maraming mga kapaligiran sa desktop ang hindi suportado sa pagtatago ng modal window.

## Ang Klase: ng BrowserWindow

> Paglikha at pag-kontrol ng browser windows.

Proseso:[Pangunahi](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Ito ay gumagawa ng panibagong `BrowserWindow` na may likas na mga ari-arian na itinakda ng`opsyon`.

### `ang bagong BrowserWindow([pag-pipilian])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (optional) - The `width` and `height`ay gagamtin bilang web ang sukat ng pahina, ibig sabihin ang aktwal na sukat ng windoz ay kasama ng sukat ng window frame na medyo malaki. Ang default ay `false`.
  * `center` Boolean (optional) - Makikita ang window sa sentro ng screen.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. Ang Default ay `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Ang Default ay `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Ang Default ay `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Ang Default ay `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Ang Default ay `true`.
  * `focusable` Boolean (opsyonal) - Kung ang window ay kayang mag focused. Default ay `true`. Sa Windows setting `katumbukan: mali`nag papahiwatig din ng setting`SkipTasbar: katotohanan`. Sa setting ng Linux `focusable: false </ 0> ay may kakayahang patigilin ang interaksyon sa wm, kaya ang window ay laging manatili na tuktok sa lahat ng lugar ng pinagtatrabahuhan.</li>
<li><code>alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Ang default ay `false`.
  * `fullscreen`Boolean(opsyonal)- Dapat ipakita ang window sa fullscreen. Kailan explicitly set to ` false </ 0> ang fullscreen na pintdutan ay hindi makikita o hindi pinagana
sa macOS. Ang default ay <code>false`.
  * `fullscreenable` Boolean (optional) -Ang Window ay pwedeng ilagay sa fullscreen mode. Sa macOS, pwede din kung ang maximize/Pag papalaki o pag papaliit na buton ay kailangang maging toggle full screen mode o mas malaking window. Ang Default ay `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Ang default ay `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Ang default ay `false`.
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal) - Ang icon ng window. Sa windos mismo ay nirerekomenda na gamitin ang `ICO` para makakuha ng magandang mga effects ay pwede mong gawin lagyan ito ng guhit sa ilalim nang sa ganun ito ay maeexecute at ang icon ay pwede ng magamit.
  * `show` Boolean (optional) - Whether window should be shown when created. Default ay `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created.  In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`.  Setting this to `false` will cause the `ready-to-show` event to not fire.  Ang Default ay `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Ang Default ay `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Ang default ay `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Ang default ay `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Ang default ay `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Ang default ay `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Ang Default ay `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Ang default ay `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Ang default ay `false`. On Windows, does not work unless the window is frameless.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
    * `default` - Ang mga resulta sa standard na gray opaque na title bar ng Mac.
    * `hidden` - Ang mga resulta sa isang nakatagong title bar at isang buong sukat na laman ng window, gayon pa man ang title bar ay mayroon ding mga karaniwang mga kontrol ng window (mga ilaw ng trapiko) sa kaliwang itaas.
    * `hiddenInset` - Ang mga resulta sa isang nakatagong title bar na may isang alternatibong hitsura kung saan ang mga pindutan ng ilaw ng trapiko ay bahagyang nakasingit sa gilid ng window.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** Ang opsyon na ito ay kasalukuyang eksperimental.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Ang default ay `false`.
  * `thickFrame` Boolean (opsyonal) - Gamitin ang istilo ng `WS_THICKFRAME` para sa walang kaayusang windows sa Windows, kung saan nagdadagdag ng karaniwang ayos ng window. Ang tagpo nito sa `false`ay tanggalin ang window shadow at animation window. Ang Default ay `true`.
  * `vibrancy` String (opsyonal) - Ang pag-dagdag ng isang tipo ng epekto ng vibrancy sa window, lamang sa Mac Os. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`.  Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, ang window ay lumalaki sa sagad na lapad sa nakabukas na pahina kapag ito ay naka zoomed `false` ay magagamit kapag nais mong palakihin at palaparin ang screen. Ito rin ay makakaapekto sa behavior kung ang tawag `maximize(),/0>diretsyo. Ang default ay <code>false`.
  * `tabbingIdentifier` String (opsyonal) - Pangalan ng grupo ng tab, pinapayagang buksan ang window bilang isang natural na tab sa macOS 10.12+. Ang Windows na may magkatulad na tagakilala ng tabbing ay maaaring pagsama-samahin sa isang grupo. Magdadagdag din ito ng isang natural na bagong pindutan ng tab sa tab bar ng iyong window at pinapayagan ang iyong `app` at window para tanggapin ang kaganapan ng `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (opsyonal) - Kung pinagana ang mga Dev Tool. Kung ito ay itinakda sa `false`, ay hindi maaaring gamitin ang `BrowserWindow.webContents.openDevTools()` para buksan ang mga Dev Tool. Ang Default ay `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Ang default ay `false`.
    * Ang `nodeIntegrationInWorker` Boolean (opsyonal) - Kung ang pagsasama ng node ay pinagana na sa mga tagagawa ng web. Ang default ay `false`. Mas maraming tungkol dito ay maaaring matagpuan sa [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (opsyonal) - Tinutukoy ang isang iskrip na ikakarga bago ang ibang mga iskrip ay dumaan sa mga pahina. Ang iskrip na ito ay laging mayroong access sa mga API ng node hindi mahalaga kung ang pagsasama ng node ay binuksan o isinara. Ang halaga ay ang maaring magiging tungkulin ng path file sa script. Kung naka-patay ang pagsasama ng node, pweding ipakilala ulit ang preload script Ang Node global na sagisag pabalik sa global na sakop. Tignan ang halimbawa [here](process.md#event-loaded).
    * `sandbox` Boolean (opsyonal) - Kung itinakda, ito ay isa-sandbox ang tagasalin na may kaugnayan sa window, gagawin itong katugma sa antas ng sandbox ng Chromium OS at pahihintuin ang makina ng Node.js. Ito ay hindi ang katulad ng ang `nodeIntegration` opsyon at ang mga API na magagamit sa pag-preload ng script ay mas malilimitahan. Basahin ng mabuti ang hingil sa opsyon [here](sandbox-option.md).
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Ang Default ay `true`.
    * `session` [Session](session.md#class-session) (opsyonal) - Mag-takda ng mga sesyon kung saan ginagamit ang pahina. Sa halip na direktang ipasa ang layon ng sesyon, pwedi ka rin pumili sa Ang pag-gamit ng `partition` opsyon imbes, na tumatanggap ng string ng partition. Kung kelan Ang parehong `sesyon` and `partition` ay naglalaan para sa, `sesyon` maaring maging ginusto. Ang default ay ang default na sesyon.
    * `partition` String (opsyonal) - Itinatakda ang sesyon na ginagamit ng mga pahina ng ayon sa mga string na partisyon ng mga sesyon. Kung ang `partition` ay nagsisimula na may `persist`, ang pahina ay gagamit ng isang paulit-ulit na sesyon na magagamit sa lahat ng mga pahina sa mga app na may kaparehas na `partition`. Kung wala ang unlaping `persist`, ang pahina ay gagamit ng isang nasa memoryang sesyon. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. Ang default ay ang default na sesyon.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. _This property is experimental_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Ang Default ay `true`.
    * Ang `webSecurity` Boolean (opsyonal) - Kapag `false`, ihihinto nito ang patakaran ng parehong pinagmulan (kadalasan ay ang ginagamit ang mga sinubok na website ng mga tao), at itinakda ang `allowRunningInsecureContent` sa `true` kung ang opsyon na ito ay hindi itinakda ng gumagamit. Ang Default ay `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Ang default ay `false`.
    * `images` Boolean (optional) - Enables image support. Ang Default ay `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Ang Default ay `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Ang default ay `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Ang default ay `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Ang default ay `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. Ang buong listahan ng sinuportahang mga katangian ng string na maaaring matagpuan sa mga file ng [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `disableBlinkFeatures` String (opsyonal) - Ang talaan ng mga tampok ng strings ay pinag-hiwalay ng `,`, katulad ng `CSSVariables,KeyboardEventKey` upang hindi mapagana. Ang kabuoang listahan ng mga sinusuportahang tampok ng strings ay mahahanap sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) sa file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
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
    * `offscreen` Boolean (opsyonall) - Kung papaganahin ang pag-render ng offscreen para sa browser ng window. Naka-default sa `false`. Tignan ang [pagtuturo sa pag rerender ng offscreen](../tutorial/offscreen-rendering.md) para sa mas maraming paliwanag.
    * `contextIsolation` Boolean (o[syonal) - Maging ang pagpapatakbo ng Electron APis at Ang pagtukoy `preload` Ang script sa magkakahiwalay na nilalaman ng JavaScript. Ang mga default para sa `false`. Ang nilalaman na iyon ang `preload` Ang script ay mayroong kabuuang access upang tumatakbo sa `dokumento` at `window` globals subalit gagamitin nito sarili nitong hilera ng pag-tatag ng JavaScript (`Array`, `Object`, `JSON`, etc.) at pinag-hihiwalay mula sa alinmang mga pagbabagong ginawa sa pandaigdigang kapaligiran sa paraan ng pag-karga ng pahina. Ang Electron API ay maaaring maging pwedi lamang sa `preload` ang script at hindi ang ikinargang pahina. Ang opsyon na ito ay kailangan magamit kapag Ang pagkakarga ng potensyal na hindi mapag-kakatiwalaan na nilalaman ng remote upang masiguro ang nilalaman ng pag-karga ay hindi pweding galawin ang `preload` Ang script at ang alinmang Electron APIs ay kasalukuyang ginagamit. Ang opsyon sa pag-gamit ng mag-katulad na estilo ay ginagamit ng [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Pwedii mong i-access ang nilalamang ito sa mga tool ng dev sa parang pagpili sa Ang ipinasok na 'Electron Isolated Context' sa kombo kaahon sa itaas ng Tab ng Console.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Naka-default sa `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * Ang `webviewTag` Boolean (opsyonal) - Kung pagaganahin ang [`<webview>` tag](webview-tag.md). Naka-default sa `false`. **Note:** Ang iskrip ng `preload` ay isinaayos para ang `<webview>` ay may pagsasama-sama ng node na pinagana kapag ito ay naisakatuparan kaya dapat mong siguraduhin na ang malayo/hindi mapagkakatiwalaang nilalaman ay hindi makakagawa ng isang tag`<webview>` na may isang posibleng malisyosong iskrip `preload`. Maaari mong gamitin ang kaganapan ng `will-attach-webview` sa [webContents](web-contents.md) para tanggalin ang iskrip ng `preload` at patunayan o pasubalian ang inisyal na mga pagtatakda sa `<webview>`.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Ang default ay `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Ang default ay `false`.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Ang default ay `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Ang default ay `false`.

Kapag nagtatakda ng minimum o maximum na laki ng window `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, pinipigilan lamang nito ang mga gumagamit. Hindi nito mapipigilan ka pagpasa ng isang sukat na hindi sumusunod sa mga hadlang sa laki `setBounds`/`setSize` o sa tagapagbuo ng `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* Sa Linux, posibleng mga uri `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * Ang `textured` uri ay nagdaragdag ng gradient na anyo ng metal (`NSTexturedBackgroundWindowMask`).
  * Ang `desktop` uri ay naglalagay ng window sa antas ng desktop background ng desktop (`kCGDesktopWindowLevel - 1`). Tandaan na hindi tatanggap ang desktop window focus, keyboard o mouse event, ngunit maaari mong gamitin ang `globalShortcut` upang makatanggap mas mahaba ang input.
* Sa Windows, ang posibleng uri ay `toolbar`.

### Halimbawa ng mga Event

Nilikha ang mga bagay with `new BrowserWindow` naglalabas ng mga sumusunod na pangyayari:

**Tandaan:** Ang ilang mga kaganapan ay magagamit lamang sa partikular na mga operating system at na may label na.

#### Event: 'page-title-updated'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `title` String
* `explicitSet` Boolean

Napalabas kapag binago ng dokumento ang pamagat nito, na nagtawag sa `event.preventDefault()` ay maiiwasan ang pamagat ng katutubong window sa pagbabago. `explicitSet` is false when title is synthesized from file URL.

#### Event: 'close'

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
_**Tandaan**: Merong banayad na pagkakaiba sa pagitan ng pag-uugali ng `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron._

#### Kaganapan: 'i-minimize'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Kaganapan: 'katapusan ng sesyon' ng _Windows_

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Kaganapan: 'palakihin'

Ay lalabas kapag ang window ay pinalaki.

#### Kaganapan: 'hindi pinalaki'

Ay lalabas kapag ang window ay lumabas mula sa pinalaking estado.

#### Kaganapan: 'i-minimize'

Ay lalabas kapag ang window ay pinaliit.

#### Kaganapan: 'ibalik'

Ay lalabas kung ang window ay binalik galing sa pinaliit na estado.

#### Event: 'will-resize' _macOS_ _Windows_

Ibinabalik ang:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Kaganapan: 'baguhin ang laki'

Emitted after the window has been resized.

#### Event: 'will-move' _macOS_ _Windows_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Kaganapan: 'ilipat'

Ay lalabas kung ang window ay inilipat sa bagong posisyon.

__Note__: On macOS this event is an alias of `moved`.

#### Kaganapan: 'inilipat' _ macOS _

Ay lalabas kapag ang window ay inilipat sa bagong posisyon.

#### Kaganapan: 'enter-full-screen'

Ay lalabas kung ang window ay pumasok sa full-screen na estado.

#### Kaganapan: 'leave-full-screen'

Ay lalabas kung ang window a aalis na sa full-screen na estado.

#### Event: 'enter-html-full-screen'

Ay lalabas kapag pumasok ang window ng isang full-screen na estado ayy na-trigger ng HTML API.

#### Event: 'leave-html-full-screen'

Ay lalabas kung ang window ay aalis na sa full-screen na estado ay na-trigger ng HTML API.

#### Event: 'always-on-top-changed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `command` String

Ay lalabas kung ang [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) ay nananawagan. Ang karaniwang pinag-uugna ito sa mga keyboard key ng media o browser mga atas, pati na rin ang pindutang "i-balik" na itinatatag sa ilang mga mouse sa Windows.

Ang mga atas ay lowercase, ang mga underscore ay binabago ang mga gitling, at ang `APPCOMMAND_` nakuha ang prefix sa. e.g. `APPCOMMAND_BROWSER_BACKWARD`ay lalabas bilang `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Mag-navigate sa window pabalik kapag pinindot ng gumagamit ang kanilang pindutan ng back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Kaganapan: 'scroll-touch-begin' _ macOS _

Ay lalabas kung ang scroll wheel na bahagi ng kaganapan ay magsimula.

#### Kaganapan: 'scroll-touch-end' _ macOS _

Ay lalabas kung ang scroll wheel na bahagi ng kaganapan ay natapos na.

#### Kaganapan: 'scroll-touch-edge' _macOS_

Ay lalabas kung ang scroll event na bahagi ng kaganapan sa pag-abot sa gilid ng elemento.

#### Kaganapan: 'swipe' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Event: 'rotate-gesture' _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Kaganapan: 'sheet-begin' _macOS_

Napalabas kapag nagbukas ang window ng sheet.

#### Kaganapan: 'sheet-end' _macOS_

Ay lalabas kapag nakasara ang isang sheet ng window.

#### Event: 'new-window-for-tab' _macOS_

Ay lalabas kung ang native ng pindutan ng bagong tab ay na-click.

### Mga istatikong pamamaraan

Ang `BrowserWindow`: klas na ito ay mayroong sumusunod na static na pamamaraan:

#### `BrowserWindow.getAllWindows()`

Binabalik ang ` BrowserWindow [] ` - Ang array ng lahat ng windows na browser na binuksan.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Ibinabalik `BrowserWindow` - Ang window na may ibinigay na `id`.

#### `BrowserWindow.addExtension(landas)`

* `path` String

Nagdadagdag ng extension ng Chrome na matatagpuan sa `path`, at nagbalik ng pangalan ng extension.

Ang paraan ay hindi rin babalik kung ang manifest ng extension ay nawawala o hindi kumpleto.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeExtension(pangalan)`

* `name` String

Alisin ang pangalan ng extension ng Chrome.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getExtensions()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.addDevToolsExtension(landas)`

* `path` String

Nagdaragdag ng extension ng DevTools na matatagpuan sa `path`, at nagbalik ng pangalan ng extension.

Ang ekstensyon ay maaalala kaya kinakailangan mo lamang tumawag ng isang beses sa API na ito, ito Ang API ay hindi magagamit sa programming. Kung susubukin mong magdagdag ng ekstensyon na pweding mayroon na Na-ikarga, ang paraan na ito ay hindi mai-babalik at sa halip mag-log ng babala sa console.

Ang paraan ay hindi rin babalik kung ang manifest ng extension ay nawawala o hindi kumpleto.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeDevToolsExtension(pangalan)`

* `name` String

Alisin ang isang extension ng DevTools ayon sa pangalan.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

Upang masuri kung naka-install ang extension ng DevTools maaari mong patakbuhin ang sumusunod:

```javascript
const { BrowserWindow } = require('electron')

Hayaan ma install ang = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

### Mga Katangian ng Instance

Ang mga bagay na nilikha gamit ang `new BrowserWindow` ay may mga sumusunod na katangian:

```javascript
const { BrowserWindow } = kinakailangan('electron')
// Sa halimbawa na ito `panalo` ay ating halimbawa
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Tignan ang [`webContents` dokomentasyon](web-contents.md) para sa pamamaraang ito at sa okasyon.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.minimizable`

A `Boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.maximizable`

A `Boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.fullScreenable`

A `Boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `Boolean` property that determines whether the window can be manually resized by user.

#### `win.closable`

A `Boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.movable`

A `Boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

### Mga Paraan ng Halimbawa

Ang mga layunin na gumawa ng `bagong BrowserWindow` magkaroon ng sumusunod na halimbawa ng pamamaraan:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

#### `win.destroy()`

Ang sapilitang pagsarado ng window, ang `unload` at `beforeunload` hindi mapapalabas ang pangyayari para sa pahina ng web, at`close` Hindi rin mapapalabas ang pangyayari para sa window na ito, subalit sinisigurado nito ang `sarado` Ang okasyon ay magiging hayag.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

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

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Pag-unmaximize sa windows.

#### `win.isMaximized()`

Binabalik ang `Boolean` - Kung ang window ay naka maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Binabalik ang window galing sa pinaliit na estado sa nakaraan na estado.

#### `win.isMinimized()`

Binabalik ang `Boolean` - Kung saan ang window ay naka maximized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Itinatakda kung ang window ay dapat na sa fullscreen na mode.

#### `win.isFullScreen()`

Binabalik ang `Boolean` - Kung ang window ay nasa fullscreen na mode.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Pagpasok o pag-alis sa simpleng fullscreen na mode.

Ang simpleng fullscreen mode ay nagpapalabas ng katutubong pag-uugali ng fullscreen na natagpuan sa mga bersyon ng Mac OS X bago ang Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Binabalik ang `Boolean` - Kung saan ang window ay nasa simpleng(pre-Lion) na fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* ` aspectRatio ` Float - Ang aspect ratio upang mapanatili para sa ilang bahagi ng nilalaman ng view.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

Gagawin nitong isang window na mapanatili ang hichura ng ratio. Ang sobrang laki ay nagbibigay ng pahintulot sa isang ang developer ay may puwang, na tinukoy sa mga pixel, hindi kasama sa loob ng aspeto Ang ratio kalkulasyon. Ang sinasabi ng API na ito ang pagkakaiba sa pagitan ng isang laki ng window at laki ng nilalaman nito.

Ang pag-sasa alang alang ng normal na window na may HD bidyo player at mga nauugnay na kontrol. Siguro ay mayroong 15 pixels ng mga kontrol sa kaliwang gilid, 25 pixels ng mga kontrol sa kanang gilid at 50 pixels ng mga kontrol sa ilalim ng player. Sa pamamagitan ng mapanatilihin ang 16:9 ratio ng aspeto (karaniwang aspeto ng ratio para sa HD @ 1920x1080) sa loob ang manlalaro mismo ay tatawagan namin ang tungkulin na ito sa mga argumento ng 16/9 at [40, 50]. Ang pangalawang argumento ay hindi pinapahalagahan kung saan ang dagdag na lawak at taas ay nasa loob ng tanaw ng nilalaman - na umiiral lamang ang mga ito. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `daan` String - Ang ganap na daan sa file upang i-ipakita gamit ang QuickLook. Ang mahalaga nito habang ginagamit ng Quick Look ang pangalan ng file at lawig ng file sa daan upang matukoy ang tipo ng nilalaman ng file upang buksan.
* `Ang pagpakita sa pangalan` String (pag-pipilian) - Ang pangalan ng file na ipapakita sa Quick Look modal na tanaw. Ito ay ang malinis na viswal at hindi nakakaapekto sa nilalaman na uri ng file. Defaults sa `path`.

Ginagamit ang [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) upang i-preview ang file sa ibinigay na landas.

#### `win.closeFilePreview()` _macOS_

Pagsara sa kasalukuyang nakabukas na [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (opsyonal) _macOS_

Pag-resize ay paglipat ng window sa hangganan na ibinibigay. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opsyonal) _macOS_

Lumalawak at gumagalaw ang lugar ng kliyente ng window (e.g. the web page) ang itinustos na mga hangganan.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (opsyonal) _macOS_

Lumalabas ang window sa `width` at `
height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Ibinabalik `Integer[]` - Naglalaman ng lapad at taas ng window.

#### `win.setContentSize(lapad, taas[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (opsyonal) _macOS_

Lumalawak sa lugar ng kliyente ng window (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Binabalik ang `Integer[]` - Naglalaman ng window's client area's width and height.

#### `win.setMinimumSize(lapad, taas)`

* `lapad` Integer
* `taas` Integer

Itinatakda ang minimum na laki ng window `width` and `height`.

#### `win.getMinimumSize()`

Ibinabalik `Integer[]` - Naglalaman ng lapad at taas ng window.

#### `win.setMaximumSize(lapad, taas)`

* `lapad` Integer
* `taas` Integer

Itinatakda ang maximum na laki ng window `width` and `height`.

#### `win.getMaximumSize()`

Binabalik ang `Integer[]` - Naglalaman ng pinakamataas na lapad at taas ng windows.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Tinatakda kung ang window ay maaring i-manual na pag-bago sa gumagamit.

**[Deprecated](modernization/property-updates.md)**

#### `win.isResizable()`

Ibinabalik ` Boolean ` - Kung ang window ay maaaring manu-manong napalitan ng user.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMovable()` _macOS_ _Windows_

Ibinabalik `Boolean` - Kung ang window ay maaring ilipat ng gumagamit.

Ang Linux ay palaging bumabalik `tama`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMinimizable()` _macOS_ _Windows_

Ibalik ang `Boolean` - Kung manu-mano ang pinaliit na window ng taga-gamit

Ang Linux ay palaging bumabalik `tama`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMaximizable()` _macOS_ _Windows_

Ibalik ang `Boolean` - Kung ang manu-manong window ay pweding manu-mano-paliitin ng taga-gamit.

Ang Linux ay palaging bumabalik `tama`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Nagtatakda kung ang pindutan ng window ng pag-papalaki/zoom ay lumilipat sa fullscreen na anyo o magpapakinabang sa window.

**[Deprecated](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Ang pag-balik `Boolean` - Kung ang pindutan ng Pag-papalaki/zoom window ay i-toggle ang fullscreen na anyo o magpapakinabang sa window.

**[Deprecated](modernization/property-updates.md)**

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isClosable()` _macOS_ _Windows_

Ibinabalik ang `Boolean` - Kung saan ang windows ay maaring isara ng manu-mano ng tagagamit.

Ang Linux ay palaging bumabalik `tama`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (optional) _macOS_ - Ang dami ng suson ay mataas sa set itong window ay may kaugnayan sa ibinibigay `level`. Ang kawalan ay `0`. Tanda ng ansanas hinihikayat ang antas ng setting na mas mataas sa 1 na itataas `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Nagbabalik `Boolean` - Kung ang window ay nakikita sa user.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus

#### `win.center()`

Inililipat ang window sa gitna ng screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opsyonal) _macOS_

Ilipat ang window sa `x` and `y`.

#### `win.getPosition()`

Ibinibalik ang `Integer[]` - Naglalaman ng kasalukuyang posisyon ng window.

#### `win.setTitle(title)`

* `title` String

Binabago ang pamagat ng katutubong window sa `title`.

#### `win.getTitle()`

Bumabalik `String` - Ang pamagat ng katutubong window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Lumutang
* `offsetX` Lumutang (optiona)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Halimbawa:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Magsisimula o tumitigil na kumikislap sa bintana upang maakit ang pansin ng gumagamit.

#### `win.setSkipTaskbar(skip)`

* `laktawan` Boolean

Ginagawa ang window na hindi ipinapakita sa taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Nagpapasok o nag-iiwan ng kiosk mode.

#### `win.isKiosk()`

Bumalik `Boolean` - Kung ang window ay nasa kiosk mode.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Ibinabalik `Buffer` - Ang hawak ng tukoy na platform sa window.

Ang katutubong uri ng handle ay `HWND` sa Windows, `NSView*` sa macOS, at `Window` (`unsigned long`) sa Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `mensahe` Integer
* `callback` na Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `mensahe` Integer

Ibinabalik ang ` Boolean ` - ` true ` o ` false ` depende kung ang mensahe ay naka-hook.

#### `win.unhookWindowMessage(message)` _Windows_

* `mensahe` Integer

I-unhook ang mensahe sa window.

#### `win.unhookAllWindowMessages()` _Windows_

I-unhook ang lahat ng mensahe sa window.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Nagtatakda ng pathnamesa mga file na irepresenta sa window, at ang icon ng file ay ipapakita sa title bar ng window.

#### `win.getRepresentedFilename()` _macOS_

Ibinibalik `String` - Ang pathname ng file na nakarepresenta sa window.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Tinutukoy kung ang dokumento ng window ay na-edit, at ang icon sa pamagat ng bar ay magiging gray kung itatakda sa `true`.

#### `win.isDocumentEdited()` _macOS_

Ibinabalik ang `Boolean` - Kung saan ang mga dokumento ng window ay na-edit na.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Para ma-makuha ang bounds

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Kumukuha ng isang snapshot ng pahina sa loob ng `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, mga pagpipilian])`

* `url` Tali
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

Ang ` url ` ay maaaring maging isang remote address (hal. ` http: // `) o isang path sa isang lokal na HTML file gamit ang protocol na ` file: // `.

Upang matiyak na ang mga URL ng file ay maayos na nai-format, inirerekomendang gamitin ito Node's [` url.format `](https://nodejs.org/api/url.html#url_url_format_urlobject) na paraan:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})
win.loadURL(url)
```

Maaari kang mag-load ng isang URL gamit ang isang ` POST ` na kahilingan gamit ang URL-naka-encode na data sa pamamagitan ng paggawa ang mga sumusunod:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Tulad ng `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Doble
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Alisin ang progress bar kapag umuunlad<0; Baguhin sa indeterminate mode kapag umuunlad> 1.

Sa platform ng Linux, sinusuportahan lamang ng Unity desktop na environment, kailangan mong tukuyin ang pangalan ng `*.desktop` file name to `desktopName ` sa ` package.json `. By default, it will assume `{app.name}.desktop`.

Sa windows, ang mode ay maaring makapasa. Tinatanggap na mga balyu ay `none`, `normal`, `indeterminate`, `error`, and `paused`. Kung tumawag ka ng ` setProgressBar ` nang walang isang mode set (ngunit may halaga sa loob ng wastong hanay), ipagpalagay na ` normal `.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - Ang deskripsyon na dapat maibigay pasa sa Accessibility screen readers

Nagtatakda ng 16 x 16 na pixel na overlay papunta sa kasalukuyang icon ng taskbar, kadalasang ginagamit sa ihatid ang ilang mga uri ng katayuan ng application o upang pasabihan ipagbigay-alam sa gumagamit.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Ibinabalik ` Boolean` - Kung ang window ay may anino.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - sa gitna ng 0.0 (fully transparent) at 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Ibinabalik ang `Number` - sa gitna ng 0.0 (fully transparent) at 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Ibinibalik ang `Boolean` - Kung saan ang mga buttons ay naidagdag ng matagumpay

Magdagdag ng isang thumbnail toolbar na may tinukoy na hilera ng mga pindutan sa thumbnail na larawan ng isang window sa isang layout ng pindutan ng taskbar. Ibinibalik ang ` Boolean ` kung ang thumbnail ay matagumpay na naidagdag.

Ang bilang ng mga pindutan sa thumbnail toolbar ay dapat na hindi pa mas malaki kaysa sa 7 dahil sa ang limitadong kuwarto. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. Ngunit maaari mong tawagan ang API na walang laman na array upang linisin ang mga pindutan.

Ang `buttons` ay isang array ng `Button` objects:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - Ang icon na ipinapakita sa thumbnail ng toolbar.
  * `click` Function
  * `tooltip` String (opsyonal) - Ang teksto ng tooltip sa pindutan.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Ang `flags` ay isang kaayusan na maaaring isama ang mga sumusunod `String`:

* `enabled` - Ang pindutan ay aktibo at magagamit ng mga gumagamit.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Kapag ang pindutan ay pinindot, ang thumbnail window ay agad-agad na magsasara.
* `nobackground` - Huwag gumawa ng hangganan ng pindutan, gamitin lamang ang larawan.
* `hidden` - Ang pindutan ay hindi ipinapakita sa mga gumagamit.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Rehiyon ng window

Itinatakda ang rehiyon ng window upang ipakita kung kailan ipinapakita ang thumbnail na larawan na agaw sa window sa taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Itakda ang toolTip na ipinapakita habang nag-hohover higit sa window ng thumbnail sa taskbar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Ito ay dapat na itakda, kung hindi man ay ang ibang opsyon ay walang epekto.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Itakda ang ari-arian para sa window's taskbar na button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Tulad nang`webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Pinagbabago ang window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Kpag ang menu bar ay kasalukuyang makikita, ang pag-tawag `setAutoHideMenuBar(true)` hindi ito kayang itago agad.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Ang mga pagbalik `Boolean` - kung ito ay awtomatikong itinatago ng menu bar.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Ibinabalik ang `Boolean` - Kung saan ang menu bar ay makikita.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows _deprecated_

Itakda kung ang window ay dapat na makikita sa lahat ng workspaces.

**Tandaan:** Ang API ay walang magagawa para sa windows.

#### `win.isVisibleOnAllWorkspaces()`

Ibinabalik ang `Boolean` - Kung saan ang window ay dapay na makikita sa lahat ng workspaces.

**Tandaan:** Itong API ay palaging ibinabalik na huwad para sa windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `huwag pansinin` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Ginagamit lamang kung ang`ignore` ay tama. Kung ang `ignore` is mali, Pagsulong ay palaging hindi-pinagana sa anumang mga balyu.

Ginagawa ang window na hindi pansinin ang lahat ng mouse na kaganapan.

Lahat ng mouse na kaganapan dito sa window ay maaring dumaan para sa window sa ibaba ng window, pero kung ang window ay may focus, ito ay makakatanggap parin ng keyboard na kaganapan.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Ang pag-pigil sa mga nilalaman ng window mula sa kumkuha ng iba pang apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Binabago kung ang window ay maaaring nakatuon.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Ang mga pagtatakda`peyrent`bilang isang peyrent ng window, na dumadaan sa `null` babalik sa kasalukuyang window sa isang mataas na antas ng window.

#### `win.getParentWindow()`

Ibinabalik kung `BrowserWindow` - Ang magulang na window.

#### `win.getChildWindows()`

Ibinabalik kung `BrowserWindow[]` - Lahat ay anak windows.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Kinokontrol kung ang cursor ay itatago kapag nag-type.

#### `win.selectPreviousTab()` _macOS_

Pinipili ang nakaraang tab kung ang pinagana ang native na mga tab at may iba pa mga tab sa window.

#### `win.selectNextTab()` _macOS_

Pinipili ang susunod na tab kung ang pinagana ang mga native na tab at mayroong iba pa mga tab sa window.

#### `win.mergeAllWindows()` _macOS_

Pinagsama ang lahat ng mga window sa isang window na may maraming tab kapag ang mga native na tab ay gumagana at mayroong higit sa isang bukas na window.

#### `win.moveTabToNewWindow()` _macOS_

Inililipat ang kasalukuyang tab sa isang bagong window kung pinagana ang mga native na tab at mayroong higit sa isang tab sa kasalukuyang window.

#### `win.toggleTabBar()` _macOS_

Tina-toggle ang kakayahang makita ng tab na bar kung pinagana ang mga native na tab at mayroon lamang isang tab sa kasalukuyang window.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` ang BrowserWindow

Nagdagdag ng window na isang tab sa window, pagkatapos ng tab para sa window instance.

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Tignan ang[macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) para sa ibang detalye.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar | null

Itakda ang layout ng touchBar para sa kasalukuyang window. Tinutukoy ang `null` or `undefined` Nililinis ang touch bar. Ang paraan na ito lamang ang may epekto sa Ang makina ay merong nahahawakang bar at napapatakbo ito sa macOS 10.12.1+.

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa  panghinaharap na pag-release ng Electron.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.
