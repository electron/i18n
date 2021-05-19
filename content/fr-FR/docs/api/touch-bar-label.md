## Classe : TouchBarLabel

> Créer un label dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* Objet `options`
  * `label` String (facultatif) - Texte à afficher.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (facultatif) - Couleur hexadécimal du texte, c.-à-d. `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarLabel` :

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
