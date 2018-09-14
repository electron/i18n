# Atalhos do Teclado

> Configure atalhos de teclado locais e globais

## Atalhos Locais

Você pode usar o módulo [Menu](../api/menu.md) para configurar os atalhos do teclado que serão acionados quando a aplicação estiver em foco. Para isso, especifique a propriedade [`accelerator`] quando criar um [MenuItem](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

Você pode configurar diferentes combinações de teclas com base no sistema operacional do usuário.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Atalhos Globais

Você pode usar o módulo [globalShortcut](../api/global-shortcut.md) para detectar os eventos do teclado mesmo quando o aplicativo não possuir foco no teclado.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Atalhos em uma janela do navegador

Se você quiser lidar com os atalhos de teclado para um [BrowserWindow](../api/browser-window.md), você pode "observar" eventos `keyup` e `keydown` no objeto da janela dentro do processo de renderização.

```js
window.addEventListener('keyup', fazerAlgumaCoisa, true)
```

Observe o terceiro paramêtro `true`, significa que o "listener" irá receber o evento de pressionar teclas antes de outros "listeners", para que eles não tenham `stopPropagation()` chamado para eles.

O evento [`before-input-event`](../api/web-contents.md#event-before-input-event) é emitido antes enviar os eventos `keydown` e `keyup` na página. Ele pode ser usado para capturar e manipular atalhos personalizados que não estão visíveis no menu.

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