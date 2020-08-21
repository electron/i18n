# Klavye Kısayolları

> Yerel ve genel klavye kısayollarını yapılandırmak

## Yerel kısayollar

Yalnızca uygulama üzerinde odaklanıldığında çalışacak klavye kısayollarını [Menü][] modülünü kullanarak yapılandırabilirsiniz. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('şimdi yazmaya başlayabiliriz') }
}))
```

You can configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Genel kısayollar

Uygulama klavye odaklanmadığında bile sen [globalShortcut][] modülünü klavye olaylarını araştırmak için kullanabilirsin.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## BrowserWindow içindeki kısayollar

Bir [BrowserWindow][] için klavye kısayolunu işlemek isterseniz, oluşturucu işleminin içindeki pencere nesnesinde `keyup` ve `keydown` event listener'larını kullanabilirsiniz.

```js
window.addEventListener('keyup', doSomething, true)
```

Üçüncü parametre olan `true`'ya dikkat edin. Bu, listener'ın diğer listener'lardan önce her zaman bir tuşa basması gerektiği anlamına gelir. Böylece onlar `stopPropagation()` çağıramazlar.

[`before-input-event`](../api/web-contents.md#event-before-input-event) etkinliği, sayfaya `keydown` ve `keyup` etkinlikleri gönderilmeden önce yayınlanır. Bu olabilir menüde görünmeyen özel kısayolları yakalamak ve işlemek için kullanılabilir.

Eğer el ile kısayol ayrıştırmak istemiyorsanız, [mousetrap][] benzeri gelişmiş anahtar algılaması yapan kütüphaneler var.

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
Mousetrap.bind('yukarı aşağı sola sağa sola b a girin', () => {
  console.log('konami code')
})
```

[Menü]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
