# PostDaten Objekt

* `type` String - One of the following:
  * `rawData` - Die Daten stehen als `Puffer`im `rawData` Feld zur Verfügung.
  * `Datei`-Das Objekt entspricht einer Datei. Der`DateiPfad``Offset`,`Laenge` und`ModifikationZeit` Felder sind zur Beschreibung dieser Datei benutzt.
  * `Blob`-Das Objekt entspricht einem`Blob`. Das`blobUUID`Feld wird zur Beschreibung von `Blob` verwendet werden.
* `Bytes`Zeile (Optional)-Die rohen Bytes von Beitragsdaten in einem `Puffer`. Ist zum Typ `von rohen Daten `erfordert.
* `PfadDatei`Zeile (optional)- Pfad von Datei die jetzt hochgeladen wird. Required for the `file` type.
* `BlobUUID`Zeile (optional)-Das `UUID`von `Blob`hochgeladen. Fuer `Blob`Typ erfordert.
* `Offset`Integer (optional)-Das Offset vom Anfang der Datei in Bytes hochgeladen. Gilt nur fuer` Typen von Datei.</p></li>
<li><p spaces-before="0"><code>Laenge`Integer (optional)-Die Laenge von Datei in Bytes hochgeladen. Wenn zu`1`eingestellt, wird die ganze Datei hochgeladen. Gilt nur fuer` Typen von Datei.</p></li>
<li><p spaces-before="0"><code>ZeitvonModifikation`Doppel (optional)-Die Zeit von Modifikation der Datei von einer Doppelnummer vertreten, welche die Nummer von Sekunden seit dem `UNIX Epoch`ist. Gilt nur fuer Typen von Datei.</p></li>
</ul>
