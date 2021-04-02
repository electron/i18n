## Klasse: TouchBarSegmentedControl

> Erstellen eines segmentierten Steuerelements (einer Schaltflächengruppe), bei dem eine Schaltfläche einen ausgewählten Status hat

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarSegmentedControl(Optionen)`

* `options` -Objekt
  * `segmentStyle` String (optional) - Stil der Segmente:
    * `automatic` - Standard. Die Darstellung des segmentierten Steuerelements wird automatisch basierend auf dem Fenstertyp, in dem das Steuerelement angezeigt wird, und der Position innerhalb des Fensters bestimmt. Karten zu `NSSegmentStyleAutomatic`.
    * `rounded` - Das Steuerelement wird mit dem abgerundeten Stil angezeigt. Karten zu `NSSegmentStyleRounded`.
    * `textured-rounded` - Das Steuerelement wird mit dem strukturierten -Stil angezeigt. Karten zu `NSSegmentStyleTexturedRounded`.
    * `round-rect` - Das Steuerelement wird mit dem Stil "Runde Korrektur" angezeigt. Karten zu `NSSegmentStyleRoundRect`.
    * `textured-square` - Das Steuerelement wird mit dem strukturierten quadratischen -Stil angezeigt. Karten zu `NSSegmentStyleTexturedSquare`.
    * `capsule` - Das Steuerelement wird im Kapselstil angezeigt. Karten zu `NSSegmentStyleCapsule`.
    * `small-square` - Das Steuerelement wird mit dem kleinen quadratischen Stil angezeigt. Karten zu `NSSegmentStyleSmallSquare`.
    * `separated` - Die Segmente im Steuerelement werden sehr nah aneinander angezeigt aber nicht berührend. Karten zu `NSSegmentStyleSeparated`.
  * `mode` String (optional) - Der Auswahlmodus des Steuerelements:
    * `single` - Standard. Ein Element, das nacheinander ausgewählt ist und ein Element ausgewählt, wird die Auswahl des zuvor ausgewählten Elements aufheben. Karten zu `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Es können mehrere Elemente gleichzeitig ausgewählt werden. Karten zu `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Lassen Sie die Segmente als Schaltflächen fungieren, jedes Segment kann gedrückt und freigegeben werden, aber nie als aktiv markiert werden. Karten zu `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Ein Array von Segmenten, die in diesem Steuerelement platziert werden sollen.
  * `selectedIndex` Ganzzahl (optional) - Der Index des aktuell ausgewählten Segments wird automatisch mit Benutzerinteraktion aktualisiert. Wenn der Modus `multiple` ist, ist es das zuletzt ausgewählte Element.
  * `change` Funktion (optional) - Wird aufgerufen, wenn der Benutzer ein neues Segment auswählt.
    * `selectedIndex` Ganzzahl - Der Index des Segments, das der Benutzer ausgewählt hat.
    * `isSelected` Boolean - Ob das Segment aufgrund der Benutzerauswahl ausgewählt ist oder nicht.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarSegmentedControl`verfügbar:

#### `touchBarSegmentedControl.segmentStyle`

Ein `String` , der den aktuellen Segmentstil der Steuerelemente darstellt. Wenn Sie diesen Wert aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert.

#### `touchBarSegmentedControl.segment`

Ein `SegmentedControlSegment[]` Array, das die Segmente in diesem Steuerelement darstellt. Wenn Sie diesen Wert sofort aktualisieren, wird das Steuerelement in der Touchleiste sofort aktualisiert. Durch das Aktualisieren tiefer Eigenschaften in diesem Array **wird die Touchleiste**nicht aktualisiert.

#### `touchBarSegmentedControl.selectedIndex`

Ein `Integer` , der das aktuell ausgewählte Segment darstellt. Wenn Sie diesen Wert ändern, wird das Steuerelement in der Touchleiste sofort aktualisiert. Die Benutzerinteraktion mit der Touchleiste aktualisiert diesen Wert automatisch.

#### `touchBarSegmentedControl.mode`

Ein `String` der den aktuellen Auswahlmodus des Steuerelements darstellt.  Kann `single`, `multiple` oder `buttons`sein.
