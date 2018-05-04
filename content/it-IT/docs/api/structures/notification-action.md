# Oggetto NotificationAction

* `type` Stringa - Il tipo di azione, può essere `button`.
* `text` Stringa (opzionale) - L'etichetta per l'azione fornita.

## Supporto Piattaforma / Azione

| Tipo di Azione | Piattaforme Supportate | Uso di `text`                        | `text` predefinito                                                                                                      | Limitazioni                                                                                                                                                                                                                                                                     |
| -------------- | ---------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`       | macOS                  | Usato come etichetta per il pulsante | "Show" (oppure una stringa localizzata da impostazione predefinita di sistema se è il primo `button`, altrimenti vuota) | Solo il primo è usato. Se ne vengono forniti di più, quelli dopo il primo verranno elencati come azioni addizionali (mostrati quando il mouse è sopra il pulsante dell'azione). Inoltre l'azione è incompativile con `hasReply` e sarà ignorata se `hasReply` ha valore `true`. |

### Supporto pulsanti su macOS

Per far funzionare i pulsanti di notifiche extra su macOS l'app deve rispettare i seguenti criteri:

* L'App deve essere firmata;
* L'App deve avere il parametro `NSUserNotificationAlertStyle` settato a `alert` nel `Info.plist`.

Se anche solo uno dei questi criteri è rispettato il pulsante non apparirà.