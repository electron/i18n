# nativeTheme (nativeTheme)

> Lisez et répondez aux changements dans le thème de couleur natif de Chrome.

Processus : [Main](../glossary.md#main-process)

## Événements

Le `nativeTheme` module émet les événements suivants :

### Événement 'updated'

Émis lorsque quelque chose dans le NativeTheme sous-jacent a changé. Cela signifie normalement que la valeur des `shouldUseDarkColors`, `shouldUseHighContrastColors` ou `shouldUseInvertedColorScheme` a changé. Vous devrez les vérifier pour déterminer lequel a changé.

## Propriétés

Le module `nativeTheme` a les propriétés suivantes :

### `nativeTheme.shouldUseDarkColors` _Readonly_

Un `Boolean` pour si l’OS / Chrome a actuellement un mode sombre activé ou est être chargé de montrer une interface utilisateur de style sombre.  Si vous souhaitez modifier cette valeur, vous devez utiliser ci `themeSource` bas.

### `nativeTheme.themeSource Native`

Une `String` qui peut être `system`, `light` ou `dark`.  Il est utilisé pour remplacer et remplacer valeur que Chrome a choisi d’utiliser en interne.

La configuration de cette propriété `system` supprimera le remplacement et tout sera réinitialisé à la valeur par défaut de l’OS.  Par défaut, `themeSource` est `system`.

Paramètres de cette propriété `dark` vous aurez les effets suivants:

* `nativeTheme.shouldUseDarkColors` seront `true` lorsqu’ils seront consultés
* N’importe quel électron d’interface utilisateur s’affiche sur Linux et Windows, y compris les menus contextaux, les devtools, etc. utiliseront l’interface utilisateur sombre.
* Toute interface utilisateur que l’OS rend sur macOS, y compris les menus, cadres de fenêtres, etc. utilisera l’interface utilisateur sombre.
* La requête [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS correspondra au mode `dark` 'œil.
* Le `updated` événement sera émis

Paramètres de cette propriété `light` vous aurez les effets suivants:

* `nativeTheme.shouldUseDarkColors` seront `false` lorsqu’ils seront consultés
* N’importe quel électron d’interface utilisateur s’affiche sur Linux et Windows, y compris les menus contextaux, les devtools, etc. utiliseront l’interface utilisateur lumineuse.
* Toute interface utilisateur que l’OS rend sur macOS, y compris les menus, cadres de fenêtre, etc. utilisera l’interface utilisateur légère.
* La requête [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS correspondra au mode `light` 'œil.
* Le `updated` événement sera émis

L’utilisation de cette propriété doit s’aligner sur une machine classique d’état de « mode foncé » dans votre application où l’utilisateur dispose de trois options.

* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

Votre application doit alors toujours utiliser `shouldUseDarkColors` pour déterminer ce que le CSS appliquera.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Readonly_

Un `Boolean` pour si l’OS / Chrome a actuellement le mode à contraste élevé activé ou est chargé de montrer une interface utilisateur à contraste élevé.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Readonly_

Un `Boolean` pour si l’OS / Chrome a actuellement un schéma de couleurs inversées ou est chargé d’utiliser un schéma de couleurs inversées.
