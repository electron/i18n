# Kulayan ang bintana

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

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

* `mga opsyon` Na Bagay (opsyonal) 
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
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
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal) - Ang icon ng window. Sa windos mismo ay nirerekomenda na gamitin ang `ICO` para makakuha ng magandang mga effects ay pwede mong gawin lagyan ito ng guhit sa ilalim nang sa ganun ito ay maeexecute at ang icon ay pwede ng magamit.
  * `show` Boolean (opsyonal) - kapag kinakailangang ipakita ang window kapag ginawa. Ang default ay `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created. In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`. Setting this to `false` will cause the `ready-to-show` event to not fire. Ang Default ay `true`.
  * `frame` Boolean (opsyonal) - Tukuyin ang `false` para lumikha ng isang [Frameless Window](frameless-window.md). Ang default ay `true`.
  * `parent` BrowserWindow (opsyonal) - Tukuyin ang pinagmulang window. Ang default ay `null`.
  * `modal` Boolean (opsyonal) -kapag ito ay isang modal ng window. tumatakbo lamang ito kapag ang mga window ay isang window ng child. Ang default ay `mali`.
  * `acceptFirstMouse` Boolean (opsyonal) - kapag natanggap ng web view ang nag-iisa. Mouse-down na mangyayari sa sabay na maging-aktibo ang window. Ang default ay `mali`.
  * `disableAutoHideCursor` Boolean (opsyonal) - Kung itinago ang cursor kapag nagta-type. Ang default ay `false`.
  * `autoHideMenuBar` Boolean (opsyonal) - Awtomatikong itago ang bar ng menu maliban kung ang teklado ng `Alt` ay pinindot. Ang default ay `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Ang default ay `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Default is `true`.
  * `opacity` Number (opsyonal) - Itakda ang paunang opacity sa bintana, sa gitna ng 0.0 (fully transparent) and 1.0 (fully opaque). Ito ay pinatutupad lamang sa Windows at macOS.
  * `darkTheme` Boolean (opsyonal) - Puwersahang gumagamit ng madilim na theme para sa window, gumagana lamang sa ilang mga kapaligiran ng GTK+3 desktop. Ang default ay `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Ang default ay `false`. On Windows, does not work unless the window is frameless.
  * `type` String (opsyonal) - Ang uri ng window, ang default aynormal na window. Tingnan ang mas maraming tungkol dito sa ibaba.
  * `ang titleBarStyle` String (opsyonal) - Ang istilo ng title bar ng window. Ang default ay `default`Ang posibleng mga halaga ay: 
    * `default` - Ang mga resulta sa standard na gray opaque na title bar ng Mac.
    * `hidden` - Ang mga resulta sa isang nakatagong title bar at isang buong sukat na laman ng window, gayon pa man ang title bar ay mayroon ding mga karaniwang mga kontrol ng window (mga ilaw ng trapiko) sa kaliwang itaas.
    * `hiddenInset` - Ang mga resulta sa isang nakatagong title bar na may isang alternatibong hitsura kung saan ang mga pindutan ng ilaw ng trapiko ay bahagyang nakasingit sa gilid ng window.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** Ang opsyon na ito ay kasalukuyang eksperimental.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Ng default ay `tama`.
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Ang default ay `false`.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Ng default ay `tama`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `false`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Ang default ay `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md).
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Default is `true`.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Ng default ay `tama`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to `0`.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Default is `false`.

Kapag nagtatakda ng minimum o maximum na laki ng window `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, pinipigilan lamang nito ang mga gumagamit. Hindi nito mapipigilan ka pagpasa ng isang sukat na hindi sumusunod sa mga hadlang sa laki `setBounds`/`setSize` o sa tagapagbuo ng `BrowserWindow`.

Ang mga posibleng halaga at pag-uugali ng pagpipiliang `type` ay nakasalalay sa platform. Ang mga posibleng halaga ay:

* Sa Linux, posibleng mga uri `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* Sa macOS, posibleng mga uri `desktop`, `textured`. 
  * Ang `textured` uri ay nagdaragdag ng gradient na anyo ng metal (`NSTexturedBackgroundWindowMask`).
  * Ang `desktop` uri ay naglalagay ng window sa antas ng desktop background ng desktop (`kCGDesktopWindowLevel - 1`). Tandaan na hindi tatanggap ang desktop window focus, keyboard o mouse event, ngunit maaari mong gamitin ang `globalShortcut` upang makatanggap mas mahaba ang input.
* Sa Windows, ang posibleng uri ay `toolbar`.

### Halimbawa ng mga Event

Nilikha ang mga bagay with `new BrowserWindow` naglalabas ng mga sumusunod na pangyayari:

