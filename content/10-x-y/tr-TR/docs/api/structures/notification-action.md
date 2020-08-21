# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü `button` olabilir.
* `text` String (isteğe bağlı) - Verilen aksiyon için etiket.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin`                                                                               | Kısıtlamalar                                                                                                                                                                                                                                                                     |
| ---------- | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Göster" (veya böyle bir `button`'den önce boşsa, varsayılan olarak yerelleştirilmiş bir string) | Sadece birinci kullanıldığında. Eğer bikaç tane sağlandıysa, ilkinden sonrakiler ek eylemler olarak gösterilecek (Fare imleci aksiyon tuşunun üzerine gelince gösterilir). Benzeri, `hasReply` ile uyumsuz, herhangi bir aksiyon eğer `hasReply` `True` ise görmezden gelinecek. |

### MacOS Destek Düğmesi

Ek bildirim düğmelerinin macOS'ta çalışabilmesi için uygulamanızın aşağıdaki kriterler sağlaması gerekmektedir.

* İmzalı uygulama
* Uygulamanın `Info.plist` içinde `alert` olarak ayarlanmış `NSUserNotificationAlertStyle` değeri var.

Bu gereksinimlerden herhangi biri karşılanmazsa düğme görünmez.
