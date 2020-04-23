# Objeto RemovePassword

* `type` String - `password`.
* `origin` String (opcional) - Quando informado, somente a informação de autenticação da determinada origem será removida, caso contrário, todo cache será limpo.
* `scheme` String (opcional) - Scheme da autenticação. Pode ser `basic`, `digest`, `ntlm` e `negotiate`. Deve ser informado se estiver sendo removido por `origin`.
* `realm` String (optional) - Realm of the authentication. Deve ser informado se estiver sendo removido por `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
