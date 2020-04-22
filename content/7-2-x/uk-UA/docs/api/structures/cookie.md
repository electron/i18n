# Об'єкт cookie

* `name` String - Ім'я кукі.
* `value` String - Значення куки.
* `domain` String (опціонально) - Домен cookie; він буде нормалізований додаванням крапки, тобто він буде валідним і для сабдоменів.
* `hostOnly` Boolean (опціонально) - Визначає чи cookie є тільки хосту; буде тільки `true`, якщо не передано домен.
* `path` String (optional) - Шлях до куки.
* `secure` Boolean (optional) - Чи кука позначена як безпечна.
* `httpOnly` Boolean (optional) - Чи кука позначена як HTTP-only.
* `session` Boolean (optional) - Чи кука є сессійною кукою або постійною кукою з датою закінчення дії.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
