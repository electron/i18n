# Objeto RemovePassword

* `type` String - `password`.
* `origin` String (opcional) - Quando informado, somente a informação de autenticação da determinada origem será removida, caso contrário, todo cache será limpo.
* `scheme` String (opcional) - Scheme da autenticação. Pode ser `basic`, `digest`, `ntlm` e `negotiate`. Deve ser informado se estiver sendo removido por `origin`.
* `realm` String (opcional) - Realm da autenticação. Deve ser informado se estiver sendo removido por `origin`.
* `username` String (opcional) - Credenciais da autenticação. Deve ser informado se estiver sendo removido por `origin`.
* `password` String(opcional) - Credenciais da autenticação. Deve ser informado se estiver sendo removido por `origin`.