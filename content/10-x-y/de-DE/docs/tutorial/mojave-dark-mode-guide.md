# MacOS Dunkler Modus unterstützen

In macOS 10.14 Mojave hat Apple einen neuen [systemweiten dunklen Modus ](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) für alle Mac OS-Computer eingeführt.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

Apple hat in macOS 10.15 Catalina eine neue "automatische" Option für den dunklen Modus für alle MacOS-Computer eingeführt. In der Reihenfolge für das `nativeTheme. houldUseDarkColors` und `Tray` APIs funktionieren in diesem Modus auf Catalina, Sie müssen entweder `NSRequiresAquaSystemAppearance` auf `false` in Ihrer `Info gesetzt haben. Liste` Datei oder auf Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Automatische Aktualisierung der nativen Schnittstellen

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Wenn du Electron
&gt; 8.0 verwenden möchtest und abmelden möchtest. , müssen Sie die `NSRequiresAquaSystemAppearance` Taste in der `Info.plist` Datei auf `true` setzen. Bitte beachten Sie, dass Electron 8.0. und höher können Sie sich aufgrund der Verwendung von des macOS 10.14 SDK nicht von diesem Thema abmelden.

## Automatische Aktualisierung der eigenen Schnittstellen

Wenn Ihre App einen eigenen Dunkelmodus hat, sollten Sie sie ein- und ausschalten und mit der dunklen -Einstellung des Systems. Sie können dies tun, indem Sie auf das Thema aktualisierte Ereignis im Modul `nativTheme` von Electronic lauschen.

Ein Beispiel:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
