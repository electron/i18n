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

また、ウインドウ全体をドラッグ可能にした場合は、ボタンをドラッグ不可能としてマークする必要があります。そうしないと、ユーザがボタンをクリックできなくなります。

```css
button {
  -webkit-app-region: no-drag;
}
```

カスタムタイトルバーをドラッグ可能に設定する場合は、タイトルバーのすべてのボタンをドラッグできないようにする必要があります。

## テキスト選択

フレームレスウィンドウのドラッグの挙動はテキストの選択と競合します。 たとえば、タイトルバーをドラッグすると、誤ってタイトルバーのテキストを選択することがあります。 これを防ぐには、このようなドラッグ可能な領域内でのテキスト選択を無効にする必要があります。

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## コンテキストメニュー

一部のプラットフォームでは、ドラッグ可能領域は非クライアントフレームとして扱われるため、右クリックするとシステムメニューがポップアップします。 コンテキストメニューがすべてのプラットフォームで正しく動作するようにするには、ドラッグ可能な領域でカスタムコンテキストメニューを使用しないようにしてください。