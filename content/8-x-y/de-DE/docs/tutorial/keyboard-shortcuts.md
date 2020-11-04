# Tastenkürzel

> Lokale und globale Tastaturkürzel konfigurieren

## Lokale Verknüpfungen

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

Menü. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console. og('Zeit zum Ausdrucken') }
}))
```

Sie können verschiedene Tastenkombinationen basierend auf dem Betriebssystem des Benutzers konfigurieren.

```js
{
  Beschleuniger: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Strg+Umschalt+I'
}
```

## Globale Verknüpfungen

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Verknüpfungen innerhalb eines Browserfensters

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Beachten Sie den dritten Parameter `true` was bedeutet, dass der Listener immer Tastendrucke vor anderen Zuhörern erhält, so dass er nicht `stopPropagation()` aufgerufen hat.

Das [`vor dem Input-Event`](../api/web-contents.md#event-before-input-event) Ereignis wird vor dem Versenden von `Tastendruck` und `Tastendruck` Ereignisse auf der Seite abgesendet. Es kann verwendet werden, um benutzerdefinierte Verknüpfungen zu fangen und zu verwalten, die im Menü nicht sichtbar sind.

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
Mousetrap.bind('oben links unten rechts rechts ein enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
