# Об'єкт cookie

* `name` String - Ім'я кукі.
* `value` String - Значення куки.
* `domain` String (optional) - Домен куки.
* `hostOnly` Boolean (optional) - Чи кука буде host-only.
* `path` String (optional) - Шлях до куки.
* `secure` Boolean (optional) - Чи кука позначена як безпечна.
* `httpOnly` Boolean (optional) - Чи кука позначена як HTTP-only.
* `session` Boolean (optional) - Чи кука є сессійною кукою або постійною кукою з датою закінчення дії.
* `expirationDate` Double (optional) - Дата закінчення терміну дії куки - як кількість секунд від епохи UNIX. Не додається до сессійної куки.