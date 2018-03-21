# フレームレスウィンドウ

> ツールバー、ボーダー、その他 "Chrome" なグラフィックのないウインドウを開きます。

フレームレスウインドウは、ツールバーのような、ウェブページの部品ではない、[Chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) のウインドウの部品を持たないウインドウです。 これらは、[`BrowserWindow`](browser-window.md) クラスのオプションです。

## フレームレスウィンドウを作成

フレームレスウインドウを作るには、[BrowserWindow](browser-window.md) の `options` 内で `frame` を `false` にする必要があります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### MacOSの代替

macOS 10.9 Mavericks 以降では、クロムレスウィンドウを指定する別の方法があります。 タイトルバーとウィンドウコントロールの両方を無効にする `frame` を `false` に設定するのではなく、タイトルバーを非表示にしてコンテンツを完全なウィンドウサイズに拡張します。標準ウインドウアクションのために、ウインドウコントロール ("赤黄青の信号ボタン") は保持されます。 `titleBarStyle` オプションを指定することでそうできます。

#### `hidden`

タイトルバーが隠され、フルサイズのコンテンツウィンドウが表示されますが、タイトルバーには左上に標準のウィンドウコントロール ("信号ボタン") があります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

タイトルバーが隠され、信号ボタンがウィンドウの端からわずかに内側にあります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

ウインドウの左上にカーソルを置いたときに表示される、カスタム描画された、閉じる、最小化、フルスクリーンのボタンを使用します。 これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 このオプションは、フレームレスウィンドウにのみ適用されます。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## 透明ウインドウ

`transparent` オプションを `true` に設定することで、フレームレスウインドウを透明にすることもできます。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### 制限事項

* 透過された領域越しにクリックすることはできません。 これを解決するためにウィンドウシェイプを設定するための API を紹介します。詳しくは [このissue](https://github.com/electron/electron/issues/1335) を参照して下さい。
* 透明ウインドウはリサイズできません。`resizable` を `true` に設定すると、一部のプラットフォームで透明なウィンドウが動作しなくなることがあります。
* `blur` フィルタはウェブページにのみ適用されるため、ウインドウの下のコンテンツ (つまり、ユーザのシステム上に開いている他のアプリケーション) にぼかし効果を適用する方法はありません。
* Windows オペレーティングシステムでは、DWMが無効の場合、透過ウインドウは機能しません。
* Linux ユーザは、コマンドラインに `--enable-transparent-visuals --disable-gpu` を入れて GPU を無効にし、ARGB が透過ウィンドウを作成できるようにする必要があります。[アルファチャンネルは Linux の一部の NVidia ドライバでは動作しません](https://code.google.com/p/chromium/issues/detail?id=369209)。
* Macでは、ネイティブウインドウの影は透明なウインドウに表示されません。

## クリックスルーウィンドウ

クリックスルーウィンドウを作成する、つまりウインドウですべてのマウスイベントを無視するには、[win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API を呼び出します。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### 転送

マウスのメッセージを無視すると、ウェブページにマウスの動きが気付かれず、マウスの動きのイベントは発行されません。 Windows オペレーティングシステムでは、オプションのパラメータを使用してマウス移動メッセージをウェブページに転送し、`mouseleave` などのイベントを発行することができます。

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

`el` 内ではウェブページをクリックスルーし、その外では通常の状態に戻ります。

## ドラッグ可能地域

デフォルトでは、フレームレスウインドウはドラッグ不可能です。 アプリでは、どこがドラッグ可能領域であるか (OS標準のタイトルバーなど) を伝えるために、CSSで `-webkit-app-region: drag` を指定する必要があります。また、アプリは `-webkit-app-region: no-drag` を付加して、ドラッグ不可能領域をドラッグ可能領域から除外できます。 現在では長方形の概形のみがサポートされていることに注意してください。

注釈: `-webkit-app-region: drag` は開発者向けツールを開いている間、問題があることが知られています。 回避策を含む詳細については、この [GitHub issue](https://github.com/electron/electron/issues/3647) を参照してください。

ウインドウ全体をドラッグ可能にするために、`body` のスタイルとして `-webkit-app-region: drag` を追加できます。

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## テキスト選択

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## コンテキストメニュー

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.