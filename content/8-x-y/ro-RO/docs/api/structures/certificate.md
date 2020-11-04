# Certificate Object

* `data` String - Date codificate PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Emitent principal
* `issuerName` String - Numele comun al emitentului
* `issuerCert` Certificat - Certificat emitent (dacă nu este autosemnat)
* `subject` [CertificatPrincipal](certificate-principal.md) - Subiect principal
* `subjectName` String - Numele comun al subiectului
* `serialNumber` String - Șir reprezentat valoare Hex
* `validStart` Number - Data de început a certificatului fiind valabilă în câteva secunde
* `validExpiry` Number - Data de sfârșit a certificatului fiind valabilă în câteva secunde
* `fingerprint` String - Amprenta certificatului
