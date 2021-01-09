# macOS Dock

## 概览

Electron有API来配置macOS Dock中的应用程序图标。 一个 macOS-only API 用于创建一个自定义的Dock 菜单， 但Electron也使用应用Dock 图标作为跨平台功能的入口，如 [最近的文档](./recent-documents.md) 和 [应用程序进度](./progress-bar.md)。

一个自定义的Dock项也普遍用于为那些用户不愿意为之打开整个应用窗口的任务添加快捷方式。

__Terminal.app 的 Dock 菜单:__

![基座菜单](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

要设置您的自定义 dock 菜单，您需要使用 [`app.dock.setmenu`](../api/dock.md#docksetmenumenu-macos) API，它仅在 macOS 上可用。

## 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
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

启动 Electron 应用程序后，右键点击应用程序图标。 您应该可以看到您刚刚设置的自定义菜单：

![macOS dock 菜单](../images/macos-dock-menu.png)
