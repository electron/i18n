# Гарячі Клавіші

> Налаштувати локальні і глобальні клавіші швидкого запуску

## Локальні ярлики

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const меню = new Menu()

меню. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { консоль. og('time to print stuff') }
}))
```

Ви можете налаштувати різні комбінації клавіш на основі операційної системи користувача.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'

```

## Глобальні комбінації клавіш

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Ярлики в вікні браузера

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Зверніть увагу на третій параметр `true` , це означає, що слухач завжди отримуватиме натискання клавіш перед іншими слухачами, щоб вони не могли мати `stopPropagation()` викликані на них.

The [`before-input-event`](../api/web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. Можна використовувати , щоб зловити і обробити користувацькі ярлики, які не відображаються в меню.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap][].

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
Mousetrap.bind('вгору вниз праворуч ліворуч ліворуч b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
