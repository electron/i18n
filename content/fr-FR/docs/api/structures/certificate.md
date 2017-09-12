# Objet Certificate

* `data` String - Données PEM codées
* `issuer` [CertificatePrincipal](certificate-principal.md) - Émetteur principal
* `issuerName` String - Nom Commun de l'émetteur
* `issuerCert` Certificate - Certificat de l'émetteur (si non auto-signé)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate