# キーボード ショート カット

> ローカルおよびグローバルなキーボードショートカットを設定します。

## ローカルショートカット

You can use the [Menu](../api/menu.md) module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`] property when creating a [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

It's easy to configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## グローバル ショートカット

アプリケーションからキーボードのフォーカスが外れている場合でも、 [globalShortcut](../api/global-shortcut.md) モジュールを使用すればキーボード操作を検出できます。

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## BrowserWindow 内のショートカット

If you want to handle keyboard shortcuts for a [BrowserWindow](../api/browser-window.md), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// コンビネーション（複数キーの組み合わせ）
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 複数のコンビネーションを1つのコールバックに割り当てる
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// Gmailスタイルのシーケンス
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// コナミコマンド
 
Context | Request Context

Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
 
Context | Request Context

```