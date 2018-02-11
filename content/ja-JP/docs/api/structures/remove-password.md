# RemovePassword オブジェクト

* `type` String - `password`。
* `origin` String (任意) - 指定された場合、オリジンに関連した認証情報のみが削除され、そうでない場合は、キャッシュ全体がクリアされます。
* `scheme` String (任意) - 認証方式。 `basic`, `digest`, `ntlm`, `negotiate` にすることができます。 Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.