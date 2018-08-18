# MacOS Dock

Electron にはmacOSドック中のアプリアイコンを設定するための API があります。 カスタムdockメニューを作成するためのmacOSのみのAPIが存在しますが、Electronは、[最近使ったドキュメント](./recent-documents.md)や[アプリケーション プログレス](./progress-bar.md)のようなクロスプラットフォーム機能を実装したアプリのdockアイコンも使用できます。

カスタムdockは一般的に、ユーザーが全てのアプリウィンドウを表示するのではなく、タスクのショートカットを追加するために使用されます。

**ターミナルアプリのDockメニュー**

![Dockメニュー](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

カスタムDockメニューをセットするためにmacOSのみに提供されている`app.dock.setMenu` APIを使用できます。

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

app.dock.setMenu(dockMenu)
```