# Cookie Object

* `name` String - O nome do cookie.
* `value` String - O valor do cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (opcional) - O Diretório do cookie.
* `secure` Boolean (opcional) - Se o cookie está marcado como seguro.
* `httpOnly` Boolean (opcional) - Se o cookie está marcado como apenas HTTP.
* `session` Boolean (optional) - Se o cookie é um cookie de sessão ou um cookie persistente com uma data de expiração.
* `expirationDate` Double (opcional) - A data de expiração do cookie com o número de segundos como desde a época do UNIX. Não é fornecido para os cookies de sessão.