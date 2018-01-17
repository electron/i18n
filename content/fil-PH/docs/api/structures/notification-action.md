# Mga bagay ng NotificationAction

* `type` String - Ang uri ng aksyon, ay maaaring `button`.
* `text` String - (opsyonal) Ang tanda para sa ibinigay na aksyon.

## Platform / Suporta ng Aksyon

| Uri ng Aksyon | Suporta ng Platform | Kagamitan ng `text`                | Default `text` | Limitasyons                                                                                                                                                                             |
| ------------- | ------------------- | ---------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pindutan`    | macOS               | Ginagamit bilang tanda ng pindutan | "Ipakita"      | Pinakamarami ay isang pindutan, kung marami ang inilagay ang huli ang dapat gamitin. Ang aksyon na ito ay hindi tugma pag may `hasReply` at hindi papansinin kung `hasReply` ay `true`. |

### Suporta ng pindutan sa macOS

Ang kaayusan para gumana ang pindutan ng karagdagang abiso sa macOS ang iyong app ay kailangang matugunan ang sumusunod na pamantayan.

* Nalagdaan na ang app
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.