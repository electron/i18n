# Oggetto ThumbarButton

* `icon` [NativeImage](../native-image.md) - L'icona mostrata nella barra degli strumenti come anteprima.
* `click` Funzione
* `tooltip` Stringa (opzionale) - Il testo del tooltip del pulsante.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

I `flags` sono un insieme che include le seguenti `String`:

* `enabled` - Il pulsante è attivato e disponibile all'utente.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Quando il pulsante è cliccato, la finestra miniaturizzata si chiude immediatamente.
* `nobackground` - Non disegna i bordi del pulsante, usa solo l'immagine.
* `hidden` - Il pulsante non è mostrato all'utente.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
