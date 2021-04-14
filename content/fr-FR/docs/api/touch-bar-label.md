## Classe : TouchBarLabel

> Créer un label dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarLabel (options)`

* `options` objet
  * `label` String (facultatif) - Texte à afficher.
  * `accessibilityLabel` String (facultatif) - Une courte description du bouton pour une utilisation par les lecteurs d’écran comme VoiceOver.
  * `textColor` String (facultatif) - Couleur hexadécimal du texte, c.-à-d. `#ABCDEF`.

Lors de la `accessibilityLabel`, assurez-vous d’avoir considéré macOS [meilleures pratiques](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarLabel` :

#### `touchBarLabel.label`

Un `String` représentant le texte actuel de l’étiquette. La modification de cette valeur met immédiatement à jour l’étiquette la barre tactile.

#### `touchBarLabel.accessibilityLabel`

Un `String` la description de l’étiquette à lire par un lecteur d’écran.

#### `touchBarLabel.textColor`

Un `String` code hex représentant la couleur de texte actuelle de l’étiquette. La modification de cette valeur met immédiatement à jour 'étiquette dans la barre tactile.
