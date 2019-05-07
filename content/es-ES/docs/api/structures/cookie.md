# Objeto Cookie

* `name` String - Nombre del cookie.
* `value` String - El valor del cookie.
* `domain` String (optional) - El dominio del cookie; este será normalizado por precediéndolo con un punto para que también sea valido para el uso de subdominios.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (opcional) - La ruta de la cookie.
* `secure` Boolean (opcional) - Si la cookie esta marcada como segura.
* `httpOnly` Boolean (opcional) - Si la cookie esta marcada como solo HTTP.
* `session` Boolean (opcional) - Si al cookie es una cookie de sesión o una cookie persistente con una fecha de vencimiento.
* `expirationDate` Double (opcional) - La fecha de caducidad de la cookie como el número de segundos desde la UNIX epoch. No permitido para las cookies de sesión.