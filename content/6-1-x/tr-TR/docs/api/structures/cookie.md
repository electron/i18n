# Çerez Nesnesi

* `name` Dizi - Çerez ismi.
* `value` Dizi - Çerez değeri.
* `domain` Karakter (opsiyonel) - Çerezin alan adı; bu, önceki bir nokta ile normalleştirilir, böylece alt alanlar için de geçerlidir.
* `hostOnly` Boolean (optiyonel) - Çerezin yalnızca sunucuya ait bir çerez olup olmadığını belirler; eğer hiç bir domain girilmediyse `true` olur.
* `path` Dize (opsiyonel) - Çerezin yolu.
* `secure` Boole (opsiyonel) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boole (opsiyonel) - Çerezin sadece HTTP olarak işaretlenip işaretlenmediği.
* `session` Boole (opsiyonel) - Çerezin bir oturum çerezi mi ya da son kullanma tarihi olan kalıcı bir çerez mi olduğu.
* `expirationDate` Double (opsiyonel) - Çerezin saniye cinsinden geçerlilik süresi. Oturum çerezi alınamadı.
