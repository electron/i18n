# Elektronensicherungen

> Paketzeit-Feature-Umschalter

## Was sind Sicherungen?

Für eine Teilmenge der Electron-Funktionalität ist es sinnvoll, bestimmte Funktionen für eine ganze Anwendung zu deaktivieren.  Beispielsweise nutzen 99 % der Apps `ELECTRON_RUN_AS_NODE`, diese Anwendungen möchten in der Lage sein, eine Binärdatei zu versenden, die nicht in der Lage ist, diese Funktion zu verwenden.  Wir wollen auch nicht, dass Elektronenkonsumenten Electron aus der Quelle bauen, da dies sowohl eine massive technische Herausforderung ist als auch hohe Kosten für Zeit und Geld hat.

Sicherungen sind die Lösung für dieses Problem, auf einem hohen Niveau sind sie "magische Bits" in der Electron-Binärdatei, die beim Verpacken Ihrer Electron-App gekippt werden können, um bestimmte Funktionen / Einschränkungen zu aktivieren / zu deaktivieren.  Da sie zur Paketzeit gekippt werden, bevor Sie Ihre App signieren, wird das Betriebssystem dafür verantwortlich, sicherzustellen, dass diese Bits nicht über die Überprüfung der Codesignatur auf Betriebssystemebene (Gatekeeper / App Locker) zurückgedreht werden.

## Wie drehe ich die Sicherungen um?

### Der einfache Weg

Wir haben ein praktisches Modul `@electron/fuses` gemacht, um das Umkippen dieser Sicherungen einfach zu machen.  Weitere Informationen zur Verwendung und zu möglichen Fehlerfällen finden Sie im README dieses Moduls.

```js
require('@electron/fuses').flipFuses(
  / Pfad zu Elektronen
  require('electron'),
  / / Sicherungen zum Kippen
  {
    runAsNode: false
  }
)
```

### Der harte Weg

#### Schnellglossar

* **Sicherungsdraht**: Eine Folge von Bytes in der Electron-Binärdatei, die zur Steuerung der Sicherungen verwendet wird
* **Sentinel**: Eine statische bekannte Folge von Bytes, mit denen Sie den Sicherungsdraht suchen können
* **Sicherungsschema**: Das Format / die zulässigen Werte für den Sicherungsdraht

Das manuelle Umklappen von Sicherungen erfordert das Bearbeiten der Electron-Binärdatei und das Ändern des Sicherungsdrahts in die Reihenfolge der Bytes, die den Status der gewünschten Sicherungen darstellen.

Irgendwo in der Electron-Binärdatei wird es eine Folge von Bytes geben, die wie folgt aussehen:

```text
| ... binäre | sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ... binäre |
```

* `sentinel_bytes` ist immer genau diese `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX`
* `fuse_version` ist ein einzelnes Byte, dessen Ganzzahlwert ohne Vorzeichen die Version des Sicherungsschemas darstellt.
* `fuse_wire_length` ist ein einzelnes Byte, dessen Ganzzahlwert ohne Vorzeichen die Anzahl der Sicherungen im folgenden Sicherungsdraht darstellt.
* `fuse_wire` ist eine Sequenz von N Bytes, jedes Byte stellt eine einzelne Sicherung und ihren Zustand dar.
  * "0" (0x30) zeigt an, dass die Sicherung deaktiviert ist
  * "1" (0x31) zeigt an, dass die Sicherung aktiviert ist
  * "r" (0x72) gibt an, dass die Sicherung entfernt wurde, und das Ändern des Bytes in 1 oder 0 hat keine Wirkung.

Um eine Sicherung umzudrehen, finden Sie ihre Position im Sicherungsdraht und ändern sie je nach dem Status, den Sie möchten, in "0" oder "1".

Sie können die aktuelle Schema- [hier](https://github.com/electron/electron/blob/master/build/fuses/fuses.json)anzeigen.
