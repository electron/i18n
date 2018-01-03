# Bildirim Eylem Nesnesi

* `type` String - The type of action, can be `button`.
* `text` String - (optional) The label for the given action.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | Usage of `text`                  | Varsayılan `metin` | Kısıtlamalar                                                                                                                                                        |
| ---------- | ---------------- | -------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Used as the label for the button | "Göster"           | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS Destek Düğmesi

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* İmzalı uygulama
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.