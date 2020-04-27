# RemovePassword-Objekt

* `type` String – `password`.
* `origin` String (optional) - Wenn angegeben, werden nur die Authentifizierungsinformationen zu dem Ursprung entfernt, sonst wird der gesamte Cache geleert.
* `scheme` String (optional) – Schema der Authentifizierung. Kann die Werte `basic`, `digest`, `ntlm`, `negotiate` annehmen. Muss bei Entfernung mit `origin` angegeben werden.
* `realm` String (optional) - Schema der Authentifizierung. Muss bei Entfernung mit `origin` angegeben werden.
* `username` String (optional) - Zugangsdaten für die Authentifizierung. Muss beim Entfernen durch `origin` angegeben werden.
* `password` String (optional) - Zugangsdaten für die Authentifizierung. Muss beim Entfernen durch `origin` angegeben werden.
