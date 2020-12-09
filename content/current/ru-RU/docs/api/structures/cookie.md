# Объект Cookie

* `name` String - Название cookie.
* `value` String - Значение cookie.
* `domain` String (опционально) - Домен cookie; это будет нормализовано с предыдущей точкой, чтобы он так же был действителен для поддоменов.
* `hostOnly` Boolean (опционально) -  Являются ли cookie только для хоста; это будет только `true`, если домен не был передан.
* `path` String (опционально) - Путь к cookie.
* `secure` Boolean (опционально) - Помечена ли cookie как безопасная.
* `httpOnly` Boolean (опционально) - Помечена ли cookie как http-only.
* `session` Boolean (опционально) - Является ли cookie только для сессии или постоянной с датой истечения срока действия.
* `expirationDate` Double (опционально) - Дата истечения срока действия cookie в виде количества секунд эпохи UNIX.  Cookies для сессий не поддерживается.
* `sameSite` String - [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) политика применяемая к cookie.  Может быть `unspecified`, `no_restriction`, `lax` или `strict`.
