# BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

```javascript
// メインプロセス
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// 外部 URL を読み込む
win.loadURL('https://github.com')

// またはローカルの HTML ファイルを読み込む
win.loadURL(`file://${__dirname}/app/index.html`)
```

## フレームレスウィンドウ

[Frameless Window](frameless-window.md) APIを使うと、枠がないウインドウや任意の形状の透明なウインドウを作成することができます。

## ウインドウを違和感なく表示する

ウインドウにページを直接ロードすると、ユーザにはページが徐々にロードされるように見えるかもしれません。これはネイティブアプリとしては良い挙動ではありません。 ちらつかせることなくウインドウを表示するには、さまざまな状況に応じた 2 つの解決策があります。

## `ready-to-show` イベントを使用する

ページのロード中、ウインドウがまだ表示されていない場合、レンダラープロセスが初めてページをレンダリングし終わったとき、`ready-to-show` イベントが発生します。 このイベントの後にウインドウを表示させれば、チラつくことはありません。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
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

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

`ready-to-show` イベントを使用しているアプリに対しても、アプリがよりネイティブに感じられるように `backgroundColor` を設定することが推奨されます。

## 親ウィンドウと子ウィンドウ

`parent` オプションを使用することで、子ウインドウを作成することができます。

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

`child` ウインドウは、常に `top` ウインドウの前面に表示されます。

## モーダルウィンドウ

モーダルウインドウは親ウインドウを無効化する子ウインドウです。モーダルウインドウを作成するには、`parent` と `modal` オプションの両方を設定しなければなりません。

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## ページの表示状態

[Page Visibility API][page-visibility-api] は、以下のように動作します。

* すべてのプラットフォームおいて、表示状態はウインドウが非表示/最小化されているかどうかをトラッキングします。
* さらに、macOSでは、表示状態はウインドウが重なり合った状態もトラッキングします。 ウインドウが別のウインドウと重なり合った (例えば、完全に覆い隠された) 場合、表示状態は、`hidden` になります。 他のプラットフォーム上では、ウインドウが最小化されるか、明示的に `win.hide()` で非表示にされた場合のみ、表示状態は `hidden` になります。
* `BrowserWindow` が `show: false` で作成された場合、ウインドウが実際には非表示であるにも関わらず、初期の表示状態は `visible` になります。
* `backgroundThrottling` が無効の場合、ウインドウを最小化したり、重ねたり、非表示にしたりしても、表示状態は `visible` のままになります。

消費電力を最小にするために、表示状態が `hidden` のとき、高負荷な操作を一時停止することを推奨します。

## プラットフォームに関する注意事項

* macOSでは、モーダルウインドウは親ウインドウに付随したシートとして表示されます。
* 親ウインドウが移動したとき、macOSでは、子ウインドウは親ウインドウに対する相対的な位置を維持しますが、WindowsとLinuxでは、子ウインドウは移動しません。
* Linuxでは、モーダルウインドウの型は、`dialog` に変更されます。
* Linuxでは、多くのデスクトップ環境は、モーダルウインドウを非表示にすることをサポートしていません。

## クラス: BrowserWindow

> ブラウザウィンドウを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

`BrowserWindow` は [EventEmitter][event-emitter] を継承しています。

`options` によって設定されたネイティブプロパティで新しい `BrowserWindow` を生成します。

### `new BrowserWindow([options])`

* `options` Object (任意)
  * `width` Integer (任意) - ピクセル単位でのウインドウの幅。 省略値は `800` です。
  * `height` Integer (任意) - ピクセル単位でのウインドウの高さ。 省略値は `600` です。
  * `x` Integer (任意) - (y が使われている場合は **必須**) ウインドウの画面左のオフセット。 省略すると、ウインドウは中央に配置されます。
  * `y` Integer (任意) - (x が使われている場合は **必須**) ウインドウの画面上のオフセット。 省略すると、ウインドウは中央に配置されます。
  * `useContentSize` Boolean (任意) - `width` と `height` が、Webページのサイズとして使用されます。この場合、実際のウインドウのサイズは、ウインドウ枠のサイズが含まれ、若干大きくなることを意味します。 省略値は `false` です。
  * `center` Boolean (任意) - ウインドウを画面中央に表示します。
  * `minWidth` Integer (任意) - ウインドウの最小の幅。 省略値は `0` です。
  * `minHeight` Integer (任意) - ウィンドウの最小の高さ。 省略値は `0` です。
  * `maxWidth` Integer (任意) - ウインドウの最大の幅。 省略すると無制限です。
  * `maxHeight` Integer (任意) - ウインドウの最大の高さ。 省略すると無制限です。
  * `resizable` Boolean (任意) - ウインドウがリサイズ可能かどうか。 省略値は `true` です。
  * `movable` Boolean (任意) - ウインドウが移動可能かどうか。 これは Linux では実装されていません。 省略値は `true` です。
  * `minimizable` Boolean (任意) - ウインドウが最小化可能かどうか。 これは Linux では実装されていません。 省略値は `true` です。
  * `maximizable` Boolean (任意) - ウインドウが最大化可能かどうか。 これは Linux では実装されていません。 省略値は `true` です。
  * `closable` Boolean (任意) - ウインドウを閉じることができるかどうか。 これは Linux では実装されていません。 省略値は `true` です。
  * `focusable` Boolean (任意) - ウインドウにフォーカスを当てることができるかどうか。 省略値は `true` です。 Windowsでは、`focusable: false` と設定することは、`skipTaskbar: true` と設定することにもなります。 Linuxでは、`focusable: false` と設定することは、ウインドウがwmとのやり取りを停止することになるため、ウインドウがすべてのワークスペースで常に前面に表示されます。
  * `alwaysOnTop` Boolean (任意) - ウインドウを常に他のウインドウの前面に表示させるかどうか。 省略値は `false` です。
  * `fullscreen` Boolean (任意) - ウインドウをフルスクリーンで表示させるかどうか。 明示的に `false` と設定された場合、macOSでは、フルスクリーンボタンが非表示または無効になります。 省略値は `false` です。
  * `fullscreenable` Boolean (任意) - ウインドウをフルスクリーンモードにすることができるかどうか。 macOSでは、さらに、最大化/ズームボタンが、フルスクリーンモードまたはウインドウ最大化に切り替わるかどうか。 省略値は `true` です。
  * `simpleFullscreen` Boolean (任意) - macOS で Lion より前のフルスクリーンを使用します。 省略値は `false` です。
  * `skipTaskbar` Boolean (任意) - ウインドウをタスクバーに表示するかどうか。 省略値は `false` です。
  * `kiosk` Boolean (任意) - ウインドウがキオスクモードかどうか。 省略値は `false` です。
  * `title` String (任意) - デフォルトのウインドウタイトル。 省略値は `"Electron"` です。 HTML タグの `<title>` が `loadURL()` でロードされた HTML ファイル内で定義されている場合、このプロパティは無視されます。
  * `icon` ([NativeImage](native-image.md) | String) (任意) - ウインドウのアイコン。 Windowsでは、最高の視覚効果を得るためには、`ICO` アイコンを使うことを推奨します。未定義のままにすることもできますが、その場合、実行可能ファイルのアイコンが使われます。
  * `show` Boolean (任意) - 生成時にウインドウを表示するかどうか。 省略値は `true` です。
  * `paintWhenInitiallyHidden` Boolean (任意) - `show` が `false` で作成されたばかりのときに、レンダラーをアクティブにするかどうか。  `show: false` での `document.visibilityState` が最初のロードで正しく機能するには、これを `false` に設定する必要があります。  これを `false` に設定すると、`ready-to-show` イベントが発生しなくなります。  省略値は `true` です。
  * `frame` Boolean (任意) - `false` を指定すると [フレームレスウインドウ](frameless-window.md) を生成します。 省略値は `true` です。
  * `parent` BrowserWindow (任意) - 親ウインドウを指定します。 省略値は `null` です。
  * `modal` Boolean (任意) - これをモーダルウインドウにするかどうか。 これは、このウインドウが子ウインドウの場合にのみ機能します。 省略値は `false` です。
  * `acceptFirstMouse` Boolean (任意) - ウインドウをアクティブにした一回のマウスダウンイベントをウェブビューが同時に受け付けるかどうか。 省略値は `false` です。
  * `disableAutoHideCursor` Boolean (任意) - タイプ中にカーソルを非表示にするかどうか。 省略値は `false` です。
  * `autoHideMenuBar` Boolean (任意) - `Alt` キーが押されていなければ、メニューバーを自動で非表示にします。 省略値は `false` です。
  * `enableLargerThanScreen` Boolean (任意) - ウインドウを画面よりも大きいサイズに変更できるようにします。 他の OS はデフォルトで画面よりも大きなウィンドウを許可するため、macOS にのみ関係します。 省略値は `false` です。
  * `backgroundColor` String (任意) - `#66CD00` や `#FFF` や `#80FFFFFF` (`transparent` を `true` にセットすれば #AARRGGBB 形式のアルファ値をサポートします) のような16進数の値でのウインドウの背景色。 省略値は `#FFF` (白) です。
  * `hasShadow` Boolean (任意) - ウインドウに影を付けるかどうか。 省略値は `true` です。
  * `opacity` Number (任意) - ウインドウの初期透明度を 0.0 (完全に透明) から 1.0 (完全に不透明) の間で設定します。 これは Windows と macOS でのみ実装されています。
  * `darkTheme` Boolean (任意) - ウインドウに対してダークテーマの使用を強制します。いくつかの GTK+3 デスクトップ環境でしか動作しません。 省略値は `false` です。
  * `transparent` Boolean (任意) - ウインドウを [透明](frameless-window.md#transparent-window) にします。 省略値は `false` です。 Windows では、ウィンドウがフレームレスでない限り機能しません。
  * `type` String (任意) - ウインドウのタイプで、省略すると通常のウインドウになります。 詳しくは後述します。
  * `visualEffectState` String (任意) - macOS 上のウィンドウのアクティビティ状態をマテリアルの外観に反映させる方法を指定します。 `vibrancy`プロパティと一緒に使用する必要があります。 以下は取りうる値です。
    * `followWindow` - ウィンドウがアクティブなときにはアクティブに、そうでないときには非アクティブになるよう背景が自動的に表示されます。 これが既定値です。
    * `active` - 背景が常にアクティブに表示されます。
    * `inactive` - 背景が常に非アクティブに表示されます。
  * `titleBarStyle` String (任意) - ウインドウタイトルバーのスタイル。 省略値は `default` です。 以下は取りうる値です。
    * `default` - 標準の灰色不透明なMacのタイトルバーになります。
    * `hidden` - タイトルバーが非表示かつフルサイズのコンテンツウインドウになりますが、タイトルバーには、まだ標準のウインドウコントロール ("信号") が左上にあります。
    * `hiddenInset` - ウインドウの端から信号ボタンが少し埋め込まれた別の見た目でタイトルバーが非表示になります。
    * `customButtonsOnHover` - タイトルバーが非表示になり、フルサイズコンテンツのウインドウが表示されます。ウィンドウの左上にカーソルを置くと信号機ボタンが表示されるようになります。  **注:** 現在、これは実験的な機能です。
  * `trafficLightPosition` [Point](structures/point.md) (任意) - フレームレスウインドウにおける信号機ボタンのカスタム位置を設定します。
  * `roundedCorners` Boolean (任意) - macOS でのフレームレスウインドウが丸角であるべきかどうか。 省略値は `true` です。
  * `fullscreenWindowTitle` Boolean (任意) _非推奨_ - macOSで titleBarStyle が `hiddenInset` のフルスクリーンモードでタイトルバーにタイトルを表示するかどうか。 省略値は `false` です。
  * `thickFrame` Boolean (任意) - Windowsのフレームレスウインドウに対して、標準のウインドウ枠を追加する `WS_THICKFRAME` スタイルを使用します。 `false` に設定すると、ウインドウの影とウインドウアニメーションがなくなります。 省略値は `true` です。
  * `vibrancy` String (任意) - macOSでのみ、ウインドウに曇りガラス効果の種類を追加します。 `appearance-based`、`light`、`dark`、`titlebar`、`selection`、`menu`、`popover`、`sidebar`、`medium-light`、`ultra-dark`、`header`、`sheet`、`window`、`hud`、`fullscreen-ui`、`tooltip`、`content`、`under-window` または `under-page` にすることができます。 `appearance-based`、`light`、`dark`、`medium-light`、`ultra-dark` は非推奨になっており、macOS Catalina (10.15) で削除されたことにご注意ください。
  * `zoomToPageWidth` Boolean (任意) - macOS で、option キーを押しながら緑の信号ボタンをクリックしたり、ウインドウ > ズーム のメニュー項目をクリックしたりしたときの動作を制御します。 `true` の場合、ズームしたとき、ウインドウはWebページの最適な幅に拡大されます。`false` だと、画面の幅にズームされます。 これは、`maximize()` を直接呼び出したときの動作にも影響を与えます。 省略値は `false` です。
  * `tabbingIdentifier` String (任意) - タブのグループ名で、macOS 10.12以上の場合、ネイティブのタブとしてウインドウを開くことができます。 同一のタブ識別子を持つウインドウは、一緒にグループ化されます。 これはネイティブのタブボタンをウインドウのタブバーに追加し、`app` とウインドウが `new-window-for-tab` イベントを受け取ることができるようになります。
  * `webPreferences` Object (任意) - ウェブページの機能の設定です。
    * `devTools` Boolean (任意) - デベロッパーツールを有効にするかどうか。 `false` に設定すると、`BrowserWindow.webContents.openDevTools()` を使ってデベロッパーツールを開くことはできません。 省略値は `true` です。
    * `nodeIntegration` Boolean (任意) - Node インテグレーションを有効にするかどうか。 省略値は `false` です。
    * `nodeIntegrationInWorker` Boolean (任意) - WebワーカーでNode統合を有効にするかどうか。 省略値は `false` です。 これについての詳細は、[マルチスレッド](../tutorial/multithreading.md) を参照してください。
    * `nodeIntegrationInSubFrames` Boolean (任意) - iframe や子ウインドウのようなサブフレーム内で Node.js サポートを有効にする実験的な機能です。 すべてのプリロードは iframe 毎にロードされます。メインフレーム内かそうでないか判断するには `process.isMainFrame` が使用できます。
    * `preload` String (任意) - 他のスクリプトがページで実行される前にロードされるスクリプトを指定します。 このスクリプトは、Node統合がオンまたはオフであるかに関係なく常にNode APIにアクセスできます。 値は、スクリプトへの絶対ファイルパスにする必要があります。 Node統合がオフのときでも、プレロードされたスクリプトは、Nodeのグローバルシンボルをグローバルスコープに再導入できます。 [ここ](context-bridge.md#exposing-node-global-symbols) の例を参照してください。
    * `sandbox` Boolean (任意) - 設定された場合、ウインドウと関連付けられているレンダラーをサンドボックス化します。これは、ChromiumのOSレベルのサンドボックスと互換性を持ち、Node.jsエンジンを無効化します。 これは `nodeIntegration` オプションと同じではなく、プレロードスクリプトで利用可能なAPIよりもさらに制限がかかります。 このオプションの詳細については、[ここ](../tutorial/sandbox.md) をお読みください。
    * `enableRemoteModule` Boolean (任意) - [`remote`](remote.md) モジュールを有効にするかどうか。 省略値は `false` です。
    * `session` [Session](session.md#class-session) (任意) - ページで使用されるセッションを設定します。 Session オブジェクトを直接引き渡す代わりに、パーティション文字列を受け付ける `partition` オプションを使用することを選択することもできます。 `session` と `partition` の両方が指定されたときは、`session` が優先されます。 省略値は、既定のセッションです。
    * `partition` String (任意) - セッションのパーティション文字列に従って、ページで使用されるセッションを設定します。 `partition` が `persist:` 始まりの場合、ページはアプリの全ページで利用可能な永続的なセッションを同じ `partition` で使用します。 `persist:` プレフィックスがない場合、ページは、インメモリセッションを使用します。 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 省略値は、既定のセッションです。
    * `affinity` String (任意) - 指定されると、同じ `affinity` のウェブページは同じレンダラープロセス内で実行します。 レンダラープロセスを再利用することにより、`preload`、`sandbox`、`nodeIntegration` などの異なる値を指定した場合でも、特定の `webPreferences` オプションがウェブページ間で共有されることに注意してください。 したがって、同じ `affinity` を持つウェブページに対しては、全く同じ `webPreferences` を使用することをお勧めします。 _非推奨_
    * `zoomFactor` Number (任意) - ページの既定のズーム倍率で、`3.0` は `300%` を表します。 省略値は `1.0` です。
    * `javascript` Boolean (任意) - JavaScript サポートを有効にします。 省略値は `true` です。
    * `webSecurity` Boolean (任意) - `false` のとき、同一オリジンポリシー (通常、テスト用Webサイトを使用します) が無効になり、ユーザによって設定されない場合、`allowRunningInsecureContent` が `true` に設定されます。 省略値は `true` です。
    * `allowRunningInsecureContent` Boolean (任意) - https のページで http の URL からの JavaScript、CSS やプラグインを実行することを許可します。 省略値は `false` です。
    * `images` Boolean (任意) - 画像のサポートを有効にします。 省略値は `true` です。
    * `textAreasAreResizable` Boolean (任意) - TextArea 要素のサイズを変更可能にします。 省略値は `true` です。
    * `webgl` Boolean (任意) - WebGL のサポートを有効にします。 省略値は `true` です。
    * `plugins` Boolean (任意) - プラグインを有効にするかどうか。 省略値は `false` です。
    * `experimentalFeatures` Boolean (任意) - Chromium の実験的な機能を有効にします。 省略値は `false` です。
    * `scrollBounce` Boolean (任意) - macOS でスクロールバウンス (ラバーバンディング) 効果を有効にします。 省略値は `false` です。
    * `enableBlinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた有効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5][runtime-enabled-features] ファイルで確認することができます。
    * `disableBlinkFeatures` String (任意) - `CSSVariables,KeyboardEventKey` のように `,` で区切られた無効にする機能の文字列のリスト。 サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5][runtime-enabled-features] ファイルで確認することができます。
    * `defaultFontFamily` Object (任意) - 各フォントファミリーの既定フォントを設定します。
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
    * `contextIsolation` Boolean (任意) - Electron APIと指定された `preload` スクリプトを別々のJavaScriptコンテキストで実行するかどうか。 省略値は `true` です。 `preload` スクリプトが実行されるコンテキストでは、専用の `document` および `window` グローバルと、独自の JavaScript ビルドインのセット (`Array`, `Object`, `JSON` など) にのみアクセスできます。これらすべてはロードされたコンテンツからは見えません。 Electron API は `preload` スクリプトでのみ利用可能で、読み込まれたページでは利用できません。 このオプションは、信頼できない可能性のあるリモートコンテンツをロードする際に使用します。ロードされたコンテンツが `preload` スクリプトや使用する Electron API を改ざんできないようにするためです。  このオプションは、[Chrome のコンテンツスクリプト][chrome-content-scripts] のものと同じ技術を使用しています。  Console タブの一番上のコンボボックスの中にある 'Electron Isolated Context' という項目を選択することによって、開発者ツールでこのコンテキストにアクセスできます。
    * `worldSafeExecuteJavaScript` Boolean (optional) - true の場合、`contextIsolation` を使用しているときに、JS の値がワールド間を安全に行き来できるように、`webFrame.executeJavaScript` から返される値はサニタイズされます。 省略値は `true` です。 _非推奨_
    * `nativeWindowOpen` Boolean (任意) - ネイティブの `window.open()` を使用するかどうか。 省略値は `false` 。 子ウインドウは、`nodeIntegrationInSubFrames` が true でなければ node integration は無効化されます。 **注:** 現在、これは実験的な機能です。
    * `webviewTag` Boolean (任意) - [`<webview>` タグ](webview-tag.md) を有効にするかどうか。 省略値は `false` 。 **注:** `<webview>` に設定された `preload` スクリプトは、実行時にNode統合が有効になるので、潜在的に悪意のある `preload` スクリプトを含む `<webview>` タグをリモート/信頼できないコンテンツに作成させないようにする必要があります。 `preload` スクリプトを除去したり、検証したり、`<webview>` の初期設定を変更したりするために、[webContents](web-contents.md) の `will-attach-webview` イベントを使うことができます。
    * `additionalArguments` String[] (任意) - このアプリケーションのレンダラープロセスで `process.argv` に追加される文字列のリスト。  小規模なデータをレンダラープロセスのプリロードスクリプトに渡すのに便利です。
    * `safeDialogs` Boolean (任意) - ブラウザによる連続ダイアログ保護を有効にするかどうか。 省略値は `false` です。
    * `safeDialogsMessage` String (任意) - 連続したダイアログからの保護が機能したときに表示されるメッセージ。 定義されていなければデフォルトメッセージが使われますが、現在のデフォルトメッセージは英語であり、ローカライズされていないことに注意してください。
    * `disableDialogs` Boolean (任意) - ダイアログを完全に無効化するかどうか。 `safeDialogs` を上書きします。 省略値は `false` です。
    * `navigateOnDragDrop` Boolean (任意) - ファイルやリンクをページにドラッグ & ドロップした際にナビゲーションするかどうか。 省略値は `false` です。
    * `autoplayPolicy` String (任意) - ウインドウ内のコンテンツに適用される自動再生ポリシーで、`no-user-gesture-required`、`user-gesture-required`、`document-user-activation-required` にできます。 省略値は `no-user-gesture-required` です。
    * `disableHtmlFullscreenWindowResize` Boolean (任意) - HTML フルスクリーンになった時にウィンドウのサイズ変更を禁止するかどうか。 省略値は `false` です。
    * `accessibleTitle` String (任意) - スクリーンリーダーなどのアクセシビリティツールにのみ提供される代替タイトル文字列。 この文字列はユーザに直接表示されません。
    * `spellcheck` Boolean (任意) - 組み込みスペルチェックを有効にするかどうか。 省略値は `true` です。
    * `enableWebSQL` Boolean (任意) - [WebSQL API](https://www.w3.org/TR/webdatabase/) を有効にするかどうか。 省略値は `true` です。
    * `v8CacheOptions` String (任意) - blink が使用する v8 コードキャッシュポリシーを強制します。 以下は取りうる値です。
      * `none` - コードキャッシュ無効化
      * `code` - ヒューリスティックベースのコードキャッシュ
      * `bypassHeatCheck` - ヒューリスティックのコードキャッシュをバイパスしつつ遅延コンパイル
      * `bypassHeatCheckAndEagerCompile` - 上と同じにしつつ先行コンパイルします。 既定のポリシーは `code` です。
    * `enablePreferredSizeMode` Boolean (任意) - 優先サイズモードを有効にするかどうか。 優先サイズとは、document のレイアウトをスクロール無しで格納するにあたって必要な最小サイズのことです。 これを有効にすると、優先サイズが変更されたときに `WebContents`で`preferred-size-changed`イベントが発生します。 省略値は `false` です。

`minWidth`/`maxWidth`/`minHeight`/`maxHeight` で最小もしくは最大のウインドウサイズを設定するのは、ユーザを束縛するだけです。 サイズ制約に関係しないサイズを `setBounds`/`setSize` や `BrowserWindow` のコンストラクタに渡すことは差し支えありません。

`type` オプションに設定できる値と動作は、プラットフォーム依存です。 以下は取りうる値です。

* Linuxでは、設定できる値は、`desktop`、`dock`、`toolbar`、`splash`、`notification` です。
* macOS で設定できるタイプは、`desktop`、`textured` です。
  * `textured` タイプは、メタルのグラデーションの外観 (`NSTexturedBackgroundWindowMask`) を追加します。
  * `desktop` タイプは、ウインドウをデスクトップのバックグラウンドウインドウのレベル (`kCGDesktopWindowLevel - 1`) に配置します。 デスクトップウインドウはフォーカス、キーボードやマウスイベントを受け付けようとしないことに注意してください。しかしながら、`globalShortcut` を使って、かろうじて入力を受け付けることはできます。
* Windowsでは、設定できるタイプは、`toolbar` です。

### インスタンスイベント

`new BrowserWindow` で作成されたオブジェクトでは以下のイベントが発生します。

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'page-title-updated'

戻り値：

* `event` Event
* `title` String
* `explicitSet` Boolean

ドキュメントのタイトルが変更されたときに発生します。`event.preventDefault()` を呼び出すことで、ネイティブウインドウのタイトルが変更されるのをキャンセルできます。 タイトルがファイルの URL から合成された場合、`explicitSet` は false です。

#### イベント: 'close'

戻り値：

* `event` Event

ウインドウがクローズされようとするときに発生します。 これは、DOMの `beforeunload` と `unload` イベントの前に発生します。 `event.preventDefault()` を呼び出すことで、クローズがキャンセルされます。

通常、ウインドウをクローズさせる必要があるかどうかを判断するために、`beforeunload` ハンドラーを使用したいと思うでしょうが、これは、ウインドウがリロードされるときにも呼び出されます。 Electronでは、`undefined` 以外の値を返却すれば、クローズをキャンセルします。 以下がその例です。

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

_**注**: `window.onbeforeunload = handler` と `window.addEventListener('beforeunload', handler)` の動作には、微妙な違いがあります。 値のみを返すのではなく、常に明示的に `event.returnValue` を設定するようにすることを推奨します。後者の方がElectron内でより一貫性のある動作をします。_

#### イベント: 'closed'

ウインドウが閉じられたときに発生します。 このイベントを受け取った後は、ウインドウへの参照を削除し、以降そのウインドウを使用しないようにしてください。

#### イベント: 'session-end' _Windows_

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

#### イベント: 'will-resize' _macOS_ _Windows_

戻り値：

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - ウインドウがリサイズされようとしているサイズ。

ウィンドウがリサイズされる前に発生します。 `event.preventDefault()`を呼び出すことで、ウィンドウがリサイズされるのを阻止できます。

このイベントは、ウィンドウが手動でリサイズされようとしているときにしか発生しません。 ウィンドウを、`setBounds`や`setSize` でリサイズする時には、このイベントは発生しません。

#### イベント: 'resize'

ウインドウがリサイズされた後に発生します。

#### イベント: 'resized' _macOS_ _Windows_

ウインドウがリサイズされるときに一度発生します。

これは、通常、ウィンドウが手動でリサイズされようとしているときにしか発生しません。 macOS の場合 `setBounds`/`setSize` でウィンドウのサイズを変更し、 `animate` パラメーターを `true` に設定すると、サイズ変更が完了したときにも、このイベントが発生します。

#### イベント: 'will-move' _macOS_ _Windows_

戻り値：

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - ウインドウが移動されようとしている位置。

ウィンドウが移動される前に発生します。 Windows では、 `event.preventDefault()` を呼び出すことで、ウィンドウが移動されるのを阻止できます。

このイベントは、ウィンドウが手動でリサイズされようとしているときにしか発生しません。 ウィンドウを、`setBounds`や`setSize` でリサイズする時には、このイベントは発生しません。

#### イベント: 'move'

ウインドウが新しい位置に移動されているときに発生します。

#### イベント: 'moved' _macOS_ _Windows_

ウインドウが新しい位置に移動されるときに一回だけ、発生します。

__注__: macOSでは、このイベントは `move` のエイリアスです。

#### イベント: 'enter-full-screen'

ウインドウがフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-full-screen'

ウインドウがフルスクリーン状態を抜けるときに発生します。

#### イベント: 'enter-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態を抜けるときに発生します。

#### イベント: 'always-on-top-changed'

戻り値：

* `event` Event
* `isAlwaysOnTop` Boolean

ウインドウが常に他のウインドウの手前に表示されるように設定またはそれが解除されたときに発生します。

#### イベント: 'app-command' _Windows_ _Linux_

戻り値：

* `event` Event
* `command` String

[アプリコマンド](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) が呼び出されるときに発生します。 これらは、Windowsで幾つかのマウスに組み込まれている "Back" ボタンだけでなく、一般的にキーボードのメディアキーやブラウザコマンドとも関連付けられています。

コマンドは小文字にされ、アンダースコアはハイフンに置き換えられ、`APPCOMMAND_`プレフィックスは外されます。 例えば、`APPCOMMAND_BROWSER_BACKWARD` は、`browser-backward` として送信されます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // ユーザーがマウスで戻るボタンを押下したときにナビゲートする
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Linux 上では以下のアプリコマンドが明示的にサポートされます。

* `browser-backward`
* `browser-forward`

#### イベント: 'scroll-touch-begin' _macOS_

スクロールホイールイベントフェーズが開始されたときに発生します。

#### イベント: 'scroll-touch-end' _macOS_

スクロールホイールイベントフェーズが終了したときに発生します。

#### イベント: 'scroll-touch-edge' _macOS_

スクロールイベントフェーズが要素の端に達したことを検出したときに発生します。

#### イベント: 'swipe' _macOS_

戻り値：

* `event` Event
* `direction` String

3 本指でのスワイプ時に発火されます。 方向は `up`、`right`、`down`、`left` のいずれかになります。

このイベントは、スワイプで画面の内容が移動しない、古い macOS スタイルのトラックパッドスワイプを元にしています。 ほとんどの macOS トラックパッドはもうこの類のスワイプを許可していないため、正常にイベントを発生させるためには `システム環境設定 > トラックパッド > その他のジェスチャ` の 'ページ間をスワイプ' 設定を '2本指または3本指でスワイプ' にする必要があります。

#### イベント: 'rotate-gesture' _macOS_

戻り値：

* `event` Event
* `rotation` Float

トラックパッドの回転ジェスチャで発生します。 回転ジェスチャーが終了するまで継続的に発生します。 各イベントの `rotation` 値は、最後の発生から回転した角度です。 回転ジェスチャで最後に発行されたイベントは、常に `0` の値になります。 反時計回りの回転値は正であり、時計回りの回転値は負です。

#### イベント: 'sheet-begin' _macOS_

ウインドウがシートを開くときに発生します。

#### イベント: 'sheet-end' _macOS_

ウインドウがシートを閉じたときに発生します。

#### イベント: 'new-window-for-tab' _macOS_

ネイティブの新規タブボタンがクリックされるときに発生します。

#### イベント: 'system-context-menu' _Windows_

戻り値：

* `event` Event
* `point` [Point](structures/point.md) - コンテキストメニューがトリガーされた画面の座標。

システムコンテキストメニューがウィンドウ上でトリガーされたときに発生します。 通常ユーザーがウィンドウのクライアントエリア以外を右クリックしたときにトリガーされます。  これは、フレームレスウィンドウで`-webkit-app-region: drag`と宣言したウィンドウタイトルバーまたは任意の領域です。

`event.preventDefault()` を呼ぶと、そのメニューは表示されなくなります。

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

戻り値 `BrowserWindow` - 指定された `browserView` を所有するウインドウ。 指定されたビューがどのウィンドウにもアタッチされていない場合は、 `null`を返します。

#### `BrowserWindow.fromId(id)`

* `id` Integer

戻り値 `BrowserWindow | null` - 指定された `id` のウインドウ。

### インスタンスプロパティ

`new BrowserWindow` で作成されたオブジェクトは、以下のプロパティを持っています。

```javascript
const { BrowserWindow } = require('electron')
// この例では、 `win` がインスタンス
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _読み出し専用_

このウィンドウが所有する `WebContents` オブジェクト。 すべての Web ページ関連のイベントおよび操作は、これを介して行われます。

[`webContents` ドキュメント](web-contents.md) でメソッドやイベントについて参照してください。

#### `win.id` _読み出し専用_

`Integer` 型のプロパティです。そのウインドウの一意な ID を表します。 各 ID は、この Electron アプリケーション全体のすべての `BrowserWindow` インスタンス間で一意です。

#### `win.autoHideMenuBar`

ウインドウがユーザーによって手動で最小化できるかどうかを決定する `Boolean` 型のプロパティ。 一度設定されると、メニューバーはユーザが単独で `Alt` キーを押したときのみに表示されます。

メニューバーが既に表示されている場合、このプロパティを `true` にセットしてもすぐに非表示にはなりません。

#### `win.simpleFullScreen`

`Boolean` 型のプロパティです。これは、ウィンドウがシンプルな (Lion 以前の) フルスクリーンモードかどうかを決定します。

#### `win.fullScreen`

`Boolean` 型のプロパティです。これは、ウィンドウがフルスクリーンモードかどうかを決定します。

#### `win.visibleOnAllWorkspaces`

`Boolean` 型のプロパティです。これは、ウィンドウがすべてのワークスペースで表示されるどうかを決定します。

**注:** Windows の場合、常に false を返します。

#### `win.shadow`

`Boolean` 型のプロパティです。ウィンドウに影があるかどうかを決定します。

#### `win.menuBarVisible` _Windows_ _Linux_

`Boolean` 型のプロパティです。メニューバーが表示されるかどうかを決定します。

**注:** メニューバーが自動的に非表示にされている場合でも、ユーザが単に `Alt` キーを押下すれば、依然としてメニューバーを表示させることができます。

#### `win.kiosk`

`Boolean` 型のプロパティです。これは、ウィンドウがキオスクモードかどうかを決定します。

#### `win.documentEdited` _macOS_

`Boolean` 型のプロパティです。ウィンドウのドキュメントが編集されたかどうかを決定します。

`true` にすると、タイトルバーのアイコンが灰色になります。

#### `win.representedFilename` _macOS_

`String` 型のプロパティです。ウィンドウが表すファイルのパス名を決定し、そのファイルのアイコンがウィンドウのタイトルバーに表示されます。

#### `win.title`

`String` 型のプロパティです。ネイティブウインドウのタイトルを決定します。

**注:** ウェブページのタイトルとネイティブウインドウのタイトルは異なる可能性があります。

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

ウィンドウがアプリケーションの Windows メニューから除外されるかどうかを決定する `Boolean` プロパティ。 省略値は `false` です。

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

スクリーンリーダーなどのアクセシビリティツールにのみ提供される代替タイトルを定義する `String` 型のプロパティ。 この文字列はユーザに直接表示されません。

### インスタンスメソッド

`new BrowserWindow` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

**注:** いくつかのメソッドは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### `win.destroy()`

強制的にウインドウを閉じます。`unload` と `beforeunload` イベントはWebページで発生しません。また、`close` イベントもこのウインドウで発生しません。しかし、`closed` イベントが発生することは保証されます。

#### `win.close()`

ウインドウを閉じようとします。 これは、ユーザーが手動でウィンドウの閉じるボタンをクリックした場合と同じ効果があります。 ただし、 Web ページはウィンドウが閉じようとするのををキャンセルすることができます。 [close イベント](#event-close) を参照してください。

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

ウィンドウを最大化します。 ウインドウがまだ表示されていない場合、併せてウインドウを表示 (ただし、フォーカスは当たりません) します。

#### `win.unmaximize()`

ウインドウの最大化を解除します。

#### `win.isMaximized()`

戻り値 `Boolean` - ウインドウが最大化されているかどうか。

#### `win.minimize()`

ウィンドウを最小化します。 一部のプラットフォームでは、最小化されたウィンドウが Dock に表示されます。

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

macOS Lion (10.7) より前のバージョンで見られる簡易フルスクリーンモードはネイティブのフルスクリーン動作をエミュレートします。

#### `win.isSimpleFullScreen()` _macOS_

戻り値 `Boolean` - ウインドウが簡易 (Lionより前) フルスクリーンモードであるかどうか。

#### `win.isNormal()`

Returns `Boolean` - ウィンドウが通常の状態 (最大化されていない、最小化されていない、フルスクリーンモードではない) かどうか。

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - コンテンツビューの一部を維持するためのアスペクト比。
* `extraSize` [Size](structures/size.md) (任意) _macOS_ - アスペクト比を維持している間は含まれない余分のサイズ。

これはウインドウのアスペクト比を維持します。 ピクセルで指定した追加のサイズによって、開発者は、アスペクト比の計算に含まれないスペースを確保することができます。 このAPIはウインドウのサイズとそのコンテンツのサイズの差異も考慮しています。

HDビデオプレーヤーと関連したコントロールを持つ通常のウインドウを考えてみましょう。 ひょっとすると、左端に15ピクセルのコントロール、右端に25ピクセルのコントロール、プレーヤーの下部に50ピクセルのコントロールがあるかもしれません。 プレーヤー内で 16:9 アスペクト比 (HD @1920x1280 の標準的なアスペクト比) を維持するためには、この関数を 16/9 と { width: 40, height: 50 } の引数で呼び出します。 2番目の引数は、追加の幅と高さがコンテンツビューの中に収まるかを気にしません。それらはただ存在しているだけです。 全体のコンテンツビュー内にある余分な幅と高さの領域を単純に足し合わせます。

`win.setSize` などの API でプログラム的にウインドウをサイズ変更した場合、アスペクト比は維持されません。

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - `#66CD00` や `#FFF` や `#80FFFFFF` (`transparent` を `true` にすればアルファ値をサポートします) のような16進数の値でのウインドウの背景色。 省略値は `#FFF` (白) です。

ウィンドウの背景色を設定します。 [`backgroundColor` 設定](#setting-backgroundcolor) を参照してください。

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Quick Lookでプレビューするファイルへの絶対パス。 ここで、Quick Lookはパスのファイル名とファイル拡張子をファイルを開くためのコンテンツタイプを決定するのに使用する点が重要です。
* `displayName` String (任意) - Quick Lookのモーダルビューに表示するファイルの名前。 これは純粋に見た目だけのもので、ファイルのコンテンツタイプには影響しません。 省略値は、`path` です。

指定したパスでファイルをプレビューするために、[Quick Look][quick-look] を使用します。

#### `win.closeFilePreview()` _macOS_

現在開いている [Quick Look][quick-look] のパネルを閉じます。

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (任意) _macOS_

指定した境界までウインドウのサイズを変更して移動します。 指定されていないプロパティは、既定で現在の値になります。

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

#### `win.getBackgroundColor()`

戻り値 `String` - ウインドウの背景色を取得します。 [`backgroundColor` 設定](#setting-backgroundcolor) を参照してください。

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (任意) _macOS_

指定した境界までウインドウのクライアント領域 (例えば、Webページ) のサイズを変更して移動します。

#### `win.getContentBounds()`

戻り値 [`Rectangle`](structures/rectangle.md) - ウインドウの内部領域の `bounds` が `Object` になったもの。

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - 通常状態におけるウィンドウ境界を含む領域。

**注意:** ウインドウの現在の状態: 最大化、最小化、または全画面表示に関係なく、この関数は常に通常状態のウインドウの位置とサイズを返します。 通常状態においては、getBounds と getNormalBounds は同じ [`Rectangle`](structures/rectangle.md) を返します。

#### `win.setEnabled(enable)`

* `enable` Boolean

ウインドウを無効にするか有効にします。

#### `win.isEnabled()`

戻り値 `Boolean` - そのウインドウが有効かどうか。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (任意) _macOS_

ウインドウのサイズを `width` と `height` に変更します。 `width` または `height` が最小サイズ制約の設定値より低い場合、ウィンドウはその最小サイズにスナップします。

#### `win.getSize()`

戻り値 `Integer[]` - ウインドウの幅と高さを含みます。

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (任意) _macOS_

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

ウインドウがユーザによって手動でサイズ変更できるかどうかを設定します。

#### `win.isResizable()`

戻り値 `Boolean` - ウインドウがユーザによって手動でサイズ変更できるかどうか。

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

ウインドウがユーザーによって手動で移動できるかどうかを設定します。 Linux では何もしません。

#### `win.isMovable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザーによって移動できるかどうか。

Linuxでは常に `true` を返します。

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

ウインドウがユーザーによって手動で最小化できるかどうかを設定します。 Linux では何もしません。

#### `win.isMinimizable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザによって手動で最小化できるかどうか。

Linuxでは常に `true` を返します。

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

ウインドウがユーザーによって手動で最大化できるかどうかを設定します。 Linux では何もしません。

#### `win.isMaximizable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウがユーザーによって手動で最大化できるかどうか。

Linuxでは常に `true` を返します。

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるか、ウインドウを最大化するかを設定します。

#### `win.isFullScreenable()`

戻り値 `Boolean` - ウインドウの最大化/ズームボタンでフルスクリーンモードに切り替えるのか、それともウインドウを最大化するのか。

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

ウインドウがユーザーによって手動で閉じられるかどうかを設定します。 Linux では何もしません。

#### `win.isClosable()` _macOS_ _Windows_

戻り値 `Boolean` - ウインドウをユーザーが手動で閉じられるかどうか。

Linuxでは常に `true` を返します。

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (任意) _macOS_ _Windows_ - 値は、`normal`、`floating`、`torn-off-menu`、`modal-panel`、`main-menu`、`status`、`pop-up-menu`、`screen-saver` と ~~`dock`~~ (非推奨) です。 `flag` が true の場合、省略値は `floating` です。 flag が false の場合、`level` は `normal` にリセットされます。 `floating` から `status` までに含まれているものにおいて、ウィンドウは macOS では Dock の下に、Windows ではタスクバーの下に配置されることをことに注意してください。 `pop-up-menu` 以降は、macOS では Dock の上に、Windows ではタスクバーの上に表示されます。 詳細については、[macOS のドキュメント][window-levels] を参照してください。
* `relativeLevel` Integer (任意) _macOS_ - このウインドウに設定する指定した `level` より上のレイヤーの数。 省略値は、`0` です。 Apple社は、`screen-saver` より上に1以上のレベルを設定することを推奨していないことに注意してください。

ウィンドウを常に他のウィンドウの上に表示するかどうかを設定します。 この設定を行った後でも、ウィンドウはまだ通常のものであり、フォーカスが当てられないツールボックスウィンドウではありません。

#### `win.isAlwaysOnTop()`

戻り値 `Boolean` - ウインドウが常に他のウインドウの上に表示されるかどうか。

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - DesktopCapturerSource の ID の形式のウィンドウ ID。 例えば "window:1869:0" 。

Z オーダーの意味で、ウィンドウをソースウィンドウの上に移動します。 `mediaSourceId` がウィンドウの ID でないか、ウィンドウが存在しない場合、このメソッドはエラーをスローします。

#### `win.moveTop()`

フォーカスに関係なく上 (Z順序) にウィンドウを移動します。

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (任意) _macOS_

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

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. 以下がその例です。

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
* `options` Object (任意)
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
* `options` Object (任意)
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
* `options` Object (任意)
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

The `buttons` is an array of `Button` objects:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (optional) - The text of the button's tooltip.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

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
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. 省略値は `0` です。
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
* `options` Object (任意)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows.
  * `skipTransformProcessType` Boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (任意)
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
