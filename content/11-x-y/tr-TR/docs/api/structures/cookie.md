# Çerez Nesnesi

* `name` Dizi - Çerez ismi.
* `value` Dizi - Çerez değeri.
* `domain` Dizi (isteğe bağlı) - Çerezin alan adı; bu, alt alan adları için de geçerli olması için önceki bir nokta ile normalleştirilecektir.
* `hostOnly` Boolean (isteğe bağlı) - Çerezin yalnızca barındırıcı çerez olup olmadığı; bu yalnızca alan adı geçilmezse `true` olacaktır.
* `path` Dizi (isteğe bağlı) - Çerezin yolu.
* `secure` Boolean (isteğe bağlı) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boolean (isteğe bağlı) - Çerezin sadece HTTP olarak işaretlenip işaretlenmediği.
* `session` Boolean (isteğe bağlı) - Çerezin bir oturum çerezi mi yoksa kalıcı mı olduğu son kullanma tarihi olan çerez.
* `son kullanma tarihi` Double (isteğe bağlı) - Çerezin son kullanma tarihi UNIX döneminden bu yana geçen saniye sayısı. Oturum tanımlama bilgileri için sağlanmamıştır.
* ` sameSite ` String - Bu çereze uygulanan [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) politikası.  `unspecified`, `no_restriction`, `lax`or`strict` olabilir.
