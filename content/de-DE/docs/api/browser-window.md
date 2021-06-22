# BrowserWindow

> Erstellung und Steuerung von Browserfenstern.

Prozess: [Main](../glossary.md#main-process)

```javascript
// Im Hauptprozess.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Rahmenloses Fenster

Um ein Fenster ohne Chrome, ein transparentes Fenster oder ein Fenster in einer beliebigen Form zu erzeugen, können sie die [Frameless Window](frameless-window.md) API verwenden.

## Fenster elegant anzeigen

Beim direkten Laden einer Seite im Fenster sieht der Benutzer möglicherweise das schrittweise Aufbauen der Seite, was keine gute Erfahrung für eine native App ist. Um die Seite ohne das sichtbare Flackern anzuzeigen, gibt es zwei Möglichkeiten.

## Verwenden des `ready-to-show` Ereignisses

Das `ready-to-show` Ereignis wird während des Ladens der Seite ausgelöst, falls das Fenster noch nicht angezeigt wurde nachdem der Rendererprozess die Seite erstmalig gerendert hat. Wenn das Fenster nach diesem Ereignis gezeigt wird, gibt es keinen bemerkbaren Seitenaufbau:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Für gewöhnlich wird dieses Ereignis nach dem `did-finish-load` Ereignis ausgelöst. Bei Seiten mit vielen Remoteressourcen kann es aber passieren dass das Event vor dem `did-finish-load` Ereignis ausgelöst wird.

Bitte beachten Sie, dass die Verwendung dieses Ereignisses impliziert, dass der Renderer als "sichtbar" und bemalt betrachtet wird, obwohl `show` falsch ist.  Dieses Ereignis wird nie abfeuern, wenn `paintWhenInitiallyHidden: false` gesetzt ist.

## Setzen der `backgroundColor`

Bei umfangreichen Apps könnte das `ready-to-show` Ereignis zu spät ausgelöst werden, sodass sich die App langsam anfühlt. In diesem Fall empfiehlt es sich, das Fenster sofort anzuzeigen und die `backgroundColor` auf einen Wert zu setzen der dem Hintergrund ihrer App ähnelt:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Beachten Sie dass es sich auch bei Apps die das `ready-to-show` Ereignis verwenden empfiehlt die `backgroundColor` zu setzen, damit sich die App nativer anfühlt.

## Übergeordnete und untergeordnete Fenster

Mithilfe der `parent` Option können Sie untergeordnete Fenster erstellen:

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Das `child` Fenster wird stets über dem `top` Fenster angezeigt.

## Modale Fenster

Ein modales Fenster ist ein untergeordnetes Fenster, das das übergeordnete Fenster sperrt. Um ein modales Fenster zu erzeugen müssen sie sowohl die `parent` als auch die `modal` Optionen setzen:

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Seiten Sichtbarkeit

Die [Page Visibility API][page-visibility-api] Funktioniert wie folgt:

* Auf allen Plattformen gibt der Sichtbarkeitszustand an ob das Fenster versteckt bzw. minimiert ist oder nicht.
* Zusätzlich wird unter macOS auch angegeben ob das Fenster verdeckt ist. Wenn das Fenster vollständig durch ein anderes Fenster verdeckt ist, ist der Sichtbarkeitszustand `hidden`. Auf den anderen Plattformen ist der Sichtbarkeitszustand nur `hidden`, wenn das Fenster minimiert oder explizit durch `win.hide()` verseckt wurde.
* Wenn ein `BrowserWindow` mit der Option `show: false` erzeugt wurde, ist der anfängliche Sichtbarkeitszustand `visible`, obwohl das Fenster eigentlich versteckt ist.
* Wenn `backgroundThrottling` deaktiviert ist, bleibt der Sichtbarkeitszustand `visible`, selbst wenn das Fenster minimiert, verdeckt oder versteckt wird.

Es wird empfohlen aufwendige Aufgaben zu pausieren wenn der Sichtbarkeitszustand `hidden` ist, um Energie zu sparen.

## Plattformhinweise

* Unter macOS werden modale Fenster als Seiten angezeigt, die an das übergeordnete Fenster angehängt sind.
* Wenn unter macOS übergeordnete Fenster bewegt werden, behalten untergeordnete Fenster ihre Position relativ zum übergeordneten Fenster bei. Unter Windows und Linux bewegen sich die untergeordneten Fenster nicht.
* Unter Linux wird der Typ von modalen Fenstern zu `dialog` geändert.
* Unter Linux wird das verstecken von modalen Fenstern von vielen Desktop Umgebungen nicht unterstützt.

## Klasse: BrowserWindow

> Erstellung und Steuerung von Browserfenstern.

Prozess: [Main](../glossary.md#main-process)

`BrowserWindow` ist ein [EventEmitter][event-emitter].

Es erzeugt ein neues `BrowserWindow` mit nativen Eigenschaften die durch `options` gesetzt wurden.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Fensterbreite in Pixel. Standard ist `800`.
  * `height` Integer (optional) - Fensterhöhe in Pixel. Standard ist `600`.
  * `x` Integer (optional) - (**notwendig** wenn y gegeben wird) der x-Versatz des Fensters zum Bildschirm. Standardmäßig wird das Fenster zentriert.
  * `y` Integer (optional) - (**notwendig** wenn x gegeben wird) der y-Versatz des Fensters zum Bildschirm. Standardmäßig wird das Fenster zentriert.
  * `useContentSize` Boolean (optional) - Die `width` und `height` Werte werden als Größe der angezeigten Webseite verwendet. D.h. die tatsächliche Größe des Fensters beinhaltet noch die Rahmengröße und ist deshalb etwas größer. Standard ist `false`.
  * `center` Boolean (optional) - Zeige das Fenster in der Mitte des Bildschirms.
  * `minWidth` Integer (optional) - die minimale Fensterbreite. Standard ist `0`.
  * `minHeight` Integer (optional) - die minimale Fensterhöhe. Standard ist `0`.
  * `maxWidth` Integer (optional) - die maximale Fensterbreite. Der Standardwert ist kein Limit.
  * `maxHeight` Integer (optional) - die maximale Fensterhöhe. Der Standardwert ist kein Limit.
  * `resizable` Boolean (optional) - Gibt an, ob die Fenstergröße geändert werden kann. Standard ist `true`.
  * `movable` Boolean (optional) - Gibt an, ob das Fenster verschoben werden kann. Diese Option ist unter Linux noch nicht implementiert. Standard ist `true`.
  * `minimizable` Boolean (optional) - ob das Fenster minimiert werden kann. Diese Option ist unter Linux noch nicht implementiert. Standard ist `true`.
  * `maximizable` Boolean (optional) - ob das Fenster maximiert werden kann. Diese Option ist unter Linux noch nicht implementiert. Standard ist `true`.
  * `closable` Boolean (optional) - Gibt an, ob das Fenster geschlossen werden kann. Diese Option ist unter Linux noch nicht implementiert. Standard ist `true`.
  * `focusable` Boolean (optional) - Gibt an ob das Fenster fokussiert werden kann. Standard ist `true`. Unter Windows impliziert die Option `focusable: false` die Option `skipTaskbar: true`. Unter Linux sorgt `focusable: false` dafür dass das Fenster nicht mehr mit dem Fenstermanager interagiert, d.h. das Fenster bleibt in allen Arbeitsoberflächen ganz oben.
  * `alwaysOnTop` Boolean (optional) - Gibt an ob das Fenster immer über anderen Fenstern angezeigt werden soll. Standard ist `false`.
  * `fullscreen` Boolean (optional) - Gibt an ob das Fenster im Vollbildmodus angezeigt werden soll. Wenn diese Option explizit auf `false` gesetzt wird, wird der Button für Vollbildmodus unter macOS versteckt oder deaktiviert. Standard ist `false`.
  * `fullscreenable` Boolean (optional) - Gibt an ob das Fenster in den Vollbildmodus versetzt werden kann. Unter macOS gibt diese Option auch an, ob der Maximieren/Zoom Button das Fenster in den Vollbildmodus versetzt oder maximiert. Standard ist `true`.
  * `simpleFullscreen`Boolean (optional) - Gibt an ob der pre-Lion Vollbildmodus unter macOS verwendet werden soll. Standard ist `false`.
  * `skipTaskbar` Boolean (optional) - Gibt an ob das Fenster in der Taskbar anzeigt werden soll. Standard ist `false`.
  * `kiosk` Boolean (optional) - Gibt an, ob der Benutzer eingeschränkte Rechte besitzt (Kiosk-Modus). Standard ist `false`.
  * `Titel` String (optional) - der Standardfenstertitel. Standard ist `"Electron"`. Wenn der HTML-Tag `<title>` in der von `loadUrl()` geladenen HTML-Datei festgelegt ist, dann wird dieser Wert ignoriert.
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Das Fenstericon. Es empfiehlt sich, unter Windows ein `ICO` Icon zu verwenden, um die besten visuellen Effekte zu erreichen. Das Icon des ausführbaren Programmes wird verwendet, wenn dieser Wert nicht definiert wird.
  * `show` Boolean (optional) - Gibt an ob das Fenster angezeigt wird, sobald es erstellt wurde. Standard ist `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Gibt an, ob der Renderer aktiv sein soll, wenn `show` `false` ist und das Fenster gerade erstellt wurde.  Damit `document.visibilityState` beim ersten Laden mit `show: false` korrekt funktioniert, sollten Sie diesen Wert auf `false`setzen.  Wenn Sie diese Einstellung auf `false` festlegen, wird das `ready-to-show` -Ereignis nicht ausgelöst.  Standard ist `true`.
  * `frame` Boolean (optional) - Geben Sie `false` an, um ein [Frameless Window](frameless-window.md)zu erstellen. Standard ist `true`.
  * `parent` BrowserWindow (optional) - Geben Sie das übergeordnete Fenster an. Standard ist `null`.
  * `modal` Boolean (optional) - Gibt an, ob es das Fenster ein modales Fenster sein soll. Diese Funktion funktioniert nur, wenn das Fenster ein untergeordnetes Fenster ist. Standard ist `false`.
  * `acceptFirstMouse` Boolean (optional) - Gibt an, ob die Webansicht ein einzelnes Maus-Down-Ereignis akzeptiert, das gleichzeitig das Fenster aktiviert. Standard ist `false`.
  * `disableAutoHideCursor` Boolean (optional) - Ob der Cursor ausgeblendet werden soll, wenn der Benutzer tippt. Standard ist `false`.
  * `autoHideMenuBar` Boolean (optional) - Blendet die Menüleiste automatisch aus, es sei denn, die `Alt` Taste wird gedrückt. Standard ist `false`.
  * `enableLargerThanScreen` Boolean (optional) - Dieser Wert gibt an, ob das Fenster größer als der Bildschirm sein kann. Nur relevant für macOS, da andere Betriebssysteme standardmäßig Fenster erlauben, die größer als der Bildschirm sind. Standard ist `false`.
  * `backgroundColor` String (optional) - Die Hintergrundfarbe des Fensters als hexadezimaler Wert, wie zum Beispiel `#66CD00` oder `#FFF` oder `#80FFFFFF` (alpha im #AARRGGBB Format wird unterstützt, wenn `transparent` auf `true` gesetzt ist). Der Standardwert ist `#FFF` (weiß).
  * `hasShadow` Boolean (optional) - Gibt an, ob das Fenster einen Schatten haben soll. Standard ist `true`.
  * `opacity` Zahl (optional) - Setzt die anfängliche Deckkraft des Fensters zwischen 0,0 (vollständig transparent) und 1,0 (vollständig undurchsichtig). Dies ist nur unter Windows und macOS implementiert.
  * `darkTheme` Boolean (optional) - Erzwingt ein dunkles Farbschema. Funktioniert nur mit manchen GTK+3 Desktopumgebungen. Standard ist `false`.
  * `transparent` Boolean (optional) - Macht das Fenster [transparent](frameless-window.md#transparent-window). Standard ist `false`. Unter Windows funktioniert es nur, wenn das Fenster rahmenlos ist.
  * `type` String (optional) - Der Fenstertyp. Standard ist ein normales Fenster. Mehr dazu kann weiter unten gelesen werden.
  * `visualEffectState` String (optional) - Specify how the material appearance should reflect window activity state on macOS. Must be used with the `vibrancy` property. Mögliche Werte sind:
    * `followWindow` - The backdrop should automatically appear active when the window is active, and inactive when it is not. This is the default.
    * `active` - The backdrop should always appear active.
    * `inactive` - The backdrop should always appear inactive.
  * `titleBarStyle` String (optional) - The style of window title bar. Standard ist `default`. Mögliche Werte sind:
    * `default` - Resultiert in der opaken, grauen Standardfenstertitelleiste von Mac.
    * `hidden` - Resultiert in einer versteckten Titelleiste und einem Fenster mit voller Inhaltsgröße. Das Fenster hat noch immer die standardmäßigen Steuerelemente ("Ampelleuchten") in der oberen linken Ecke.
    * `hiddenInset` - Resultiert in einer versteckten Titelleiste mit einem alternativem Aussehen, bei dem die Ampelleuchten Buttons vom Fensterrand etwas weiter nach innen gerückt wurden.
    * `customButtonsOnHover` - Results in a hidden title bar and a full size content window, the traffic light buttons will display when being hovered over in the top left of the window.  **Note:** This option is currently experimental.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons in frameless windows.
  * `roundedCorners` Boolean (optional) - Whether frameless window should have rounded corners on macOS. Standard ist `true`.
  * `fullscreenWindowTitle` Boolean (optional) _Deprecated_ - Shows the title in the title bar in full screen mode on macOS for `hiddenInset` titleBarStyle. Standard ist `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Fensterschatten und Fensteranimationen werden entfernt wenn dieser Wert `false` ist. Standard ist `true`.
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Please note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` are deprecated and have been removed in macOS Catalina (10.15).
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Standard ist `false`.
  * `tabbingIdentifier` String (optional) - Reitergruppenname, erlaubt das öffnen des Fensters als nativen Reiter unter macOS 10.12+. Fenster mit dem selben Reitergruppennamen werden gruppiert. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (optional) - Gibt an ob die Entwicklerwerkzeuge aktiviert sind. Falls dies auf `false` gesetzt ist, kann `BrowserWindow.webContents.openDevTools()` nicht verwendet werden um die Entwicklerwerkzeuge zu öffnen. Standard ist `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Standard ist `false`.
    * `nodeIntegrationsInWorker` Boolean (optional) - Gibt an ob die Node Integration in Web Workern aktiviert ist. Standard ist `false`. Mehr dazu kann in [Multithreading](../tutorial/multithreading.md) gefunden werden.
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (optional) - Gibt ein Skript an das vor allen anderen Skripten geladen wird bevor andere Skripte der Seite ausgeführt werden. Dieses Skript hat immer Zugriff auf die Node APIs, unabhängig davon ob die Node Integration aktiviert ist oder nicht. Der Wert sollte der absolute Pfad zum Skript sein. Wenn die Node Integration ausgeschaltet ist, kann das Preload Skript globale Node Symbole in den Globalen Scope zurückbringen. Siehe [dieses Beispiel](context-bridge.md#exposing-node-global-symbols).
    * `sandbox` Boolean (optional) - Wenn gesetzt, wird der Renderer des Fensters in einer Sandbox ausgeführt, wodurch es kompatibel mit der Chromium Sandbox wird und die Node.js Integration deaktiviert wird. Dies ist nicht das gleiche wie `nodeIntegration`, da die APIs die dem Preload Skript zur Verfügung stehen stärker limitiert sind. Lesen sie [hier](../tutorial/sandbox.md) mehr über diese Option.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Standard ist `false`.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. _Deprecated_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Standard ist `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Standard ist `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Standard ist `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Standard ist `false`.
    * `images` Boolean (optional) - Enables image support. Standard ist `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Standard ist `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Standard ist `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Standard ist `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Standard ist `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.
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
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `true`. The context that the `preload` script runs in will only have access to its own dedicated `document` and `window` globals, as well as its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.), which are all invisible to the loaded content. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used.  This option uses the same technique used by [Chrome Content Scripts][chrome-content-scripts].  You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `worldSafeExecuteJavaScript` Boolean (optional) - If true, values returned from `webFrame.executeJavaScript` will be sanitized to ensure JS values can't unsafely cross between worlds when using `contextIsolation`. Defaults to `true`. _Deprecated_
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Standard ist `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Standard ist `false`.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Standard ist `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Standard ist `true`.
    * `enableWebSQL` Boolean (optional) - Whether to enable the [WebSQL api](https://www.w3.org/TR/webdatabase/). Standard ist `true`.
    * `v8CacheOptions` String (optional) - Enforces the v8 code caching policy used by blink. Accepted values are
      * `none` - Disables code caching
      * `code` - Heuristic based code caching
      * `bypassHeatCheck` - Bypass code caching heuristics but with lazy compilation
      * `bypassHeatCheckAndEagerCompile` - Same as above except compilation is eager. Default policy is `code`.
    * `enablePreferredSizeMode` Boolean (optional) - Whether to enable preferred size mode. The preferred size is the minimum size needed to contain the layout of the document—without requiring scrolling. Enabling this will cause the `preferred-size-changed` event to be emitted on the `WebContents` when the preferred size changes. Standard ist `false`.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Mögliche Werte sind:

* Unter Linux sind mögliche Typen `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### Instanz Events

Objekte welche mit `new BrowserWindow` erzeugt wurden emitieren folgende Events:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### Event: 'page-title-updated'

Rückgabewert:

* `event` Event
* `title` String
* `explicitSet` Boolean

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing. `explicitSet` is false when title is synthesized from file URL.

#### Event: 'close'

Rückgabewert:

* `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. Ein Beispiel:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false // equivalent to `return false` but not recommended
}
```

_**Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron._

#### Event: 'closed'

Ausgegeben, wenn das Fenster geschlossen wird. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'session-end' _Windows_

Ausgegeben wenn die Fenstersitzung aufgrund von erzwungenem Abschalten, einem Neustart oder durch Abmelden enden wird.

#### Event: 'unresponsive'

Ausgegeben wenn die Webseite nicht mehr antwortet.

#### Event: 'responsive'

Ausgegeben wenn eine Webseite, die zuvor nicht mehr antwortete, wieder antwortet.

#### Event: 'blur'

Ausgegeben wenn das Fenster den Fokus verliert.

#### Event: 'focus'

Ausgegeben wenn das Fenster den Fokus erhält.

#### Event: 'show'

Ausgegeben wenn das Fenster gezeigt wird.

#### Event: 'hide'

Ausgegeben wenn das Fenster versteckt wird.

#### Event: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

Bitte beachten Sie, dass die Verwendung dieses Ereignisses impliziert, dass der Renderer als "sichtbar" und bemalt betrachtet wird, obwohl `show` falsch ist.  Dieses Ereignis wird nie abfeuern, wenn `paintWhenInitiallyHidden: false` gesetzt ist.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'will-resize' _macOS_ _Windows_

Rückgabewert:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Event: 'resize'

Emitted after the window has been resized.

#### Event: 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

This is usually emitted when the window has been resized manually. On macOS, resizing the window with `setBounds`/`setSize` and setting the `animate` parameter to `true` will also emit this event once resizing has finished.

#### Event: 'will-move' _macOS_ _Windows_

Rückgabewert:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Event: 'move'

Emitted when the window is being moved to a new position.

#### Event: 'moved' _macOS_ _Windows_

Emitted once when the window is moved to a new position.

__Note__: On macOS this event is an alias of `move`.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'always-on-top-changed'

Rückgabewert:

* `event` Event
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Rückgabewert:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Event: 'scroll-touch-begin' _macOS_

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' _macOS_

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' _macOS_

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' _macOS_

Rückgabewert:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Event: 'rotate-gesture' _macOS_

Rückgabewert:

* `event` Event
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Event: 'sheet-begin' _macOS_

Emitted when the window opens a sheet.

#### Event: 'sheet-end' _macOS_

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' _macOS_

Emitted when the native new tab button is clicked.

#### Event: 'system-context-menu' _Windows_

Rückgabewert:

* `event` Event
* `point` [Point](structures/point.md) - The screen coordinates the context menu was triggered at

Emitted when the system context menu is triggered on the window, this is normally only triggered when the user right clicks on the non-client area of your window.  This is the window titlebar or any area you have declared as `-webkit-app-region: drag` in a frameless window.

Calling `event.preventDefault()` will prevent the menu from being displayed.

### Static Methods

Die `BrowserWindow` Klasse hat folgende statische Methoden:

#### `BrowserWindow.getAllWindows()`

Gibt `BrowserWindow[]` zurück - Ein Array aller geöffneten Browser Fenster.

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

Returns `BrowserWindow | null` - The window with the given `id`.

### Instanz Eigenschaften

Objekte, die mit `new BrowserWindow` erstellt wurden, haben folgende Eigenschaften:

```javascript
const { BrowserWindow } = require('electron')
// In this example `win` is our instance
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window. Each ID is unique among all `BrowserWindow` instances of the entire Electron application.

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.simpleFullScreen`

A `Boolean` property that determines whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.fullScreen`

A `Boolean` property that determines whether the window is in fullscreen mode.

#### `win.visibleOnAllWorkspaces`

A `Boolean` property that determines whether the window is visible on all workspaces.

**Note:** Always returns false on Windows.

#### `win.shadow`

A `Boolean` property that determines whether the window has a shadow.

#### `win.menuBarVisible` _Windows_ _Linux_

A `Boolean` property that determines whether the menu bar should be visible.

**Note:** If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.kiosk`

A `Boolean` property that determines whether the window is in kiosk mode.

#### `win.documentEdited` _macOS_

A `Boolean` property that specifies whether the window’s document has been edited.

The icon in title bar will become gray when set to `true`.

#### `win.representedFilename` _macOS_

A `String` property that determines the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.title`

A `String` property that determines the title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

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

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. Automatisch `false`.

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

### Instanz Methoden

Objekte, die mit `new BrowserWindow` erstellt wurden, haben folgende Instanzmethoden:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

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

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of macOS prior to Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) (optional) _macOS_ - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and
{ width: 40, height: 50 }. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

The aspect ratio is not respected when window is resized programmingly with APIs like `win.setSize`.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Der Standardwert ist `#FFF` (weiß).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Standardwert ist `path`.

Uses [Quick Look][quick-look] to preview a file at a given path.

#### `win.closeFilePreview()` _macOS_

Closes the currently open [Quick Look][quick-look] panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (optional) _macOS_

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

#### `win.getBackgroundColor()`

Returns `String` - Gets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md) Die Grenzen der Ansicht als Rechteck
* `animate` Boolean (optional) _macOS_

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

Returns `Boolean` - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

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

Sets whether the window can be manually resized by the user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by the user.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Returns `Boolean` - Whether the window can be moved by user.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Returns `Boolean` - Whether the window can be manually minimized by the user.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Returns `Boolean` - Whether the window can be manually maximized by user.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Gibt `Boolean` zurück - Gibt an ob das Fenster durch den Nutzer manuell geschlossen werden kann.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs][window-levels] for more details.
* `relativeLevel` Integer (optional) _macOS_ - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

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
* `animate` Boolean (optional) _macOS_

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Ein Beispiel:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
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

Enters or leaves kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.isTabletMode()` _Windows_

Returns `Boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can [use their PC as tablet](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be be used to listen to changes to tablet mode.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1324:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function
  * `wParam` any - The `wParam` provided to the WndProc
  * `lParam` any - The `lParam` provided to the WndProc

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` _Windows_

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` _macOS_

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` _macOS_

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. If the page is not visible, `rect` may be empty.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
const url = require('url').format({
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
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

`buttons` ist ein Array mit `Button` Objekten:

* `Button` Objekt
  * ` Icon ` [ NativeImage ](native-image.md)-das Symbol zeigt in Thumbnail Leiste.
  * ` Klicken Sie auf ` Funktion
  * ` Tooltip ` String (optional)-der Text der Tooltip der Schaltfläche.
  * `flags` String[] (optional) - Kontrollieren Sie bestimmte Zustände und Verhaltensweisen des Buttons. Standardmäßig ist es `['enabled']`.

Die ` Flags ` ist ein Array, das folgende ` Zeichenfolge ` s enthalten kann:

* ` Enabled `-die Schaltfläche ist aktiv und für den Benutzer verfügbar.
* `disabled` - Der Button ist deaktiviert. Er ist vorhanden, zeigt aber visuell, dass er nicht auf Nutzeraktionen reagiert.
* ` dismissonclick `-wenn auf die Schaltfläche geklickt wird, wird das Thumbnail-Fenster geschlossen sofort.
* ` nobackground `-zeichnen Sie keinen Schaltflächenrahmen, sondern verwenden Sie nur das Bild.
* ` Hidden `-die Schaltfläche wird dem Benutzer nicht angezeigt.
* `noninteractive` - Der Button ist aktiviert aber nicht interaktiv. Es wird kein gedrückter Button angezeigt. Dieser Wert ist für Instanzen bestimmt, in denen der Button in einer Benachrichtigung verwendet wird.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Standard ist `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows.
  * `skipTransformProcessType` Boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

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

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` _macOS_

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` _macOS_

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` _macOS_

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` _macOS_

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` _macOS_

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation][vibrancy-docs] for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons in frameless window.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The custom position for the traffic light buttons in frameless window.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Raises `browserView` above other `BrowserView`s attached to `win`. Throws an error if `browserView` is not attached to `win`.

#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
