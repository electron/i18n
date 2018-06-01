# MacOS Dock

Electron にはmacOSドック中のアプリアイコンを設定するための API があります。 MacOS-でのみ API作成[カスタムDockメニュー](#custom-dock-menu-mac-os)、Electronはアプリを使用中ドックアイコンをクロスプラットフォームで機能を実装するには[最近使用したドキュメント](./recent-documents.md)と[アプリケーションの進行状況](./progress-bar.md)。

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Dock menu of Terminal.app:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you can use the `app.dock.setMenu` API, which is only available on macOS:

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