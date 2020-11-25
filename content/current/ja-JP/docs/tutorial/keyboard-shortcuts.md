# キーボードショートカット

## 概要

この機能により、Electron アプリケーションのローカルとグローバルのキーボードショートカットを設定できます。

## サンプル

### ローカルショートカット

ローカルキーボードショートカットは、アプリケーションにフォーカスしているときのみトリガーされます。 ローカルキーボードショートカットを設定するには、[`accelerator`] プロパティを指定する必要があります。[Menu](../api/menu-item.md) モジュールで [MenuItem](../api/menu.md) を作成する際にこのプロパティを指定します。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```js
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

グローバルキーボードショートカットを設定するには、[globalShortcut](../api/global-shortcut.md) モジュールを使用して、アプリケーションにキーボードフォーカスがない場合のキーボードイベントを検出する必要があります。

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

> 注意: 上記コードの `CommandOrControl` の組み合わせは、macOS では `Command` を、Windows/Linux では `Control` を使用します。

Electron アプリケーションを起動した後、定義されたキーの組み合わせを押して、Electron アプリケーションを起動したターミナルを開くと、Electron はグローバルショートカット大好きだとわかりますね!

### BrowserWindow 内のショートカット

#### ウェブ API を使用する

[BrowserWindow](../api/browser-window.md) 内でキーボードショートカットを扱いたい場合は、[addEventListener() API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) を使用して `keyup` と `keydown` の [DOM イベント](https://developer.mozilla.org/en-US/docs/Web/Events) をレンダラープロセス内でリッスンすることでできます。

```js
window.addEventListener('keyup', doSomething, true)
```

第 3 引数の `true` に注意してください。これにより、このリスナーが他のリスナーより常に先にキー押下を受け取ります。そのため、ここで `stopPropagation()` を呼び出さないでください。

#### メインプロセス内でのイベントの受け取り

[`before-input-event`](../api/web-contents.md#event-before-input-event) イベントは `keydown` イベントと `keyup` イベントをディスパッチするより前に発生します。 メニューに表示されないカスタムショートカットをキャッチして処理するため使用することができます。

##### サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```js
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })

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

ショートカットの解析を手動で行いたくない場合は、[mousetrap](https://github.com/ccampbell/mousetrap) のような高度なキー検出を行うライブラリがあります。 レンダラープロセスで `mousetrap` を実行する使用例を以下に示します。

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('ショートカット一覧!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// 組み合わせ
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 複数の組み合わせを 1 つのコールバックに割り当てる
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // false を返すと、デフォルトの動作を妨げイベントのバブリングを中止します
  return false
})

// Gmail スタイルのシーケンス
Mousetrap.bind('g i', () => { console.log('受信箱へ') })
Mousetrap.bind('* a', () => { console.log('全選択') })

// コナミコマンド!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('コナミコマンド')
})
```
