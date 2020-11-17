# Suportarea modului negru macOS

În MacOS 10.14 Mojave, Appled a introdus un nou [mod întunecat la nivel de sistem](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) pentru toate computerele MacOS.  Dacă aplicația ta Electron are un mod întunecat, îl puteți face să urmeze setarea pentru modul întunecat la nivelul întregului sistem folosind [Tema `nativă` api](../api/native-theme.md).

În macOS 10.15 Catalina, Apple a introdus o nouă opțiune de mod întunecat "automat" pentru toate calculatoarele macOS. Pentru tema `native. houldUseDarkColors` și `Tăiați` API-uri pentru a funcționa corect în acest mod pe Catalina, trebuie să aveți `NSRequiresAquaSystemAppearance` setat la `false` în informatiile `. lista` fișier, sau fiți pe Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Actualizează automat interfețele native

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Dacă doriţi să renunţaţi şi utilizaţi Electron
&gt; 8.0. , trebuie să setați tasta `NSRequiresAquaSystemAppearance` în fișierul `Info.plist` ca `true`. Vă rugăm să reţineţi că Electron 8.0. şi mai sus nu vă va lăsa să renunţaţi la această temă, din cauza utilizării a macOS 10.14 SDK.

## Actualizați automat propriile interfețe

Dacă aplicația ta are propriul mod întunecat, ar trebui să o pornești și să o oprești sincronizând cu setarea modul întunecat a sistemului. Puteţi face acest lucru prin ascultarea evenimentului de temă actualizat pe modulul `Tema native` al Electron.

De exemplu:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
