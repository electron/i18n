# Certificate Object

* `data` Stringa - dati PEM codificati
* `issuer` [CertificatePrincipal](certificate-principal.md) - Emittente principale
* `issuerName` Stringa - nome comune dell'emittente
* `issuerCert` Certificato - emittente del certificato (se non self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate