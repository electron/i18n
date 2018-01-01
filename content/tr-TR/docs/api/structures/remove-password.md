# ŞifreKaldırma Nesnesi

* `type` Dize - `password`.
* `origin` Dize (opsiyonel) - Sağlandığında, kökenle ilgili kimlik doğrulama bilgisi sadece kaldırılacak aksi takdirde tüm önbellek temizlenecek.
* `scheme` Dize (opsiyonel) - Kimlik doğrulama şeması. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.