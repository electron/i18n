# Obiekt Certyfikat

* `dane` String - zakodowane dane PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Issuer principal
* `issuerName` String - Issuer's Common Name
* `issuerCert` Certyfikat - Certyfikat wystawcy (jeśli nie jest to swój podpis)
* `subject` [CertificatePrincipal](certificate-principal.md) - Podmiot główny
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate