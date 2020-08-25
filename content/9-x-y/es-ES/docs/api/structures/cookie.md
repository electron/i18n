# Objeto Cookie

* `name` String - Nombre del cookie.
* `value` String - El valor del cookie.
* `domain` String (optional) - El dominio de la cookie; este será normalizado por precediéndolo con un punto para que también sea valido para el uso de subdominios.
* `hostOnly` Boolean (opcional) - Si la cookie es una cookie de sólo host; sólo será `true` si no se pasó ningún dominio.
* `path` String (opcional) - La ruta de la cookie.
* `secure` Boolean (opcional) - Si la cookie esta marcada como segura.
* `httpOnly` Boolean (opcional) - Si la cookie esta marcada como solo HTTP.
* `session` Boolean (opcional) - Si al cookie es una cookie de sesión o una cookie persistente con una fecha de vencimiento.
* `expirationDate` Double (opcional) - La fecha de expiración de la cookie como el número segundos desde la época UNIX. No proporcionado para las session cookies.
