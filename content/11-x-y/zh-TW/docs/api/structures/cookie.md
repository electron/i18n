# Cookie 物件

* `name` String - cookie 名稱。
* `value` String - cookie 值。
* `domain` String (選用) - cookie 的域名。這會在值前加上點，使對子域名有效。
* `hostOnly` Boolean (選用) - 這個 cookie 是否為 host-only。如果未傳回任何域名，則該值為 `true`。
* `path` String (選用) - cookie 的路徑。
* `secure` Boolean (選用) - 是否將這個 cookie 標示為 secure。
* `httpOnly` Boolean (選用) - 是否將這個 cookie 標示為 HTTP only。
* `session` Boolean (選用) - 這是個 session cookie 或是具有效期的的持續性 cookie。
* `expirationDate` Double (選用) - 這個 cookie 的有效期限，為 UNIX 紀元以來的秒數。 session cookies 並不支援這個選項。
* `sameSite` String - 應用於此cookie的[Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies)原則。  該值可以是 `unspecified` 、 `no_restriction` 、 `lax` 或 `strict`。
