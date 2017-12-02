# Atalhos do Teclado

> Configure atalhos de teclado locais e globais

## Atalhos locais

Você pode usar o módulo [Menu](../api/menu.md) para configurar os atalhos do teclado que serão acionados quando a aplicação estiver em foco. Para isso, especifique a propriedade [`accelerator`] quando criar um [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

É fácil configurar diferentes combinações baseada no sistema operacional do usuário.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Atalhos globais

Você pode usar o módulo [globalShortcut](../api/global-shortcut.md) para detectar os eventos do teclado mesmo quando o aplicativo não possuir foco no teclado.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Atalhos em uma janela do navegador

Se você quiser lidar com os atalhos de teclado para um [BrowserWindow](../api/browser-window.md), você pode "observar" eventos `keyup` e `keydown` no objeto da janela dentro do processo de renderização.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

O evento [`before-input-event`](web-contents.md#event-before-input-event) é emitido antes enviar os eventos `keydown` e `keyup` na página. Ele pode ser usado para capturar e manipular atalhos personalizados que não estão visíveis no menu.

Se você não quer fazer análises manuais de atalhos, há bibliotecas que fazem a detecção teclas avançadas, como a [mousetrap](https://github.com/ccampbell/mousetrap).

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