## Classe : TouchBarButton

> Créer un bouton dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *Experimental*

* `options` Objet 
  * `label` String (facultatif) - Texte du bouton.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (facultatif) - Couleur de fond hexadécimal du bouton, c.-à-d. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String(facultatif) - Icône du bouton.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Function (facultatif) - Fonction à appeler lorsque le bouton est cliqué.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarButton` :

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

Un `String` représentant le texte du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.backgroundColor`

Un `String` représentant la couleur du fond du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.

#### `touchBarButton.icon`

Une `NativeImage` représentant l'icône du bouton actuel. Changer cette valeur met à jour immédiatement le bouton dans la touch bar.