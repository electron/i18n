# 键盘快捷键

## 概览

该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键。

## 示例

### 本地快捷键

应用键盘快捷键仅在应用程序被聚焦时触发。 To configure a local keyboard shortcut, you need to specify an [`accelerator`][] property when creating a [MenuItem][] within the [Menu][] module.

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

To configure a global keyboard shortcut, you need to use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

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

If you want to handle keyboard shortcuts within a [BrowserWindow][], you can listen for the `keyup` and `keydown` [DOM events][dom-events] inside the renderer process using the [addEventListener() API][addEventListener-api].

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

If you don't want to do manual shortcut parsing, there are libraries that do advanced key detection, such as [mousetrap][]. 以下是在渲染进程中 `mousetrap` 的使用示例：

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
