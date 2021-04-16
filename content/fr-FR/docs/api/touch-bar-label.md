## Classe : TouchBarLabel

> Créer un label dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* `options` objet
  * `label` String (facultatif) - Texte à afficher.
  * `accessibilityLabel` String (facultatif) - Une courte description du bouton pour une utilisation par les lecteurs d’écran comme VoiceOver.
  * `textColor` String (facultatif) - Couleur hexadécimal du texte, c.-à-d. `#ABCDEF`.

Lors de la `accessibilityLabel`, assurez-vous d’avoir considéré macOS [meilleures pratiques](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarLabel` :

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
