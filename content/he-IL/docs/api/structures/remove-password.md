# אובייקט RemovePassword

* `type` String - `password`.
* `origin` String (אופציונאלי) - כאשר מסופק, מידע האימות המקושר למקור יוסר בלבד אחרת כל המטמון יינוקה.
* `scheme` String (אופציונאלי) - סכמת האימות. יכול להיות `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.