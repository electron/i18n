## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Process: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `options` Objet 
  * `label` String (facultatif) - Texte du bouton.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton.
  * `iconPosition` String (facultatif) -Peut être `left`, `right` ou `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.label`

Un `String` représentant le texte du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.backgroundColor`

Un `String` représentant la couleur du fond du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.icon`

Une `NativeImage` représentant l'icône du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.