# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü. Tür `button` olabilir.
* `text` String - (isteğe bağlı) Verilen aksiyon için etiket.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin` | Kısıtlamalar                                                                                                                                                        |
| ---------- | ---------------- | ------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Göster"           | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS Destek Düğmesi

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* İmzalı uygulama
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.