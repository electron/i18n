# Objet Cookie

* `name` String - Nom du cookie.
* `value` String - La valeur du cookie.
* `domain` String (facultatif) - Le nom de domaine du cookie; ce dernier sera normalisé par un point le précédent pour qu'il soit valide pour les sous-domaines.
* hostOnly Boolean (optionel) - Si le cookie est un cookie réservé à l'hôte uniquement; cela ne sera ` vrai </ 0> que si aucun domaine n'a été transmis.</li>
<li><code>path` String (facultatif) - Le chemin du cookie.
* `secure` Boolean (optional) - Si le cookie est marqué comme étant sécurisé.
* `httpOnly` Boolean (facultatif) - Si le cookie est marqué comme HTTP uniquement.
* `session` Boolean (facultatif) - Si le cookie est un cookie de session ou un cookie persistant avec une date d'expiration.
* `expirationDate` Double (facultatif) - La date d'expiration du cookie en nombre de secondes depuis l'epoch UNIX. Non fournie pour les cookies de session.
