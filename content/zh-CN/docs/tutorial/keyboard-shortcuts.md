# 键盘快捷键

> 配置本地和全局键盘快捷键

## 本地快捷键

您可以使用 [Menu] 模块来配置快捷键，只有在 app 处于焦点状态时才可以触发快捷键。 为此，在创建 [MenuItem](../api/menu-item.md)时必须指定一个 [`accelerator`] 属性。

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

你还可以在操作系统中配置不同的组合键。

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 全局快捷键

当应用程序不处于焦点状态时，你可以使用 [globalShortcut](../api/global-shortcut.md) 模块来检测键盘事件，

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## 在浏览器窗口内的快捷方式

如果你想处理 [BrowserWindow](../api/browser-window.md)中的键盘快捷键，你可以监听渲染进程中 window 对象的 `keyup` 和 `keydown` 事件。

```js
window.addEventListener('keyup', doSomething, true)
```

注意第三个参数 `true`，这意味着监听器总是在其他监听器之前接收按键，所以它们不能对它们调用 `stopPropagation()`。

在调度页面中的`keydown`和`keyup`事件之前，会发出[`before-input-event`](../api/web-contents.md#event-before-input-event)事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。

如果您不想手动进行快捷键解析，可以使用一些库来进行高级的按键检测。例如 [mousetrap](https://github.com/ccampbell/mousetrap).

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