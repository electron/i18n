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

Si quiere manejar accesos directos en el teclado para una ventana [ventana de buscador](../api/browser-window.md), puede usar la `flecha hacia arriba` y `flecha hacia abajo`.

```js
window.addEventListener('keyup', doSomething, true)
```

Note que el tercer parámetro `verdadero` que se refiere al yente siempre recibe la tecla presionada antes por otros oyentes así que no puede ser llamado por `stopPropagation()`.

El [`Evento antes de la entrada`](../api/web-contents.md#event-before-input-event) es emitido antes de enviar los eventos `flecha hacia arriba` y `flecha hacia abajo` en la página. It can be used to catch and handle custom shortcuts that are not visible in the menu.

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