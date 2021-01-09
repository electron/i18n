# NotificationAction Object

* `type` String - Het type actie van de actie, kan `button` zijn.
* `text` String (optioneel) - Het label voor de gegeven actie.

## Platform- / Actie-ondersteuning

| Type actie | Platform-ondersteuning | Gebruik van `tekst`             | Standaard `tekst`                                                                           | Limitaties                                                                                                                                                                                                                                                                            |
| ---------- | ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`   | macOS                  | Gebruikt als label voor de knop | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Alleen de eerste wordt gebruikt. Als er meerdere worden opgegeven, worden de volgende weergegeven als extra acties (weergegeven wanneer muis actief is op de actieknop). Een dergelijke actie is ook niet compatibel met `hasReply` en zal genegeerd worden als `hasReply` is `true`. |

### Knop-ondersteuning op macOS

Om extra notificatieknoppen te kunnen gebruiken op macOS moet je app voldoen aan de volgende criteria.

* App is ondertekend
* App heeft `NSUserNotificatieAlertStyle` ingesteld op `alert` in de `Info.plist`.

Als aan een van deze vereisten niet wordt voldaan, zal de knop niet verschijnen.
