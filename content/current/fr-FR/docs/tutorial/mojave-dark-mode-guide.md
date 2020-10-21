# Support du mode sombre sur macOS

Dans macOS 10.14 Mojave, Apple a introduit un nouveau [mode sombre à l'échelle du système](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) pour tous les ordinateurs macOS.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

Dans macOS 10.15 Catalina, Apple a présenté une nouvelle option de mode sombre "automatique" pour tous les ordinateurs macOS. Dans l'ordre pour le `thème natif. houldUseDarkColors` et `Tray` API pour fonctionner correctement dans ce mode sur Catalina, vous devez avoir soit `NSRequiresAquaSystemAppearance` réglé sur `false` dans votre `Info. liste` fichier, ou être sur Electron `>=7.0.0`. [Electron Packager](https://github.com/electron/electron-packager) et [Electron Forge](https://www.electronforge.io/) ont une option [`darwinDarkModeSupport`](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) pour automatiser les infos `. liste` modifications pendant la création de l'application.

## Mise à jour automatique des interfaces natives

Les "interfaces natives" incluent le sélecteur de fichiers, la bordure de fenêtre, les dialogues, les menus contextuels et plus encore ; fondamentalement, tout ce que l'interface utilisateur provient de macOS et non de votre application. Depuis Electron 7.0.0, le comportement par défaut est d'opter pour ce thème automatique à partir de l'OS. Si vous souhaitez vous désinscrire et utiliser Electron
&gt; 8.0. , vous devez définir la clé `NSRequiresAquaSystemAppearance` dans le fichier `Info.plist` à `true`. Veuillez noter qu'Electron 8.0.0 et supérieur ne vous laissera pas refuser ce thème, en raison de l'utilisation du SDK macOS 10.14.

## Автоматическое обновление ваших интерфейсов

Si votre application a son propre mode sombre, vous devriez l'activer et désactiver en synchronisation avec le paramètre de mode sombre du système. Vous pouvez le faire en écoutant le thème mis à jour sur le module `nativeTheme` d'Electron.

Par exemple :

```javascript
{ nativeTheme }
```
