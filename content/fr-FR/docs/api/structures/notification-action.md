# Objet NotificationAction

* `type` String - Le type d'action, peut être `button`.
* `text` String (optional) - The label for the given action.

## Support Plateforme / Action

| Type d'action | Support Plateforme | Usage du `text`               | `text` par défaut                                                                           | Limitations                                                                                                                                                                                                                                                               |
| ------------- | ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`      | macOS              | Utilisé comme label du bouton | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Support des boutons sur macOS

Afin que les boutons dans les notifications fonctionnent sur macOS, votre application doit répondre aux critères suivants :

* L'application est signée
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Si l'une de ces exigences n'est pas remplie, alors le bouton n'apparaîtra pas tout simplement.