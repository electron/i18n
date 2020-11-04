# Supporto per la modalità "Dark" di macOS

In macOS 10.14 Mojave, Apple ha introdotto una nuova [modalità scura a livello di sistema](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) per tutti i computer macOS.  Se la tua app Electron ha una modalità scura, puoi farlo seguire l'impostazione della modalità scura di sistema usando [il `nativeTheme` api](../api/native-theme.md).

A partire da macOS 10.15 Catalina, Apple ha introdotto una nuova opzione "automatica" per la modalità "dark mode" su tutti i computer macOS. Per il `nativeTheme. houldUseDarkColors` and `Vassoio` API per funzionare correttamente in questa modalità su Catalina, devi avere `NSRequiresAquaSystemAppearance` impostato su `false` nelle tue `Info. list` file, or be on Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Aggiornamento automatico delle interfacce native

"Interfacce Native" includono il selettore di file, il bordo della finestra, le finestre di dialogo, i menu contestuali e altro ancora; fondamentalmente, qualsiasi cosa in cui l'interfaccia utente proviene da macOS e non la tua app. A partire da Electron 7.0.0, il comportamento predefinito è quello di optare per questo tema automatico dal sistema operativo. Se si desidera opt-out e si utilizza Electron
&gt; 8.0. , è necessario impostare la chiave `NSRequiresAquaSystemAppearance` nel file `Info.plist` su `true`. Si prega di notare che Electron 8.0.0 e superiore non consente di disattivare questo tema, a causa dell'uso del macOS 10.14 SDK.

## Aggiorna automaticamente le tue interfacce

Se la tua app ha la sua modalità scura, dovresti attivarla e disattivarla sincronizzandola con le impostazioni di modalità scure del sistema. Puoi farlo ascoltando il tema aggiornato sul modulo `nativeTheme` di Electron.

Ad esempio:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
