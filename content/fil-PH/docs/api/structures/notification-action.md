# Mga bagay ng NotificationAction

* `type` String - Ang uri ng aksyon, ay maaaring `button`.
* `text` String (optional) - The label for the given action.

## Platform / Suporta ng Aksyon

| Uri ng Aksyon | Suporta ng Platform | Kagamitan ng `text`                | Default `text`                                                                              | Limitasyons                                                                                                                                                                                                                                                               |
| ------------- | ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pindutan`    | macOS               | Ginagamit bilang tanda ng pindutan | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Suporta ng pindutan sa macOS

Ang kaayusan para gumana ang pindutan ng karagdagang abiso sa macOS ang iyong app ay kailangang matugunan ang sumusunod na pamantayan.

* Nalagdaan na ang app
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Kung alinman sa mga kinakailangan ay hindi natagpuan ang pindutan ay hindi lilitaw.