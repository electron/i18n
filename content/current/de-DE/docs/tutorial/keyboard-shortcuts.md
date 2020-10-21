# Tastenkürzel

> Lokale und globale Tastaturkürzel konfigurieren

## Lokale Verknüpfungen

You can use the [Menu](../api/menu.md) module to configure keyboard shortcuts that will be triggered only when the app is focused. Geben Sie dazu eine Eigenschaft [`Beschleuniger`] an, wenn Sie ein [Menüelement](../api/menu-item.md) erstellen.

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

Menü. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console. og('Zeit zum Ausdrucken') }
}))
```

Sie können verschiedene Tastenkombinationen basierend auf dem Betriebssystem des Benutzers konfigurieren.

```js
{
  Beschleuniger: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Strg+Umschalt+I'
}
```

## Globale Verknüpfungen

Sie können das Modul [globalShortcut](../api/global-shortcut.md) verwenden, um Tastaturereignisse zu erkennen, auch wenn die Anwendung keinen Tastaturfokus hat.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Verknüpfungen innerhalb eines Browserfensters

Wenn Sie Tastaturkürzel für ein [BrowserWindow](../api/browser-window.md)bearbeiten möchten, Sie können die Tasten `` und `` auf dem Fensterobjekt innerhalb des Renderer-Prozesses verwenden.

```js
window.addEventListener('keyup', doSomething, true)
```

Beachten Sie den dritten Parameter `true` was bedeutet, dass der Listener immer Tastendrucke vor anderen Zuhörern erhält, so dass er nicht `stopPropagation()` aufgerufen hat.

Das [`vor dem Input-Event`](../api/web-contents.md#event-before-input-event) Ereignis wird vor dem Versenden von `Tastendruck` und `Tastendruck` Ereignisse auf der Seite abgesendet. Es kann verwendet werden, um benutzerdefinierte Verknüpfungen zu fangen und zu verwalten, die im Menü nicht sichtbar sind.

Wenn Sie keine manuelle Tastenkombination parsen möchten, gibt es Bibliotheken, die erweiterte Tastenerkennung durchführen, wie [Mausfalle](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console. og('Zeige Verknüpfung!') })
Mousetrap.bind('esc', () => { Konsole. og('escape') }, 'keyup')

// Kombinationen
Mousetrap.bind('command+shift+k', () => { console. og('command shift k') })

// Mehrere Kombinationen dem gleichen Callback zuordnen
Mousetrap. ind(['command+k', 'ctrl+k'], () => {
  Konsole. og('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap. ind('g i', () => { console.log('go to inbox') })
Mousetrap. ind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('oben links unten rechts rechts ein enter', () => {
  console.log('konami code')
})
```
