# Mga bagay ng NotificationAction

* `type` String - Ang uri ng aksyon, ay maaaring `button`.
* `text` String - (opsyonal) Ang tanda para sa ibinigay na aksyon.

## Platform / Suporta ng Aksyon

| Uri ng Aksyon | Suporta ng Platform | Kagamitan ng `text`                | Default `text` | Limitasyons                                                                                                                                                                                        |
| ------------- | ------------------- | ---------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pindutan`    | macOS               | Ginagamit bilang tanda ng pindutan | "Ipakita"      | Naglaan ng sukdulan ng isang buton, kung marami ang binigay ang huli lamang ang gagamitin. Ang aksyon na ito rin ay hindi angkop sa `hasReply` at ay hindi papansinin kung `totoo` ang `hasReply`. |

### Suporta ng pindutan sa macOS

Ang kaayusan para gumana ang pindutan ng karagdagang abiso sa macOS ang iyong app ay kailangang matugunan ang sumusunod na pamantayan.

* Nalagdaan na ang app
* Ang app ay mayroon ng `NSUserNotificationAlertStyle` na itinakda sa`alert` sa mga `info.plist`.

Kung alinman sa mga kinakailangan ay hindi natagpuan ang pindutan ay hindi lilitaw.