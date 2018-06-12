# Objeto Certificado

* `data` String - Dados codificados em PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Emissor principal
* `issuerName` String - Nome Comum do Emissor
* `issuerCert` Certificate - Emissor do certificado (se não for auto-assinado)
* `subject` [CertificatePrincipal](certificate-principal.md) - Sujeito principal
* `subjectName` String - Nome Comum do Sujeito
* `numeroSerial` String - Valor Hex representado em uma string
* `validStart` Number - Data de validação do certificado em segundos
* `validExpiry` Number - Data do fim da validade do certificado em segundos
* `fingerprint` String - Impressão digital do certificado