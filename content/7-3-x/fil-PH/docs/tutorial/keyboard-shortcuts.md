# Mga shortcut ng keyboard

> I-configure ang lokal at ang global na mga shortcut ng keyboard

## Mga lokal na shortcut

Pwedi kang maggamit ng [Menu][] na modyul para i-configure ang keyboard shortcuts na nagti-trigger lamang kapag nka pokus ang app. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
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

## Mga Shortcut ng Global

Maaari mong gamitin ang module na [globalShortcut][] upang makita ang mga kaganapan sa keyboard kahit kailan ang application ay walang focus sa keyboard.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Mga shortcut sa loob ng isang BrowserWindow

Kung nais mong mahawakan ang mga shortcut sa keyboard para sa isang [BrowserWindow][], maaari mong gamitin ang `keyup` at `keydown` tagapakinig ng kaganapan sa object window sa loob ng proseso ng renderer.

```js
window.addEventListener('keyup', doSomething, true)
```

Tandaan ang pangatlong parameter na `true` na nangangahulugang ang tagapakinig ay laging makatatanggap ng mga pagpindot sa key sa ibang mga tagapakinig upang hindi sila maaaring tumawag sa `stopPropagation()`.

Ang kaganapan ng [`before-input-event`](../api/web-contents.md#event-before-input-event) ay ipinapadala bago ipadala ang mga kaganapan ng `keydown` at `keyup` sa pahina. Maaari ito gagamitin upang mahuli at pangasiwaan ang mga pasadyang mga shortcut na hindi nakikita sa menu.

Kung ayaw mong gawin ang pag-parse ng manu-manong pag-parse may mga aklatan na ang mga advanced na key detection tulad ng [mousetrap][].

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

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
