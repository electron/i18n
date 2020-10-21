# Support du mode sombre sur macOS

Dans macOS 10.14 Mojave, Apple a introduit un nouveau [mode sombre à l'échelle du système](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) pour tous les ordinateurs macOS.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

Dans macOS 10.15 Catalina, Apple a présenté une nouvelle option de mode sombre "automatique" pour tous les ordinateurs macOS. Dans l'ordre pour le `thème natif. houldUseDarkColors` et `Tray` API pour fonctionner correctement dans ce mode sur Catalina, vous devez avoir soit `NSRequiresAquaSystemAppearance` réglé sur `false` dans votre `Info. liste` fichier, ou être sur Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Mise à jour automatique des interfaces natives

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Si vous souhaitez vous retirer et utiliser Electron
&gt; 8.0. , vous devez définir la clé `NSRequiresAquaSystemAppearance` dans le fichier `Info.plist` à `true`. Veuillez noter qu'Electron 8.0. et plus haut ne laissera pas votre choix de ce thème, en raison de l'utilisation du SDK macOS 10.14.

## Автоматическое обновление ваших интерфейсов

Si votre application a son propre mode sombre, vous devriez l'activer et désactiver en synchronisation avec le paramètre de mode sombre du système. Vous pouvez le faire en écoutant le thème mis à jour sur le module `nativeTheme` d'Electron.

Par exemple :

```javascript
{ nativeTheme }
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
