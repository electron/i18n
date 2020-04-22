# ŞifreKaldırma Nesnesi

* `type` Dize - `password`.
* `origin` Dize (opsiyonel) - Sağlandığında, kökenle ilgili kimlik doğrulama bilgisi sadece kaldırılacak aksi takdirde tüm önbellek temizlenecek.
* `scheme` Dize (opsiyonel) - Kimlik doğrulama şeması. `basic`, `digest`, `ntlm`, `negotiate` olabilir. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.
* `realm` String (optional) - Realm of the authentication. Eğer `origin` tarafından kaldırılıyorsa sağlanmalıdır.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
