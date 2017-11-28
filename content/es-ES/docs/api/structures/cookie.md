# Objeto Cookie

* `name` String - Nombre del cookie.
* `value` String - El valor del cookie.
* `domain` String (opcional) - El dominio del cookie.
* `hostOnly` Boolean (opcional) - Si la cookie es una cookie host-only.
* `path` String (opcional) - La ruta de la cookie.
* `secure` Boolean (opcional) - Si la cookie esta marcada como segura.
* `httpOnly` Boolean (opcional) - Si la cookie esta marcada como solo HTTP.
* `session` Boolean (opcional) - Si al cookie es una cookie de sesión o una cookie persistente con una fecha de vencimiento.
* `expirationDate` Double (opcional) - La fecha de caducidad de la cookie como el número de segundos desde la UNIX epoch. No permitido para las cookies de sesión.