# Đối tượng Cookie

* `name` String - Tên của cookie.
* `value` String - Giá trị của cookie.
* `domain` String (tùy chọn) - Tên miền của cookie.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie.
* `path` String (tùy chọn) - Đường dẫn của cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.