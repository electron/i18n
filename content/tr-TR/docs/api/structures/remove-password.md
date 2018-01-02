# ŞifreKaldırma Nesnesi

* `type` Dize - `password`.
* `origin` Dize (opsiyonel) - Sağlandığında, kökenle ilgili kimlik doğrulama bilgisi sadece kaldırılacak aksi takdirde tüm önbellek temizlenecek.
* `scheme` Dize (opsiyonel) - Kimlik doğrulama şeması. `basic`, `digest`, `ntlm`, `negotiate` olabilir. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.
* `realm` Dize (opsiyonel) - Kimlik doğrulama alanı. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.
* `username` Dize (opsiyonel) - Kimlik doğrulama bilgileri. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.
* `password` Dize (opsiyonel) - Kimlik doğrulama bilgileri. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.