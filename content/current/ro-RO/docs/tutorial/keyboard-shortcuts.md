# Scurtături tastatură

> Configurați scurtăturile locale și globale ale tastaturii

## Scurtături locale

Puteți utiliza modulul [Meniu](../api/menu.md) pentru a configura scurtăturile tastaturii care vor fi declanșate numai când aplicația este concentrată. Pentru a face acest lucru, specificați o proprietate de [`accelerator`] atunci când creați un [Element de meniu](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
meniul de const = meniu nou()

ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { consolă. og ('timp pentru tipărire') }
}))
```

Puteți configura diferite combinații de chei pe baza sistemului de operare al utilizatorului.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Comenzi rapide globale

Puteți utiliza modulul [GlobalShortcut](../api/global-shortcut.md) pentru a detecta evenimentele de la tastatură chiar și atunci când aplicația nu are focalizare tastatură.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Scurtături în fereastra Browser-ului

Dacă vrei să te ocupi de tastatură pentru o [Fereastră Browser](../api/browser-window.md), poți utiliza `tastatura` și `tastatura` a ascultătorilor pe obiectul fereastră în interiorul procesului de redare.

```js
window.addEventListener('keyup', doceva, adevărat)
```

Țineți cont de al treilea parametru `adevarat` ceea ce înseamnă că ascultătorul va primi întotdeauna apăsări cheie înaintea altor ascultători astfel încât aceștia nu pot avea `stopPropagation()` apelat pe ei.

Evenimentul [`before-input-event`](../api/web-contents.md#event-before-input-event) este emis înainte de dispatching `keydown` and `keyup` events in the page. Poate fi folosit pentru a prinde și gestiona scurtături personalizate care nu sunt vizibile în meniu.

Dacă nu vrei să faci analiza manuală a scurtăturilor există biblioteci care fac detectarea avansată a tastelor, cum ar fi [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { consolă. og('show shortcuts!') })
Mousetrap.bind('esc', () => { consolă. og('escape') }, 'keyup')

// combinații
Mousetrap.bind('command+shift+k', () => { consolă. og('shift comandă k') })

// mapează mai multe combinații la același callback
Mousetrap. ind(['command+k', 'ctrl+k'], () => {
  consolă. og('comandă sau control k')

  // returnează fals pentru a preveni comportamentul implicit şi oprirea evenimentului de la bulă
  returnează false
})

// secvenţe de stil gmail
Mousetrap. ind('g i', () => { console.log('go to inbox') })
Mousetrap. ind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('în sus în jos, la stânga stânga stânga stânga b o enter', () => {
  console.log('cod konami')
})
```
