# macOS ドック

Electron にはmacOSドック中のアプリアイコンを設定するための API があります。 カスタムdockメニューを作成するためのmacOSのみのAPIが存在しますが、Electronは、[最近使ったドキュメント][recent-documents]や[アプリケーション プログレス][progress-bar]のようなクロスプラットフォーム機能を実装したアプリのdockアイコンも使用できます。

カスタムdockは一般的に、ユーザーが全てのアプリウィンドウを表示するのではなく、タスクのショートカットを追加するために使用されます。

__ターミナルアプリのDockメニュー__

![Dockメニュー][3]

カスタムDockメニューをセットするためにmacOSのみに提供されている`app.dock.setMenu` APIを使用できます。

```javascript
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

app.dock.setMenu(dockMenu)
```

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
