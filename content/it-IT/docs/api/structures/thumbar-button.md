# Oggetto PulsantebarraPollice

* `icona` [ImmagineNativa](../native-image.md) - L'icona mostrata nella barra degli strumenti miniaturizzata.
* `click` Funzione
* `aiuto` Stringa (opzionale) - Il testo del pulsante di aiuto.
* `bandiere` Stringa[] (opzionale) - Controlla specifici comportamenti e stati del pulsante. Di default é `['abilitato']`.

La `bandiera` é un insieme che include le seguenti `Stringhe`:

* `abilitato` - Il pulsante è attivato e disponibile all'utente.
* `disabilitato` - Il pulsante é disabilitato. È presente ma lo stato visuale che lo indica non risponderà all'azione dell'utente.
* `dismessoalclick` - Quando il pulsante è cliccato, la finestra miniaturizzata si chiude immediatamente.
* `nobackground` - Non disegnare un limite del pulsante, usa solo l'immagine.
* `nascosto` - Il pulsante non è mostrato all'utente.
* `noninterattivo` - Il pulsante è abilitato ma non interattivo; il pulsante non premuto è disegnato. Questo valore è inteso per istanze in cui il pulsante è usato in una notifica.