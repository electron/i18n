# Oggetto AzioneNotifica

* `tipo` Stringa - Il tipo di azione, può essere `pulsante`.
* `testo` Stringa - (opzionale) L'etichetta per l'azione data.

## Supporto Piattaforma / Azione

| Tipo di Azione | Supporto Piattaforma | Uso del `testo`                      | `testo` predefinito | Limitazioni                                                                                                                                                         |
| -------------- | -------------------- | ------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pulsante`     | macOS                | Usato come etichetta per il pulsante | "Mostra"            | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Pulsante supportato su macOS

Per far funzionare i pulsanti di extra notificazione su macOS la tua app deve incontrare i seguenti criteri.

* L'App è firmata
* La App ha il suo `NSStileSuoneriaNotificaUtente` impostata su `allerta` nell'`info.plist`.

Se uno dei questi criteri non sono presenti il pulsante semplicemente non apparirà.