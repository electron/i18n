# Klavye Kısayolları

> Yerel ve genel klavye kısayollarını yapılandırmak

## Yerel kısayollar

You can use the [Menu](../api/menu.md) module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`] property when creating a [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('şimdi yazmaya başlayabiliriz') }
}))
```

Kullanıcının işletim sistemine bağlı olarak farklı tuş kombinasyonlarını yapılandırmak kolaydır.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Genel kısayollar

Uygulama klavye odaklanmadığında bile sen [globalShortcut](../api/global-shortcut.md) modülünü klavye olaylarını araştırmak için kullanabilirsin.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## BrowserWindow içindeki kısayollar

If you want to handle keyboard shortcuts for a [BrowserWindow](../api/browser-window.md), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

The [`before-input-event`](web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. Bu olabilir menüde görünmeyen özel kısayolları yakalamak ve işlemek için kullanılabilir.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// Aynı callback için birden fazla komut belirle
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k veya control k')

  // return false vererek olayı durdurma ve birikmesini önlemek
  return false
})

// gmail şeklindeki prosedürler
Mousetrap.bind('g i', () => { console.log('gelen kutusuna git') })
Mousetrap.bind('* a', () => { console.log('hepsini seç') })

// konami kodu!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```