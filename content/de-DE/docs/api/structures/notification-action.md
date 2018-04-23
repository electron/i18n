# NotificationAction Object

* `type` String - The type of action, can be `button`.
* `text` String - (optional) The label for the given action.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text`                  | Default `text` | Einschränkungen                                                                                                                                                      |
| ----------- | ---------------- | -------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | Used as the label for the button | "Show"         | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button Unterstützung auf macOS

Damit zusätzliche Benachrichtigungs-Buttons unter macOS funktionieren, muss deine App die folgenden Kriterien erfüllen.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.