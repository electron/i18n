# Objet NotificationAction

* `type` String - Le type d'action, peut être `button`.
* `text` String - (facultatif) Le label pour l'action donnée.

## Support Plateforme / Action

| Type d'action | Support Plateforme | Usage du `text`               | `text` par défaut | Limitations                                                                                                                                                         |
| ------------- | ------------------ | ----------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`      | macOS              | Utilisé comme label du bouton | "Show"            | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.