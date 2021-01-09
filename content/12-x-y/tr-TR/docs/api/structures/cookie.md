# Çerez Nesnesi

* `name` Dizi - Çerez ismi.
* `value` Dizi - Çerez değeri.
* `domain` Karakter (opsiyonel) - Çerezin alan adı; bu, önceki bir nokta ile normalleştirilir, böylece alt alanlar için de geçerlidir.
* `hostOnly` Boolean (optiyonel) - Çerezin yalnızca sunucuya ait bir çerez olup olmadığını belirler; eğer hiç bir domain girilmediyse `true` olur.
* `path` Dize (opsiyonel) - Çerezin yolu.
* `secure` Boole (opsiyonel) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boolean (opsiyonel) - Çerezin sadece HTTP olarak işaretlenip işaretlenmediği.
* `session` Boole (opsiyonel) - Çerezin bir oturum çerezi mi ya da son kullanma tarihi olan kalıcı bir çerez mi olduğu.
* `son kullanma tarihi` İkili (isteğe bağlı) - Çerezin son kullanma tarihi UNIX döneminden bu yana geçen saniye sayısı. Oturum çerezleri için sağlanmadı.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
