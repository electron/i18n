# Supporting macOS Dark Mode

In macOS 10.14 Mojave, introduceerde Apple een nieuwe [systeembrede donkere modus](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) voor alle macOS computers.  Als je Electron app een donkere modus heeft, je kunt het laten volgen door de donkere modus voor het hele systeem met [de `nativeTheme` api](../api/native-theme.md).

In macOS 10.15 Catalina introduceerde Apple een nieuwe "automatisch" donkere modus optie voor alle macOS-computers. In volgorde van het `nativeTheme. houldUseDarkColors` en `Tray` API's om correct te werken in deze modus op Catalina, je moet `NSRequiresAquaSystemAppearance` hebben ingesteld op `false` in je `Info. lijst met` bestand, of gebruik Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Automatisch de oorspronkelijke interfaces bijwerken

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Als je je wilt afmelden en Electron wilt gebruiken
&gt; 8.0. , u moet de `NSRequiresAquaSystemAppearance` sleutel in het `Info.plist` bestand instellen op `waar`. Houd er rekening mee dat Electron 8.0. en hoger zal jouw afmelding voor deze thematiek niet toestaan door het gebruik van de macOS 10.14 SDK.

## Automatisch bijwerken van je eigen interfaces

Als uw app zijn eigen donkere modus heeft, moet u deze in- en uitschakelen in synchronisatie met de donkere modus instelling van het systeem. Je kunt dit doen door te luisteren naar het thema geüpdatet evenement op de `nativeTheme` module.

Bijvoorbeeld:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('bijgewerkt', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
