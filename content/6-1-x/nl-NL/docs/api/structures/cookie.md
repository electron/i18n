# Cookie Object

* `name` String - de naam van de cookie.
* `value` String - de waarde van de cookie.
* ` domain` String (optioneel) - Het domein van de cookie; dit zal worden genormaliseerd met een punt vooraf zodat het ook geldig is voor subdomeinen.
* `hostonly` Boolean (optioneel) - Of de cookie een host-only cookie is; dit zal alleen `waar` zijn als er geen domein is doorgegeven.
* `path` String (optioneel) - Het pad van de cookie.
* `veilig` Boolean (optioneel) - Of de cookie is gemarkeerd als veilig.
* `httpOnly` Boolean (optioneel) - of de cookie is gemarkeerd als alleen HTTP.
* `sessie` Boolean (optioneel) - Of de cookie een sessie-cookie is of een permanente cookie met een vervaldatum.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
