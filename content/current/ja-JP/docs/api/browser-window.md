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

## `ready-to-show` イベントを使用する

ページのロード中、ウインドウがまだ表示されていない場合、レンダラープロセスが初めてページをレンダリングし終わったとき、`ready-to-show` イベントが発生します。 このイベントの後にウインドウを表示させれば、チラつくことはありません。

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

このイベントは、通常、`did-finish-load` イベントの後に発生しますが、大量のリモートリソースがあるページでは、`did-finish-load` イベントの前に発生する可能性があります。

このイベントを使用すると、`show` が false でもレンダラーが "見えている" と見なされ、描画されることに注意してください。  `paintWhenInitiallyHidden: false` を使用すると、このイベントは発生しません。

## `backgroundColor`を設定する

複雑なアプリでは、`ready-to-show` イベントが発生するのに時間がかかり過ぎて、アプリが遅いと感じさせる可能性があります。 このような場合、ウインドウをすぐに表示し、アプリの背景に近い `backgroundColor` を使うことを推奨します。

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

`ready-to-show` イベントを使用しているアプリに対しても、アプリがよりネイティブに感じられるように `backgroundColor` を設定することが推奨されます。

## 親ウィンドウと子ウィンドウ

`parent` オプションを使用することで、子ウインドウを作成することができます。

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

`child` ウインドウは、常に `top` ウインドウの前面に表示されます。

## モーダルウィンドウ

モーダルウインドウは親ウインドウを無効化する子ウインドウです。モーダルウインドウを作成するには、`parent` と `modal` オプションの両方を設定しなければなりません。

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## ページの表示状態

[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) は、以下のように動作します。

* すべてのプラットフォームおいて、表示状態はウインドウが非表示/最小化されているかどうかをトラッキングします。
* さらに、macOSでは、表示状態はウインドウが重なり合った状態もトラッキングします。 ウインドウが別のウインドウと重なり合った (例えば、完全に覆い隠された) 場合、表示状態は、`hidden` になります。 他のプラットフォーム上では、ウインドウが最小化されるか、明示的に `win.hide()` で非表示にされた場合のみ、表示状態は `hidden` になります。
* `BrowserWindow` が `show: false` で作成された場合、ウインドウが実際には非表示であるにも関わらず、初期の表示状態は `visible` になります。
* `backgroundThrottling` が無効の場合、ウインドウを最小化したり、重ねたり、非表示にしたりしても、表示状態は `visible` のままになります。

消費電力を最小にするために、表示状態が `hidden` のとき、高負荷な操作を一時停止することを推奨します。

## プラットフォームごとの通知

* macOSでは、モーダルウインドウは親ウインドウに付随したシートとして表示されます。
* 親ウインドウが移動したとき、macOSでは、子ウインドウは親ウインドウに対する相対的な位置を維持しますが、WindowsとLinuxでは、子ウインドウは移動しません。
* Linuxでは、モーダルウインドウの型は、`dialog` に変更されます。
* Linuxでは、多くのデスクトップ環境は、モーダルウインドウを非表示にすることをサポートしていません。

## クラス: BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

`BrowserWindow` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) を継承しています。

