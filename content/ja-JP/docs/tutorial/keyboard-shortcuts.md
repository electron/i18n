# キーボードショートカット

## 概要

この機能により、Electron アプリケーションのローカルとグローバルのキーボードショートカットを設定できます。

## サンプル

### ローカルショートカット

ローカルキーボードショートカットは、アプリケーションにフォーカスしているときのみトリガーされます。 ローカルキーボードショートカットを設定するには、[Menu][] モジュール内の [MenuItem][] 作成時に [`accelerator`][] プロパティを指定する必要があります。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> 注意: 上記のコードでは、ユーザーのオペレーティングシステムによってアクセラレーターを変えていることがわかります。 macOS では `Alt+Cmd+I` で、Linux と Windows では`Alt+Shift+I` です。

Electron アプリケーションを起動すると、アプリケーションメニューが先ほど定義したローカルショートカットとともに表示されます。

![ローカルショートカット付きのメニュー](../images/local-shortcut.png)

`ヘルプ` をクリックする又は定義したアクセラレータを押してから、Electron アプリケーションを実行したターミナルを開くと、`click` イベントがトリガーされたことで生成されたメッセージ "Electron rocks!" が表示されます。

### グローバルショートカット

グローバルキーボードショートカットを設定するには、[globalShortcut][] モジュールを使用して、アプリケーションにキーボードフォーカスがない場合のキーボードイベントを検出する必要があります。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
})その後(ウィンドウを作成)
```

> 注意: 上記コードの `CommandOrControl` の組み合わせは、macOS では `Command` を、Windows/Linux では `Control` を使用します。

Electron アプリケーションを起動した後、定義されたキーの組み合わせを押して、Electron アプリケーションを起動したターミナルを開くと、Electron はグローバルショートカット大好きだとわかりますね!

### BrowserWindow 内のショートカット

#### ウェブ API を使用する

[BrowserWindow][] 内でキーボードショートカットを扱いたい場合は、[addEventListener() API][addEventListener-api] を使用して `keyup` と `keydown` の [DOM イベント][dom-events] をレンダラープロセス内でリッスンすることでできます。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/web-apis|focus=renderer.js'
function handleKeyPress(event) {
  // キー押下のハンドリングはここにコードを書くとできます。
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`You pressed ${event.key}`);
}

window.addEventListener('keyup', handleKeyPress, true);
```

> 注意: 第 3 引数の `true` は、このリスナーが他のリスナーよりも必ず優先してキー押下を受け取ることを示しています。そのため、このリスナー内で `stopPropagation()` を呼び出さないでください。

#### メインプロセス内でのイベントの受け取り

[`before-input-event`](../api/web-contents.md#event-before-input-event) イベントは `keydown` イベントと `keyup` イベントをディスパッチするより前に発生します。 メニューに表示されないカスタムショートカットをキャッチして処理するため使用することができます。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

Electron アプリケーションを起動した後、Electron アプリケーションを実行したターミナルを開き、`Ctrl+I` キーの組み合わせを押すと、このキーの組み合わせが正常に受け取られたとわかります。

#### サードパーティライブラリを使用する

ショートカットの解析を手動で行いたくない場合は、[mousetrap][] のような高度なキー検出を行うライブラリがあります。 レンダラープロセスで `mousetrap` を実行する使用例を以下に示します。

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// 組み合わせ
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 複数の組み合わせを同じコールバックに割り当て
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // false を返すと規定の動作を抑制してイベントの伝播を止める
  return false
})

// Gmail 式シーケンス
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// コナミコマンド!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('コナミコマンド')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
