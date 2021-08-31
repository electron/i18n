# フレームレスウインドウ

> ツールバー、境界やその他のグラフィカルな"枠"のないウインドウを開きます。

フレームレスウインドウは、Webページの一部ではないツールバーのようなウインドウの部品である [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) を持たないウインドウです。 これらは、[`BrowserWindow`](browser-window.md) クラスのオプションです。

## フレームレスウィンドウを作成

フレームレスウインドウを作成するには、[BrowserWindow](browser-window.md) の `options` で `frame` を `false` に設定する必要があります。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### 代替手段

macOS と Windows ではフレームレスウインドウを指定する方法が他にあります。 タイトルバーとウインドウコントロールの両方が無効になる `frame` を `false` に設定する方法の代わりに、タイトルバーを非表示にし、コンテンツをフルウインドウサイズに拡大しつつ、標準のウインドウアクションのためにウインドウコントロール (macOS での "信号ボタン") を保持し続けることもできます。 `titleBarStyle` オプションを指定すると、そのようにすることができます。

#### `hidden`

タイトルバーが隠れ、フルサイズのコンテンツウインドウになります。 macOS では、タイトルバーの左上に標準ウインドウコントロール ("信号機ボタン") が付きます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

### macOSでの他の方法

#### `hiddenInset`

ウインドウの端から信号ボタンが少し埋め込まれた別の見た目でタイトルバーが非表示になります。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

ウインドウの左上にカーソルを合わせたときに表示されるカスタム描画の閉じる、最小化ボタンを使用します。 フルスクリーンボタンは、フレームレスウインドウの制約のために利用できません。Apple の macOS ウインドウマスクと被るからです。 これらのボタンは標準のウインドウツールバーボタンで発生するマウスイベントの問題を防止します。 このオプションは、フレームレスウインドウにのみ適用されます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## ウインドウコントロールオーバーレイ

フレームレスウインドウを macOS の `win.setWindowButtonVisibility(true)` と組み合わせて使用したり、信号機ボタンが見えるように上述の `titleBarStyle` のいずれかを使用したり、Windows の `titleBarStyle: hidden` を使用したりしているとき、`titleBarOverlay` のオプションを true に設定するとウィンドウコントロールオーバーレイ [JavaScript API][overlay-javascript-apis] と [CSS 環境変数][overlay-css-env-vars] にアクセスできます。 `true` を指定すると、オーバーレイはデフォルトのシステムカラーになります。

Windows では、`color` と `symbolColor` のオプションで作った `titleBarOverlay` オブジェクトを設定することで、オーバーレイとそのシンボルの色指定もできます。 以下のようにオプションを指定しない場合、ウインドウコントロールボタンの色はデフォルトでシステムカラーになります。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  titleBarStyle: 'hidden',
  titleBarOverlay: true
})
win.show()
```

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be'
  }
})
win.show()
```

## 透明なウインドウ

`transparent` オプションを `true` に設定することで、フレームレスウインドウを透明にすることもできます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### 制限事項

* 透明な領域越しにクリックすることはできません。 これを解決するためにウインドウ形状を設定するAPIを紹介しようと思います。詳細は、[我々の課題](https://github.com/electron/electron/issues/1335)を参照して下さい。
* 透明なウィンドウは、サイズを変更できません。 `resizable` を `true` に設定すると、いくつかのプラットフォームでは透明なウインドウが機能しなくなることがあります。
* `blur` フィルターはWebページにしか適用されないため、ウインドウの下にあるコンテンツ (すなわち、ユーザーのシステムで開かれた他のアプリケーション) にぼかし効果を適用する方法はありません。
* デベロッパー ツールが開かれているとウインドウは透過しません。
* Windows オペレーティングシステムの場合、
  * DWM が無効だと透過ウインドウが動作しません。
  * Windows システムメニューの利用やタイトルバーのダブルクリックでは、透過ウインドウを最大化できません。 背景にある理由は [このプルリクエスト](https://github.com/electron/electron/pull/28207) に記載してあります。
* Linux では、GPU を無効にして透明なウインドウを作成するための ARGB を許可するため、ユーザーがコマンドラインに `--enable-transparent-visuals --disable-gpu` を指定しなければなりません。これは、Linux における [いくつかの NVidia ドライバーでアルファチャンネルが機能しない](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) という上流のバグによるものです。
* Mac では、ネイティブウインドウの影は透明なウインドウには表示されません。

## クリックスルーウインドウ

クリックスルーウインドウを作成する、すなわち、ウインドウにすべてのマウスイベントを無視させるには、[win.setIgnoreMouseEvents(ignore)][ignore-mouse-events] APIを呼び出して下さい。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### 転送

マウスのメッセージを無視すると、Webページでマウスの移動が検出されなくなり、マウスの移動イベントが発生しません。 Windowsオペレーティングシステムでは、`mouseleave` のようなイベントを発生させられるよう、マウスの移動メッセージをWebページに転送するのに、オプションパラメーターが使用されます。

```javascript
const { ipcRenderer } = require('electron')
const el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
})

// メインプロセス
const { ipcMain } = require('electron')
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})
```

これにより、`el` の上のとき、Webページはクリックスルーになり、その外側では、通常に戻ります。

## ドラッグ可能な領域

既定では、フレームレスウインドウはドラッグできません。 アプリは、どの領域が (OSの標準のタイトルバーのように) ドラッグ可能であるかをElectronに伝えるため、CSSで `-webkit-app-region: drag` を指定することが必要です。また、アプリは、ドラッグ可能な領域からドラッグ不可能な領域を除外するため、`-webkit-app-region: no-drag` を使用することもできます。 現在のところ、長方形の形状しかサポートされていないことに注意して下さい。

注: `-webkit-app-region: drag` は、開発者ツールが開かれている間、問題があることが知られています。 回避策を含む詳細については、この [GitHub Issue](https://github.com/electron/electron/issues/3647) を参照して下さい。

ウインドウ全体をドラッグ可能にするには、`body` のスタイルとして `-webkit-app-region: drag` を追加して下さい。

```html
<body style="-webkit-app-region: drag">
</body>
```

そして、ウインドウ全体をドラッグ可能にした場合、ボタンをドラッグ不可として同時にマークしなければなりません。そうでなければ、ユーザーがボタンをクリックすることができなくなります。

```css
button {
  -webkit-app-region: no-drag;
}
```

カスタムのタイトルバーをドラッグ可能に設定するだけの場合、同時にタイトルバーのすべてのボタンもドラッグ不可にする必要があります。

## テキストの選択

フレームレスウインドウでは、ドラッグの挙動がテキストの選択と競合する可能性があります。 例えば、タイトルバーをドラッグするとき、誤ってタイトルバーのテキストを選択する可能性があります。 これを防止するには、このようにドラッグ可能な領域内のテキスト選択を無効にする必要があります。

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## コンテキストメニュー

いくつかのプラットフォームでは、ドラッグ可能な領域は非クライアントのフレームとして扱われます。そのため、ドラッグ可能な領域を右クリックすると、システムメニューが現れます。 すべてのプラットフォームでコンテキストメニューが正しく動作するようにするには、絶対にカスタムのコンテキストメニューをドラッグ可能な領域で使用しないようにしてください。

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
[overlay-javascript-apis]: https://github. com/WICG/window-controls-overlay/blob/main/explainer.md#javascript-apis
[overlay-css-env-vars]: https://github.com/WICG/window-controls-overlay/blob/main/explainer.md#css-environment-variables
