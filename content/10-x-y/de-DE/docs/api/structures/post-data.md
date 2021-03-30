# PostDaten Objekt

* `type` String - One of the following:
  * `rawData` - Die Daten stehen als `Puffer`im `rawData` Feld zur Verfügung.
  * `Datei`-Das Objekt entspricht einer Datei. Der`DateiPfad``Offset`,`Laenge` und`ModifikationZeit` Felder sind zur Beschreibung dieser Datei benutzt.
  * `Blob`-Das Objekt entspricht einem`Blob`. Das`blobUUID`Feld wird zur Beschreibung von `Blob` verwendet werden.
* `Bytes`Zeile (Optional)-Die rohen Bytes von Beitragsdaten in einem `Puffer`. Ist zum Typ `von rohen Daten `erfordert.
* `PfadDatei`Zeile (optional)- Pfad von Datei die jetzt hochgeladen wird. Erforderlich für den Typ `file`.
* `blobUUID` String (optional) - Die `UUID` des `Blob`, das hochgeladen wird. Erforderlich für den Typ `Blob`.
* `offset` Integer (optional) - Der Offset vom Anfang der hochzuladenden Datei hochgeladen wird, in Bytes. Nur gültig für `file`-Typen.
* `length` Integer (optional) - Die Länge der hochzuladenden Datei in Bytes. Wenn auf `-1` gesetzt, wird die gesamte Datei hochgeladen. Nur gültig für `file`-Typen.
* `modificationTime` Double (optional) - Die Änderungszeit der Datei dargestellt durch einen Double. Die Anzahl der Sekunden seit der `UNIX-Epoche` (1. Januar 1970). Nur gültig für `file`-Typen.
