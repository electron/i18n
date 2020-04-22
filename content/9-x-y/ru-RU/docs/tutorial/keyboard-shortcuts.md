# Горячие клавиши

> Конфигурирование локальных и глобальных горячих клавиш

## Локальные горячие клавиши

Вы можете использовать модуль [Menu](../api/menu.md) для настройки горячих клавиш, которые срабатывают только когда приложение активно. Чтобы это сделать, укажите свойство [`accelerator`] при создании [MenuItem](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

Вы можете настраивать различные комбинации клавиш, которые позволяет операционная система пользователя.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Глобальные сочетания клавиш

Вы можете использовать модуль [globalShortcut](../api/global-shortcut.md) для обнаружения событий клавиатуры, даже если приложение не имеет клавиатурного фокуса.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Горячие клавиши в BrowserWindow

Если вы хотите обрабатывать сочетания клавиш для [BrowserWindow](../api/browser-window.md), вы можете использовать прослушиватели событий `keyup` и `keydown` в объекте window внутри процесса визуализации.

```js
window.addEventListener('keyup', doSomething, true)
```

Обратите внимание на третий параметр `true`, который означает, что слушатель всегда будет получать нажатия клавиш перед другими слушателями, чтобы они не могли вызвать `stopPropagation ()`.

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
