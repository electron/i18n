# Çerez Nesnesi

* `name` Dizi - Çerez ismi.
* `value` Dizi - Çerez değeri.
* `domain` Karakter (opsiyonel) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optiyonel) - Çerezin yalnızca sunucuya ait bir çerez olup olmadığını belirler; eğer hiç bir domain girilmediyse `true` olur.
* `path` Dize (opsiyonel) - Çerezin yolu.
* `secure` Boole (opsiyonel) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boole (opsiyonel) - Çerezin sadece HTTP olarak işaretlenip işaretlenmediği.
* `session` Boole (opsiyonel) - Çerezin bir oturum çerezi mi ya da son kullanma tarihi olan kalıcı bir çerez mi olduğu.
* `expirationDate` Çift (opsiyonel) - Çerezin UNIX döneminden beri geçen saniye sayısı olarak son kullanma tarihi. Oturum çerezleri için sağlanmamıştır.