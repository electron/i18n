# Cookie 对象

* `name` String - cookie 的名称。
* `value` String - cookie 的值。
* `domain` String (可选) - cookie所在域名，通常使用 点号开头，以使其对子域名可用。
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (可选) - cookie 的路径。
* `secure` Boolean (可选) - cookie 是否标记为安全。
* `httpOnly` Boolean (可选) - cookie 是否只标记为 HTTP。
* `session` Boolean (可选) - cookie是会话cookie 还是具有过期时间的持久性 cookie
* `expirationDate` Double (可选) - cookie 距离 UNIX 时间戳的过期时间，数值为秒。不需要提供给 session cookies。