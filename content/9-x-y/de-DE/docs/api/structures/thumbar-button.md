# ThumbarButton Objekt

* ` Icon ` [ NativeImage ](../native-image.md)-das Symbol zeigt in Thumbnail Leiste.
* ` Klicken Sie auf ` Funktion
* ` Tooltip ` String (optional)-der Text der Tooltip der Schaltfläche.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Die ` Flags ` ist ein Array, das folgende ` Zeichenfolge ` s enthalten kann:

* ` Enabled `-die Schaltfläche ist aktiv und für den Benutzer verfügbar.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* ` dismissonclick `-wenn auf die Schaltfläche geklickt wird, wird das Thumbnail-Fenster geschlossen sofort.
* ` nobackground `-zeichnen Sie keinen Schaltflächenrahmen, sondern verwenden Sie nur das Bild.
* ` Hidden `-die Schaltfläche wird dem Benutzer nicht angezeigt.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
