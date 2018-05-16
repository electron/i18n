# Objet NotificationAction

* `type` String - Le type d'action, peut être `button`.
* `text` String - (optional) The label for the given action.

## Support Plateforme / Action

| Type d'action | Support Plateforme | Usage du `text`               | `text` par défaut | Limitations                                                                                                                                                         |
| ------------- | ------------------ | ----------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`      | macOS              | Utilisé comme label du bouton | "Show"            | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Support des boutons sur macOS

Afin que les boutons dans les notifications fonctionnent sur macOS, votre application doit répondre aux critères suivants :

* L'application est signée
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

Si l'une de ces exigences n'est pas remplie, alors le bouton n'apparaîtra pas tout simplement.