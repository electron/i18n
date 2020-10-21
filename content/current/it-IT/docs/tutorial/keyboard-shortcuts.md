# Scorciatoie da tastiera

> Configura i tasti scorciatoia locali e globali

## Scorciatoie Locali

È possibile utilizzare il modulo [Menu](../api/menu.md) per configurare le scorciatoie da tastiera che saranno attivate solo quando l'app è attivata. Per farlo, specificare una proprietà [`accelerator`] quando si crea un [MenuItem](../api/menu-item.md).

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

È possibile utilizzare il modulo [globalShortcut](../api/global-shortcut.md) per rilevare gli eventi della tastiera anche quando l'applicazione non ha il fuoco della tastiera.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Scorciatoie all'interno di una Finestra di navigazione

Se vuoi gestire le scorciatoie da tastiera per una [Finestra di navigazione](../api/browser-window.md), è possibile utilizzare i `keyup` e `keydown` ascoltatori evento sull'oggetto finestra all'interno del processo di renderer.

```js
window.addEventListener('keyup', doSomething, true)
```

Nota il terzo parametro `true` che significa che l'ascoltatore riceverà sempre le pressioni dei tasti prima di altri ascoltatori in modo che non possano avere `stopPropagation()` chiamato su di loro.

L'evento [`before-input-event`](../api/web-contents.md#event-before-input-event) viene emesso prima di spedire `keydown` e `keyup` eventi nella pagina. Può essere usato per catturare e gestire scorciatoie personalizzate che non sono visibili nel menu.

Se non vuoi analizzare manualmente le scorciatoie ci sono librerie che fanno il rilevamento avanzato delle chiavi, come [mousetrap](https://github.com/ccampbell/mousetrap).

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
