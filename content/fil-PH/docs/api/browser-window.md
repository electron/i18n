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

`BrowserWindow` is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Ito ay gumagawa ng panibagong `BrowserWindow` na may likas na mga ari-arian na itinakda ng`opsyon`.

### `ang bagong BrowserWindow([pag-pipilian])`

* `mga opsyon` Na Bagay (opsyonal) 
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) -ioffset ang kaliwang Window mula sa screen. Idefault ang window sa sentro.
  * `y` Integer (optional) (**required** Kung ang x ay nagamit) - Ioffset ang windows sa itaas ng screen Ang Default ay nasa sentro ng windows.
  * `useContentSize` Boolean (optional) - The `width` and `height`ay gagamtin bilang web ang sukat ng pahina, ibig sabihin ang aktwal na sukat ng windoz ay kasama ng sukat ng window frame na medyo malaki. Ang default ay `false`.
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
sa macOS. Ang default ay <code>false`.
  * `fullscreenable` Boolean (optional) -Ang Window ay pwedeng ilagay sa fullscreen mode. Sa macOS, pwede din kung ang maximize/Pag papalaki o pag papaliit na buton ay kailangang maging toggle full screen mode o mas malaking window. Ng default ay `tama`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Default is `false`.
  * `title` String (optional) - Default window title. Default is `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (optional) - The window icon. On Windows it is recommended to use `ICO` icons to get best visual effects, you can also leave it undefined so the executable's icon will be used.
  * `show` Boolean (optional) - Whether window should be shown when created. Default is `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Default is `false`.
  * `backgroundColor` String (optional) - Window's background color as Hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
    * `default` - Results in the standard gray opaque Mac title bar.
    * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
    * `hidden-inset` - Deprecated, use `hiddenInset` instead.
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the tile bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Ng default ay `tama`.
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Ang default ay `false`.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Ng default ay `tama`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Ang default ay `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. Sa pag-aatas ng kaparehong `partition`, maramihang mga pahina ang maaaring magsalo-salo sa magkaparehong sesyon. Default is the default session.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Ng default ay `tama`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
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
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the \[Page Visibility API\]\[#page-visibility\]. Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.

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
  e.returnValue = false
}
```

#### Kaganapan: 'i-minimize'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Kaganapan: 'katapusan ng sesyon' ng *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Kaganapan: 'hindi tumutugon'

Emitted when the web page becomes unresponsive.

#### Kaganapan: 'tumutugon'

Emitted when the unresponsive web page becomes responsive again.

#### Kaganapan: 'lumabo'

Emitted when the window loses focus.

#### Kaganapan: 'pokus'

Emitted when the window gains focus.

#### Event: 'ipakita'

Emitted when the window is shown.

#### Kaganapan: 'itago'

Emitted when the window is hidden.

#### Kaganapan: 'handa- ng- ipakita'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Kaganapan: 'palakihin'

Emitted when window is maximized.

#### Kaganapan: 'hindi pinalaki'

Emitted when the window exits from a maximized state.

#### Kaganapan: 'i-minimize'

Emitted when the window is minimized.

#### Kaganapan: 'ibalik'

Emitted when the window is restored from a minimized state.

#### Kaganapan: 'baguhin ang laki'

Emitted when the window is being resized.

#### Kaganapan: 'ilipat'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is just an alias of `moved`.

#### Kaganapan: 'inilipat' * macOS *

Emitted once when the window is moved to a new position.

#### Kaganapan: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Kaganapan: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Kaganapan: 'app-command' * Windows *

Pagbabalik:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

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

Emitted when scroll wheel event phase has begun.

#### Kaganapan: 'scroll-touch-end' * macOS *

Emitted when scroll wheel event phase has ended.

#### Kaganapan: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Kaganapan: 'swipe' *macOS*

Pagbabalik:

* `kaganapan` Kaganapan
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Kaganapan: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Kaganapan: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Static na pamamaraan

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromId(id)`

* `id` na Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` na String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` na String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

Hayaan ma install ang = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**noted:** Ang API na ito ay hindi maaaring tawagin bago ang `ready` event ng module na `app` ay ibinubuga.

### Mga Katangian ng Instance

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = kinakailangan('electron')
// Sa halimbawa na ito `panalo` ay ating halimbawa
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Mga Pamamaraan ng Instance

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

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

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

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `lapad` Integer
* `taas` Integer
* `animate` Boolean (optional) *macOS*

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

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

Ang Linux ay palaging bumabalik `tama`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

Ang Linux ay palaging bumabalik `tama`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

Ang Linux ay palaging bumabalik `tama`.

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

Ang Linux ay palaging bumabalik `tama`.

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
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` Tali
* `pagpipilian` Bagay (opsyonal) 
  * `httpReferrer` Pisi (opsyonal) - Isang HTTP Referrer url.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
  * `baseURLForDataURL` Pisi (opsyonal) - Base url (na may trailing path separator) para sa mga dokumento na mai-load ng url ng data. Ito ay kinakailangan lamang kung ang tinutukoy na `url` ay isang url ng data at kailangang mag-load ng iba pang mga file.

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
* `pagpipilian` Bagay (opsyonal) 
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

#### `win.setIgnoreMouseEvents(ignore)`

* `huwag pansinin` Boolean

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

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.