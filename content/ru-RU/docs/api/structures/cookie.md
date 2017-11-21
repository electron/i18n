# Cookie Объект

* `name` String - Название cookie файла.
* `value` String - Значение cookie.
* `domain` String (опциональный) - Домен cookie.
* `hostOnly` Boolean (опиционально) - Является ли cookie cookie только для хоста.
* `path` String (optional)- путь к файлу cookie.
* `secure` Boolean (optional) - помечен ли файл cookie как безопасный.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.