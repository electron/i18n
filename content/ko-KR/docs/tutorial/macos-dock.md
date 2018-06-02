# MacOS Dock

Electron에는 macOS Dock에 앱의 아이콘을 구성하는 API가 있습니다. A macOS-only API exists to create a [a custom dock menu](#custom-dock-menu-mac-os), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Terminal.app의 dock menu:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

커스텀 dock menu를 설정하려면 `app.dock.setMenu` API를 사용하면 됩니다. macOS에서만 사용 가능합니다:

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