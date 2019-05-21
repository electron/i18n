# Cookie 物件

* `name` String - cookie 名稱。
* `value` String - cookie 值。
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (選用) - cookie 的路徑。
* `secure` Boolean (選用) - 是否將這個 cookie 標示為 secure。
* `httpOnly` Boolean (選用) - 是否將這個 cookie 標示為 HTTP only。
* `session` Boolean (選用) - 這是個 session cookie 或是具有效期的的持續性 cookie。
* `expirationDate` Double (選用) - 這個 cookie 的有效期限，為 UNIX 紀元以來的秒數，session cookie 不支援這個選項。