# Certificate Object

* `data` String - PEM encoded data
* `issuer` [CertificatePrincipal](certificate-principal.md) - Entidade principal
* `issuerName` String - Nome comun
* `issuerCert` Certificate - Emissor do certificado (se não for auto-assinado)
* `subject` [CertificatePrincipal](certificate-principal.md) - Assunto principal
* `subjectName` String - Nome comum do sujeito
* `serialNumber` String - Uma valor Hex representado por uma string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate