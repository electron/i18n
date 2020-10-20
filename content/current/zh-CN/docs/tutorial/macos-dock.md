# macOS Dock

## 概览

Electron有API来配置macOS Dock中的应用程序图标。 A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

一个自定义的Dock项也普遍用于为那些用户不愿意为之打开整个应用窗口的任务添加快捷方式。

__Terminal.app 的 Dock 菜单:__

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you need to use the [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, which is only available on macOS.

## 示例

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
