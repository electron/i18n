## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Principal](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `options` Objet 
  * `label` Chaîne de caractères (facultatif) - Texte du bouton.
  * `backgroundColor` String (optional) - Button background color in hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (optional) - Button icon.
  * `iconPosition` String - Can be `left`, `right` or `overlay`.
  * `click` Function (optional) - Function to call when the button is clicked.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.