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

You can configure different key combinations based on the user's operating system.

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

El [`Evento antes de la entrada`](../api/web-contents.md#event-before-input-event) es emitido antes de enviar los eventos `flecha hacia arriba` y `flecha hacia abajo` en la página. Puede ser usado para capturar y manejar accesos directos personalizados que no son visibles en el menú.

Si no quiere usar el análisis manual de los accesos directos hay librerías que hacen detección de teclas avanzadas como [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// Combinaciones
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// combinaciones múltiples para el mismo llamado
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // devolver falso a comportamientos preventivos por defecto y detener eventos
  return false
})

// Secuencia de estilo gmail
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// ¡Código Konami!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```