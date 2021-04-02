## Klasse: TouchBarScrubber

> Erstellen eines Wäschers (ein scrollbarer Selektor)

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarScrubber(Optionen)`

* `options` -Objekt
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Eine Reihe von Elementen, die in diesem Wäscher platziert werden sollen.
  * `select` Funktion (optional) - Wird aufgerufen, wenn der Benutzer auf ein Element tippt, das nicht das letzte angezapfte Element war.
    * `selectedIndex` Ganzzahl - Der Index des Elements, das der Benutzer ausgewählt hat.
  * `highlight` Funktion (optional) - Wird aufgerufen, wenn der Benutzer auf ein Element tippt.
    * `highlightedIndex` Ganzzahl - Der Index des Elements, das der Benutzer berührt hat.
  * `selectedStyle` String (optional) - Ausgewählter Elementstil. Kann `background`, `outline` oder `none`sein. Standardmäßig `none`.
  * `overlayStyle` String (optional) - Ausgewählter Overlay-Elementstil. Kann `background`, `outline` oder `none`sein. Standardmäßig `none`.
  * `showArrowButtons` Boolean (optional) - Standardwerte für `false`.
  * `mode` String (optional) - Kann `fixed` oder `free`werden. Der Standardwert ist `free`.
  * `continuous` Boolean (optional) - Standardwerte für `true`.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarScrubber`verfügbar:

#### `touchBarScrubber.items`

Ein `ScrubberItem[]` Array, das die Elemente in diesem Wäscher darstellt. Wenn Sie diesen Wert sofort aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert. Durch das Aktualisieren tiefer Eigenschaften in diesem Array **wird die Touchleiste**nicht aktualisiert.

#### `touchBarScrubber.selectedStyle`

Eine `String` , die den Stil darstellt, den ausgewählte Elemente im Wäscher enthalten sollten. Wenn Sie diesen Wert sofort aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert. Mögliche werte:

* `background` - Karten zu `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Karten zu `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Entfernt alle Stile.

#### `touchBarScrubber.overlayStyle`

Eine `String` , die den Stil darstellt, den ausgewählte Elemente im Wäscher enthalten sollten. Dieser Stil wird über des Wäscherelements überlagert, anstatt dahinter platziert zu werden. Wenn Sie diesen Wert aktualisieren, wird das Steuerelement in der Sofortanzeige aktualisiert. Mögliche werte:

* `background` - Karten zu `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Karten zu `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Entfernt alle Stile.

#### `touchBarScrubber.showArrowButtons`

Ein `Boolean` , der angibt, ob die Pfeile der linken/rechten Auswahl in diesem Wäscher angezeigt werden sollen. Wenn Sie diesen Wert aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert.

#### `touchBarScrubber.mode`

Ein `String` , der den Modus dieses Wäschers darstellt. Wenn Sie diesen Wert sofort aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert. Mögliche werte:

* `fixed` - Karten zu `NSScrubberModeFixed`.
* `free` - Karten zu `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Ein `Boolean` , der darstellt, ob dieser Wäscher kontinuierlich ist oder nicht. Wenn Sie diesen Wert sofort aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert.
