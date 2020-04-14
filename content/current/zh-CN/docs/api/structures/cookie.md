# Cookie 对象

* `name` String - cookie 的名称。
* `value` String - cookie 的值。
* `domain` String (可选) - cookie所在域名，通常使用点号开头，以使其对子域名可用。
* `hostOnly` Boolean (可选) - cookie 是否仅匹配主机头；此项仅在未设置域名时才能为 `true`。
* `path` String (可选) - cookie 的路径。
* `secure` Boolean (可选) - cookie 是否标记为安全。
* `httpOnly` Boolean (可选) - cookie 是否只标记为 HTTP。
* `session` Boolean (可选) - cookie是会话cookie 还是具有过期时间的持久性 cookie
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
