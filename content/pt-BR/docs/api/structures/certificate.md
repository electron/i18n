# Objeto Certificado

* `data` String - Dados com a codificação PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Entidade principal
* `issuerName` String - Nome comum do emissor
* `issuerCert` Certificate - Emissor do certificado (se não for auto-assinado)
* `subject` [CertificatePrincipal](certificate-principal.md) - Assunto principal
* `subjectName` String - Nome comum do emissor
* `serialNumber` String - Uma valor Hex representado por uma string
* `validStart` Number - Data do inicio de validade do certificado em segundos
* `validExpiry` Number - Data do fim da validade do certificado em segundos
* `fingerprint` String - Impressão digital do certificado