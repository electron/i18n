# RemovePassword オブジェクト

* `type` String - `password`.
* `origin` String (optional) - 提供されると、認証情報 原点に関連して削除されないと、キャッシュ全体がクリアされます。
* `scheme` String (optional) - 認証方式。 `basic`, `digest`, `ntlm`, `negotiate` にすることができます。 Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.