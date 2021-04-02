## Klasse: TouchBarSlider

> Erstellen eines Schiebereglers in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarSlider(Optionen)`

* `options` -Objekt
  * `label` String (optional) - Beschriften sie Text.
  * `value` Ganzzahl (optional) - Ausgewählter Wert.
  * `minValue` Ganzzahl (optional) - Minimalwert.
  * `maxValue` Ganzzahl (optional) - Maximalwert.
  * `change` Funktion (optional) - Funktion zum Aufrufen, wenn der Schieberegler geändert wird.
    * `newValue` - Der Wert, den der Benutzer im Schieberegler ausgewählt hat.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarSlider`verfügbar:

#### `touchBarSlider.label`

Ein `String` , der den aktuellen Text des Schiebereglers darstellt. Wenn Sie diesen Wert ändern, wird der Schieberegler in der Touchleiste sofort aktualisiert.

#### `touchBarSlider.value`

Ein `Number` , der den aktuellen Wert des Schiebereglers darstellt. Wenn Sie diesen Wert ändern, wird der Schieberegler in der Touchleiste sofort aktualisiert.

#### `touchBarSlider.minValue`

Ein `Number` , der den aktuellen Mindestwert des Schiebereglers darstellt. Wenn Sie diesen Wert ändern, wird der Schieberegler in der Touchleiste sofort aktualisiert.

#### `touchBarSlider.maxValue`

Eine `Number` , die den aktuellen Maximalwert des Schiebereglers darstellt. Wenn Sie diesen Wert ändern, wird der Schieberegler in der Touchleiste sofort aktualisiert.
