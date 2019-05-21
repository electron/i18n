# Objet Cookie

* `name` String - Nom du cookie.
* `value` String - La valeur du cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (facultatif) - Le chemin du cookie.
* `secure` Boolean (optional) - Si le cookie est marqué comme étant sécurisé.
* `httpOnly` Boolean (facultatif) - Si le cookie est marqué comme HTTP uniquement.
* `session` Boolean (facultatif) - Si le cookie est un cookie de session ou un cookie persistant avec une date d'expiration.
* `expirationDate` Double (facultatif) - La date d’expiration du cookie en nombre de secondes depuis l'epoch UNIX. Non fourni par les cookies de session.