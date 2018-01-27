# Oggetto AzioneNotifica

* `tipo` Stringa - Il tipo di azione, può essere `pulsante`.
* `testo` Stringa - (opzionale) L'etichetta per l'azione data.

## Supporto Piattaforma / Azione

| Tipo di Azione | Supporto Piattaforma | Uso del `testo`                      | `testo` predefinito | Limitazioni                                                                                                                                                           |
| -------------- | -------------------- | ------------------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pulsante`     | macOS                | Usato come etichetta per il pulsante | "Mostra"            | Massimo di un pulsante, se ne sono forniti molti è usato solo l'ultimo. Questa azione è anche incompatibile con `haRisposto` e sarà ignorata se `haRisposto` è`true`. |

### Pulsante supportato su macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.