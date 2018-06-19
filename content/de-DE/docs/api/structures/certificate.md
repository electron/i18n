# Certificate Object

* `data` String - PEM verschlüsselte Daten
* `issuer` [CertificatePrincipal](certificate-principal.md) - Hauptherausgeber
* `issuerName` String - Allgemeiner Name des Herausgebers
* `issuerCert` Certificate- Herausgeber Zertifikat (falls nicht selbstsigniert)
* `subject` [CertificatePrincipal](certificate-principal.md) - Hauptbetreff
* `subjectName` String - Allgemeiner Name des Betreffs
* `serialNumber` String - Hex-Wert repräsentiert String
* `validStart` Number - Start datum des Zertifikats, gültig in Sekunden
* `validExpiry` Number- Ablaufdatum des Zertifikats in Sekunden
* `fingerprint` String - Fingerabdruck des Zertifikats