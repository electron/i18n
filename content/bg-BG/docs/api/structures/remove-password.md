# Обект RemovePassword

* `type` String - `password`.
* `origin` String (по избор) - Когато това свойство е изпратено, информацията за удостоверение свързана с произхода ще бъде само премахната, в противен случай, целия кеш ще бъде изчистен.
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.