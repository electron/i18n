# Oggetto ThumbarButton

* `icon` [NativeImage](../native-image.md) - L'icona mostrata nella barra degli strumenti come anteprima.
* `click` Funzione
* `tooltip` Stringa (opzionale) - Il testo del tooltip del pulsante.
* `flags` Stringa[] (opzionale) - Controlla specifici comportamenti e comportamenti del pulsante. Di default è `['enabled']`.

I `flags` sono un insieme che include le seguenti `String`:

* `enabled` - Il pulsante è attivato e disponibile all'utente.
* `disabled` - Il pulsante é disabilitato. È presente ma lo stato visuale che lo indica non risponderà all'azione dell'utente.
* `dismissonclick` - Quando il pulsante è cliccato, la finestra miniaturizzata si chiude immediatamente.
* `nobackground` - Non disegna i bordi del pulsante, usa solo l'immagine.
* `hidden` - Il pulsante non è mostrato all'utente.
* `noninteractive` - Il pulsante è abilitato ma non interattivo; il pulsante è mostrato in uno stato di 'non premuto'. Questo valore è inteso per istanze in cui il pulsante è usato in una notifica.