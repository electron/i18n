# Обект Cookie

* `name` String - Име на бисквитката.
* `value` String - Стойността на бисквитката.
* `domain` String (по избор) - Обхвата на бисквитката.
* `hostOnly` Boolean (по избор) - Показва дали бисквитката може да се използва само от приемника (host-only).
* `path` String (по избор) - Пътя на бисквитката.
* `secure` Boolean (по избор) - Показва дали бисквитката е маркирана на сигурна.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.