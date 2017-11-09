# 쿠키 개체

* `이름` String - 쿠키의 이름
* `값` String - 쿠키 값
* `도메인` String(옵션) - 쿠키의 도메인
* `호스트 전용` Boolean (옵션) - 쿠키가 호스트 전용 쿠키인지 아닌지
* `path` String (optional) - The path of the cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.