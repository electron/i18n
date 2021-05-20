# macOS Dock の設定

Electron には macOS Dock 内のアプリアイコンを設定する API があります。 カスタム Dock メニューを作成するための macOS 専用 API は存在しますが、Electron は [最近使った書類][recent-documents] や [アプリケーションのプログレス][progress-bar] などのクロスプラットフォーム機能のエントリポイントにアプリの Dock アイコンを使用します。

カスタム Dock は、ユーザーが全てのアプリウインドウを開きたくないであろう作業のショートカット追加によく使われます。

__ターミナルアプリのDockメニュー__

![Dockメニュー][3]

カスタム Dock メニューを設定するには、macOS でのみ利用可能な [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API を使用する必要があります。

## サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, BrowserWindow, Menu } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }
}).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

```

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 先ほど定義したカスタムメニューが表示されます。

![macOS Dock メニュー](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
