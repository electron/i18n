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

Madaling i-configure ang iba't ibang mga kumbinasyon ng key batay sa operating system ng user.

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

The [`before-input-event`](../api/web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

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