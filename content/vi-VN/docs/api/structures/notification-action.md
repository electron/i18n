# NotificationAction Object

* `type` String - Loại hành động, có thể là `button`.
* `text` String (optional) - Nhãn cho hành động cụ thể.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text`                  | Default `text`                                                                              | Limitations                                                                                                                                                                                                                                                               |
| ----------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | Được sử dụng như nhãn cho button | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.