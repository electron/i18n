## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarButton(options)`

* Objet `options`
  * `label` String (facultatif) - Texte du bouton.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String(facultatif) - Icône du bouton.
  * `iconPosition` String (facultatif) -Peut être `left`, `right` ou `overlay`. Defaults to `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.
  * `enabled` Boolean (optional) - Whether the button is in an enabled state.  La valeur par défaut est `true`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.iconPosition`

A `String` - Can be `left`, `right` or `overlay`.  Defaults to `overlay`.

#### `touchBarButton.enabled`

A `Boolean` representing whether the button is in an enabled state.
