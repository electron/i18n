# Объект Cookie

* `name` String - название cookie.
* `value` String - значение cookie.
* `domain` String (опционально) - домен cookie; это будет нормализовано с предыдущей точкой, чтобы он также был действителен для поддоменов.
* `hostOnly` Boolean (опционально) - является ли cookie только для хоста; это будет только `true`, если домен не был передан.
* `path` String (опционально) - путь к cookie.
* `secure` Boolean (опционально) - помечена ли cookie как безопасная.
* `httpOnly` Boolean (опционально) - помечена ли cookie как http-only.
* `session` Boolean (опционально) - является ли cookie только для сессии или постоянной с датой истечения срока действия.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
