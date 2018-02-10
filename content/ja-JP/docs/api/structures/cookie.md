# Cookie オブジェクト

* `name` String - Cookieの名前
* `value` String - Cookieの値
* `domain` String (optional) - Cookieのドメイン
* `hostOnly` Boolean (optional) - CookieがホストのみのCookieであるか
* `path` String (optional) - Cookieのパス
* `secure` Boolean (optional) - CookieにSecure属性がついているか
* `httpOnly` Boolean (optional) - CookieにHttpOnly属性がついているか
* `session` Boolean (optional) - CookieがセッションCookieまたは有効期限のある永続的Cookieであるか
* `expirationDate` Double (optional) - UNIX時間の秒数によるCookieの有効期限。セッションCookieでは設定されません。