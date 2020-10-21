# Klávesové zkratky

> Nastavit místní a globální klávesové zkratky

## Místní zkratky

Modul [Menu](../api/menu.md) můžete použít pro nastavení klávesových zkratek, které budou spuštěny pouze při zapnutí aplikace. Chcete-li tak učinit, zadejte vlastnost [`akcelerátoru`] při vytváření [MenuItem](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const menu = nové menu ()

. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  klikněte: () => { console. og('time to print stuff') }
}))
```

Na základě operačního systému uživatele můžete konfigurovat různé kombinace klíčů.

```js
{
  akcelerátor: proces.platforma === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Globální zkratky

Můžete použít modul [globalShortcut](../api/global-shortcut.md) pro detekci událostí klávesnice, i když aplikace nemá zaměření na klávesnici.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X je stisknuto)
  })
})
```

## Zkratky v okně prohlížeče

Pokud chcete ovládat klávesové zkratky pro [BrowserWindow](../api/browser-window.md), můžete použít klávesu `` a `klávesu` pro posluchače událostí na objektu okna uvnitř procesu vykreslování.

```js
window.addEventListener('keyup', doSomething, true)
```

Všimněte si třetího parametru `true` , což znamená, že posluchač bude vždy dostávat stisknutí tlačítek před ostatními posluchači, takže nemohou mít `stopPropagation()` na ně volané.

[`před událostí`](../api/web-contents.md#event-before-input-event) událost je emitována před odesláním `klávesnice` a `klíče` událostí na stránce. It can be used to catch and handle custom shortcuts that are not visible in the menu.

Pokud nechcete ručně analyzovat klávesové zkratky, jsou zde knihovny, které dělají pokročilé detekce, jako je [myši](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console. og('show shortcuts!') })
Mousetrap.bind('esc', () => { console. og('escape') }, 'keyup')

// kombinace
Mousetrap.bind('command+shift+k', () => { console. og('command shift k') })

// mapa více kombinací ke stejnému volání zpět
Mousetrap. ind(['command+k', 'ctrl+k'], () => {
  konzola. og('command k or control k')

  // vrátí false pro zabránění výchozímu chování a zastavení události před bublinou
  vrací falešné
})

// gmail sekvence
Mousetrap. ind('g i', () => { console.log('go to inbox') })
Mousetrap. ind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up down left right b a enter', () => {
  console.log('konami code')
})
```
