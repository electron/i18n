# Accelerator

> Définit des raccourcis clavier.

Les accelerators sont des chaînes de caractères pouvant contenir plusieurs modificateurs et touches, combinés avec le caractère `+`. Ils sont utilisés pour définir des raccourcies clavier dans votre application.

Exemples:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Les raccourcis sont enregistrés avec le module [`globalShortcut`](global-shortcut.md) en utilisant la méthode [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback), c.-à-d.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Enregistre un écouteur de raccourci 'CommandOrControl+Y'.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Lance le code ici quand Y et Command/Control sont pressés en même temps.
  })
})
```

## Remarques

Sur Linux et Windows, la touche `Command` n'a aucun effet, donc utilisez `CommandOrControl` qui représente `Command` sur macOS et `Control` sur Linux et Windows, pour définir certains accelerators.

Utilisez `Alt` au lieu de `Option`. La touche `Option` n’existe que sur macOS, tandis que la touche `Alt` est disponible sur toutes les plateformes.

La touche `Super` est mappée à la touche `Windows` sur Windows et Linux et `Cmd` sur macOS.

## Modificateurs disponibles

* `Command` (ou `Cmd` pour faire court)
* `Control` (ou `Ctrl` pour faire court)
* `CommandOrControl` (ou `CmdOrCtrl` pour faire court)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Touches disponibles

* `0` à `9`
* `A` à `Z`
* `F1` à `F24`
* Signes de ponctuation comme `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (ou `Enter` comme alias)
* `Up`, `Down`, `Left` et `Right`
* `Home` et `End`
* `PageUp` et `PageDown`
* `Escape` (ou `Esc` pour faire court)
* `VolumeUp`, `VolumeDown` et `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` et `MediaPlayPause`
* `PrintScreen`