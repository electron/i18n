# Cookie オブジェクト

* `name` String - Cookieの名前。
* `value` String - Cookieの値。
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (optional) - Cookieのパス。
* `secure` Boolean (任意) - Cookie に Secure フラグがついているか。
* `httpOnly` Boolean (optional) - CookieがHTTPのみとしてマークされているかどうか。
* `session` Boolean (任意) - Cookie がセッション Cookie か、有効期限のある永続的 Cookie かどうか。
* `expirationDate` Double (optional) - クッキーの有効期限は、UNIX時間からの秒数です。セッションCookieには指定されません。