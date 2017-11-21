# Cookie Объект

* `name` String - Название cookie.
* `value` String - Значение cookie.
* `domain` String (опциональный) - Домен cookie.
* `hostOnly` Boolean (опиционально) - Является ли cookie только host-only.
* `path` String (опиционально) - Путь к cookie.
* `secure` Boolean (опиционально) - Помечен ли cookie как безопасный.
* `httpOnly` Boolean (опиционально) - Помечен ли cookie как HTTP-only.
* `session` Boolean (опиционально) - Является ли cookie session cookie или постоянным cookie с датой истечения срока действия.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.