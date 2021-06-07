# Cookie オブジェクト

* `name` String - Cookie の名前。
* `value` String - Cookie の値。
* `domain` String (任意) - Cookie のドメインです。これはサブドメインでも有効になるように最初のドットで正規化されます。
* `hostOnly` Boolean (任意) - その Cookie がホスト限定 Cookie であるかどうか。これはドメインが渡されていない場合 `true` になります。
* `path` String (optional) - Cookie のパス。
* `secure` Boolean (任意) - Cookie に Secure フラグがついているか。
* `httpOnly` Boolean (任意) - Cookie に HttpOnly フラグがついているか。
* `session` Boolean (任意) - Cookie がセッション Cookie か、有効期限のある永続的 Cookie かどうか。
* `expirationDate` Double (任意) - UNIX エポックからの秒数による Cookie の有効期限。 セッション Cookie には提供されません。
* `sameSite` String - この Cookie に適用する [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) ポリシー。  `unspecified`、`no_restriction`、`lax`、`strict` のいずれかにできます。
