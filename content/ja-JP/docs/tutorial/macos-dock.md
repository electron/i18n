# macOS ドック

## 概要

Electron にはmacOSドック中のアプリアイコンを設定するための API があります。 カスタム Dock メニューを作成するための macOS 専用 API は存在しますが、Electron は [最近使った書類][recent-documents] や [アプリケーションのプログレス][progress-bar] などのクロスプラットフォーム機能のエントリポイントにアプリの Dock アイコンを使用します。

カスタムdockは一般的に、ユーザーが全てのアプリウィンドウを表示するのではなく、タスクのショートカットを追加するために使用されます。

__ターミナルアプリのDockメニュー__

![Dockメニュー][3]

カスタム Dock メニューを設定するには、macOS でのみ利用可能な [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API を使用する必要があります。

## サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {
    label: '新規ウインドウ',
    click () { console.log('New Window') }
  }, {
    label: '設定から新規ウインドウ',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: '新規コマンド...' }
])

app.whenReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 先ほど定義したカスタムメニューが表示されます。

![macOS Dock メニュー](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
