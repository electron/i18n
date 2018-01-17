# Mga bagay ng NotificationAction

* `type` String - Ang uri ng aksyon, ay maaaring `button`.
* `text` String - (opsyonal) Ang tanda para sa ibinigay na aksyon.

## Platform / Suporta ng Aksyon

| Uri ng Aksyon | Suporta ng Platform | Kagamitan ng `text`                | Default `text` | Limitasyons                                                                                                                                                         |
| ------------- | ------------------- | ---------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pindutan`    | macOS               | Ginagamit bilang tanda ng pindutan | "Ipakita"      | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.