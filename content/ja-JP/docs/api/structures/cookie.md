# Cookie オブジェクト

* `name` String - Cookieの名前。
* `value` String - Cookieの値。
* `domain` String (任意) - Cookie のドメイン。
* `hostOnly` Boolean (任意) - Cookie がホストのみの Cookie であるか。
* `path` String (optional) - Cookieのパス。
* `secure` Boolean (任意) - Cookie に Secure フラグがついているか。
* `httpOnly` Boolean (任意) - Cookie に HttpOnly フラグがついているか。
* `session` Boolean (任意) - Cookie がセッション Cookie か、有効期限のある永続的 Cookie かどうか。
* `expirationDate` Double (任意) - UNIX エポックからの秒数による Cookie の有効期限。セッション Cookie では設定されない。