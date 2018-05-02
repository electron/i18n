# Bildirim Eylem Nesnesi

* `type` String - Aksiyonun türü. Tür `button` olabilir.
* `text` String (optional) - The label for the given action.

## Platform / Eylem Desteği

| Eylem türü | Destek Platformu | `Metnin` Kullanımı              | Varsayılan `metin`                                                                          | Kısıtlamalar                                                                                                                                                                                                                                                              |
| ---------- | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tuş`      | macOS            | Tuş için etiket gibi kullanıldı | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS Destek Düğmesi

Ek bildirim düğmelerinin macOS'ta çalışabilmesi için uygulamanızın aşağıdaki kriterler sağlaması gerekmektedir.

* İmzalı uygulama
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Bu gerekliliklerden herhangi biri karşılanmazsa düğme görünmez.