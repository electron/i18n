# Podpora macOS tmavého módu [Dark Mode]

V macOS 10.14 Mojave Apple zavedl nový [systémový tmavý režim](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) pro všechny macOS počítače.  Pokud má vaše Electron aplikace tmavý režim, můžete sledovat systémově tmavý režim s použitím [ `nativeTheme` api](../api/native-theme.md).

V macOS 10.15 Catalina Apple zavedl novou možnost "automatického" tmavého režimu pro všechny macOS počítače. Pro `domorodé téma. houldUseDarkColors` a `Tray` API fungují správně v tomto režimu na Katalině, musíte mít buď `NSRequiresAquaSystemDisarance` nastaveno na `false` ve vaší `Info. seznam` souborů, nebo být na Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Automaticky aktualizovat nativní rozhraní

„Nativní rozhraní“ zahrnují výběr souborů, okna, dialogy, kontextové menu a další; v podstatě cokoliv, co uživatelské rozhraní pochází z macOS a ne z vaší aplikace. Od Electronu 7.0.0 je výchozí chování pro toto automatické motivování z OS. Pokud si přejete vystoupit a používáte Electron
&gt; 8.0. , musíte nastavit klíč `NSRequiresAquaSystemAppearance` v souboru `Info.plist` na `true`. Vezměte prosím na vědomí, že Electron 8.0.0 a vyšší vám neumožní se tohoto motivu z důvodu macOS 10.14 SDK.

## Automaticky aktualizovat svá vlastní rozhraní

Pokud má vaše aplikace vlastní tmavý režim, měli byste jej zapnout a vypnout v synchronizaci s nastavením tmavého systému. Můžete to udělat nasloucháním aktualizované události šablony v modulu `nativeTheme` Electron.

Například:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', funkce ThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
