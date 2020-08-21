# Объект Cookie

* `name` String - название cookie.
* `value` String - значение cookie.
* `domain` String (опционально) - домен cookie; это будет нормализовано с предыдущей точкой, чтобы он также был действителен для поддоменов.
* `hostOnly` Boolean (опционально) - является ли cookie только для хоста; это будет только `true`, если домен не был передан.
* `path` String (опционально) - путь к cookie.
* `secure` Boolean (опционально) - помечена ли cookie как безопасная.
* `httpOnly` Boolean (опционально) - помечена ли cookie как http-only.
* `session` Boolean (опционально) - является ли cookie только для сессии или постоянной с датой истечения срока действия.
* `expirationDate` Double (опционально) - Дата истечения срока действия cookie в виде количества секунд эпохи UNIX. Not provided for session cookies.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
