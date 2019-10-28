# BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

```javascript
// メインプロセス
const { BrowserWindow } = require('electron')

// レンダラープロセスからは `remote` を使用します。
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// リモートURLをロード
win.loadURL('https://github.com')

// または、ローカルファイルをロード
win.loadURL(`file://${__dirname}/app/index.html`)
```

## フレームレスウィンドウ

[Frameless Window](frameless-window.md) APIを使うと、枠がないウインドウや任意の形状の透明なウインドウを作成することができます。

## ウインドウを違和感なく表示する

ウインドウにページを直接ロードすると、ユーザにはページが徐々にロードされるように見えるかもしれません。これはネイティブアプリとしては良い挙動ではありません。チラつかせることなくウインドウを表示するには、さまざまな状況に応じた2つの解決策があります。

## Using `ready-to-show` event

ページのロード中、ウインドウがまだ表示されていない場合、レンダラープロセスが初めてページをレンダリングし終わったとき、`ready-to-show` イベントが発生します。 このイベントの後にウインドウを表示させれば、チラつくことはありません。

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

このイベントは、通常、`did-finish-load` イベントの後に発生しますが、大量のリモートリソースがあるページでは、`did-finish-load` イベントの前に発生する可能性があります。

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

## Setting `backgroundColor`

For a complex app, the `ready-to-show` event could be emitted too late, making the app feel slow. In this case, it is recommended to show the window immediately, and use a `backgroundColor` close to your app's background:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Note that even for apps that use `ready-to-show` event, it is still recommended to set `backgroundColor` to make app feel more native.

## Parent and child windows

By using `parent` option, you can create child windows:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

The `child` window will always show on top of the `top` window.

## Modal windows

A modal window is a child window that disables parent window, to create a modal window, you have to set both `parent` and `modal` options:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Page visibility

The [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) works as follows:

* すべてのプラットフォームおいて、表示状態はウインドウが非表示/最小化されているかどうかをトラッキングします。
* さらに、macOSでは、表示状態はウインドウが重なり合った状態もトラッキングします。 ウインドウが別のウインドウと重なり合った (例えば、完全に覆い隠された) 場合、表示状態は、`hidden` になります。 他のプラットフォーム上では、ウインドウが最小化されるか、明示的に `win.hide()` で非表示にされた場合のみ、表示状態は `hidden` になります。
* `BrowserWindow` が `show: false` で作成された場合、ウインドウが実際には非表示であるにも関わらず、初期の表示状態は `visible` になります。
* `backgroundThrottling` が無効の場合、ウインドウを最小化したり、重ねたり、非表示にしたりしても、表示状態は `visible` のままになります。

It is recommended that you pause expensive operations when the visibility state is `hidden` in order to minimize power consumption.

## Platform notices

* macOSでは、モーダルウインドウは親ウインドウに付随したシートとして表示されます。
* 親ウインドウが移動したとき、macOSでは、子ウインドウは親ウインドウに対する相対的な位置を維持しますが、WindowsとLinuxでは、子ウインドウは移動しません。
* Linuxでは、モーダルウインドウの型は、`dialog` に変更されます。
* Linuxでは、多くのデスクトップ環境は、モーダルウインドウを非表示にすることをサポートしていません。

## Class: BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

It creates a new `BrowserWindow` with native properties as set by the `options`.

### `new BrowserWindow([options])`

* `options` Object (任意) 
  * `width` Integer (任意) - ピクセル単位でのウインドウの幅。省略値は、`800` です。
  * `height` Integer (任意) - ピクセル単位でのウインドウの高さ。省略値は、`600` です。
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (任意) - `width` と `height` が、Webページのサイズとして使用されます。この場合、実際のウインドウのサイズは、ウインドウ枠のサイズが含まれ、若干大きくなることを意味します。 省略値は、`false` です。
  * `center` Boolean (任意) - ウインドウを画面中央に表示します。
  * `minWidth` Integer (任意) - ウインドウの最小の幅。省略値は、`0` です。
  * `minHeight` Integer (任意) - ウィンドウの最小の高さ。省略値は、`0` です。
  * `maxWidth` Integer (任意) - ウインドウの最大の幅。省略値は、無制限です。
  * `maxHeight` Integer (任意) - ウインドウの最大の高さ。省略値は、無制限です。
  * `resizable` Boolean (任意) - ウインドウがリサイズ可能かどうか。省略値は、 `true` です。
  * `movable` Boolean (任意) - ウインドウが移動可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `minimizable` Boolean (任意) - ウインドウが最小化可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `maximizable` Boolean (任意) - ウインドウが最大化可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `closable` Boolean (任意) - ウインドウを閉じることができるかどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `focusable` Boolean (任意) - ウインドウにフォーカスを当てることができるかどうか。 省略値は `true` です。 Windowsでは、`focusable: false` と設定することは、`skipTaskbar: true` と設定することにもなります。 Linuxでは、`focusable: false` と設定することは、ウインドウがwmとのやり取りを停止することになるため、ウインドウがすべてのワークスペースで常に前面に表示されます。
  * `alwaysOnTop` Boolean (任意) - ウインドウを常に他のウインドウの前面に表示させるかどうか。省略値は、`false` です。
  * `fullscreen` Boolean (任意) - ウインドウをフルスクリーンで表示させるかどうか。 明示的に `false` と設定された場合、macOSでは、フルスクリーンボタンが非表示または無効になります。 省略値は、`false` です。
  * `fullscreenable` Boolean (任意) - ウインドウをフルスクリーンモードにすることができるかどうか。 macOSでは、さらに、最大化/ズームボタンが、フルスクリーンモードまたはウインドウ最大化に切り替わるかどうか。 省略値は `true` です。
  * `simpleFullscreen` Boolean (任意) - macOSでLionより前のフルスクリーンを使用します。省略値は、`false` です。
  * `skipTaskbar` Boolean (任意) - ウインドウをタスクバーに表示するかどうか。省略値は、`false` です。
  * `kiosk` Boolean (任意) - キオスクモード。省略値は、`false` です。
  * `title` String (任意) - デフォルトのウインドウタイトル。 省略値は `"Electron"` です。 HTML タグの `<title>` が `loadURL()` でロードされた HTML ファイル内で定義されている場合、このプロパティは無視されます。
  * `icon` ([NativeImage](native-image.md) | String) (任意) - ウインドウのアイコン。 Windowsでは、最高の視覚効果を得るためには、`ICO` アイコンを使うことを推奨します。未定義のままにすることもできますが、その場合、実行可能ファイルのアイコンが使われます。
  * `show` Boolean (任意) - 生成時にウインドウを表示するかどうか。省略値は、`true` です。
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created. In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`. Setting this to `false` will cause the `ready-to-show` event to not fire. 省略値は `true` です。
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. 省略値は、`false` です。
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). 省略値は、`false` です。 On Windows, does not work unless the window is frameless.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
    * `default` - Results in the standard gray opaque Mac title bar.
    * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. 省略値は `true` です。
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. 省略値は、`false` です。
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. 省略値は `true` です。
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `false`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. 省略値は、`false` です。 More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Default is `true`.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. 省略値は `true` です。
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

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* Linuxでは、設定できる値は、`desktop`、`dock`、`toolbar`、`splash`、`notification` です。
* macOSでは、設定できる値は、 `desktop`, `textured です。`. 
  * `textured` タイプは、メタルのグラデーションの外観 (`NSTexturedBackgroundWindowMask`) を追加します。
  * `desktop` タイプは、ウインドウをデスクトップのバックグラウンドウインドウのレベル (`kCGDesktopWindowLevel - 1`) に配置します。 デスクトップウインドウはフォーカス、キーボードやマウスイベントを受け付けることがないことに注意してください。しかしながら、`globalShortcut` を使って、かろうじて入力を受け付けることはできます。
