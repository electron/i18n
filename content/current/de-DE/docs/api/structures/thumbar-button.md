# ThumbarButton Objekt

* ` Icon ` [ NativeImage ](../native-image.md)-das Symbol zeigt in Thumbnail Leiste.
* ` Klicken Sie auf ` Funktion
* ` Tooltip ` String (optional)-der Text der Tooltip der Schaltfläche.
* ` Flags ` String [] (optional)-Steuern Sie bestimmte Zustände und Verhaltensweisen der Schalt. Standardmäßig ist es ` [' Enabled '] `.

Die ` Flags ` ist ein Array, das folgende ` Zeichenfolge ` s enthalten kann:

* ` Enabled `-die Schaltfläche ist aktiv und für den Benutzer verfügbar.
* ` Disabled `-die Schaltfläche ist deaktiviert. Es ist vorhanden, hat aber einen visuellen Zustand gibt an, dass Sie nicht auf Benutzeraktionen reagiert.
* ` dismissonclick `-wenn auf die Schaltfläche geklickt wird, wird das Thumbnail-Fenster geschlossen sofort.
* ` nobackground `-zeichnen Sie keinen Schaltflächenrahmen, sondern verwenden Sie nur das Bild.
* ` Hidden `-die Schaltfläche wird dem Benutzer nicht angezeigt.
* ` noninteractive `-die Schaltfläche ist aktiviert, aber nicht interaktiv; nicht gedrückt der Schaltflächenzustand wird gezeichnet. Dieser Wert ist für Instanzen vorgesehen, in denen die Schaltfläche in einer Benachrichtigung verwendet wird.