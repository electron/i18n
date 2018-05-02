# Oggetto AzioneNotifica

* `tipo` Stringa - Il tipo di azione, può essere `pulsante`.
* `text` String (optional) - The label for the given action.

## Supporto Piattaforma / Azione

| Tipo di Azione | Supporto Piattaforma | Uso del `testo`                      | `testo` predefinito                                                                         | Limitazioni                                                                                                                                                                                                                                                               |
| -------------- | -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pulsante`     | macOS                | Usato come etichetta per il pulsante | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Pulsante supportato su macOS

Per far funzionare i pulsanti di extra notificazione su macOS la tua app deve incontrare i seguenti criteri.

* L'App è firmata
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Se uno dei questi criteri non sono presenti il pulsante semplicemente non apparirà.