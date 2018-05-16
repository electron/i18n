# フレームレスウインドウ

> ツールバー、境界やその他のグラフィカルな"枠"のないウインドウを開きます。

フレームレスウインドウは、Webページの一部ではないツールバーのようなウインドウの部品である [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) を持たないウインドウです。 これらは、[`BrowserWindow`](browser-window.md) クラスのオプションです。

## フレームレスウィンドウを作成

フレームレスウインドウを作成するには、[BrowserWindow](browser-window.md) の `options` で `frame` を `false` に設定する必要があります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### macOSでの他の方法

macOS 10.9 Mavericks以降では、枠のないウインドウを指定する他の方法があります。 タイトルバーとウインドウコントロールの両方が無効になる `frame` を `false` に設定する方法の代わりに、タイトルバーを非表示にし、コンテンツをフルウインドウサイズに拡大しつつ、標準のウインドウアクションのためにウインドウコントロール ("信号") を保持し続けることもできます。 `titleBarStyle` オプションを指定すると、そのようにすることができます。

#### `hidden`

タイトルバーが非表示かつフルサイズのコンテンツウインドウになりますが、タイトルバーには、まだ標準のウインドウコントロール ("信号") が左上にあります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

ウインドウの端から信号ボタンが少し埋め込まれた別の見た目でタイトルバーが非表示になります。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

ウインドウの左上にカーソルを合わせたときに表示されるカスタム描画の閉じる、最小化、フルスクリーンボタンを使用します。 これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 このオプションは、フレームレスウインドウにのみ適用されます。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## 透明なウインドウ

`transparent` オプションを `true` に設定することで、フレームレスウインドウを透明にすることもできます。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### 制限事項

* 透明な領域越しにクリックすることはできません。 これを解決するためにウインドウ形状を設定するAPIを紹介しようと思います。詳細は、[我々の課題](https://github.com/electron/electron/issues/1335)を参照して下さい。
* 透明なウインドウのサイズを変更することはできません。`resizable` を `true` に設定すると、いくつかのプラットフォームでは透明なウインドウが機能しなくなることがあります。
* `blur` フィルターはWebページにしか適用されないため、ウインドウの下にあるコンテンツ (すなわち、ユーザーのシステムで開かれた他のアプリケーション) にぼかし効果を適用する方法はありません。
* Windowsオペレーティングシステムでは、DWMが無効なとき、透明なウインドウは機能しません。
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## クリックスルーウインドウ

クリックスルーウインドウを作成する、すなわち、ウインドウにすべてのマウスイベントを無視させるには、[win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) APIを呼び出して下さい。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Forwarding

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

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

This makes the web page click-through when over `el`, and returns to normal outside it.

## ドラッグ可能な領域

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

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

## テキストの選択

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## コンテキストメニュー

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.