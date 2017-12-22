# Cookie オブジェクト

* `name` String - Cookieの名前。
* `value` String - Cookieの値。
* `domain` String (optional) - クッキーのドメイン。
* `hostOnly` Boolean (optional) - クッキーがホストオンリーであるかどうか。
* `path` String (optional) - Cookieのパス。
* `secure` Boolean (optional) - クッキーが安全であるとマークされているかどうか。
* `httpOnly` Boolean (optional) - CookieがHTTPのみとしてマークされているかどうか。
* `session` Boolean (optional) - クッキーがセッションクッキーであるか、有効期限のある永続クッキーであるかどうか。
* `expirationDate` Double (optional) - クッキーの有効期限は、UNIX時間からの秒数です。セッションCookieには指定されません。