# RemovePassword Object

* `type` String - `password`.
* `origin` String (optional) - Wenn gegeben wird nur die Authentifizierungsinformation zu dem Ursprung entfernt, sonst wird der gesamte Cache geleert.
* `scheme` String (optional) - Schema der Authentifizierung. Kann die Werte `basic`, `digest`, `ntlm`, `negotiate` annehmen. Muss bei Entfernung mit `origin` angegeben werden.
* `realm` String (optional) - Bereich der Authentifizierung. Muss bei Entfernung mit `origin` angegeben werden.
* `Benutzername` Zeichenfolge (optional) - Anmeldeinformationen für die Authentifizierung. Muss angegeben werden, wenn vom `Ursprung` entfernen.
* `Passwort` Zeichenfolge (optional) - Anmeldeinformationen für die Authentifizierung. Muss angegeben werden, wenn vom `Ursprung` entfernen.