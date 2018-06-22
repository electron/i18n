# MacOS Dock

Electron有API来配置macOS Dock中的应用程序图标。 A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Terminal.app 的 Dock 菜单:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

若要设置自定义的dock菜单, 可以使用 ` app.dock.setMenu ` API, 它仅在 macOS 上可用:

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