## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Experimental_

* `options` Object
  * `label` String (facultatif) - Texte du bouton.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton.
  * `iconPosition` String (facultatif) -Peut être `left`, `right` ou `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
