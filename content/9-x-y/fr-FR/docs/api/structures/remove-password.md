# Objet RemovePassword

* `type` String - `password`.
* `origin` String (facultatif) - Si renseigné, uniquement l'information d'authentification lié à l'origine sera supprimé, sinon la totalité du cache sera supprimé.
* `scheme` String (facultatif) - Schéma de l'authentification. Peut être `basic`, `digest`, `ntlm`, `negotiate`. Doit être renseigné si supprimé par l'`origine`.
* `realm` String (optional) - Realm of the authentication. Doit être renseigné si supprimé par l'`origine`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
