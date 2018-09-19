# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü `button` olabilir.
* `text` String (isteğe bağlı) - Verilen aksiyon için etiket.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin`                                                                          | Kısıtlamalar                                                                                                                                                                                                                                                                     |
| ---------- | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Sadece birinci kullanıldığında. Eğer bikaç tane sağlandıysa, ilkinden sonrakiler ek eylemler olarak gösterilecek (Fare imleci aksiyon tuşunun üzerine gelince gösterilir). Benzeri, `hasReply` ile uyumsuz, herhangi bir aksiyon eğer `hasReply` `True` ise görmezden gelinecek. |

### MacOS Destek Düğmesi

Ek bildirim düğmelerinin macOS'ta çalışabilmesi için uygulamanızın aşağıdaki kriterler sağlaması gerekmektedir.

* İmzalı uygulama
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.