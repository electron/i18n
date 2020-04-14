# Certificaat Object

* `data` String - PEM gecodeerde data
* `emittent` [Certificaat opdrachtgever](certificate-principal.md) - Emittent opdrachtgever
* `emittentName` String - Emittent Gemeenschappelijke Naam
* ` issuerCert` Certificaat - Issuer certificaat (indien niet zelf ondertekend)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Vingerafdruk van het certificaat
