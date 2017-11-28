# NotificationAction Object

* `type` String - o tipo de action, pode ser `button`.
* `text` String - (opcional) O label para esta ação.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text`                  | Default `text` | Limitations                                                                                                                                                         |
| ----------- | ---------------- | -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | Used as the label for the button | "Show"         | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.