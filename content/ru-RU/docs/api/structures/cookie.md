# Объект Cookie

* `name` String - название cookie.
* `value` String - значение cookie.
* `domain` String (опиционально) - домен cookie.
* `hostOnly` Boolean (опиционально) - является ли cookie только host-only.
* `path` String (опиционально) - путь к cookie.
* `secure` Boolean (опиционально) - помечена ли cookie как безопасная.
* `httpOnly` Boolean (опиционально) - помечена ли cookie как http-only.
* `session` Boolean (опиционально) - является ли session cookie или постоянным cookie с датой истечения срока действия.
* `expirationDate` Double (опиционально) - дата истечения срока действия cookie как количество секунд эпохи UNIX. Не предоставляется для session cookie.