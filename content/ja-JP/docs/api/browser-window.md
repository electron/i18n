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

`BrowserWindow` は [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter) です。

`options` によって設定されたネイティブプロパティで新しい `BrowserWindow` を生成します。

### `new BrowserWindow([options])`

* `options` Object (任意) 
  * `width` Integer (任意) - ピクセル単位でのウインドウの幅。省略値は、`800` です。
  * `height` Integer (任意) - ピクセル単位でのウインドウの高さ。省略値は、`600` です。
  * `x` Integer (任意) (yが使われている場合は、**必須**) - ウインドウの画面左のオフセット。 省略値では、ウインドウが中央になるようになっています。
  * `y` Integer (任意) (xが使われている場合は、**必須**) - ウインドウの画面上のオフセット。 省略値では、ウインドウが中央になるようになっています。
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
    * `hiddenInset` - ウインドウの端から信号ボタンが少し埋め込まれた別の見た目でタイトルバーが非表示になります。
    * `customButtonsOnHover` Boolean (任意) - macOSのフレームレスウインドウで、カスタムの閉じる、最小化、フルスクリーンボタンを描画します。 これらのボタンはウインドウの左上を通過させないと表示されません。 これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 **注:** このオプションは、現在、実験的なものです。
  * `fullscreenWindowTitle` Boolean (任意) - macOSのフルスクリーンモードで、どの `titleBarStyle` オプションの場合でもタイトルバーにタイトルを表示します。省略値は、`false` です。
  * `thickFrame` Boolean (任意) - Windowsのフレームレスウインドウに対して、標準のウインドウ枠を追加する `WS_THICKFRAME` スタイルを使用します。 `false` に設定すると、ウインドウの影とウインドウアニメーションがなくなります。 省略値は `true` です。
  * `vibrancy` String (任意) - macOSでのみ、ウインドウに曇りガラス効果の種類を追加します。 `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light` または `ultra-dark` にすることができます。 曇り値と組み合わせて `frame: false` を使用する場合は、デフォルト以外の `titleBarStyle` も使用する必要があります。
  * `zoomToPageWidth` Boolean (任意) - macOSで、optionキーを押下しながら緑の信号ボタンをクリックしたり、ウインドウ > ズーム のメニュー項目をクリックしたりしたときの動作を制御します。 `true` の場合、ズームしたとき、ウインドウはWebページの最適な幅に拡大されます。`false` だと、画面の幅にズームされます。 これは、`maximize()` を直接呼び出したときの動作にも影響を与えます。 省略値は、`false` です。
  * `tabbingIdentifier` String (任意) - タブのグループ名で、macOS 10.12以上の場合、ネイティブのタブとしてウインドウを開くことができます。 同一のタブ識別子を持つウインドウは、一緒にグループ化されます。 これはネイティブのタブボタンをウインドウのタブバーに追加し、`app` とウインドウが `new-window-for-tab` イベントを受け取ることができるようになります。
  * `webPreferences` Object (任意) - Webページの機能設定。 
    * `devTools` Boolean (任意) - デベロッパーツールを有効にするかどうか。 `false` に設定すると、`BrowserWindow.webContents.openDevTools()` を使ってデベロッパーツールを開くことはできません。 省略値は `true` です。
    * `nodeIntegration` Boolean (任意) - Node統合を有効にするかどうか。省略値は、`true` です。
    * `nodeIntegrationInWorker` Boolean (任意) - WebワーカーでNode統合を有効にするかどうか。 省略値は `false` です。 これについての詳細は、[マルチスレッド](../tutorial/multithreading.md) を参照してください。
    * `preload` String (任意) - 他のスクリプトがページで実行される前にロードされるスクリプトを指定します。 このスクリプトは、Node統合がオンまたはオフであるかに関係なく常にNode APIにアクセスできます。 値は、スクリプトへの絶対ファイルパスにする必要があります。 Node統合がオフのときでも、プレロードされたスクリプトは、Nodeのグローバルシンボルをグローバルスコープに再導入できます。 [ここ](process.md#event-loaded) の例を参照してください。
    * `sandbox` Boolean (任意) - 設定された場合、ウインドウと関連付けられているレンダラーをサンドボックス化します。これは、ChromiumのOSレベルのサンドボックスと互換性を持ち、Node.jsエンジンを無効化します。 これは `nodeIntegration` オプションと同じではなく、プレロードスクリプトで利用可能なAPIよりもさらに制限がかかります。 このオプションの詳細については、[ここ](sandbox-option.md) をお読みください。 **注:** このオプションは、現在のところ、実験的なものであり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。
    * `session` [Session](session.md#class-session) (任意) - ページで使用されるセッションを設定します。 Session オブジェクトを直接引き渡す代わりに、パーティション文字列を受け付ける `partition` オプションを使用することを選択することもできます。 `session` と `partition` の両方が指定されたときは、`session` が優先されます。 省略値は、既定のセッションです。
    * `partition` String (任意) - セッションのパーティション文字列に従って、ページで使用されるセッションを設定します。 `partition` が `persist:` 始まりの場合、ページはアプリの全ページで利用可能な永続的なセッションを同じ `partition` で使用します。 `persist:` プレフィックスがない場合、ページは、インメモリセッションを使用します。 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 省略値は、既定のセッションです。
    * `affinity` String (任意) - 指定されると、同じ `affinity` のウェブページは同じレンダラープロセス内で実行します。 レンダラープロセスを再利用することにより、`preload`、`sandbox`、`nodeIntegration` などの異なる値を指定した場合でも、特定の `webPreferences` オプションがウェブページ間で共有されることに注意してください。 したがって、同じ `affinity` を持つウェブページに対しては、全く同じ `webPreferences` を使用することをお勧めします。
    * `zoomFactor` Number (任意) - ページの既定のズーム倍率で、`3.0` は `300%` を表します。省略値は、`1.0` です。
    * `javascript` Boolean (任意) - JavaScriptサポートを有効にします。省略値は、`true` です。
    * `webSecurity` Boolean (任意) - `false` のとき、同一オリジンポリシー (通常、テスト用Webサイトを使用します) が無効になり、ユーザによって設定されない場合、`allowRunningInsecureContent` が `true` に設定されます。 省略値は `true` です。
    * `allowRunningInsecureContent` Boolean (任意) - httpsのページでhttpのURLからのJavaScript、CSSやプラグインを実行することを許可します。省略値は、`false` です。
    * `images` Boolean (任意) - 画像のサポートを有効にします。省略値は、`true` です。
    * `textAreasAreResizable` Boolean (任意) - TextArea要素のサイズを変更可能にします。省略値は、`true` です。
    * `webgl` Boolean (任意) - WebGLのサポートを有効にします。省略値は、`true` です。
    * `webaudio` Boolean (任意) - WebAudioのサポートを有効にします。省略値は、`true` です。
    * `plugins` Boolean (任意) - プラグインを有効にするかどうか。省略値は、`false` です。
    * `experimentalFeatures` Boolean (任意) - Chromiumの実験的な機能を有効にします。 省略値は、`false` です。
    * `experimentalCanvasFeatures` Boolean (任意) - Chromiumの実験的なキャンバスの機能を有効にします。省略値は、`false` です。
    * `scrollBounce` Boolean (任意) - macOSでスクロールバウンス (ラバーバンディング) 効果を有効にします。省略値は、`false` です。
    * `blinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた有効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) ファイルで確認することができます。
    * `disableBlinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた無効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) ファイルで確認することができます。
    * `defaultFontFamily` Object (任意) - フォントファミリーの既定のフォントを設定します。 
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
    * `contextIsolation` Boolean (任意) - Electron APIと指定された `preload` スクリプトを別々のJavaScriptコンテキストで実行するかどうか。 省略値は、`false` です。 `preload` スクリプトが実行されているコンテキストは、依然として `document` と `window` のグローバル変数にフルアクセスできますが、独自のJavaScriptの組み込みコマンドのセット (`Array`、`Object`、`JSON` など) を使用し、ロードされたページによってグローバル環境に加えられたいかなる変更からも分離されます。 Electron APIは `preload` スクリプトでのみ利用可能で、読み込まれたページでは利用できません。 このオプションは、潜在的に信頼できないリモートコンテンツをロードする際、ロードされたコンテンツが `preload` スクリプトや使用されているElectron APIを悪用することができないようにするときに使用する必要があります。 このオプションは、[Chromeのコンテンツスクリプト](https://developer.chrome.com/extensions/content_scripts#execution-environment)で使用されているのと同じ手法を使用します。 Consoleタブの一番上のコンボボックスの中にある 'Electron Isolated Context' という項目を選択することによって、開発者ツールでこのコンテキストにアクセスすることができます。 **注:** このオプションは、現在のところ、実験的なものであり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。
    * `nativeWindowOpen` Boolean (任意) - ネイティブの `window.open()` を使うかどうか。省略値は `false`。**注釈:** 現在このオプションは実験的な機能です。
    * `webviewTag` Boolean (任意) - [`<webview>` タグ](webview-tag.md) を有効にするかどうか。 省略値は、`nodeIntegration` オプションの値です。 **注:** `<webview>` に設定された `preload` スクリプトは、実行時にNode統合が有効になるので、潜在的に悪意のある `preload` スクリプトを含む `<webview>` タグをリモート/信頼できないコンテンツに作成させないようにする必要があります。 `preload` スクリプトを除去したり、検証したり、`<webview>` の初期設定を変更したりするために、[webContents](web-contents.md) の `will-attach-webview` イベントを使うことができます。
    * `additionArguments` String[] (任意) - このアプリケーションのレンダラープロセスで `process.argv` に追加される文字列のリスト。少量のデータをレンダラープロセスのプリロードスクリプトに渡すのに便利です。

`minWidth`/`maxWidth`/`minHeight`/`maxHeight` で最小もしくは最大のウインドウサイズを設定するのは、ユーザを束縛するだけです。 サイズ制限に従わないサイズを `setBounds`/`setSize` や `BrowserWindow` のコンストラクタに引き渡したすことは、差し支えありません。

`type` オプションに設定できる値と動作は、プラットフォーム依存です。設定できる値:

* Linuxでは、設定できる値は、`desktop`、`dock`、`toolbar`、`splash`、`notification` です。
* macOSでは、設定できる値は、 `desktop`, `textured です。`. 
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
* `animate` Boolean (optional) *macOS*

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

ウインドウを無効にするか有効にします。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (任意) *macOS*

ウインドウのサイズを `width` と `height` に変更します。

#### `win.getSize()`

戻り値 `Integer[]` - ウインドウの幅と高さを含みます。

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

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

#### `win.isResizable()`

戻り値 `Boolean` - ウインドウがユーザーによって手動でサイズを変更できるかどうか。

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

ウインドウがユーザーによって移動できるかどうかを設定します。Linuxでは何もしません。

#### `win.isMovable()` *macOS* *Windows*

戻り値 `Boolean` - ウインドウがユーザーによって移動できるかどうか。

Linuxでは常に `true` を返します。

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

ウインドウがユーザーによって手動で最小化できるかどうかを設定します。Linuxでは何もしません。

#### `win.isMinimizable()` *macOS* *Windows*

戻り値 `Boolean` - ウインドウがユーザーによって手動で最小化できるかどうか

Linuxでは常に `true` を返します。

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

ウインドウがユーザーによって手動で最大化できるかどうかを設定します。Linuxでは何もしません。

#### `win.isMaximizable()` *macOS* *Windows*

戻り値 `Boolean` - ウインドウがユーザーによって手動で最大化できるかどうか。

Linuxでは常に `true` を返します。

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるか、ウインドウを最大化するかを設定します。

#### `win.isFullScreenable()`

戻り値 `Boolean` - ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるか、ウインドウを最大化するか。

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

ウインドウをユーザーが手動で閉じられるかどうかを設定します。Linuxでは何もしません。

#### `win.isClosable()` *macOS* *Windows*

戻り値 `Boolean` - ウインドウをユーザーが手動で閉じられるかどうか。

Linuxでは常に `true` を返します。

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (任意) *macOS* - 値は、`normal`、`floating`、`torn-off-menu`、`modal-panel`、`main-menu`、`status`、`pop-up-menu`、`screen-saver` と ~~`dock`~~ (非推奨) です。 省略値は、`floating` です。 詳細については、[macOSのドキュメント](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) を参照してください。
* `relativeLevel` Integer (任意) *macOS* - このウインドウに設定する指定した `level` より上のレイヤーの数。 省略値は、`0` です。 Apple社は、`screen-saver` より上に1以上のレベルを設定することを推奨していないことに注意してください。

ウインドウが常に他のウインドウの上に表示されるかどうかを設定します。これを設定した後でも、ウインドウはフォーカスを当てられないツールボックスウインドウではなく、まだ通常のウインドウのままです。

#### `win.isAlwaysOnTop()`

戻り値 `Boolean` - ウインドウが常に他のウインドウの上に表示されるかどうか。

#### `win.center()`

ウインドウを画面の中央に移動します。

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) *macOS*

ウインドウを `x` と `y` に移動します。

#### `win.getPosition()`

戻り値 `Integer[]` - ウインドウの現在の位置を含みます。

#### `win.setTitle(title)`

* `title` String

ネイティブのウインドウのタイトルを `title` に変更します。

#### `win.getTitle()`

戻り値 `String` - ネイティブのウインドウのタイトル。

**注:** Webページのタイトルはネイティブのウインドウのタイトルとは異なる可能性があります。

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

macOSでシートを表示させる場所を変更します。既定では、シートはウインドウフレームのちょうど真下に表示されますが、HTMLでレンダリングされたツールバーの下に表示したいことがあるかもしれません。例:

```javascript
const {BrowserWindow} = require('electron')
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

#### `win.getNativeWindowHandle()`

戻り値 `Buffer` - ウインドウのプラットフォーム固有のハンドル。

ハンドルのネイティブな型は、Windowsでは `HWND`、macOSでは `NSView*`、Linuxでは `Window` (`unsigned long`) です。

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

ウインドウメッセージをフックします。メッセージがWndProcで受信されると、`callback` が呼び出されます。

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

戻り値 `Boolean` - メッセージがフックされているかどうかによって、`true` または `false` 。

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

ウインドウメッセージのフックを解除します。

#### `win.unhookAllWindowMessages()` *Windows*

すべてのウインドウメッセージのフックを解除します。

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

ウインドウが表すファイルのパス名を設定します。ファイルのアイコンがウインドウのタイトルバーに表示されます。

#### `win.getRepresentedFilename()` *macOS*

戻り値 `String` - ウインドウが表すファイルのパス名。

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

ウインドウのドキュメントが編集されたかどうかを指定します。`true` に設定すると、タイトルバーのアイコンがグレーになります。

#### `win.isDocumentEdited()` *macOS*

戻り値 `Boolean` - ウインドウのドキュメントが編集されたかどうか。

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャする範囲
* `callback` Function 
  * `image` [NativeImage](native-image.md)

`webContents.capturePage([rect, ]callback)` と同じです。

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` String (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

`webContents.loadURL(url[, options])` と同じです。

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

#### `win.loadFile(filePath)`

* `filePath` String

`webContents.loadFile` と同じで、`filePath` はアプリケーションのルートからの相対パスで指す HTML でなければいけません。詳細は `webContents` ドキュメントを参照してください。

#### `win.reload()`

`webContents.reload` と同じです。

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

`menu` をウインドウのメニューバーとして設定します。`null` を設定すると、メニューバーが削除されます。

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (任意) 
  * `mode` String *Windows* - プログレスバーのモード。`none`、`normal`、`indeterminate`、`error` または `paused` にすることができます。

プログレスバーの進捗値を設定します。有効範囲は、[0, 1.0] です。

進捗 < 0 の場合、プログレスバーは削除されます。進捗 > 1 の場合、不確定モードに変更します。

Linuxプラットフォームでは、Unityデスクトップ環境のみがサポートされ、`package.json` の `desktopName` フィールドに `*.desktop` ファイル名を指定する必要があります。 既定では、`app.getName().desktop` であるとみなされます。

Windowsでは、モードを渡すことができます。 有効な値は、`none`、`normal`、`indeterminate`、`error` と `paused` です。 モードを設定せずに (ただし、有効範囲内の値で) `setProgressBar` を呼び出した場合、`normal` とみなされます。

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - タスクバーアイコンの右下隅に表示されるアイコン。このパラメータが `null` の場合、オーバーレイはクリアされます
* `description` String - アクセシビリティスクリーンリーダーに提供される説明

現在のタスクバーアイコンの上に、通常、何らかのアプリケーションステータスを伝えたり、ユーザーに控えめに通知したりするのに使われる16 x 16ピクセルのオーバレイを設定します。

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

ウインドウに影を表示させるかどうかを設定します。WindowsとLinuxでは何もしません。

#### `win.hasShadow()` *macOS*

戻り値 `Boolean` - ウインドウに影を表示させているかどうか。

WindowsとLinuxでは常に `true` を返します。

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - 0.0 (完全に透明) と 1.0 (完全に不透明) の間

ウインドウの透明度を設定します。Linuxでは何もしません。

#### `win.getOpacity()` *Windows* *macOS*

戻り値 `Number` - 0.0 (完全に透明) と 1.0 (完全に不透明) の間

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

戻り値 `Boolean` - ボタンを追加するのに成功したかどうか

タスクバーボタンレイアウトのウインドウのサムネイルイメージに指定されたボタンのセットと一緒にサムネイルツールバーを追加します。 返却される `Boolean` オブジェクトは、サムネイルを追加するのに成功したかどうかを示します。

限られた空間のため、サムネイルツールバーのボタン数は、7以下にしてください。 一度、サムネイルツールバーをセットアップすると、プラットフォームの制約のため、ツールバーを削除することはできません。 しかしながら、ボタンを取り除くためにAPIを空の配列で呼び出すことはできます。

`buttons` は、`Button` オブジェクトの配列です。

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - サムネイルツールバーで表示されるアイコン。
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

* `region` [Rectangle](structures/rectangle.md) - ウインドウの領域

タスクバーのウインドウの上でホバリングするときに表示されるサムネイルイメージとして表示するウインドウの領域を設定します。 空の領域: `{x: 0, y: 0, width: 0, height: 0}` を指定することで、サムネイルをウインドウ全体にリセットすることができます。

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

タスクバーのウインドウサムネイルでホバリングするときに表示されるツールチップを設定します。

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (任意) - ウインドウの[アプリユーザーモデルID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx)。 設定されないと、他のオプションは無効です。
  * `appIconPath` String (任意) - ウインドウの[再起動アイコン](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx)。
  * `appIconIndex` Integer (任意) - `appIconPath` のアイコンのインデックス。 `appIconPath` が設定されないと無視されます。省略値は、`0` です。
  * `relaunchCommand` String (任意) - ウインドウの[再起動コマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)。
  * `relaunchDisplayName` String (任意) - ウインドウの[再起動表示名](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx)。

ウインドウのタスクバーボタンのプロパティを設定します。

**注:** `relaunchCommand` と `relaunchDisplayName` は常に一緒に設定しなければなりません。もしこれらのプロパティの1つが設定されないと、どちらも使用されません。

#### `win.showDefinitionForSelection()` *macOS*

`webContents.showDefinitionForSelection()` と同じです。

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

ウインドウのアイコンを変更します。

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

ウインドウメニューバーを自動的に非表示にするかどうかを設定します。一度設定すると、メニューバーはユーザーが単独で `Alt` キーを押下したときだけ表示されます。

メニューバーが既に表示されている場合、`setAutoHideMenuBar(true)` を呼び出してもすぐに非表示にはなりません。

#### `win.isMenuBarAutoHide()`

戻り値 `Boolean` - メニューバーを自動的に非表示にするかどうか。

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

メニューバーを表示するかどうかを設定します。メニューバーが自動的に非表示にされている場合でも、ユーザは単独で `Alt` キーを押下することで、依然としてメニューバーを表示させることができます。

#### `win.isMenuBarVisible()`

戻り値 `Boolean` - メニューバーを表示しているかどうか。

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

ウインドウをすべてのワークスペースで表示させるかどうかを設定します。

**注:** このAPIはWindowsでは何もしません。

#### `win.isVisibleOnAllWorkspaces()`

戻り値 `Boolean` - ウインドウがすべてのワークスペースで表示されているかどうか。

**注:** このAPIはWindowsの場合、常にfalseを返します。

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (任意) 
  * `forward` Boolean (任意) *Windows* - trueの場合、マウスの移動メッセージがChromiumに転送され、`mouseleave` のようなマウス関連のイベントが有効になります。 `ignore` がtrueのときだけ使用されます。 `ignore` がfalseの場合、この値に関わらず、転送は常に無効です。

ウインドウがすべてのマウスイベントを無視するようにします。

このウインドウで発生するすべてのマウスイベントは、このウインドウの下にあるウインドウに渡されますが、このウインドウにフォーカスがある場合、依然としてキーボードイベントは受信されます。

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

他のアプリによってウインドウのコンテンツがキャプチャされるのを防止します。

macOSでは、NSWindowのsharingTypeをNSWindowSharingNoneに設定します。Windowsでは、`WDA_MONITOR` でSetWindowDisplayAffinityを呼び出します。

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

ウインドウにフォーカスできるかどうかを変更します。

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

現在のウインドウの親ウインドウとして `parent` を設定します。`null` を渡すと、現在のウインドウをトップレベルウインドウにします。

#### `win.getParentWindow()`

戻り値 `BrowserWindow` - 親ウインドウ。

#### `win.getChildWindows()`

戻り値 `BrowserWindow[]` - すべての子ウインドウ。

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

タイプしているときにカーソルを非表示にするかどうかを制御します。

#### `win.selectPreviousTab()` *macOS*

ネイティブのタブが有効で、ウインドウに他のタブがあるとき、一つ前のタブを選択します。

#### `win.selectNextTab()` *macOS*

ネイティブのタブが有効で、ウインドウに他のタブがあるとき、次のタブを選択します。

#### `win.mergeAllWindows()` *macOS*

ネイティブのタブが有効で複数の開いているウインドウがあるとき、すべてのウインドウを複数のタブで1つのウインドウにマージします。

#### `win.moveTabToNewWindow()` *macOS*

ネイティブのタブが有効で現在のウインドウに複数のタブがあるとき、現在のタブを新しいウインドウに移動します。

#### `win.toggleTabBar()` *macOS*

ネイティブのタブが有効で現在のウインドウにタブが1つだけしかないとき、タブバーを表示するかどうかを切り替えます。

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

ウインドウインスタンスのタブの後ろに、このウインドウのタブとしてウインドウを追加します。

#### `win.setVibrancy(type)` *macOS*

* `type` String - `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light` または `ultra-dark` にすることができます。 詳細については、[macOSのドキュメント](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) を参照してください。

ブラウザウィンドウに曇りガラス効果を追加します。`null` または空文字を渡すと、ウインドウの曇りガラス効果が削除されます。

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

現在のウインドウのTouchBarレイアウトを設定します。 `null` または `undefined` を指定すると、TouchBarがクリアされます。 このメソッドはTouchBarがあって、macOS 10.12.1以上を実行しているマシンでのみ、有効です。

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *実験的*

戻り値 `BrowserView | null` - アタッチされたBrowserView。何もアタッチされていない場合、`null` を返します。

**注:** 現在のところ、BrowserView APIは実験的な機能であり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。