**Tandaan:** Ang ilang mga kaganapan ay magagamit lamang sa partikular na mga operating system at na may label na.

#### Event: 'page-title-updated'

Ibinabalik ang:

* `kaganapan` kaganapan
* `title` String
* `explicitSet` Boolean

Napalabas kapag binago ng dokumento ang pamagat nito, na nagtawag sa `event.preventDefault()` ay maiiwasan ang pamagat ng katutubong window sa pagbabago. `explicitSet` is false when title is synthesized from file URL.

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

***Tandaan**: Merong banayad na pagkakaiba sa pagitan ng pag-uugali ng `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron.*

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Kaganapan: 'palakihin'

Ay lalabas kapag ang window ay pinalaki.

#### Kaganapan: 'hindi pinalaki'

Ay lalabas kapag ang window ay lumabas mula sa pinalaking estado.

#### Kaganapan: 'i-minimize'

Ay lalabas kapag ang window ay pinaliit.

#### Kaganapan: 'ibalik'

Ay lalabas kung ang window ay binalik galing sa pinaliit na estado.

#### Event: 'will-resize' *macOS* *Windows*

Ibinabalik ang:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Kaganapan: 'baguhin ang laki'

Emitted after the window has been resized.

#### Event: 'will-move' *macOS* *Windows*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Kaganapan: 'ilipat'

Ay lalabas kung ang window ay inilipat sa bagong posisyon.

**Note**: On macOS this event is an alias of `moved`.

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

#### Event: 'always-on-top-changed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' *Windows* *Linux*

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

#### Event: 'rotate-gesture' *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Kaganapan: 'sheet-begin' *macOS*

Napalabas kapag nagbukas ang window ng sheet.

#### Kaganapan: 'sheet-end' *macOS*

Ay lalabas kapag nakasara ang isang sheet ng window.

#### Event: 'new-window-for-tab' *macOS*

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

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

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

#### `win.webContents` *Readonly*

Ang `WebContents` layunin ng amay-ari ng window na ito. Lahat ng mga koneksyon na pangyayari sa web at ang mga operasyon ay gagawin sa paraan nito.

Tignan ang [`webContents` dokomentasyon](web-contents.md) para sa pamamaraang ito at sa okasyon.

#### `win.id` *Readonly*

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

#### `win.excludedFromShownWindowsMenu` *macOS*

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

Objects created with `new BrowserWindow` have the following instance methods:

**Note:** Ang ilang mga method ay magagamit lamang sa ibang partikular na mga operating system at may label na katulad nito.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()
 `

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

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

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* ` aspectRatio ` Float - Ang aspect ratio upang mapanatili para sa ilang bahagi ng nilalaman ng view.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `daan` String - Ang ganap na daan sa file upang i-ipakita gamit ang QuickLook. Ang mahalaga nito habang ginagamit ng Quick Look ang pangalan ng file at lawig ng file sa daan upang matukoy ang tipo ng nilalaman ng file upang buksan.
* `Ang pagpakita sa pangalan` String (pag-pipilian) - Ang pangalan ng file na ipapakita sa Quick Look modal na tanaw. Ito ay ang malinis na viswal at hindi nakakaapekto sa nilalaman na uri ng file. Defaults sa `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (opsyonal) *macOS*

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

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
* `animate` Boolean (opsyonal) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

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
* `animate` Boolean (opsyonal) *macOS*

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (opsyonal) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `lapad` Integer
* `taas` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `lapad` Integer
* `taas` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Sets whether the window can be manually resized by user.

**[Deprecated](modernization/property-updates.md)**

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[Deprecated](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[Deprecated](modernization/property-updates.md)**

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[Deprecated](modernization/property-updates.md)**

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

**[Deprecated](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* *Windows* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (optional) *macOS* - Ang dami ng suson ay mataas sa set itong window ay may kaugnayan sa ibinibigay `level`. Ang kawalan ay `0`. Tanda ng ansanas hinihikayat ang antas ng setting na mas mataas sa 1 na itataas `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus

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

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const { BrowserWindow } = require('electron')
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

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `mensahe` Integer
* `callback` na Function

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

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` Tali
* `options` Na Bagay (opsyonal) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

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

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `pagpipilian` Bagay (opsyonal) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` *Linux* *Windows*

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `pagpipilian` Bagay (opsyonal) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

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

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

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

* `icon` [NativeImage](native-image.md) | String

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[Deprecated](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[Deprecated](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Na Bagay (opsyonal) 
  * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows *deprecated*

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `huwag pansinin` Boolean
* `pagpipilian` Bagay (opsyonal) 
  * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *macOS* *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

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

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Experimental*

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.