`options` によって設定されたネイティブプロパティで新しい `BrowserWindow` を生成します。

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (任意) - `width` と `height` が、Webページのサイズとして使用されます。この場合、実際のウインドウのサイズは、ウインドウ枠のサイズが含まれ、若干大きくなることを意味します。 省略値は、`false` です。
  * `center` Boolean (任意) - ウインドウを画面中央に表示します。
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. 省略値は `true` です。
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. 省略値は `true` です。
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. 省略値は `true` です。
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. 省略値は `true` です。
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. 省略値は `true` です。
  * `focusable` Boolean (任意) - ウインドウにフォーカスを当てることができるかどうか。 省略値は `true` です。 Windowsでは、`focusable: false` と設定することは、`skipTaskbar: true` と設定することにもなります。 Linuxでは、`focusable: false` と設定することは、ウインドウがwmとのやり取りを停止することになるため、ウインドウがすべてのワークスペースで常に前面に表示されます。
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. 省略値は、`false` です。
  * `fullscreen` Boolean (任意) - ウインドウをフルスクリーンで表示させるかどうか。 明示的に `false` と設定された場合、macOSでは、フルスクリーンボタンが非表示または無効になります。 省略値は、`false` です。
  * `fullscreenable` Boolean (任意) - ウインドウをフルスクリーンモードにすることができるかどうか。 macOSでは、さらに、最大化/ズームボタンが、フルスクリーンモードまたはウインドウ最大化に切り替わるかどうか。 省略値は `true` です。
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. 省略値は、`false` です。
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. 省略値は、`false` です。
  * `title` String (任意) - デフォルトのウインドウタイトル。 省略値は `"Electron"` です。 HTML タグの `<title>` が `loadURL()` でロードされた HTML ファイル内で定義されている場合、このプロパティは無視されます。
  * `icon` ([NativeImage](native-image.md) | String) (任意) - ウインドウのアイコン。 Windowsでは、最高の視覚効果を得るためには、`ICO` アイコンを使うことを推奨します。未定義のままにすることもできますが、その場合、実行可能ファイルのアイコンが使われます。
  * `show` Boolean (optional) - Whether window should be shown when created. 省略値は `true` です。
  * `paintWhenInitiallyHidden` Boolean (任意) - `show` が `false` で作成されたばかりのときに、レンダラーをアクティブにするかどうか。  `show: false` での `document.visibilityState` が最初のロードで正しく機能するには、これを `false` に設定する必要があります。  これを `false` に設定すると、`ready-to-show` イベントが発生しなくなります。  省略値は `true` です。
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). 省略値は `true` です。
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. 省略値は、`false` です。
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. 省略値は、`false` です。
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. 省略値は、`false` です。
  * `enableLargerThanScreen` Boolean (任意) - ウインドウを画面よりも大きいサイズに変更できるようにします。 他の OS はデフォルトで画面よりも大きなウィンドウを許可するため、macOS にのみ関係します。 省略値は、`false` です。
  * `backgroundColor` String (任意) - `#66CD00` や `#FFF` や `#80FFFFFF` (`transparent` を `true` にセットすれば #AARRGGBB 形式のアルファ値をサポートします) のような16進数の値でのウインドウの背景色。 省略値は `#FFF` (白) です。
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. 省略値は `true` です。
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. 省略値は、`false` です。
  * `transparent` Boolean (任意) - ウインドウを [透明](frameless-window.md#transparent-window) にします。 省略値は、`false` です。 Windows では、ウィンドウがフレームレスでない限り機能しません。
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
    * `default` - 標準の灰色不透明なMacのタイトルバーになります。
    * `hidden` - タイトルバーが非表示かつフルサイズのコンテンツウインドウになりますが、タイトルバーには、まだ標準のウインドウコントロール ("信号") が左上にあります。
    * `hiddenInset` - ウインドウの端から信号ボタンが少し埋め込まれた別の見た目でタイトルバーが非表示になります。
    * `customButtonsOnHover` Boolean (任意) - macOS フレームレスウインドウで、カスタムの閉じる、最小化ボタンを描画します。 これらのボタンはウインドウの左上にマウスカーソルを置かないと表示されません。 これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 **Note:** This option is currently experimental.
  * `trafficLightPosition` [Point](structures/point.md) (任意) - 信号機ボタンのカスタム位置を設定します。 `titleBarStyle` を `hidden` にした場合のみ可能です
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. 省略値は、`false` です。
  * `thickFrame` Boolean (任意) - Windowsのフレームレスウインドウに対して、標準のウインドウ枠を追加する `WS_THICKFRAME` スタイルを使用します。 `false` に設定すると、ウインドウの影とウインドウアニメーションがなくなります。 省略値は `true` です。
  * `vibrancy` String (任意) - macOSでのみ、ウインドウに曇りガラス効果の種類を追加します。 `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light`、`ultra-dark`、`header`、`sheet`、`window`、`hud`、`fullscreen-ui`、`tooltip`、`content`、`under-window` または `under-page` にすることができます。  曇り値と組み合わせて `frame: false` を使用する場合は、デフォルト以外の `titleBarStyle` も使用する必要があります。 また、`appearance-based`、`light`、`dark`、`medium-light` と `ultra-dark` は非推奨であり、macOS の今後のバージョンで削除されます。
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. `true` の場合、ズームしたとき、ウインドウはWebページの最適な幅に拡大されます。`false` だと、画面の幅にズームされます。 これは、`maximize()` を直接呼び出したときの動作にも影響を与えます。 省略値は、`false` です。
  * `tabbingIdentifier` String (任意) - タブのグループ名で、macOS 10.12以上の場合、ネイティブのタブとしてウインドウを開くことができます。 同一のタブ識別子を持つウインドウは、一緒にグループ化されます。 これはネイティブのタブボタンをウインドウのタブバーに追加し、`app` とウインドウが `new-window-for-tab` イベントを受け取ることができるようになります。
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (任意) - デベロッパーツールを有効にするかどうか。 `false` に設定すると、`BrowserWindow.webContents.openDevTools()` を使ってデベロッパーツールを開くことはできません。 省略値は `true` です。
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. 省略値は、`false` です。
    * `nodeIntegrationInWorker` Boolean (任意) - WebワーカーでNode統合を有効にするかどうか。 省略値は、`false` です。 これについての詳細は、[マルチスレッド](../tutorial/multithreading.md) を参照してください。
    * `nodeIntegrationInSubFrames` Boolean (任意) - iframe や子ウインドウのようなサブフレーム内で Node.js サポートを有効にする実験的な機能です。 すべてのプリロードは iframe 毎にロードされます。メインフレーム内かそうでないか判断するには `process.isMainFrame` が使用できます。
    * `preload` String (任意) - 他のスクリプトがページで実行される前にロードされるスクリプトを指定します。 このスクリプトは、Node統合がオンまたはオフであるかに関係なく常にNode APIにアクセスできます。 値は、スクリプトへの絶対ファイルパスにする必要があります。 Node統合がオフのときでも、プレロードされたスクリプトは、Nodeのグローバルシンボルをグローバルスコープに再導入できます。 [ここ](process.md#event-loaded) の例を参照してください。
    * `sandbox` Boolean (任意) - 設定された場合、ウインドウと関連付けられているレンダラーをサンドボックス化します。これは、ChromiumのOSレベルのサンドボックスと互換性を持ち、Node.jsエンジンを無効化します。 これは `nodeIntegration` オプションと同じではなく、プレロードスクリプトで利用可能なAPIよりもさらに制限がかかります。 このオプションの詳細については、[ここ](sandbox-option.md) をお読みください。
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. 省略値は `true` です。
    * `session` [Session](session.md#class-session) (任意) - ページで使用されるセッションを設定します。 Session オブジェクトを直接引き渡す代わりに、パーティション文字列を受け付ける `partition` オプションを使用することを選択することもできます。 `session` と `partition` の両方が指定されたときは、`session` が優先されます。 省略値は、既定のセッションです。
    * `partition` String (任意) - セッションのパーティション文字列に従って、ページで使用されるセッションを設定します。 `partition` が `persist:` 始まりの場合、ページはアプリの全ページで利用可能な永続的なセッションを同じ `partition` で使用します。 `persist:` プレフィックスがない場合、ページは、インメモリセッションを使用します。 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 省略値は、既定のセッションです。
    * `affinity` String (任意) - 指定されると、同じ `affinity` のウェブページは同じレンダラープロセス内で実行します。 レンダラープロセスを再利用することにより、`preload`、`sandbox`、`nodeIntegration` などの異なる値を指定した場合でも、特定の `webPreferences` オプションがウェブページ間で共有されることに注意してください。 したがって、同じ `affinity` を持つウェブページに対しては、全く同じ `webPreferences` を使用することをお勧めします。 _This property is experimental_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. 省略値は `true` です。
    * `webSecurity` Boolean (任意) - `false` のとき、同一オリジンポリシー (通常、テスト用Webサイトを使用します) が無効になり、ユーザによって設定されない場合、`allowRunningInsecureContent` が `true` に設定されます。 省略値は `true` です。
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. 省略値は、`false` です。
    * `images` Boolean (optional) - Enables image support. 省略値は `true` です。
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. 省略値は `true` です。
    * `plugins` Boolean (optional) - Whether plugins should be enabled. 省略値は、`false` です。
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. 省略値は、`false` です。
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. 省略値は、`false` です。
    * `enableBlinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた有効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) ファイルで確認することができます。
    * `disableBlinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた無効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) ファイルで確認することができます。
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (任意) - 省略値は、`Times New Roman` です。
      * `serif` String (任意) - 省略値は、`Times New Roman` です。
      * `sansSerif` String (任意) - 省略値は、`Arial` です。
      * `monospace` String (任意) - 省略値は、`Courier New` です。
      * `cursive` String (任意) - 省略値は、`Script` です。
      * `fantasy` String (任意) - 省略値は、`Impact` です。
    * `defaultFontSize` Integer (任意) - 省略値は、`16` です。
    * `defaultMonospaceFontSize` Integer (任意) - 省略値は、`13` です。
    * `minimumFontSize` Integer (任意) - 省略値は、`0` です。
    * `defaultEncoding` String (任意) - 省略値は、`ISO-8859-1` です。
    * `backgroundThrottling` Boolean (任意) - ページがバックグラウンドになったとき、アニメーションやタイマーを抑制するかどうか。 これは [Page Visibility API](#page-visibility) にも影響を与えます。 省略値は `true` です。
    * `offscreen` Boolean (任意) - ブラウザウィンドウでオフスクリーンレンダリングを有効にするかどうか。 省略値は `false` 。 詳細については、[オフスクリーンレンダリングのチュートリアル](../tutorial/offscreen-rendering.md) を参照してください。
    * `contextIsolation` Boolean (任意) - Electron APIと指定された `preload` スクリプトを別々のJavaScriptコンテキストで実行するかどうか。 省略値は、`false` です。 `preload` スクリプトが実行されているコンテキストは、依然として `document` と `window` のグローバル変数にフルアクセスできますが、独自のJavaScriptの組み込みコマンドのセット (`Array`、`Object`、`JSON` など) を使用し、ロードされたページによってグローバル環境に加えられたいかなる変更からも分離されます。 Electron APIは `preload` スクリプトでのみ利用可能で、読み込まれたページでは利用できません。 このオプションは、潜在的に信頼できないリモートコンテンツをロードする際、ロードされたコンテンツが `preload` スクリプトや使用されているElectron APIを悪用することができないようにするときに使用する必要があります。 このオプションは、[Chromeのコンテンツスクリプト](https://developer.chrome.com/extensions/content_scripts#execution-environment)で使用されているのと同じ手法を使用します。 Consoleタブの一番上のコンボボックスの中にある 'Electron Isolated Context' という項目を選択することによって、開発者ツールでこのコンテキストにアクセスすることができます。
    * `nativeWindowOpen` Boolean (任意) - ネイティブの `window.open()` を使用するかどうか。 省略値は `false` 。 子ウインドウは、`nodeIntegrationInSubFrames` が true でなければ node integration は無効化されます。 **Note:** This option is currently experimental.
    * `webviewTag` Boolean (任意) - [`<webview>` タグ](webview-tag.md) を有効にするかどうか。 省略値は `false` 。 **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. `preload` スクリプトを除去したり、検証したり、`<webview>` の初期設定を変更したりするために、[webContents](web-contents.md) の `will-attach-webview` イベントを使うことができます。
    * `additionalArguments` String[] (任意) - このアプリケーションのレンダラープロセスで `process.argv` に追加される文字列のリスト。少量のデータをレンダラープロセスのプリロードスクリプトに渡すのに便利です。
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. 省略値は、`false` です。
    * `safeDialogsMessage` String (任意) - 連続したダイアログからの保護が機能したときに表示されるメッセージ。 定義されていなければデフォルトメッセージが使われますが、現在のデフォルトメッセージは英語であり、ローカライズされていないことに注意してください。
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. 省略値は、`false` です。
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. 省略値は、`false` です。
    * `autoplayPolicy` String (任意) - ウインドウ内のコンテンツに適用される自動再生ポリシーで、`no-user-gesture-required`、`user-gesture-required`、`document-user-activation-required` にできます。 省略値は `no-user-gesture-required` です。
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. 省略値は、`false` です。

`minWidth`/`maxWidth`/`minHeight`/`maxHeight` で最小もしくは最大のウインドウサイズを設定するのは、ユーザを束縛するだけです。 サイズ制約に関係しないサイズを `setBounds`/`setSize` や `BrowserWindow` のコンストラクタに渡すことは差し支えありません。

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* Linuxでは、設定できる値は、`desktop`、`dock`、`toolbar`、`splash`、`notification` です。
* On macOS, possible types are `desktop`, `textured`.
  * `textured` タイプは、メタルのグラデーションの外観 (`NSTexturedBackgroundWindowMask`) を追加します。
  * `desktop` タイプは、ウインドウをデスクトップのバックグラウンドウインドウのレベル (`kCGDesktopWindowLevel - 1`) に配置します。 デスクトップウインドウはフォーカス、キーボードやマウスイベントを受け付けようとしないことに注意してください。しかしながら、`globalShortcut` を使って、かろうじて入力を受け付けることはできます。
* Windowsでは、設定できるタイプは、`toolbar` です。

### インスタンスイベント

`new BrowserWindow` で作成されたオブジェクトでは以下のイベントが発生します。

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### イベント: 'page-title-updated'

戻り値:

* `event` Event
* `title` String
* `explicitSet` Boolean

ドキュメントのタイトルが変更されたときに発生します。`event.preventDefault()` を呼び出すことで、ネイティブウインドウのタイトルが変更されるのをキャンセルできます。 タイトルがファイルの URL から合成された場合、`explicitSet` は false です。

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
_**Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. 値のみを返すのではなく、常に明示的に `event.returnValue` を設定するようにすることを推奨します。後者の方がElectron内でより一貫性のある動作をします。_

#### イベント: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'session-end' _Windows_

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

このイベントを使用すると、`show` が false でもレンダラーが "見えている" と見なされ、描画されることに注意してください。  `paintWhenInitiallyHidden: false` を使用すると、このイベントは発生しません。

#### イベント: 'maximize'

ウィンドウが最大化されるときに発生します。

#### イベント: 'unmaximize'

ウインドウが最大化状態から抜けるときに発生します。

#### イベント: 'minimize'

ウィンドウが最小化されるときに発生します。

#### イベント: 'restore'

ウインドウが最小化状態から復元されたときに発生します。

#### Event: 'will-resize' _macOS_ _Windows_

戻り値:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - ウインドウがリサイズされようとしているサイズ。

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### イベント: 'resize'

ウインドウがリサイズされた後に発生します。

#### Event: 'will-move' _macOS_ _Windows_

戻り値:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - ウインドウが移動されようとしている位置。

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### イベント: 'move'

ウインドウが新しい位置に移動されているときに発生します。

__Note__: On macOS this event is an alias of `moved`.

#### Event: 'moved' _macOS_

ウインドウが新しい位置に移動されるときに一回だけ、発生します。

#### イベント: 'enter-full-screen'

ウインドウがフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-full-screen'

ウインドウがフルスクリーン状態を抜けるときに発生します。

#### イベント: 'enter-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態を抜けるときに発生します。

#### イベント: 'always-on-top-changed'

戻り値:

* `event` Event
* `isAlwaysOnTop` Boolean

ウインドウが常に他のウインドウの手前に表示されるように設定またはそれが解除されたときに発生します。

#### Event: 'app-command' _Windows_ _Linux_

戻り値:

* `event` Event
* `command` String

[アプリコマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) が呼び出されるときに発生します。 これらは、Windowsで幾つかのマウスに組み込まれている "Back" ボタンだけでなく、一般的にキーボードのメディアキーやブラウザコマンドとも関連付けられています。

コマンドは小文字にされ、アンダースコアはハイフンに置き換えられ、`APPCOMMAND_`プレフィックスは外されます。 例えば、`APPCOMMAND_BROWSER_BACKWARD` は、`browser-backward` として送信されます。

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

Linux 上では以下のアプリコマンドが明示的にサポートされます。

* `browser-backward`
* `browser-forward`

#### Event: 'scroll-touch-begin' _macOS_

スクロールホイールイベントフェーズが開始されたときに発生します。

#### Event: 'scroll-touch-end' _macOS_

スクロールホイールイベントフェーズが終了したときに発生します。

#### Event: 'scroll-touch-edge' _macOS_

スクロールイベントフェーズが要素の端に達したことを検出したときに発生します。

#### Event: 'swipe' _macOS_

戻り値:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' _macOS_

戻り値:

* `event` Event
* `rotation` Float

トラックパッドの回転ジェスチャで発生します。 回転ジェスチャーが終了するまで継続的に発生します。 各イベントの `rotation` 値は、最後の発生から回転した角度です。 回転ジェスチャで最後に発行されたイベントは、常に `0` の値になります。 反時計回りの回転値は正であり、時計回りの回転値は負です。

#### Event: 'sheet-begin' _macOS_

ウインドウがシートを開くときに発生します。

#### Event: 'sheet-end' _macOS_

ウインドウがシートを閉じたときに発生します。

#### Event: 'new-window-for-tab' _macOS_

ネイティブの新規タブボタンがクリックされるときに発生します。

### 静的メソッド

`BrowserWindow` クラスには、次の静的メソッドがあります。

#### `BrowserWindow.getAllWindows()`

戻り値 `BrowserWindow[]` - 開かれたすべてのブラウザウィンドウの配列。

#### `BrowserWindow.getFocusedWindow()`

戻り値 `BrowserWindow | null` - このアプリケーションでフォーカスされたウインドウ。それ以外は、`null` を返します。

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

戻り値 `BrowserWindow | null` - 指定された `webContents` を保持しているウインドウ。ウインドウが保持していないコンテンツの場合は `null` です。

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

戻り値 `BrowserWindow` - 指定された `id` のウインドウ。

#### `BrowserWindow.addExtension(path)`

* `path` String

`path` にあるChrome拡張機能を追加し、拡張機能の名前を返します。

このメソッドは、拡張機能のマニフェストが存在しないか、不完全である場合、何も返しません。

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

指定した名前でChrome拡張機能を削除します。

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

戻り値 `Record<String, ExtensionInfo>` - キーは拡張機能の名前で、それぞれの値は、`name` と `version` プロパティを含むObjectです。

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

`path` にある開発者ツールの拡張機能を追加し、拡張機能の名前を返します。

拡張機能は記憶されるため、このAPIを一度しか呼び出す必要はありません。このAPIはプログラミングで使用するためのものではありません。 既にロードされている拡張機能を追加しようとした場合、このメソッドは何も返さず、代わりにコンソールに警告を出力します。

このメソッドは、拡張機能のマニフェストが存在しないか、不完全である場合、何も返しません。

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

指定した名前で開発者ツールの拡張機能を削除します。

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

戻り値 `Record<string, ExtensionInfo>` - キーは拡張機能の名前で、それぞれの値は、`name` と `version` プロパティを含むObjectです。

開発者ツールの拡張機能がインストールされているかを確認するには、以下のように実行することで可能です。

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### インスタンスプロパティ

`new BrowserWindow` で作成されたオブジェクトは、以下のプロパティを持っています。

```javascript
const { BrowserWindow } = require('electron')
// この例では、`win` がインスタンス
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

[`webContents` ドキュメント](web-contents.md) でメソッドやイベントについて参照してください。

#### `win.id` _Readonly_

`Integer` 型のプロパティです。そのウインドウの一意な ID を表します。

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

メニューバーが既に表示されている場合、このプロパティを `true` にセットしてもすぐに非表示にはなりません。

#### `win.minimizable`

`Boolean` 型のプロパティです。ウインドウがユーザーによって手動で最小化できるかどうかを決定します。

Linux ではセッターは何もしませんが、ゲッターは `true` を返します。

#### `win.maximizable`

`Boolean` 型のプロパティです。ウインドウがユーザーによって手動で最大化できるかどうかを決定します。

Linux ではセッターは何もしませんが、ゲッターは `true` を返します。

#### `win.fullScreenable`

`Boolean` 型のプロパティです。ウインドウを最大化/ズームするウインドウボタンでフルスクリーンモードや最大化をトグル切り替えできるかどうかを決定します。

#### `win.resizable`

`Boolean` 型のプロパティです。ウインドウがユーザーによって手動でサイズ変更できるかどうかを決定します。

#### `win.closable`

`Boolean` 型のプロパティです。ウインドウがユーザーによって手動で閉じることができるかどうかを決定します。

Linux ではセッターは何もしませんが、ゲッターは `true` を返します。

#### `win.movable`

`Boolean` 型のプロパティです。ウインドウがユーザーによって移動できるかどうかを決定します。

Linux ではセッターは何もしませんが、ゲッターは `true` を返します。

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

### インスタンスメソッド

`new BrowserWindow` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

**Note:** Some methods are only available on specific operating systems and are labeled as such.

#### `win.destroy()`

強制的にウインドウを閉じます。`unload` と `beforeunload` イベントはWebページで発生しません。また、`close` イベントもこのウインドウで発生しません。しかし、`closed` イベントが発生することは保証されます。

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

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

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

ウインドウの最大化を解除します。

#### `win.isMaximized()`

戻り値 `Boolean` - ウインドウが最大化されているかどうか。

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

ウインドウを最小化された状態からその前の状態に戻します。

#### `win.isMinimized()`

戻り値 `Boolean` - ウインドウが最小化されているかどうか。

#### `win.setFullScreen(flag)`

* `flag` Boolean

ウインドウをフルスクリーンモードにするかどうかを設定します。

#### `win.isFullScreen()`

戻り値 `Boolean` - ウインドウがフルスクリーンモードであるかどうか。

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

簡易フルスクリーンモードに設定したり、解除したりします。

Mac OS X Lion (10.7) より前のバージョンで見られる簡易フルスクリーンモードはネイティブのフルスクリーン動作をエミュレートします。

#### `win.isSimpleFullScreen()` _macOS_

戻り値 `Boolean` - ウインドウが簡易 (Lionより前) フルスクリーンモードであるかどうか。

#### `win.isNormal()`

Returns `Boolean` - ウィンドウが通常の状態 (最大化されていない、最小化されていない、フルスクリーンモードではない) かどうか。

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Float - コンテンツビューの一部を維持するためのアスペクト比。
* `extraSize` [Size](structures/size.md) (任意) - アスペクト比を維持する際に含まれない追加のサイズ。

これはウインドウのアスペクト比を維持します。 ピクセルで指定した追加のサイズによって、開発者は、アスペクト比の計算に含まれないスペースを確保することができます。 このAPIはウインドウのサイズとそのコンテンツのサイズの差異も考慮しています。

HDビデオプレーヤーと関連したコントロールを持つ通常のウインドウを考えてみましょう。 ひょっとすると、左端に15ピクセルのコントロール、右端に25ピクセルのコントロール、プレーヤーの下部に50ピクセルのコントロールがあるかもしれません。 プレーヤー内で、16:9のアスペクト比 (HD @1920x1280の標準的なアスペクト比) を維持するためには、この関数を16/9と[ 40, 50 ]の引数で呼び出します。 2番目の引数は、追加の幅と高さがコンテンツビューの中に収まるかを気にしません。それらはただ存在しているだけです。 全体のコンテンツビュー内にある余分な幅と高さの領域を単純に足し合わせます。

`0` の値でこの関数を呼ぶと、以前に設定したアスペクト比が削除されます。

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - `#66CD00` や `#FFF` や `#80FFFFFF` (`transparent` を `true` にすればアルファ値をサポートします) のような16進数の値でのウインドウの背景色。 省略値は `#FFF` (白) です。

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Quick Lookでプレビューするファイルへの絶対パス。 ここで、Quick Lookはパスのファイル名とファイル拡張子をファイルを開くためのコンテンツタイプを決定するのに使用する点が重要です。
* `displayName` String (任意) - Quick Lookのモーダルビューに表示するファイルの名前。 これは純粋に見た目だけのもので、ファイルのコンテンツタイプには影響しません。 省略値は、`path` です。

指定したパスでファイルをプレビューするために、[Quick Look](https://en.wikipedia.org/wiki/Quick_Look) を使用します。

#### `win.closeFilePreview()` _macOS_

現在開いている [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) のパネルを閉じます。

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (optional) _macOS_

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// bounds のプロパティをすべて設定
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// bounds のプロパティをひとつ設定
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

戻り値 [`Rectangle`](structures/rectangle.md) - ウインドウの `bounds` が `Object` になったもの。

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) _macOS_

指定した境界までウインドウのクライアント領域 (例えば、Webページ) のサイズを変更して移動します。

#### `win.getContentBounds()`

戻り値 [`Rectangle`](structures/rectangle.md) - ウインドウの内部領域の `bounds` が `Object` になったもの。

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - 通常状態におけるウィンドウ境界を含む領域。

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. 通常状態においては、getBounds と getNormalBounds は同じ [`Rectangle`](structures/rectangle.md) を返します。

#### `win.setEnabled(enable)`

* `enable` Boolean

ウインドウを無効にするか有効にします。

#### `win.isEnabled()`

戻り値 Boolean - ウインドウが有効化されているかどうか。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

戻り値 `Integer[]` - ウインドウの幅と高さを含みます。

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

ウインドウのクライアント領域 (例えば、Webページ) のサイズを `width` と `height` に変更します。

#### `win.getContentSize()`

戻り値 `Integer[]` - ウインドウのクライアント領域の幅と高さを含みます。

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

ウインドウの最小サイズを `width` と `height` に設定します。

#### `win.getMinimumSize()`

戻り値 `Integer[]` - ウインドウの最小の幅と高さを含みます。

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

ウインドウの最大サイズを `width` と `height` に設定します。

#### `win.getMaximumSize()`

戻り値 `Integer[]` - ウインドウの最大の幅と高さを含みます。

#### `win.setResizable(resizable)`

* `resizable` Boolean

ウインドウがユーザーによって手動でサイズを変更できるかどうかを設定します。

**[非推奨](modernization/property-updates.md)**

#### `win.isResizable()`

戻り値 `Boolean` - ウインドウがユーザーによって手動でサイズを変更できるかどうか。

**[非推奨](modernization/property-updates.md)**

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMovable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザーによって移動できるかどうか。

Linuxでは常に `true` を返します。

**[非推奨](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMinimizable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザーによって手動で最小化できるかどうか

Linuxでは常に `true` を返します。

**[非推奨](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isMaximizable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザーによって手動で最大化できるかどうか。

Linuxでは常に `true` を返します。

**[非推奨](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるか、ウインドウを最大化するかを設定します。

**[非推奨](modernization/property-updates.md)**

#### `win.isFullScreenable()`

戻り値 `Boolean` - ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるか、ウインドウを最大化するか。

**[非推奨](modernization/property-updates.md)**

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[非推奨](modernization/property-updates.md)**

#### `win.isClosable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウをユーザーが手動で閉じられるかどうか。

Linuxでは常に `true` を返します。

**[非推奨](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). `flag` が true の場合、省略値は `floating` です。 flag が false の場合、`level` は `normal` にリセットされます。 `floating` から `status` までに含まれているものにおいて、ウィンドウは macOS では Dock の下に、Windows ではタスクバーの下に配置されることをことに注意してください。 `pop-up-menu` 以降は、macOS では Dock の上に、Windows ではタスクバーの上に表示されます。 詳細については、[macOS のドキュメント](https://developer.apple.com/documentation/appkit/nswindow/level) を参照してください。
* `relativeLevel` Integer (optional) _macOS_ - The number of layers higher to set this window relative to the given `level`. 省略値は、`0` です。 Apple社は、`screen-saver` より上に1以上のレベルを設定することを推奨していないことに注意してください。

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

戻り値 `Boolean` - ウインドウが常に他のウインドウの上に表示されるかどうか。

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

フォーカスに関係なく上 (Z順序) にウィンドウを移動します。

#### `win.center()`

ウインドウを画面の中央に移動します。

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) _macOS_

ウインドウを `x` と `y` に移動します。

#### `win.getPosition()`

戻り値 `Integer[]` - ウインドウの現在の位置を含みます。

#### `win.setTitle(title)`

* `title` String

ネイティブのウインドウのタイトルを `title` に変更します。

#### `win.getTitle()`

戻り値 `String` - ネイティブのウインドウのタイトル。

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. 例:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

ユーザの注意を引きつけるためにウインドウの点滅を開始または停止します。

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

ウインドウがタスクバーに表示されなくなります。

#### `win.setKiosk(flag)`

* `flag` Boolean

キオスクモードに入ったり、出たりします。

#### `win.isKiosk()`

戻り値 `Boolean` - ウインドウがキオスクモードであるかどうか。

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

より正確には、フォーマットは ` window:id:other_id` です。ここでの `id` は、Windows では `HWND`、macOS では `CGWindowID` (`uint64_t`)、Linux では `Window` (`unsigned long`) です。 `other_id` は、同じトップレベルウィンドウ内のウェブコンテンツ (タブ) を識別するために使用されます。

#### `win.getNativeWindowHandle()`

戻り値 `Buffer` - ウインドウのプラットフォーム固有のハンドル。

ハンドルのネイティブな型は、Windowsでは `HWND`、macOSでは `NSView*`、Linuxでは `Window` (`unsigned long`) です。

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

戻り値 `Boolean` - メッセージがフックされているかどうかによって、`true` または `false` 。

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

ウインドウメッセージのフックを解除します。

#### `win.unhookAllWindowMessages()` _Windows_

すべてのウインドウメッセージのフックを解除します。

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

ウインドウが表すファイルのパス名を設定します。ファイルのアイコンがウインドウのタイトルバーに表示されます。

#### `win.getRepresentedFilename()` _macOS_

戻り値 `String` - ウインドウが表すファイルのパス名。

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

ウインドウのドキュメントが編集されたかどうかを指定します。`true` に設定すると、タイトルバーのアイコンがグレーになります。

#### `win.isDocumentEdited()` _macOS_

戻り値 `Boolean` - ウインドウのドキュメントが編集されたかどうか。

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャする範囲

戻り値 `Promise<NativeImage>` - [NativeImage](native-image.md) を解決します

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (任意) - HTTP リファラの URL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データ URL によってロードされたファイルの (最後のパス区切り文字を含む) ベース URL。 これは指定された `url` がデータ URL で、他のファイルをロードする必要がある場合のみ必要です。

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。

[`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options) と同じです。

`url` は、リモートアドレス (例えば、`http://`) または `file://` プロトコルを使ってローカルのHTMLファイルのパスにすることができます。

ファイルのURLが正しく構成されているようにするため、Nodeの [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) メソッドを使用することを推奨します。

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

次のようにすることによって、URLエンコードされたデータで `POST` リクエストを使用してURLをロードすることができます。

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
  * `search` Record&lt;String, String&gt; (任意) - `url.format()` に渡されます。
  * `search` String (任意) - `url.format()` に渡されます。
  * `hash` String (任意) - `url.format()` に渡されます。

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

`webContents.reload` と同じです。

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

`menu` をウインドウのメニューバーとして設定します。

#### `win.removeMenu()` _Linux_ _Windows_

ウインドウのメニューバーを消去します。

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

進捗 < 0 の場合、プログレスバーは削除されます。進捗 > 1 の場合、不確定モードに変更します。

Linuxプラットフォームでは、Unityデスクトップ環境のみがサポートされ、`package.json` の `desktopName` フィールドに `*.desktop` ファイル名を指定する必要があります。 既定では、`{app.name}.desktop` であるとみなされます。

Windowsでは、モードを渡すことができます。 有効な値は、`none`、`normal`、`indeterminate`、`error` と `paused` です。 モードを設定せずに (ただし、有効範囲内の値で) `setProgressBar` を呼び出した場合、`normal` とみなされます。

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - タスクバーアイコンの右下隅に表示されるアイコン。 この引数が `null` の場合、オーバーレイは消去されます。
* `description` String - アクセシビリティスクリーンリーダーに提供される説明

現在のタスクバーアイコンの上に、通常、何らかのアプリケーションステータスを伝えたり、ユーザーに控えめに通知したりするのに使われる16 x 16ピクセルのオーバレイを設定します。

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

ウインドウに影を付けるべきかどうかを設定します。

#### `win.hasShadow()`

戻り値 `Boolean` - ウインドウに影を表示させているかどうか。

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - 0.0 (完全に透明) と 1.0 (完全に不透明) の間

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

ウィンドウの形を設定すると、システム内で描画とユーザ操作が許可されているウィンドウ内の領域が決まります。 与えられた領域の外側のピクセルでは描画されず、マウスイベントも登録されません。 領域外のマウスイベントはそのウィンドウでは受信されませんが、ウィンドウの後ろにあるものにそのイベントがフォールスルーします。

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

戻り値 `Boolean` - ボタンを追加するのに成功したかどうか

タスクバーボタンレイアウトのウインドウのサムネイルイメージに指定されたボタンのセットと一緒にサムネイルツールバーを追加します。 返却される `Boolean` オブジェクトは、サムネイルを追加するのに成功したかどうかを示します。

限られた空間のため、サムネイルツールバーのボタン数は、7以下にしてください。 一度、サムネイルツールバーをセットアップすると、プラットフォームの制約のため、ツールバーを削除することはできません。 しかしながら、ボタンを取り除くためにAPIを空の配列で呼び出すことはできます。

`buttons` は、`Button` オブジェクトの配列です。

* `Button` Object
  * `icon` [NativeImage](native-image.md) - サムネイルツールバーで表示されるアイコン。
  * `click` Function
  * `tooltip` String (任意) - ボタンのツールチップのテキスト。
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` は、以下の `String` を含めることができる配列です。

* `enabled` - そのボタンはアクティブかつユーザが使用可能です。
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - そのボタンをクリックすると、サムネイルウインドウがすぐに閉じます。
* `nobackground` - そのボタンの縁を描画しません。画像にのみ使用してください。
* `hidden` - そのボタンはユーザに表示されません。
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - ウインドウの領域

タスクバーのウインドウの上でホバリングするときに表示されるサムネイルイメージとして表示するウインドウの領域を設定します。 空の領域: `{ x: 0, y: 0, width: 0, height: 0 }` を指定することで、サムネイルをウインドウ全体にリセットすることができます。

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

タスクバーのウインドウサムネイルでホバリングするときに表示されるツールチップを設定します。

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (任意) - ウインドウの[アプリユーザーモデルID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx)。 設定されないと、他のオプションは無効です。
  * `appIconPath` String (任意) - ウインドウの[再起動アイコン](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx)。
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (任意) - ウインドウの[再起動コマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)。
  * `relaunchDisplayName` String (任意) - ウインドウの[再起動表示名](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx)。

ウインドウのタスクバーボタンのプロパティを設定します。

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

`webContents.showDefinitionForSelection()` と同じです。

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

ウインドウのアイコンを変更します。

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

ウインドウの信号ボタンを表示するかどうかを設定します。

これは `titleBarStyle` を `customButtonsOnHover` に設定したときは呼び出せません。

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

メニューバーが既に表示されている場合、`setAutoHideMenuBar(true)` を呼び出してもすぐに非表示にはなりません。

**[非推奨](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

戻り値 `Boolean` - メニューバーを自動的に非表示にするかどうか。

**[非推奨](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

戻り値 `Boolean` - メニューバーを表示しているかどうか。

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows _deprecated_

ウインドウをすべてのワークスペースで表示させるかどうかを設定します。

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

戻り値 `Boolean` - ウインドウがすべてのワークスペースで表示されているかどうか。

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. `ignore` がtrueのときだけ使用されます。 `ignore` がfalseの場合、この値に関わらず、転送は常に無効です。

ウインドウがすべてのマウスイベントを無視するようにします。

このウインドウで発生するすべてのマウスイベントは、このウインドウの下にあるウインドウに渡されますが、このウインドウにフォーカスがある場合、依然としてキーボードイベントは受信されます。

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

他のアプリによってウインドウのコンテンツがキャプチャされるのを防止します。

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

ウインドウにフォーカスできるかどうかを変更します。

macOS ではウィンドウからフォーカスは除去されません。

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

現在のウインドウの親ウインドウとして `parent` を設定します。`null` を渡すと、現在のウインドウをトップレベルウインドウにします。

#### `win.getParentWindow()`

戻り値 `BrowserWindow` - 親ウインドウ。

#### `win.getChildWindows()`

戻り値 `BrowserWindow[]` - すべての子ウインドウ。

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

タイプしているときにカーソルを非表示にするかどうかを制御します。

#### `win.selectPreviousTab()` _macOS_

ネイティブのタブが有効で、ウインドウに他のタブがあるとき、一つ前のタブを選択します。

#### `win.selectNextTab()` _macOS_

ネイティブのタブが有効で、ウインドウに他のタブがあるとき、次のタブを選択します。

#### `win.mergeAllWindows()` _macOS_

ネイティブのタブが有効で複数の開いているウインドウがあるとき、すべてのウインドウを複数のタブで1つのウインドウにマージします。

#### `win.moveTabToNewWindow()` _macOS_

ネイティブのタブが有効で現在のウインドウに複数のタブがあるとき、現在のタブを新しいウインドウに移動します。

#### `win.toggleTabBar()` _macOS_

ネイティブのタブが有効で現在のウインドウにタブが1つだけしかないとき、タブバーを表示するかどうかを切り替えます。

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

ウインドウインスタンスのタブの後ろに、このウインドウのタブとしてウインドウを追加します。

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light`、`ultra-dark`、`header`、`sheet`、`window`、`hud`、`fullscreen-ui`、`tooltip`、`content`、`under-window` または `under-page` にすることができます。 詳細については、[macOSのドキュメント](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) を参照してください。

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

注意として、`appearance-based`、`light`、`dark`、`medium-light` と `ultra-dark` は非推奨であり、macOS の今後のバージョンで削除されます。

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar | null

現在のウインドウのTouchBarレイアウトを設定します。 `null` または `undefined` を指定すると、TouchBarがクリアされます。 このメソッドはTouchBarがあって、macOS 10.12.1以上を実行しているマシンでのみ、有効です。

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - `browserView` を `win` へアタッチします。 他の `BrowserView` がアタッチされている場合、それはこのウィンドウから削除されます。

#### `win.getBrowserView()` _Experimental_

戻り値 `BrowserView | null` - `win` にアタッチされた `BrowserView`。 アタッチされていない場合は `null` を返します。 複数の `BrowserView` がアタッチされている場合、エラーを送出します。

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

複数の BrowserView をサポートする setBrowserView の置換 API。

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

戻り値 `BrowserView[]` - `addBrowserView` または `setBrowserView` でアタッチされたすべての BrowserView の配列。

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.
