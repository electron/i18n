# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String - (optional) The label for the given action.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text`                  | Default `text` | Ograniczenia                                                                                                                                                         |
| ----------- | ---------------- | -------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `przycisk`  | macOS            | Used as the label for the button | "Show"         | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.