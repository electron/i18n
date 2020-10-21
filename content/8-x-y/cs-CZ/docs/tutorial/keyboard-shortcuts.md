# Klávesové zkratky

> Nastavit místní a globální klávesové zkratky

## Místní zkratky

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = nové menu ()

. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  klikněte: () => { console. og('time to print stuff') }
}))
```

Na základě operačního systému uživatele můžete konfigurovat různé kombinace klíčů.

```js
{
  akcelerátor: proces.platforma === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Globální zkratky

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Zkratky v okně prohlížeče

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Všimněte si třetího parametru `true` , což znamená, že posluchač bude vždy dostávat stisknutí tlačítek před ostatními posluchači, takže nemohou mít `stopPropagation()` na ně volané.

[`před událostí`](../api/web-contents.md#event-before-input-event) událost je emitována před odesláním `klávesnice` a `klíče` událostí na stránce. It can be used to catch and handle custom shortcuts that are not visible in the menu.

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
Mousetrap.bind('up down left right b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
