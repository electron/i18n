# RemovePassword オブジェクト

* `type` String - `password`。
* `origin` String (任意) - 指定された場合、オリジンに関連した認証情報のみが削除され、そうでない場合は、キャッシュ全体がクリアされます。
* `scheme` String (任意) - 認証方式。 `basic`、`digest`、`ntlm`、`negotiate` を指定できます。 `origin` によって削除されたら、必ず指定してください。
* `realm` String (任意) - 認証レルム。 `origin` によって削除されたら、必ず指定してください。
* `username` String (任意) - 認証の資格情報。 `origin` によって削除されたら、必ず指定してください。
* `password` String (任意) - 認証の資格情報。 `origin` によって削除されたら、必ず指定してください。
