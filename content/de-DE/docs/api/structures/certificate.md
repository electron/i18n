# Zertifikatsobjekt

* `data` String - PEM verschlüsselte Daten
* `issuer` [CertificatePrincipal](certificate-principal.md) - Hauptherausgeber
* `issuerName` String - Allgemeiner Name des Herausgebers
* `issuerCert` Certificate- Herausgeber Zertifikat (falls nicht selbstsigniert)
* `Betreff` [Hauptzertifikat](certificate-principal.md) - Hauptbetreff
* `betreffName` String - Allgemeiner Name des Betreffs
* `Seriennummer` String - Hex-Wert repräsentiert String
* `gültigerStart` Number - Startdatum des Zertifikats, gültig in Sekunden
* `ablaufDatum` Anzahl - Ablaufdatum des Zertifikats, gültig in Sekunden
* `Fingerabdruck` String - Fingerabdruck des Zertifikats