# Çerez Nesnesi

* `name` Dizi - Çerezin ismi.
* `value` Dizi - Çerezin değeri.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` Dize (opsiyonel) - Çerezin yolu.
* `secure` Boole (opsiyonel) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boole (opsiyonel) - Çerezin sadece HTTP olarak işaretlenip işaretlenmediği.
* `session` Boole (opsiyonel) - Çerezin bir oturum çerezi mi ya da son kullanma tarihi olan kalıcı bir çerez mi olduğu.
* `expirationDate` Çift (opsiyonel) - Çerezin UNIX döneminden beri geçen saniye sayısı olarak son kullanma tarihi. Oturum çerezleri için sağlanmamıştır.