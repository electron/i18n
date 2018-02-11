# Certyfikat Obiektu

* `dane` String - zakodowane dane PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - kapitał wystawcy
* `issuerName` String - nazwa wystawcy
* `issuerCert` Certyfikat - wystawca certyfikatu (jeśli nie jest podpisany)
* `subject` [CertificatePrincipal](certificate-principal.md) - Podmiot główny
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate