# Cookie Object

* `name` String - O nome do cookie.
* `value` String - O valor do cookie.
* `domain` String (opcional) - O domínio do cookie; isto será normalizado com um ponto no início para que ele também seja válido para subdomínios.
* `hostOnly` Boolean (opcional) - Se o cookie é host-only; isso será `true` apenas se nenhum domínio foi passado.
* `path` String (opcional) - O Diretório do cookie.
* `secure` Boolean (opcional) - Se o cookie está marcado como seguro.
* `httpOnly` Boolean (opcional) - Se o cookie está marcado como apenas HTTP.
* `session` Boolean (optional) - Se o cookie é um cookie de sessão ou um cookie persistente com uma data de expiração.
* `expirationDate` Double (opcional) - A data de expiração do cookie com o número de segundos como desde a época do UNIX. Não é fornecido para os cookies de sessão.