# Wsparcie dla Ciemnego Motywu w macOS

W macOS 10.14 Mojave Apple wprowadziło nowy [tryb ciemny systemowy](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) dla wszystkich komputerów macOS.  Jeśli aplikacja Electron ma tryb ciemny, możesz ustawić tryb systemowy ciemnego trybu za pomocą [ `nativeTheme` api](../api/native-theme.md).

W macOS 10.15 Catalina Apple wprowadziła nową opcję "automatycznego" trybu ciemnego dla wszystkich komputerów macOS. W celu `nativeTheme. houldUseDarkColors` i `Tray` API do prawidłowego działania w tym trybie na Catalina, musisz mieć `NSRequiresAquaSystemWygląd` ustawiony na `false` w `Info. lista pliku` lub bądź bądź na Electronie `>=7.0.0` Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Automatycznie aktualizuj natywne interfejsy

"Natywne interfejsy" obejmują selektor plików, obramowanie okna, okna dialogowe, menu kontekstowe i wiele innych; w zasadzie wszystko, co w którym interfejs użytkownika pochodzi z macOS, a nie z aplikacji. Od Electron 7.0.0, domyślnym działaniem jest wybranie tego automatycznego motywu z systemu operacyjnego. Jeśli chcesz wyłączyć i używać Electron
&gt; 8.0. , musisz ustawić klawisz `NSRequiresAquaSystemAppearance` w pliku `Info.plist` na `true`. Pamiętaj, że Electron 8.0.0 i powyżej nie pozwoli Ci zrezygnować z tego motywu ze względu na użycie macOS 10.14 SDK.

## Automatycznie aktualizuj własne interfejsy

Jeśli aplikacja ma swój własny tryb ciemności, powinieneś go włączyć i wyłączyć w synchronizacji z ustawieniem ciemnego trybu systemu. Możesz to zrobić, słuchając wydarzenia zaktualizowanego motywu w module `natywny motyw` Electrona.

Na przykład:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
