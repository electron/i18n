# Cookie オブジェクト

* `name` String - Cookieの名前。
* `value` String - Cookieの値。
* `domain` String (任意) - Cookie のドメインです。これはサブドメインでも有効になるように最初のドットで正規化されます。
* `hostOnly` Boolean (任意) - その Cookie がホスト限定 Cookie であるかどうか。これはドメインが渡されていない場合 `true` になります。
* `path` String (optional) - Cookieのパス。
* `secure` Boolean (任意) - Cookie に Secure フラグがついているか。
* `httpOnly` Boolean (optional) - CookieがHTTPのみとしてマークされているかどうか。
* `session` Boolean (任意) - Cookie がセッション Cookie か、有効期限のある永続的 Cookie かどうか。
* `expirationDate` Double (optional) - クッキーの有効期限は、UNIX時間からの秒数です。セッションCookieには指定されません。