# Supporting macOS Dark Mode

In macOS 10.14 Mojave, introduceerde Apple een nieuwe [systeembrede donkere modus](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) voor alle macOS computers.  Als je Electron app een donkere modus heeft, je kunt het laten volgen door de donkere modus voor het hele systeem met [de `nativeTheme` api](../api/native-theme.md).

In macOS 10.15 Catalina introduceerde Apple een nieuwe "automatisch" donkere modus optie voor alle macOS-computers. In volgorde van het `nativeTheme. houldUseDarkColors` en `Tray` API's om correct te werken in deze modus op Catalina, je moet `NSRequiresAquaSystemAppearance` hebben ingesteld op `false` in je `Info. lijst met` bestand, of gebruik Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Automatisch de oorspronkelijke interfaces bijwerken

"Inheemse Interfaces" omvatten de bestandskiezer, venstergrens, dialoogvensters, contextmenu's en meer; In principe alles waar de UI uit macOS komt en niet je app. Vanaf Electron 7.0.0, is het standaardgedrag om zich aan te melden voor dit automatisch thema van het besturingssysteem. Als je Electron
&gt; 8.0 wilt gebruiken , u moet de `NSRequiresAquaSystemAppearance` sleutel in het `Info.plist` bestand instellen op `waar`. Houd er rekening mee dat Electron 8.0.0 en hoger je door het gebruik van de macOS 10.14 SDK niet aan deze thematiek zullen laten deelnemen.

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
