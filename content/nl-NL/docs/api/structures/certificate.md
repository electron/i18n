# Certificaat Object

* `data` String - PEM gecodeerde data
* `emittent` [Certificaat opdrachtgever](certificate-principal.md) - Emittent opdrachtgever
* `emittentName` String - Emittent Gemeenschappelijke Naam
* `issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate