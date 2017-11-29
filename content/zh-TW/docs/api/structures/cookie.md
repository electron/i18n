# Cookie 物件

* `name` String - cookie 名稱。
* `value` String - cookie 值。
* `domain` String (選用) - cookie 的域名。
* `hostOnly` Boolean (選用) - 這個 cookie 是否為 host-only。
* `path` String (選用) - cookie 的路徑。
* `secure` Boolean (選用) - 是否將這個 cookie 標示為 secure。
* `httpOnly` Boolean (選用) - 是否將這個 cookie 標示為 HTTP only。
* `session` Boolean (可選) - 這個 cookie 是一個 session cookie 還是有 expiration date 的持久性 cookie
* `expirationDate` Double (可選) - 這個 cookie 的有效期限，採用 UNIX 紀元以來的秒數，session cookie 不支援這個選項