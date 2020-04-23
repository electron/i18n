# Обект RemovePassword

* `type` String - `password`.
* `origin` String (по избор) - Когато това свойство е изпратено, информацията за удостоверение свързана с произхода ще бъде само премахната, в противен случай, целия кеш ще бъде изчистен.
* `scheme` String (по избор) - Схема за удостоверяване. Може да бъде `basic`, `digest`, `ntlm`, `negotiate`. Трябва да бъде предоставена, ако отстраним по `origin`.
* `realm` String (optional) - Realm of the authentication. Трябва да бъде предоставена, ако отстраним по `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
