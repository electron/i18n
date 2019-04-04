# Об'єкт cookie

* `name` String - Ім'я кукі.
* `value` String - Значення куки.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (optional) - Шлях до куки.
* `secure` Boolean (optional) - Чи кука позначена як безпечна.
* `httpOnly` Boolean (optional) - Чи кука позначена як HTTP-only.
* `session` Boolean (optional) - Чи кука є сессійною кукою або постійною кукою з датою закінчення дії.
* `expirationDate` Double (optional) - Дата закінчення терміну дії куки - як кількість секунд від епохи UNIX. Не додається до сессійної куки.