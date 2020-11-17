# Scorciatoie da tastiera

> Configura i tasti scorciatoia locali e globali

## Scorciatoie Locali

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

È possibile configurare diverse combinazioni di tasti in base al sistema operativo dell'utente.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Maiusc+I'
}
```

## Scorciatoie Globali

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Scorciatoie all'interno di una Finestra di navigazione

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Nota il terzo parametro `true` che significa che l'ascoltatore riceverà sempre le pressioni dei tasti prima di altri ascoltatori in modo che non possano avere `stopPropagation()` chiamato su di loro.

L'evento [`before-input-event`](../api/web-contents.md#event-before-input-event) viene emesso prima di spedire `keydown` e `keyup` eventi nella pagina. Può essere usato per catturare e gestire scorciatoie personalizzate che non sono visibili nel menu.

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