* Windowsでは、設定できるタイプは、`toolbar` です。

### インスタンスイベント

Objects created with `new BrowserWindow` emit the following events:

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'page-title-updated'

戻り値:

* `event` Event
* `title` String
* `explicitSet` Boolean

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing. `explicitSet` is false when title is synthesized from file URL.

#### イベント: 'close'

戻り値:

* `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. 例:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // メッセージボックスがユーザに表示される通常のブラウザーとは違って、
  // 無効でない値を返却すれば、何も表示せずにクローズをキャンセルします。
  // アプリケーションがクローズするのをユーザに確認させるには、
  // ダイアログAPIを使用することを推奨します。
  e.returnValue = false // `return false` と同じですが、非推奨
}
```

***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron.*

#### イベント: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### イベント: 'session-end' *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### イベント: 'unresponsive'

Webページが応答しなくなるときに発生します。

#### イベント: 'responsive'

応答しないWebページが再び応答するようになるときに発生します。

#### イベント: 'blur'

Emitted when the window loses focus.

#### イベント: 'focus'

Emitted when the window gains focus.

#### イベント: 'show'

Emitted when the window is shown.

#### イベント: 'hide'

Emitted when the window is hidden.

#### イベント: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

#### イベント: 'maximize'

Emitted when window is maximized.

#### イベント: 'unmaximize'

Emitted when the window exits from a maximized state.

#### イベント: 'minimize'

Emitted when the window is minimized.

#### イベント: 'restore'

Emitted when the window is restored from a minimized state.

