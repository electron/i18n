# MacOS Dunkler Modus unterstützen

In macOS 10.14 Mojave hat Apple einen neuen [systemweiten dunklen Modus ](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) für alle Mac OS-Computer eingeführt.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

Apple hat in macOS 10.15 Catalina eine neue "automatische" Option für den dunklen Modus für alle MacOS-Computer eingeführt. In der Reihenfolge für das `nativeTheme. houldUseDarkColors` und `Tray` APIs funktionieren in diesem Modus auf Catalina, Sie müssen entweder `NSRequiresAquaSystemAppearance` auf `false` in Ihrer `Info gesetzt haben. Liste` Datei oder auf Electron `>=7.0.0`. Sowohl [Electron Packager](https://github.com/electron/electron-packager) als auch [Electron Forge](https://www.electronforge.io/) haben eine [`darwinDarkModeSupport` Option](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) um die `zu automatisieren. listet` Änderungen während der App-Build-Zeit auf.

## Automatische Aktualisierung der nativen Schnittstellen

"Native Schnittstellen" beinhalten Dateiauswahl, Fensterrahmen, Dialoge, Kontextmenüs und mehr; Im Grunde genommen alles, wo die Benutzeroberfläche von macOS und nicht von Ihrer App kommt. Ab Electron 7.0.0 ist das standardmäßige Verhalten das automatische Design vom Betriebssystem zu wählen. Wenn Sie sich abmelden und Electron
&gt; 8.0 verwenden möchten. , müssen Sie die `NSRequiresAquaSystemAppearance` Taste in der `Info.plist` Datei auf `true` setzen. Bitte beachten Sie, dass Electron 8.0.0 und höher Ihnen aufgrund der Verwendung von des macOS 10.14 SDK kein Opt-out erlauben werden.

## Automatische Aktualisierung der eigenen Schnittstellen

Wenn Ihre App einen eigenen Dunkelmodus hat, sollten Sie sie ein- und ausschalten und mit der dunklen -Einstellung des Systems. Sie können dies tun, indem Sie auf das Thema aktualisierte Ereignis im Modul `nativTheme` von Electronic lauschen.

Ein Beispiel:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```
