## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `options` Object 
  * `label` String (facultatif) - Texte du bouton.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton.
  * `iconPosition` String -Peut être `left`, `right` ou `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.label`

Une `Chaîne de caractères` représentant le texte du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.backgroundColor`

Une `Chaîne de caractères` représentant la couleur du fond du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.icon`

Une `NativeImage` représentant l'icône du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.