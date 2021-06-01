# 键盘快捷键

## 概览

该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键。

## 示例

### 本地快捷键

应用键盘快捷键仅在应用程序被聚焦时触发。 为了配置本地快捷键，你需要在创建[Menu][]模块中的[MenuItem][]时指定`accelerator<0>属性。</p>

<p spaces-before="0">从 <a href="quick-start.md">Quick Start Guide</a> 中的应用开始，将以下内容更新到 <code>main.js`。</p> 



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? "Alt+Cmd+I"："Alt+Shift+I"，
    单击：（）=> {控制台.log（"电子岩石！"） }
  }]
}))

Menu.setApplicationMenu(menu)
```




> 注意：在上面的代码中，您可以看到基于用户的操作系统的 accelerator  差异。 对于MacOS，是 `Alt+Cmd+I`，而对于Linux 和 Windows，则是 `Alt+Shift+I`.

启动 Electron 应用程序后，你应该看到应用程序菜单以及您刚刚定义的本地快捷方式：

![Menu with a local shortcut](../images/local-shortcut.png)

If you click `Help` or press the defined accelerator and then open the terminal that you ran your Electron application from, you will see the message that was generated after triggering the `click` event: "Electron rocks!".



### 全局快捷键

要配置全局键盘快捷键， 您需要使用 [globalShortcon][] 模块来检测键盘事件，即使应用程序没有获得键盘焦点。

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

如果您想要在 [BrowserWindow][] 中处理键盘快捷键，你可以在渲染进程中使用 [addEventListener() API][addEventListener-api]来监听 `kepup` 和 `keydown` [DOM事件][dom-events]。



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/web-apis|focus=renderer.js'
function handleKeyPress(event) {
  // 你可以把处理按键按下事件的代码放在这里。
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`你按下了 ${event.key}`);
}

window.addEventListener('keyup', handleKeyPress, true);
```




> 注意：第三个参数 `true` 表明了当前监听器会持续在其它监听器之前接收按键按下事件，因此无法在其它监听器中调用 `stopPropagation()`。



#### 拦截主进程中的事件

在调度页面中的`keydown`和`keyup`事件之前，会发出[`before-input-event`](../api/web-contents.md#event-before-input-event)事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```


在运行Electron应用程序之后，如果你打开你运行Electron应用的终端并按下 `Ctrl+I` 组合键，你会发现刚才按下的组合键被成功拦截了。



#### 使用第三方库

如果您不想手动进行快捷键解析，可以使用一些库来进行高级的按键检测。例如 [mousetrap][]. 以下是在渲染进程中 `mousetrap` 的使用示例：



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
[globalShortcon]: ../api/global-shortcut.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
