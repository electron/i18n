# Mga shortcut ng keyboard

> I-configure ang lokal at ang global na mga shortcut ng keyboard

## Mga lokal na shortcut

Pwedi kang maggamit ng [Menu](../api/menu.md) na modyul para i-configure ang keyboard shortcuts na nagti-trigger lamang kapag nka pokus ang app. Upang magawa, i-specify ang [`accelerator`] property kapag gumagawa ng [Menultem](../api/menu-item.md).

```js
const {Menu, Menultem} = nangangailangan ng ('electron')
const menu = bagong Menu()

menu.append(nee menultem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }}))
```

You can configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin'? 'Alt + Cmd + I': 'Ctrl + Shift + I'
}
```

## Mga Shortcut ng Global

Maaari mong gamitin ang module na [globalShortcut](../api/global-shortcut.md) upang makita ang mga kaganapan sa keyboard kahit kailan ang application ay walang focus sa keyboard.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Mga shortcut sa loob ng isang BrowserWindow

Kung nais mong mahawakan ang mga shortcut sa keyboard para sa isang [BrowserWindow](../api/browser-window.md), maaari mong gamitin ang `keyup` at `keydown` tagapakinig ng kaganapan sa object window sa loob ng proseso ng renderer.

```js
window.addEventListener('keyup', doSomething, true)
```

Tandaan ang pangatlong parameter na `true` na nangangahulugang ang tagapakinig ay laging makatatanggap ng mga pagpindot sa key sa ibang mga tagapakinig upang hindi sila maaaring tumawag sa `stopPropagation()`.

Ang kaganapan ng [`before-input-event`](../api/web-contents.md#event-before-input-event) ay ipinapadala bago ipadala ang mga kaganapan ng `keydown` at `keyup` sa pahina. Maaari ito gagamitin upang mahuli at pangasiwaan ang mga pasadyang mga shortcut na hindi nakikita sa menu.

Kung ayaw mong gawin ang pag-parse ng manu-manong pag-parse may mga aklatan na ang mga advanced na key detection tulad ng [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// mga kombinasyon
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// mapa ng maramihang mga kombinasyon sa parehong callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // bumalik mali upang maiwasan ang default na pag-uugali at itigil ang kaganapan mula sa bulubok 
 bumalik mali
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```