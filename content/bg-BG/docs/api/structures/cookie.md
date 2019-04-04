# Обект Cookie

* `name` String - Име на бисквитката.
* `value` String - Стойността на бисквитката.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (по избор) - Пътя на бисквитката.
* `secure` Boolean (по избор) - Показва дали бисквитката е маркирана на сигурна.
* `httpOnly` Boolean (по избор) - Показва дали бисквитката е маркирана само за HTTP употреба.
* `session` Boolean (по избор) - Показва дали бисквитката е свързана със сесия или е постоянна, записана с крайна дата за използване.
* `expirationDate` Double (по избор) - Крайната дата за използване на бисквитката, като датата е записана в секунди по пример на UNIX. Тази стойност не може да се използва със сесийни бисквитки.