# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü. Tür `button` olabilir.
* `text` String - (isteğe bağlı) Verilen aksiyon için etiket.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin` | Kısıtlamalar                                                                                                                                                        |
| ---------- | ---------------- | ------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Göster"           | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS Destek Düğmesi

Ek bildirim düğmelerinin macOS'ta çalışabilmesi için uygulamanızın aşağıdaki kriterler sağlaması gerekmektedir.

* İmzalı uygulama
* Uygulama içinde `NSUserNotificationAlertStyle` tarafından ayarlanan `info.plist` içindeki `alert`'e sahiptir.

Bu gerekliliklerden herhangi biri karşılanmazsa düğme görünmez.