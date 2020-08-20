# Objet RemovePassword

* `type` String - `password`.
* `origin` String (facultatif) - Si renseigné, uniquement l'information d'authentification lié à l'origine sera supprimé, sinon la totalité du cache sera supprimé.
* `scheme` String (facultatif) - Schéma de l'authentification. Peut être `basic`, `digest`, `ntlm`, `negotiate`. Doit être renseigné si supprimé par l'`origine`.
* `realm` String (facultatif) - Domaine de l’authentification. Doit être renseigné si supprimé par l'`origine`.
* `username` String (facultatif) - Identifiants de l'authentification. Doit être fourni en cas de suppression par `origin`.
* `username` String (facultatif) - Identifiants de l'authentification. Doit être fourni en cas de suppression par `origin`.
