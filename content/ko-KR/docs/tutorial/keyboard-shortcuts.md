# 키보드 단축키

> 로컬 및 전역 키보드 단축키 설정

## 로컬 단축키

앱이 포커스 되어 있을 때만 사용될 키보드 단축키를 설정하려면 당신은 [Menu](../api/menu.md) 모듈을 사용해야 합니다. 그리고 [MenuItem](../api/menu-item.md)이 만들어질 때 [`accelerator`] 프로퍼티를 반드시 써야 합니다.

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

유저의 운영체제를 기반으로 하는 다른 키 조합을 설정하는 것은 쉽습니다.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 전역 단축키

You can use the [globalShortcut](../api/global-shortcut.md) module to detect keyboard events even when the application does not have keyboard focus.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Shortcuts within a BrowserWindow

If you want to handle keyboard shortcuts for a [BrowserWindow](../api/browser-window.md), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

The [`before-input-event`](../api/web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

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