#### イベント: 'will-resize' *macOS* *Windows*

戻り値:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - ウインドウがリサイズされようとしているサイズ。

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### イベント: 'resize'

Emitted after the window has been resized.

#### イベント: 'will-move' *Windows*

戻り値:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - ウインドウが移動されようとしている位置。

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### イベント: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is an alias of `moved`.

#### イベント: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### イベント: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### イベント: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### イベント: 'enter-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態を抜けるときに発生します。

#### イベント: 'always-on-top-changed'

戻り値:

* `event` Event
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### イベント: 'app-command' *Windows* *Linux*

戻り値:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // ユーザがマウスの戻るボタンをクリックしたとき、ウインドウに対して戻るように操作する
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### イベント: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### イベント: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### イベント: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### イベント: 'swipe' *macOS*

戻り値:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' *macOS*

戻り値:

* `event` Event
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### イベント: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### 静的メソッド

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.getExtensions()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

### インスタンスプロパティ

Objects created with `new BrowserWindow` have the following properties:

```javascript
const { BrowserWindow } = require('electron')
// この例では、`win` がインスタンス
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` *Readonly*

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

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

### インスタンスメソッド

Objects created with `new BrowserWindow` have the following instance methods:

**注:** いくつかのメソッドは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

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

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (optional) *macOS*

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
* `animate` Boolean (optional) *macOS*

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

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

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

**[非推奨](modernization/property-updates.md)**

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

**[非推奨](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

**[非推奨](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

**[非推奨](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

**[非推奨](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[非推奨](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[非推奨](modernization/property-updates.md)**

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

**[非推奨](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* *Windows* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus

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

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャする範囲

戻り値 `Promise<NativeImage>` - [NativeImage](native-image.md) を解決します

`rect` 範囲内のページのスナップショットを撮ります。`rect` を省略すると、表示されているページ全体をキャプチャします。

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。

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
* `options` Object (任意) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (任意) - `url.format()` に渡されます。
  * `hash` String (任意) - `url.format()` に渡されます。

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。

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
* `options` Object (任意) 
  * `mode` String *Windows* - プログレスバーのモード。`none`、`normal`、`indeterminate`、`error` または `paused` にすることができます。

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - タスクバーアイコンの右下隅に表示されるアイコン。 この引数が `null` の場合、オーバーレイは消去されます。
* `description` String - アクセシビリティスクリーンリーダーに提供される説明

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - 0.0 (完全に透明) と 1.0 (完全に不透明) の間

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - ウィンドウの形を設定します。空のリストを渡すと矩形に戻ります。

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - サムネイルツールバーで表示されるアイコン。
  * `click` Function
  * `tooltip` String (任意) - ボタンのツールチップのテキスト。
  * `flags` String[] (任意) - ボタンの特定の状態や動作を制御します。デフォルトでは、`['enabled']` です。

`flags` は、以下の `String` を含めることができる配列です。

* `enabled` - そのボタンはアクティブかつユーザが使用可能です。
* `disabled` - そのボタンは無効です。存在しますが、ユーザ操作に応答しないことを示す視覚的な状態です。
* `dismissonclick` - そのボタンをクリックすると、サムネイルウインドウがすぐに閉じます。
* `nobackground` - そのボタンの縁を描画しません。画像にのみ使用してください。
* `hidden` - そのボタンはユーザに表示されません。
* `noninteractive` - そのボタンは有効ですが、反応せず、押されたボタンの状態も描画されません。この値は、例えば通知内で使用するボタンに使用されます。

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - ウインドウの領域

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (任意) - ウインドウの[アプリユーザーモデルID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx)。 設定されないと、他のオプションは無効です。
  * `appIconPath` String (任意) - ウインドウの[再起動アイコン](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx)。
  * `appIconIndex` Integer (任意) - `appIconPath` のアイコンのインデックス。 `appIconPath` が設定されないと無視されます。省略値は、`0` です。
  * `relaunchCommand` String (任意) - ウインドウの[再起動コマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)。
  * `relaunchDisplayName` String (任意) - ウインドウの[再起動表示名](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx)。

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[非推奨](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[非推奨](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (任意) 
  * `visibleOnFullScreen` Boolean (任意) *macOS* - ウインドウをフルスクリーンウィンドウの上で表示するかどうかを設定します。

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (任意) 
  * `forward` Boolean (任意) *macOS* *Windows* - trueの場合、マウスの移動メッセージが Chromium に転送され、`mouseleave` のようなマウス関連のイベントが有効になります。 `ignore` がtrueのときだけ使用されます。 `ignore` がfalseの場合、この値に関わらず、転送は常に無効です。

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

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. 詳細については、[macOSのドキュメント](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) を参照してください。

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md) | null - Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Experimental*

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.