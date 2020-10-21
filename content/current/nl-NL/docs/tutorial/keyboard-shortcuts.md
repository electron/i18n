# Toetsencombinaties

> Lokale en globale sneltoetsen instellen

## Lokale snelkoppelingen

Je kunt de [Menu](../api/menu.md) module gebruiken om sneltoetsen te configureren die alleen geactiveerd zullen worden als de app is gefocust. Om dit te doen, geef een [`accelerator`] eigenschap op bij het maken van een [MenuItem](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const menu = nieuw Menu()

menu. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console. og('tijd om spullen af te drukken') }
}))
```

U kunt verschillende sleutelcombinaties configureren op basis van het besturingssysteem van de gebruiker.

```js
{
  versneller: process.platform === 'donker' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Globale Snelkoppelingen

Je kunt de [globalShortcut](../api/global-shortcut.md) module gebruiken om toetsenbordgebeurtenissen te detecteren, zelfs wanneer de applicatie geen toetsenbordfocus heeft.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X wordt ingedrukt')
  })
})
```

## Snelkoppelingen binnen een browservenster

Als u sneltoetsen voor een [Browserwindow](../api/browser-window.md)wilt afhandelen, je kunt `keyup` en `keydown` gebeurtenisluisteraars gebruiken in het venster object in het renderer proces.

```js
window.addEventListener('keyup', doSomething, true)
```

Merk op de derde parameter `waar` wat betekent dat de luisteraar altijd toetsdruk krijgt voordat andere luisteraars worden ingedrukt, zodat ze geen `stopPropagation()` op hen kunnen aanroepen.

De [`voor input-event`](../api/web-contents.md#event-before-input-event) event wordt uitgezonden voor het verzenden van `keydown` en `sleutel-up` gebeurtenissen op de pagina. Het kan worden gebruikt voor het vangen en verwerken van aangepaste snelkoppelingen die niet zichtbaar zijn in het menu.

Als je geen handmatige snelkoppeling wilt starten, zijn er bibliotheken die geavanceerde sleuteldetectie hebben zoals [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console. og('toon snelkoppelingen!') })
Mousetrap.bind('esc', () => { console. og('escape') }, 'keyup')

// combinaties
Mousetrap.bind('command+shift+k', () => { console. og('commando shift k') })

// meerdere combinaties toewijzen aan dezelfde callback
Mousetrap. ind(['command+k', 'ctrl+k'], () => {
  console. og('command k of control k')

  // geeft onwaar terug om standaard gedrag te voorkomen en event te stoppen met bubbling
  retourneert vals
})

// gmail style sequenties
Mousetrap. ind('g i', () => { console.log('ga naar inbox') })
Mousetrap. ind('* a', () => { console.log('selecteer alle') })

// konami code!
Mousetrap.bind('linksboven boven boven in een enter', () => {
  console.log('konami code')
})
```
