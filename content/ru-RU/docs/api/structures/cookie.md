# Объект Cookie

* `name` String - название cookie.
* `value` String - значение cookie.
* `domain` String (опционально) - домен куки; это будет нормализовано с предыдущей точкой, чтобы он также был действителен для поддоменов.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (опиционально) - путь к cookie.
* `secure` Boolean (опиционально) - помечена ли cookie как безопасная.
* `httpOnly` Boolean (опиционально) - помечена ли cookie как http-only.
* `session` Boolean (опиционально) - является ли session cookie или постоянным cookie с датой истечения срока действия.
* `expirationDate` Double (опиционально) - дата истечения срока действия cookie как количество секунд эпохи UNIX. Не предоставляется для session cookie.