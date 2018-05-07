# Skróty Klawiszowe

> Skonfiguruj lokalne oraz globalne skróty klawiszowe

## Skróty lokalne

Możesz użyć modułu [Menu](../api/menu.md), aby skonfigurować skróty klawiszowe, które zostaną wyzwolone tylko, gdy aplikacja jest aktywna. Aby to zrobić, zdefiniuj właściwośc [`accelerator`] podczas tworzenia obiektu [MenuItem](../api/menu-item.md).

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

## Skróty globalne

Możesz użyć modułu [globalShortcuts](../api/global-shortcut.md), aby wykrywać skróty klawiszowe nawet, gdy aplikacja nie jest aktywna (na pierwszym planie).

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Skróty klawiszowe obiektu BrowserWindow

Jeżeli chcesz dodać obsługę skrótów klawiszowych wewnątrz [BrowserWindow](../api/browser-window.md), możesz użyć wyzwalaczy wydarzeń `keyup` oraz `keydown` na obiekcie okna wewnątrz procesu renderowania.

```js
window.addEventListener('keyup', doSomething, true)
```

Zauważ, że trzeci parametr ma wartość `true`, co oznacza, że wyzwalacz będzie zawsze otrzymywał komunikat o wciśnięciu klawisza przed innymi wyzwalaczami, także nie można na nich użyć metody `stopPropagation()`.

Wydarzenie [`before-input-event`](../api/web-contents.md#event-before-input-event) jest emitowane tuż przed wysłaniem wydarzeń `keydown` oraz `keyup`. Może zostać ono użyte do przechwytywania konfigurowalnych skrótów, które nie są widoczne w menu.

Jeżeli nie chcesz manualnie ustalać skrótów klawiszowych, istnieje wiele bibliotek, które dysponują zaawansowanymi metodami detekcji, takimi jak [mousetrap](https://github.com/ccampbell/mousetrap).

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