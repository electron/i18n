# Cookie 物件

* `name` String - cookie 的名稱
* `value` String - cookie 的值
* `domain` String (可選) - cookie 的域名
* `hostOnly` Boolean (可選) - 這個 cookie 是否為 host-only
* `path` String (可選) - cookie 的路徑
* `secure` Boolean (可選) - 這個 cookie 是否標示為安全
* `httpOnly` Boolean (可選) - 這個 cookie 是否標示為 HTTP only
* `session` Boolean (可選) - 這個 cookie 是一個 session cookie 還是有 expiration date 的持久性 cookie
* `expirationDate` Double (可選) - 這個 cookie 的有效期限，採用 UNIX 紀元以來的秒數，session cookie 不支援這個選項