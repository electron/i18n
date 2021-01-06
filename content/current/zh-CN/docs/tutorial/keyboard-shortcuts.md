# 键盘快捷键

## 概览

该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键。

## 示例

### 本地快捷键

应用键盘快捷键仅在应用程序被聚焦时触发。 To configure a local keyboard shortcut, you need to specify an [`accelerator`] property when creating a [MenuItem](../api/menu-item.md) within the [Menu](../api/menu.md) module.

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> 注意：在上面的代码中，您可以看到基于用户的操作系统的 accelerator  差异。 对于MacOS，是 `Alt+Cmd+I`，而对于Linux 和 Windows，则是 `Alt+Shift+I`.

启动 Electron 应用程序后，你应该看到应用程序菜单以及您刚刚定义的本地快捷方式：

![Menu with a local shortcut](../images/local-shortcut.png)

If you click `Help` or press the defined accelerator and then open the terminal that you ran your Electron application from, you will see the message that was generated after triggering the `click` event: "Electron rocks!".

### 全局快捷键

要配置全局键盘快捷键， 您需要使用 [globalShortcon](../api/global-shortcut.md) 模块来检测键盘事件，即使应用程序没有获得键盘焦点。

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

> NOTE: In the code above, the `CommandOrControl` combination uses `Command` on macOS and `Control` on Windows/Linux.

After launching the Electron application, if you press the defined key combination then open the terminal that you ran your Electron application from, you will see that Electron loves global shortcuts!

### 在浏览器窗口内的快捷方式

#### 使用 web APIs

如果您想要在 [BrowserWindow](../api/browser-window.md) 中处理键盘快捷键，你可以在渲染进程中使用 [addEventListener() API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)来监听 `kepup` 和 `keydown` [DOM事件](https://developer.mozilla.org/en-US/docs/Web/Events)。

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` indicates that the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

#### 拦截主进程中的事件

在调度页面中的`keydown`和`keyup`事件之前，会发出[`before-input-event`](../api/web-contents.md#event-before-input-event)事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。

##### 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

After launching the Electron application, if you open the terminal that you ran your Electron application from and press `Ctrl+I` key combination, you will see that this key combination was successfully intercepted.

#### 使用第三方库

如果您不想手动进行快捷键解析，可以使用一些库来进行高级的按键检测。例如 [mousetrap](https://github.com/ccampbell/mousetrap). 以下是在渲染进程中 `mousetrap` 的使用示例：

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// 组合
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 将多个组合映射到相同的回调
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // 返回 false 以防止默认行为，并阻止事件冒泡
  return false
})

//  gmail 风格序列
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami 代码
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```
