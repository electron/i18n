# RemovePassword-Objekt

* `type` String – `password`.
* `origin` String (optional) - Wenn angegeben, werden nur die Authentifizierungsinformationen zu dem Ursprung entfernt, sonst wird der gesamte Cache geleert.
* `scheme` String (optional) – Schema der Authentifizierung. Kann die Werte `basic`, `digest`, `ntlm`, `negotiate` annehmen. Muss bei Entfernung mit `origin` angegeben werden.
* `realm` String (optional) - Realm of the authentication. Muss bei Entfernung mit `origin` angegeben werden.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
