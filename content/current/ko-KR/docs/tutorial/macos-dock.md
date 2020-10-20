# macOS Dock

## 개요

Electron에는 macOS Dock에 앱의 아이콘을 구성하는 API가 있습니다. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

커스텀 독은 일반적으로 사용자가 전체 애플리케이션 윈도우를 열지 않으려는 작업에 바로 가기를 추가하는 데 사용됩니다.

__Terminal.app의 dock menu:__

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you need to use the [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, which is only available on macOS.

## Example

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

After launching the Electron application, right click the application icon. You should see the custom menu you just defined:

![macOS dock menu](../images/macos-dock-menu.png)
