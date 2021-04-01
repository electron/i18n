# ThumbarButton Objekt

* ` Icon ` [ NativeImage ](../native-image.md)-das Symbol zeigt in Thumbnail Leiste.
* ` Klicken Sie auf ` Funktion
* ` Tooltip ` String (optional)-der Text der Tooltip der Schaltfläche.
* `flags` String[] (optional) - Kontrollieren Sie bestimmte Zustände und Verhaltensweisen des Buttons. Standardmäßig ist es `['enabled']`.

Die ` Flags ` ist ein Array, das folgende ` Zeichenfolge ` s enthalten kann:

* ` Enabled `-die Schaltfläche ist aktiv und für den Benutzer verfügbar.
* `disabled` - Der Button ist deaktiviert. Er ist vorhanden, zeigt aber visuell, dass er nicht auf Nutzeraktionen reagiert.
* ` dismissonclick `-wenn auf die Schaltfläche geklickt wird, wird das Thumbnail-Fenster geschlossen sofort.
* ` nobackground `-zeichnen Sie keinen Schaltflächenrahmen, sondern verwenden Sie nur das Bild.
* ` Hidden `-die Schaltfläche wird dem Benutzer nicht angezeigt.
* `noninteractive` - Der Button ist aktiviert aber nicht interaktiv. Es wird kein gedrückter Button angezeigt. Dieser Wert ist für Instanzen bestimmt, in denen der Button in einer Benachrichtigung verwendet wird.
