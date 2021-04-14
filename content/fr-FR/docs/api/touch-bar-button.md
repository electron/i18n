## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarButton (options)`

* `options` objet
  * `label` String (facultatif) - Texte du bouton.
  * `accessibilityLabel` String (facultatif) - Une courte description du bouton pour une utilisation par les lecteurs d’écran comme VoiceOver.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String(facultatif) - Icône du bouton.
  * `iconPosition` String (facultatif) -Peut être `left`, `right` ou `overlay`. Par défaut à `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.
  * `enabled` Boolean (facultatif) - Si le bouton est dans un état activé.  La valeur par défaut est `true`.

Lors de la `accessibilityLabel`, assurez-vous d’avoir considéré macOS [meilleures pratiques](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.accessibilityLabel TouchBarButton.accessibilityLabel TouchBarButton.accessibilityLabel touchBar`

Un `String` représentant la description du bouton à lire par un lecteur d’écran. Ne sera lu par les lecteurs d’écran que si aucune étiquette n’est définie.

#### `touchBarButton.label`

Un `String` représentant le texte actuel du bouton. La modification de cette valeur met immédiatement à jour bouton dans la barre tactile.

#### `touchBarButton.backgroundColor`

Un `String` code hex représentant la couleur d’arrière-plan actuelle du bouton. La modification de cette valeur met immédiatement à jour le bouton dans la barre tactile.

#### `touchBarButton.icon`

Un `NativeImage` représentant l’icône actuelle du bouton. La modification de cette valeur met immédiatement à jour bouton dans la barre tactile.

#### `touchBarButton.iconPosition`

Un `String` - Peut être `left`, `right` ou `overlay`.  Par défaut à `overlay`.

#### `touchBarButton.enabled TouchBarButton.enabled TouchBarButton.enabled touchBar`

Un `Boolean` représentant si le bouton est dans un état activé.
