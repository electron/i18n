# 鍵盤快速鍵

> 設定局域及全域鍵盤快速鍵

## 局域快速鍵

You can use the [Menu](../api/menu.md) module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`] property when creating a [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: '列印',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('是時候印點東西了') }
}))
```

It's easy to configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 全域快速鍵

You can use the [globalShortcut](../api/global-shortcut.md) module to detect keyboard events even when the application does not have keyboard focus.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('按了 CommandOrControl+X')
  })
})
```

## BrowserWindow 內的快速鍵

If you want to handle keyboard shortcuts for a [BrowserWindow](../api/browser-window.md), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

The [`before-input-event`](web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('顥示快速鍵!') })
Mousetrap.bind('esc', () => { console.log('離開') }, 'keyup')

// 組合鍵
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 將不同的組合鍵對應到同一個 callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // 回傳 false 防止預設行為被觸發，並避免事件向外傳遞
  return false
})

// gmail 風格的按鍵組合
Mousetrap.bind('g i', () => { console.log('回收件匣') })
Mousetrap.bind('* a', () => { console.log('全選') })

// konami 秘技!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami 秘技')
})
```