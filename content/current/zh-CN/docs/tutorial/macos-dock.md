# macOS Dock

Electron有API来配置macOS Dock中的应用程序图标。 可以使用API用来创建一个自定义的Dock菜单项，这个API是macOS独占的，但是Electron也会默认使用应用的Dock图标来实现一些可以跨平台的功能，例如[最近文件](./recent-documents.md)和[应用程序进度](./progress-bar.md)

一个自定义的Dock项也普遍用于为那些用户不愿意为之打开整个应用窗口的任务添加快捷方式。

__Terminal.app 的 Dock 菜单:__

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
