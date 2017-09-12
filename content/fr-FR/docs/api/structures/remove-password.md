# Objet RemovePassword

* `type` String - `password`.
* `origin` String (facultatif) - Si renseigné, uniquement l'information d'authentification lié à l'origine sera supprimé, sinon la totalité du cache sera supprimé.
* `scheme` String (facultatif) - Schéma de l'authentification. Peut être `basic`, `digest`, `ntlm`, `negotiate`. Doit être renseigné si supprimé par l'`origine`.
* `realm` String (facultatif) - Domaine de l'authentification. Doit être renseigné si supprimé par l'`origine`.
* `username` String (facultatif) - Identifiants de la authentification. Doit être renseigné si supprimé par l'`origine`.
* `password` String (facultatif) - Identifiants de la authentification. Doit être renseigné si supprimé par l'`origine`.