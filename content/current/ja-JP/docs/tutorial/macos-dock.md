# macOS ドック

## 概要

Electron にはmacOSドック中のアプリアイコンを設定するための API があります。 カスタム Dock メニューを作成するために macOSのみ API が存在します。 Electron はまた、 [最近のドキュメント](./recent-documents.md) や [アプリケーションの進行状況](./progress-bar.md) のようなクロスプラットフォーム機能のエントリポイントとしてアプリドックアイコンを使用します。

カスタムdockは一般的に、ユーザーが全てのアプリウィンドウを表示するのではなく、タスクのショートカットを追加するために使用されます。

__ターミナルアプリのDockメニュー__

![Dockメニュー](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

カスタムドックメニューを設定するには、macOS でのみ使用可能な [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API、 を使用する必要があります。

## サンプル

[クイックスタートガイド](quick-start.md)から動作するアプリケーションから始めて、 `main.js` ファイルを 次の行で更新します。

```javascript
const { app, Menu } = require('electron')

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
  app.dock.setMenu(dockMenu)
})
```

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 先ほど定義したカスタムメニューが表示されます。

![macOS ドックメニュー](../images/macos-dock-menu.png)
