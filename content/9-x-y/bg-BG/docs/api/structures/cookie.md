# Обект Cookie

* `name` String - Име на бисквитката.
* `value` String - Стойността на бисквитката.
* `domain` String (по избор) - Това е домайн-а на бисквитката, ще бъде нормализирана с точка така, че да бъде валидна и за съб-домайни.
* `hostOnly` Boolean (по избор) - Показва дали бисквитката е маркирана само за сървъра, ще бъде `true` само ако не е зададен домайн.
* `path` String (по избор) - Пътя на бисквитката.
* `secure` Boolean (по избор) - Показва дали бисквитката е маркирана на сигурна.
* `httpOnly` Boolean (по избор) - Показва дали бисквитката е маркирана само за HTTP употреба.
* `session` Boolean (по избор) - Показва дали бисквитката е свързана със сесия или е постоянна, записана с крайна дата за използване.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
