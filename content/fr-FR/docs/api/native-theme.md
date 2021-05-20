# nativeTheme (nativeTheme)

> Consulte et réagit aux changements du thème de couleur natif de Chromium.

Processus : [Main](../glossary.md#main-process)

## Événements

Le module `nativeTheme` déclenche les événements suivants :

### Événement 'updated'

Émis lorsque quelque chose dans le NativeTheme sous-jacent a changé. This normally means that either the value of `shouldUseDarkColors`, `shouldUseHighContrastColors` or `shouldUseInvertedColorScheme` has changed. You will have to check them to determine which one has changed.

## Propriétés

Le module `nativeTheme` dispose des propriétés suivantes :

### `nativeTheme.shouldUseDarkColors` _Lecture seule_

A `Boolean` for if the OS / Chromium currently has a dark mode enabled or is being instructed to show a dark-style UI.  If you want to modify this value you should use `themeSource` below.

### `nativeTheme.themeSource`

A `String` property that can be `system`, `light` or `dark`.  It is used to override and supersede the value that Chromium has chosen to use internally.

Setting this property to `system` will remove the override and everything will be reset to the OS default.  By default `themeSource` is `system`.

Settings this property to `dark` will have the following effects:

* `nativeTheme.shouldUseDarkColors` will be `true` when accessed
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the dark UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the dark UI.
* The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS query will match `dark` mode.
* The `updated` event will be emitted

Settings this property to `light` will have the following effects:

* `nativeTheme.shouldUseDarkColors` will be `false` when accessed
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the light UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the light UI.
* The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS query will match `light` mode.
* The `updated` event will be emitted

L'utilisation de cette propriété devrait s'accorder avec le "mode sombre" classique du système dans votre application où l'utilisateur a trois options.

* `Suivant OS` --> `themeSource = 'system'`
* `Mode sombre` --> `themeSource = 'dark'`
* `Mode clair` --> `themeSource = 'light'`

Votre application devrait alors toujours utiliser `shouldUseDarkColors` pour déterminer quel CSS appliquer.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Lecture seule_

Un `booléen` pour déterminer si le système d'exploitation / Chromium a actuellement un mode de couleurs à contraste élevé activé ou est applique une interface à contraste élevé.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Lecture seule_

Un `booléen` pour déterminer si le système d'exploitation / Chromium a actuellement un mode de couleurs inversé ou commence à utiliser un modèle de couleurs inversé.
