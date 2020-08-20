# Đối tượng Cookie

* `name` String - Tên của cookie.
* `value` String - Giá trị của cookie.
* `domain` String (optional) - Domain của cookie; nó sẽ được chuẩn hóa bằng việc thêm dấu chấm (.) vào đằng trước để cookie cũng hợp lệ với subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (tùy chọn) - Đường dẫn của cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
