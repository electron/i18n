# Toetsencombinaties

> Lokale en globale sneltoetsen instellen

## Lokale snelkoppelingen

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = nieuw Menu()

menu. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console. og('tijd om spullen af te drukken') }
}))
```

U kunt verschillende sleutelcombinaties configureren op basis van het besturingssysteem van de gebruiker.

```js
{
  versneller: process.platform === 'donker' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Globale Snelkoppelingen

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X wordt ingedrukt')
  })
})
```

## Snelkoppelingen binnen een browservenster

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Merk op de derde parameter `waar` wat betekent dat de luisteraar altijd toetsdruk krijgt voordat andere luisteraars worden ingedrukt, zodat ze geen `stopPropagation()` op hen kunnen aanroepen.

De [`voor input-event`](../api/web-contents.md#event-before-input-event) event wordt uitgezonden voor het verzenden van `keydown` en `sleutel-up` gebeurtenissen op de pagina. Het kan worden gebruikt voor het vangen en verwerken van aangepaste snelkoppelingen die niet zichtbaar zijn in het menu.

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
Mousetrap.bind('linksboven boven boven in een enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
