# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü. Tür `button` olabilir.
* `text` String - (isteğe bağlı) Verilen aksiyon için etiket.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin` | Kısıtlamalar                                                                                                                                                                     |
| ---------- | ---------------- | ------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Göster"           | Maksimum bir düğme gösterilebilir, eğer birden çok düğme gösterilirse sadece sonuncu kullanılır. Bu eylem `hasReply` ile de uyumsuzdur ve `hasReply` `true` ise göz ardı edilir. |

### MacOS Destek Düğmesi

Ek bildirim düğmelerinin macOS'ta çalışabilmesi için uygulamanızın aşağıdaki kriterler sağlaması gerekmektedir.

* İmzalı uygulama
* Uygulama içinde `NSUserNotificationAlertStyle` tarafından ayarlanan `info.plist` içindeki `alert`'e sahiptir.

Bu gerekliliklerden herhangi biri karşılanmazsa düğme görünmez.