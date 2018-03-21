# Cookie オブジェクト

* `name` String - Cookieの名前。
* `value` String - Cookieの値。
* `domain` String (任意) - Cookieのドメイン。
* `hostOnly` Boolean (任意) - CookieがホストのみのCookieであるか。
* `path` String (optional) - Cookieのパス。
* `secure` Boolean (任意) - CookieにSecure属性がついているか。
* `httpOnly` Boolean (任意) - CookieにHttpOnly属性がついているか。
* `session` Boolean (任意) - CookieがセッションCookieまたは有効期限のある永続的Cookieであるか。
* `expirationDate` Double (任意) - UNIXエポックからの秒数によるCookieの有効期限。セッションCookieでは設定されません。