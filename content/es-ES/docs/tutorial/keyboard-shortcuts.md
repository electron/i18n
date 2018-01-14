# Atajos del teclado

> Configure atajos de teclado locales y globales

## Accesos directos locales

Puede usar el módulo [Menu](../api/menu.md) para configurar los accesos directos del teclado que serán disparados solo cuando la aplicación esté en foco. Para hacer eso, especifique un [`acelerador`] apropiadamente cuando cree un [Elemento del menú](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

Es fácil configurar diferentes combinaciones de teclas basadas en el sistema operativo del usuario.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Accesos directos globales

Puede usar el módulo [Acceso directo global](../api/global-shortcut.md) para detectar los eventos del teclado aún cuando la aplicación no tiene el foco de este.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Accesos directos en una ventana de buscador

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