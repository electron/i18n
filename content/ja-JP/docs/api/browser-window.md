# BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

```javascript
// メインプロセス
const {BrowserWindow} = require('electron')

// または、レンダラープロセスから `remote` を使用してください。
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
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

### `ready-to-show` イベントを使用する

ページのロード中、ウインドウがまだ表示されていない場合、レンダラープロセスが初めてページをレンダリングし終わったとき、`ready-to-show` イベントが発生します。 このイベントの後にウインドウを表示させれば、チラつくことはありません。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

このイベントは、通常、`did-finish-load` イベントの後に発生しますが、大量のリモートリソースがあるページでは、`did-finish-load` イベントの前に発生する可能性があります。

### `backgroundColor`を設定する

複雑なアプリでは、`ready-to-show` イベントが発生するのに時間がかかり過ぎて、アプリが遅いと感じさせる可能性があります。 このような場合、ウインドウをすぐに表示し、アプリの背景に近い `backgroundColor` を使うことを推奨します。

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

`ready-to-show` イベントを使用しているアプリに対しても、アプリがよりネイティブに感じられるように `backgroundColor` を設定することが推奨されます。

## 親ウィンドウと子ウィンドウ

`parent` オプションを使用することで、子ウインドウを作成することができます。

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

`child` ウインドウは、常に `top` ウインドウの前面に表示されます。

### モーダルウィンドウ

モーダルウインドウは親ウインドウを無効化する子ウインドウです。モーダルウインドウを作成するには、`parent` と `modal` オプションの両方を設定しなければなりません。

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### ページの表示状態

[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) は、以下のように動作します。

* すべてのプラットフォームおいて、表示状態はウインドウが非表示/最小化されているかどうかをトラッキングします。
* さらに、macOSでは、表示状態はウインドウが重なり合った状態もトラッキングします。 ウインドウが別のウインドウと重なり合った (例えば、完全に覆い隠された) 場合、表示状態は、`hidden` になります。 他のプラットフォーム上では、ウインドウが最小化されるか、明示的に `win.hide()` で非表示にされた場合のみ、表示状態は `hidden` になります。
* `BrowserWindow` が `show: false` で作成された場合、ウインドウが実際には非表示であるにも関わらず、初期の表示状態は `visible` になります。
* `backgroundThrottling` が無効の場合、ウインドウを最小化したり、重ねたり、非表示にしたりしても、表示状態は `visible` のままになります。

消費電力を最小にするために、表示状態が `hidden` のとき、高負荷な操作を一時停止することを推奨します。

### プラットフォームに関する注意事項

* macOSでは、モーダルウインドウは親ウインドウに付随したシートとして表示されます。
* 親ウインドウが移動したとき、macOSでは、子ウインドウは親ウインドウに対する相対的な位置を維持しますが、WindowsとLinuxでは、子ウインドウは移動しません。
* Windowsでは、動的に親ウインドウを変更することはサポートされていません。
* Linuxでは、モーダルウインドウの型は、`dialog` に変更されます。
* Linuxでは、多くのデスクトップ環境は、モーダルウインドウを非表示にすることをサポートしていません。

## クラス: BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

`options` によって設定されたネイティブプロパティで新しい `BrowserWindow` を生成します。

### `new BrowserWindow([options])`

* `options` Object (任意) 
  * `width` Integer (任意) - ピクセル単位でのウインドウの幅。省略値は、`800` です。
  * `height` Integer (任意) - ピクセル単位でのウインドウの高さ。省略値は、`600` です。
  * `x` Integer (任意) (yが使われている場合は、**必須**) - ウインドウの画面左のオフセット。 省略値では、ウインドウが中央になるようになっています。
  * `y` Integer (任意) (xが使われている場合は、**必須**) - ウインドウの画面上のオフセット。 省略値では、ウインドウが中央になるようになっています。
  * `useContentSize` Boolean (任意) - `width` と `height` が、Webページのサイズとして使用されます。この場合、実際のウインドウのサイズは、ウインドウ枠のサイズが含まれ、若干大きくなることを意味します。 省略値は `false` 。
  * `center` Boolean (任意) - ウインドウを画面中央に表示します。
  * `minWidth` Integer (任意) - ウインドウの最小の幅。省略値は、`` です。
  * `minHeight` Integer (任意) - ウィンドウの最小の高さ。省略値は、`` です。
  * `maxWidth` Integer (任意) - ウインドウの最大の幅。省略値は、無制限です。
  * `maxHeight` Integer (任意) - ウインドウの最大の高さ。省略値は、無制限です。
  * `resizable` Boolean (任意) - ウインドウがリサイズ可能かどうか。省略値は、 `true` です。
  * `movable` Boolean (任意) - ウインドウが移動可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `minimizable` Boolean (任意) - ウインドウが最小化可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `maximizable` Boolean (任意) - ウインドウが最大化可能かどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `closable` Boolean (任意) - ウインドウを閉じることができるかどうか。これはLinuxでは実装されていません。省略値は、`true` です。
  * `focusable` Boolean (任意) - ウインドウにフォーカスを当てることができるかどうか。 省略値は `true` です。 Windowsでは、`focusable: false` と設定することは、`skipTaskbar: true` と設定することにもなります。 Linuxでは、`focusable: false` と設定することは、ウインドウがwmとのやり取りを停止することになるため、ウインドウがすべてのワークスペースで常に前面に表示されます。
  * `alwaysOnTop` Boolean (任意) - ウインドウを常に他のウインドウの前面に表示させるかどうか。省略値は、`false` です。
  * `fullscreen` Boolean (任意) - ウインドウをフルスクリーンで表示させるかどうか。 明示的に `false` と設定された場合、macOSでは、フルスクリーンボタンが非表示または無効になります。 省略値は `false` です。
  * `fullscreenable` Boolean (任意) - ウインドウをフルスクリーンモードにすることができるかどうか。 macOSでは、さらに、最大化/ズームボタンが、フルスクリーンモードまたはウインドウ最大化に切り替わるかどうか。 省略値は `true` です。
  * `simpleFullscreen` Boolean (任意) - macOSでLionより前のフルスクリーンを使用します。省略値は、`false` です。
  * `skipTaskbar` Boolean (任意) - ウインドウをタスクバーに表示するかどうか。省略値は、`false` です。
  * `kiosk` Boolean (任意) - キオスクモード。省略値は、`false` です。
  * `title` String (任意) - 既定のウインドウタイトル。省略値は、`"Electron"` です。
  * `icon` ([NativeImage](native-image.md) | String) (任意) - ウインドウのアイコン。 Windowsでは、最高の視覚効果を得るためには、`ICO` アイコンを使うことを推奨します。未定義のままにすることもできますが、その場合、実行可能ファイルのアイコンが使われます。
  * `show` Boolean (任意) - 生成時にウインドウを表示するかどうか。省略値は、`true` です。
  * `frame` Boolean (任意) - [Frameless Window](frameless-window.md) を生成する場合、`false` に指定します。省略値は、`true` です。
  * `parent` BrowserWindow (任意) - 親ウインドウを指定します。省略値は、`null` です。
  * `modal` Boolean (任意) - モーダルウインドウかどうか。ウインドウが子ウインドウのときだけ機能します。 省略値は、`false` です。
  * `acceptFirstMouse` Boolean (任意) - ウインドウをアクティブにした単発のマウスダウンイベントを同時にWebビューが受け付けるかどうか。省略値は、`false` です。
  * `disableAutoHideCursor` Boolean (任意) - 入力中にカーソルを非表示にするかどうか。 省略値は、`false` です。
  * `autoHideMenuBar` Boolean (任意) - `Alt` キーが押されていない場合、メニューバーを自動的に非表示にします。省略値は、`false` です。
  * `enableLargerThanScreen` Boolean (任意) - ウインドウを画面よりも大きいサイズに変更できるようにします。省略値は、`false` です。
  * `backgroundColor` String (任意) - `#66CD00` や `#FFF` や `#80FFFFFF` (アルファ値をサポートしています) のような16進数の値でのウインドウの背景色。 省略値は、`#FFF` (白) です。
  * `hasShadow` Boolean (任意) - ウインドウが影をもっているかどうか。これはmacOSでのみ実装されています。省略値は、`true` です。
  * `opacity` Number (任意) - ウインドウの初期透明度を0.0 (完全に透明) から 1.0 (完全に不透明) の間で設定します。これはWindowsとmacOSでのみ実装されています。
  * `darkTheme` Boolean (任意) - ウインドウに対してダークテーマを強制的に使用します。いくつかのGTK+3デスクトップ環境でしか動作しません。省略値は、`false` です。
  * `transparent` Boolean (任意) - ウインドウを [透明](frameless-window.md) にします。 省略値は、`false` です。
  * `type` String (任意) - ウインドウのタイプで、省略値は通常のウインドウです。この詳細は以下を参照してください。
  * `titleBarStyle` String (任意) - ウインドウのタイトルバーのスタイル。 省略値は、 `default`です。取りうる値: 
    * `default` - 標準の灰色不透明なMacのタイトルバーになります。
    * `hidden` - タイトルバーが非表示かつフルサイズのコンテンツウインドウになりますが、タイトルバーには、まだ標準のウインドウコントロール ("信号") が左上にあります。
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (任意) - Windowsのフレームレスウインドウに対して、標準のウインドウ枠を追加する `WS_THICKFRAME` スタイルを使用します。 `false` に設定すると、ウインドウの影とウインドウアニメーションがなくなります。 省略値は `true` です。
  * `vibrancy` String (任意) - macOSでのみ、ウインドウに曇りガラス効果の種類を追加します。 `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light` または `ultra-dark` にすることができます。 Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (任意) - macOSで、optionキーを押下しながら緑の信号ボタンをクリックしたり、ウインドウ > ズーム のメニュー項目をクリックしたりしたときの動作を制御します。 `true` の場合、ズームしたとき、ウインドウはWebページの最適な幅に拡大されます。`false` だと、画面の幅にズームされます。 これは、`maximize()` を直接呼び出したときの動作にも影響を与えます。 省略値は `false` です。
  * `tabbingIdentifier` String (任意) - タブのグループ名で、macOS 10.12以上の場合、ネイティブのタブとしてウインドウを開くことができます。 同一のタブ識別子を持つウインドウは、一緒にグループ化されます。 これはネイティブのタブボタンをウインドウのタブバーに追加し、`app` とウインドウが `new-window-for-tab` イベントを受け取ることができるようになります。
  * `webPreferences` Object (任意) - Webページの機能設定。 
    * `devTools` Boolean (任意) - デベロッパーツールを有効にするかどうか。 `false` に設定すると、`BrowserWindow.webContents.openDevTools()` を使ってデベロッパーツールを開くことはできません。 省略値は `true` です。
    * `nodeIntegration` Boolean (任意) - Node統合を有効にするかどうか。省略値は、`true` です。
    * `nodeIntegrationInWorker` Boolean (任意) - WebワーカーでNode統合を有効にするかどうか。 省略値は `false` です。 これについての詳細は、[マルチスレッド](../tutorial/multithreading.md) を参照してください。
    * `preload` String (任意) - 他のスクリプトがページで実行される前にロードされるスクリプトを指定します。 このスクリプトは、Node統合がオンまたはオフであるかに関係なく常にNode APIにアクセスできます。 値は、スクリプトへの絶対ファイルパスにする必要があります。 Node統合がオフのときでも、プレロードされたスクリプトは、Nodeのグローバルシンボルをグローバルスコープに再導入できます。 [ここ](process.md#event-loaded) の例を参照してください。
    * `sandbox` Boolean (任意) - 設定された場合、ウインドウと関連付けられているレンダラーをサンドボックス化します。これは、ChromiumのOSレベルのサンドボックスと互換性を持ち、Node.jsエンジンを無効化します。 これは `nodeIntegration` オプションと同じではなく、プレロードスクリプトで利用可能なAPIよりもさらに制限がかかります。 このオプションの詳細については、[ここ](sandbox-option.md) をお読みください。 **注:** このオプションは、現在のところ、実験的なものであり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。
    * `session` [Session](session.md#class-session) (任意) - ページで使用されるセッションを設定します。 Session オブジェクトを直接引き渡す代わりに、パーティション文字列を受け付ける `partition` オプションを使用することを選択することもできます。 `session` と `partition` の両方が指定されたときは、`session` が優先されます。 省略値は、既定のセッションです。
    * `partition` String (任意) - セッションのパーティション文字列に従って、ページで使用されるセッションを設定します。 `partition` が `persist:` 始まりの場合、ページはアプリの全ページで利用可能な永続的なセッションを同じ `partition` で使用します。 `persist:` プレフィックスがない場合、ページは、インメモリセッションを使用します。 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 省略値は、既定のセッションです。
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. 省略値は `true` です。
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
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
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. 省略値は、`false` です。 See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

`minWidth`/`maxWidth`/`minHeight`/`maxHeight` で最小もしくは最大のウインドウサイズを設定するのは、ユーザを束縛するだけです。 サイズ制限に従わないサイズを `setBounds`/`setSize` や `BrowserWindow` のコンストラクタに引き渡したすことは、差し支えありません。

`type` オプションに設定できる値と動作は、プラットフォーム依存です。設定できる値:

* Linuxでは、設定できる値は、`desktop`、`dock`、`toolbar`、`splash`、`notification` です。
* macOSでは、設定できる値は、 `desktop、`, `textured です。`. 
  * `textured` タイプは、メタルのグラデーションの外観 (`NSTexturedBackgroundWindowMask`) を追加します。
  * `desktop` タイプは、ウインドウをデスクトップのバックグラウンドウインドウのレベル (`kCGDesktopWindowLevel - 1`) に配置します。 デスクトップウインドウはフォーカス、キーボードやマウスイベントを受け付けることがないことに注意してください。しかしながら、`globalShortcut` を使って、かろうじて入力を受け付けることはできます。
* Windowsでは、設定できるタイプは、`toolbar` です。

### インスタンスイベント

`new BrowserWindow` で作成されたオブジェクトでは以下のイベントが発生します。

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'page-title-updated'

戻り値:

* `event` Event
* `title` String

ドキュメントのタイトルが変更されたときに発生します。`event.preventDefault()` を呼び出すことで、ネイティブウインドウのタイトルが変更されるのをキャンセルできます。

#### イベント: 'close'

戻り値:

* `event` Event

ウインドウがクローズされようとするときに発生します。 これは、DOMの `beforeunload` と `unload` イベントの前に発生します。 `event.preventDefault()` を呼び出すことで、クローズがキャンセルされます。

通常、ウインドウをクローズさせる必要があるかどうかを判断するために、`beforeunload` ハンドラーを使用したいと思うでしょうが、これは、ウインドウがリロードされるときにも呼び出されます。 Electronでは、`undefined` 以外の値を返却すれば、クローズをキャンセルします。 例:

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

***注**: `window.onbeforeunload = handler` と `window.addEventListener('beforeunload', handler)` の動作には、微妙な違いがあります。 単純に値を返却する代わりに、常に明示的に `event.returnValue` を設定するようにすることを推奨します。後者の方がElectron内でより一貫性のある動作をします。*

#### イベント: 'closed'

ウインドウがクローズされると発生します。このイベントを受け取った後は、ウインドウへの参照を削除し、これ以上、ウインドウを使用しないようにしてください。

#### イベント: 'session-end' *Windows*

強制的なシャットダウン、マシン再起動またはセッションのログオフによってウインドウセッションが終了されようとしたときに発生します。

#### イベント: 'unresponsive'

Webページが応答しなくなるときに発生します。

#### イベント: 'responsive'

応答しないWebページが再び応答するようになるときに発生します。

#### イベント: 'blur'

ウインドウがフォーカスを失うときに発生します。

#### イベント: 'focus'

ウインドウがフォーカスを得るときに発生します。

#### イベント: 'show'

ウインドウが表示されるときに発生します。

#### イベント: 'hide'

ウインドウが非表示になるときに発生します。

#### イベント: 'ready-to-show'

Webページが (まだ表示されていないが) レンダリングされ、チラつくことなくウインドウが表示できるときに発生します。

#### イベント: 'maximize'

ウィンドウが最大化されるときに発生します。

#### イベント: 'unmaximize'

ウインドウが最大化状態から抜けるときに発生します。

#### イベント: 'minimize'

ウィンドウが最小化されるときに発生します。

#### イベント: 'restore'

ウインドウが最小化状態から復元されたときに発生します。

#### イベント: 'resize'

ウインドウがリサイズされるときに発生します。

#### イベント: 'move'

ウインドウが新しい位置に移動されているときに発生します。

**注**: macOSでは、このイベントは `moved` のただのエイリアスです。

#### イベント: 'moved' *macOS*

ウインドウが新しい位置に移動されるときに一回だけ、発生します。

#### イベント: 'enter-full-screen'

ウインドウがフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-full-screen'

ウインドウがフルスクリーン状態を抜けるときに発生します。

#### イベント: 'enter-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態を抜けるときに発生します。

#### イベント: 'app-command' *Windows*

戻り値:

* `event` Event
* `command` String

[アプリコマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) が呼び出されるときに発生します。 これらは、Windowsで幾つかのマウスに組み込まれている "Back" ボタンだけでなく、一般的にキーボードのメディアキーやブラウザコマンドとも関連付けられています。

コマンドは小文字にされ、アンダースコアはハイフンに置き換えられ、`APPCOMMAND_`プレフィックスは外されます。 例えば、`APPCOMMAND_BROWSER_BACKWARD` は、`browser-backward` として送信されます。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // ユーザがマウスの戻るボタンをクリックしたとき、ウインドウに対して戻るように操作する
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### イベント: 'scroll-touch-begin' *macOS*

スクロールホイールイベントフェーズが開始されたときに発生します。

#### イベント: 'scroll-touch-end' *macOS*

スクロールホイールイベントフェーズが終了したときに発生します。

#### イベント: 'scroll-touch-edge' *macOS*

スクロールイベントフェーズが要素の端に達したことを検出したときに発生します。

#### イベント: 'swipe' *macOS*

戻り値:

* `event` Event
* `direction` String

3本指でのスワイプで発生します。とりうる方向は、`up`、`right`、`down`、`left` です。

#### イベント: 'sheet-begin' *macOS*

ウインドウがシートを開くときに発生します。

#### イベント: 'sheet-end' *macOS*

ウインドウがシートを閉じたときに発生します。

#### イベント: 'new-window-for-tab' *macOS*

ネイティブの新規タブボタンがクリックされるときに発生します。

### 静的メソッド

`BrowserWindow` クラスには、次の静的メソッドがあります。

#### `BrowserWindow.getAllWindows()`

戻り値 `BrowserWindow[]` - 開かれたすべてのブラウザウィンドウの配列。

#### `BrowserWindow.getFocusedWindow()`

戻り値 `BrowserWindow` - このアプリケーションでフォーカスされたウインドウ。それ以外は、`null` を返します。

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

戻り値 `BrowserWindow` - 指定された `webContents` を所有するウインドウ。

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

戻り値 `BrowserWindow | null` - 指定された `browserView` を所有するウインドウ。指定されたビューがどのウインドウにもアタッチされていない場合、`null` を返します。

#### `BrowserWindow.fromId(id)`

* `id` Integer

戻り値 `BrowserWindow` - 指定された `id` のウインドウ。

#### `BrowserWindow.addExtension(path)`

* `path` String

`path` にあるChrome拡張機能を追加し、拡張機能の名前を返します。

このメソッドは、拡張機能のマニフェストが存在しないか、不完全である場合、何も返しません。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.removeExtension(name)`

* `name` String

指定した名前でChrome拡張機能を削除します。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.getExtensions()`

戻り値 `Object` - キーは拡張機能の名前で、それぞれの値は、`name` と `version` プロパティを含むObjectです。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

`path` にある開発者ツールの拡張機能を追加し、拡張機能の名前を返します。

拡張機能は記憶されるため、このAPIを一度しか呼び出す必要はありません。このAPIはプログラミングで使用するためのものではありません。 既にロードされている拡張機能を追加しようとした場合、このメソッドは何も返さず、代わりにコンソールに警告を出力します。

このメソッドは、拡張機能のマニフェストが存在しないか、不完全である場合、何も返しません。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

指定した名前で開発者ツールの拡張機能を削除します。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `BrowserWindow.getDevToolsExtensions()`

戻り値 `Object` - キーは拡張機能の名前で、それぞれの値は、`name` と `version` プロパティを含むObjectです。

開発者ツールの拡張機能がインストールされているかを確認するには、以下のように実行することで可能です。

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

### インスタンスプロパティ

`new BrowserWindow` で作成されたオブジェクトは、以下のプロパティを持っています。

```javascript
const {BrowserWindow} = require('electron')
// この例では、`win` がインスタンス
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

このウインドウが所有している `WebContents` オブジェクト。すべてのWebページ関連のイベントと操作はこれを介して行われます。

[`webContents` ドキュメント](web-contents.md) でメソッドやイベントについて参照してください。

#### `win.id`

ウインドウの一意のIDを表す `Integer`。

### インスタンスメソッド

`new BrowserWindow` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

**注:** いくつかのメソッドは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### `win.destroy()`

強制的にウインドウを閉じます。`unload` と `beforeunload` イベントはWebページで発生しません。また、`close` イベントもこのウインドウで発生しません。しかし、`closed` イベントが発生することは保証されます。

#### `win.close()`

ウインドウを閉じることを試みます。これはユーザーが手動でウインドウの閉じるボタンをクリックするのと同じ効果があります。しかしながら、Webページがクローズ処理をキャンセルする可能性があります。[close イベント](#event-close) を参照してください。

#### `win.focus()`

ウインドウにフォーカスを当てます。

#### `win.blur()`

ウインドウからフォーカスを外します。

#### `win.isFocused()`

戻り値 `Boolean` - ウインドウがフォーカスされているかどうか。

#### `win.isDestroyed()`

戻り値 `Boolean` - ウインドウが破棄されているかどうか。

#### `win.show()`

表示し、ウインドウにフォーカスを当てます。

#### `win.showInactive()`

ウインドウを表示しますが、フォーカスを当てません。

#### `win.hide()`

ウインドウを非表示にします。

#### `win.isVisible()`

戻り値 `Boolean` - ウインドウがユーザーに表示されているかどうか。

#### `win.isModal()`

戻り値 `Boolean` - 現在のウインドウがモーダルウインドウかどうか。

#### `win.maximize()`

ウインドウを最大化します。ウインドウがまだ表示されていない場合、併せてウインドウを表示 (ただし、フォーカスは当たりません) します。

#### `win.unmaximize()`

ウインドウの最大化を解除します。

#### `win.isMaximized()`

戻り値 `Boolean` - ウインドウが最大化されているかどうか。

#### `win.minimize()`

ウインドウを最小化します。幾つかのプラットフォームでは、最小化されたウインドウはドックに表示されます。

#### `win.restore()`

ウインドウを最小化された状態からその前の状態に戻します。

#### `win.isMinimized()`

戻り値 `Boolean` - ウインドウが最小化されているかどうか。

#### `win.setFullScreen(flag)`

* `flag` Boolean

ウインドウをフルスクリーンモードにするかどうかを設定します。

#### `win.isFullScreen()`

戻り値 `Boolean` - ウインドウがフルスクリーンモードであるかどうか。

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

簡易フルスクリーンモードに設定したり、解除したりします。

Mac OS X Lion (10.7) より前のバージョンで見られる簡易フルスクリーンモードはネイティブのフルスクリーン動作をエミュレートします。

#### `win.isSimpleFullScreen()` *macOS*

戻り値 `Boolean` - ウインドウが簡易 (Lionより前) フルスクリーンモードであるかどうか。

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - コンテンツビューの一部を維持するためのアスペクト比。
* `extraSize` [Size](structures/size.md) - アスペクト比を維持する際に含まれない追加のサイズ。

これはウインドウのアスペクト比を維持します。 ピクセルで指定した追加のサイズによって、開発者は、アスペクト比の計算に含まれないスペースを確保することができます。 このAPIはウインドウのサイズとそのコンテンツのサイズの差異も考慮しています。

HDビデオプレーヤーと関連したコントロールを持つ通常のウインドウを考えてみましょう。 ひょっとすると、左端に15ピクセルのコントロール、右端に25ピクセルのコントロール、プレーヤーの下部に50ピクセルのコントロールがあるかもしれません。 プレーヤー内で、16:9のアスペクト比 (HD @1920x1280の標準的なアスペクト比) を維持するためには、この関数を16/9と[ 40, 50 ]の引数で呼び出します。 2番目の引数は、追加の幅と高さがコンテンツビューの中に収まるかを気にしません。それらはただ存在しているだけです。 全体のコンテンツビュー内にある追加の幅と高さの領域を単純に足し合わせるだけです。

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - Quick Lookでプレビューするファイルへの絶対パス。 ここで、Quick Lookはパスのファイル名とファイル拡張子をファイルを開くためのコンテンツタイプを決定するのに使用する点が重要です。
* `displayName` String (任意) - Quick Lookのモーダルビューに表示するファイルの名前。 これは純粋に見た目だけのもので、ファイルのコンテンツタイプには影響しません。 省略値は、`path` です。

指定したパスでファイルをプレビューするために、[Quick Look](https://en.wikipedia.org/wiki/Quick_Look) を使用します。

#### `win.closeFilePreview()` *macOS*

現在開いている [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) のパネルを閉じます。

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md) 
* `animate` Boolean (任意) *macOS*

指定した境界までウインドウのサイズを変更して移動します。

#### `win.getBounds()`

戻り値 [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md) 
* `animate` Boolean (optional) *macOS*

指定した境界までウインドウのクライアント領域 (例えば、Webページ) のサイズを変更して移動します。

#### `win.getContentBounds()`

戻り値 [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

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
* `animate` Boolean (任意) *macOS*

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
* `animate` Boolean (任意) *macOS*

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

* `url` String
* `options` Object (任意) 
  * `httpReferrer` String (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

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

* `progress` Double
* `options` Object (任意) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

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

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (任意) - ボタンのツールチップのテキスト。
  * `flags` String[] (任意) - ボタンの特定の状態や動作を制御します。デフォルトでは、`['enabled']` です。

`flags` は、以下の `String` を含めることができる配列です。

* `enabled` - ボタンはアクティブかつユーザが使用可能です。
* `disabled` - ボタンは無効です。存在しますが、ユーザ操作に応答しないことを示す視覚的な状態です。
* `dismissonclick` - ボタンをクリックすると、サムネイルウインドウはすぐに閉じます。
* `nobackground` - ボタンの境界を描画しません。画像だけでしか使用しないでください。
* `hidden` - ボタンはユーザに表示されません。
* `noninteractive` - ボタンは有効ですが、反応せず、押されたボタンの状態は描画されません。この値は、通知に使われるボタンのインスタンスのために用意されてます。

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
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

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (任意) 
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

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**注:** 現在のところ、BrowserView APIは実験的な機能であり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。