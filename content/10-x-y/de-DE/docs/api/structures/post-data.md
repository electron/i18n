# PostDaten Objekt

* `type` String - One of the following:
  * `rawData` - Die Daten stehen als `Puffer`im `rawData` Feld zur Verfügung.
  * `Datei`-Das Objekt entspricht einer Datei. Der`DateiPfad``Offset`,`Laenge` und`ModifikationZeit` Felder sind zur Beschreibung dieser Datei benutzt.
  * `Blob`-Das Objekt entspricht einem`Blob`. Das`blobUUID`Feld wird zur Beschreibung von `Blob` verwendet werden.
* `Bytes`Zeile (Optional)-Die rohen Bytes von Beitragsdaten in einem `Puffer`. Ist zum Typ `von rohen Daten `erfordert.
* `PfadDatei`Zeile (optional)- Pfad von Datei die jetzt hochgeladen wird. Required for the `file` type.
* `blobUUID` String (optional) - The `UUID` of the `Blob` being uploaded. Required for the `blob` type.
* `offset` Integer (optional) - The offset from the beginning of the file being uploaded, in bytes. Only valid for `file` types.
* `length` Integer (optional) - The length of the file being uploaded, in bytes. If set to `-1`, the whole file will be uploaded. Only valid for `file` types.
* `modificationTime` Double (optional) - The modification time of the file represented by a double, which is the number of seconds since the `UNIX Epoch` (Jan 1, 1970). Only valid for `file` types.
