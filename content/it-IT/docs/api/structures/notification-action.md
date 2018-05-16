# Oggetto NotificationAction

* `type` Stringa - Il tipo di azione, può essere `button`.
* `text` String (optional) - The label for the given action.

## Supporto Piattaforma / Azione

| Tipo di Azione | Piattaforme Supportate | Uso di `text`                        | `text` predefinito                                                                          | Limitazioni                                                                                                                                                                                                                                                               |
| -------------- | ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                  | Usato come etichetta per il pulsante | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Supporto pulsanti su macOS

Per far funzionare i pulsanti di notifiche extra su macOS l'app deve rispettare i seguenti criteri:

* L'App deve essere firmata;
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Se anche solo uno dei questi criteri è rispettato il pulsante non apparirà.