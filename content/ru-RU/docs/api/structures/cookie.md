# Объект Cookie

* `name` String - название cookie.
* `value` String - значение cookie.
* `domain` String (опиционально) - домен cookie.
* `hostOnly` Boolean (опиционально) - является ли cookie только host-only.
* `path` String (опиционально) - путь к cookie.
* `secure` Boolean (опиционально) - Помечен ли cookie как безопасный.
* `httpOnly` Boolean (опиционально) - Помечен ли cookie как HTTP-only.
* `session` Boolean (опиционально) - Является ли cookie session cookie или постоянным cookie с датой истечения срока действия.
* `expirationDate` Double (опиционально) - Дата истечения срока действия cookie как количество секунд с момента UNIX. Не предоставляется для session cookie.