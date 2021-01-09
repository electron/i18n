# Scurtături tastatură

> Configurați scurtăturile locale și globale ale tastaturii

## Scurtături locale

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
meniul de const = meniu nou()

ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { consolă. og ('timp pentru tipărire') }
}))
```

Puteți configura diferite combinații de chei pe baza sistemului de operare al utilizatorului.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Comenzi rapide globale

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Scurtături în fereastra Browser-ului

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doceva, adevărat)
```

Țineți cont de al treilea parametru `adevarat` ceea ce înseamnă că ascultătorul va primi întotdeauna apăsări cheie înaintea altor ascultători astfel încât aceștia nu pot avea `stopPropagation()` apelat pe ei.

Evenimentul [`before-input-event`](../api/web-contents.md#event-before-input-event) este emis înainte de dispatching `keydown` and `keyup` events in the page. Poate fi folosit pentru a prinde și gestiona scurtături personalizate care nu sunt vizibile în meniu.

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
Mousetrap.bind('în sus în jos, la stânga stânga stânga stânga b o enter', () => {
  console.log('cod konami')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
